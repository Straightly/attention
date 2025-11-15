
import java.time.LocalDate;
import java.time.Period;
import java.util.List;
import java.util.Optional;

/**
 * Service for checking patient consent for interface vendors.
 * 
 * This is a Java port of the Perl function:
 * PatientPrivacy::InterfaceConsent::IsPatientConsenting
 * 
 * Original location: /prod/perllib/Athena/PatientPrivacy/InterfaceConsent.pm
 */
public class IsPatientConsentingService {

    private final InterfaceVendorRepository interfaceVendorRepository;
    private final ChartRepository chartRepository;
    private final ClientRepository clientRepository;
    private final ClinicalPatientDataRepository clinicalPatientDataRepository;

    public IsPatientConsentingService(
            InterfaceVendorRepository interfaceVendorRepository,
            ChartRepository chartRepository,
            ClientRepository clientRepository,
            ClinicalPatientDataRepository clinicalPatientDataRepository) {
        this.interfaceVendorRepository = interfaceVendorRepository;
        this.chartRepository = chartRepository;
        this.clientRepository = clientRepository;
        this.clinicalPatientDataRepository = clinicalPatientDataRepository;
    }

    /**
     * Checks if we have consent from a given patient to send (or retrieve) their data
     * via a given interface. It is possible the patient has not actively given consent,
     * in which case we look to see whether that vendor is opt-in or opt-out.
     * 
     * @param interfaceVendorId The interface vendor ID
     * @param setting One of the consent settings (e.g., 'VERIFYMEDICATIONHISTORY')
     * @param patientId The patient ID
     * @param chartId The chart ID (optional, will be looked up if not provided)
     * @param departmentId The department ID (optional, used to look up chart ID)
     * @param patientValue Override value ('Y' or 'N') - if set, overrides database value
     * @param contextId The context ID (optional, defaults to current practice)
     * @return true if we have the patient's consent, false otherwise
     */
    public boolean isPatientConsenting(
            String interfaceVendorId,
            String setting,
            Long patientId,
            Long chartId,
            Long departmentId,
            String patientValue,
            Long contextId) {

        // Get the consent model for this vendor/setting combination
        String consentModel = getConsentModel(interfaceVendorId, setting, contextId);

        // If no chartId provided, we need to look it up
        if (chartId == null) {
            if (departmentId == null) {
                // Get all chart IDs for this patient
                List<Long> chartIds = chartRepository.getChartIds(patientId);

                // If there is no chart associated with this patient, we do not have consent
                // unless it's an implied in model
                if (chartIds.isEmpty() && !"IMPLIEDIN".equals(consentModel)) {
                    return false;
                }

                // Return true if "No consent necessary" has been chosen
                if ("IMPLIEDIN".equals(consentModel)) {
                    return true;
                }

                // Return false if the "All patients excluded from consent" model has been chosen
                // We also return false if GetConsentModel returned null, because this probably indicates
                // that the piece of logic gated by this setting does not apply to this vendor at all
                if (consentModel == null || "IMPLIEDOUT".equals(consentModel)) {
                    return false;
                }

                // Count how many charts have consent
                int consentCount = 0;
                for (Long cid : chartIds) {
                    if (isPatientConsenting(interfaceVendorId, setting, patientId, cid, null, null, contextId)) {
                        consentCount++;
                    }
                }

                // If we have consent on all charts we have consent
                return consentCount == chartIds.size();
            } else {
                // Look up chart ID by patient and department
                chartId = chartRepository.getChartId(patientId, departmentId);
            }
        }

        // Some consent models actually differ depending on how old the patient is
        if ("OPTINBUTOPTOUTUNDER19".equals(consentModel) || "IMPLIEDOUTBUTOPTOUTUNDER19".equals(consentModel)) {
            LocalDate patientDob = clientRepository.getPatientDob(patientId);
            int age = calculateAge(patientDob);
            
            if (age < 19) {
                consentModel = "OPTOUT";
            } else {
                consentModel = "OPTINBUTOPTOUTUNDER19".equals(consentModel) ? "OPTIN" : "IMPLIEDOUT";
            }
        }

        // Return true if "No consent necessary" has been chosen
        if ("IMPLIEDIN".equals(consentModel)) {
            return true;
        }

        // Return false if the "All patients excluded from consent" model has been chosen
        // We also return false if GetConsentModel returned null
        if (consentModel == null || "IMPLIEDOUT".equals(consentModel)) {
            return false;
        }

        // Get the patient's consent value from the database (unless overridden)
        String actualPatientValue = patientValue;
        if (actualPatientValue == null) {
            String consentKey = getConsentDatabaseKey(interfaceVendorId, setting, null);
            actualPatientValue = clinicalPatientDataRepository.getPatientDataElement(chartId, consentKey, 0);
        }

        // If we have a value for the patient
        if ("Y".equals(actualPatientValue)) {
            return true;
        }
        if ("N".equals(actualPatientValue)) {
            return false;
        }

        // Return true if the model is OPTOUT, in which case we have consent when there is no
        // value for the patient
        if ("OPTOUT".equals(consentModel)) {
            return true;
        }

        // If the model is opt-in and no value has been set for the patient, we do not have consent
        return false;
    }

    /**
     * Gets the consent model for a given interface vendor and setting.
     * 
     * @param interfaceVendorId The interface vendor ID
     * @param setting The consent setting
     * @param contextId The context ID (practice ID)
     * @return The consent model (e.g., 'OPTIN', 'OPTOUT', 'IMPLIEDIN', 'IMPLIEDOUT', etc.)
     */
    private String getConsentModel(String interfaceVendorId, String setting, Long contextId) {
        // Get the interface vendor context type ID
        Long interfaceVendorContextTypeId = getInterfaceVendorContextTypeId(interfaceVendorId, contextId);
        
        if (interfaceVendorContextTypeId == null) {
            return null;
        }

        // Get the consent model from the vendor type configuration
        return interfaceVendorRepository.getConsentModel(interfaceVendorContextTypeId, contextId, setting);
    }

    /**
     * Gets the interface vendor context type ID.
     * 
     * This queries the interfacevendortype and interfacevendorcontexttype tables
     * to find the appropriate configuration for this vendor.
     * 
     * @param interfaceVendorId The interface vendor ID
     * @param contextId The context ID (practice ID)
     * @return The interface vendor context type ID, or null if not found
     */
    private Long getInterfaceVendorContextTypeId(String interfaceVendorId, Long contextId) {
        // SQL equivalent:
        // SELECT interfacevendorcontexttype.id
        // FROM interfacevendortype, interfacevendorcontexttype
        // WHERE interfacevendortype.id = interfacevendorcontexttype.interfacevendortypeid
        //   AND interfacevendortype.filename IN ('Interface::VendorType::InpatientVaccineRegistry',
        //                                         'Interface::VendorType::VaccineRegistry',
        //                                         'Interface::VendorType::XDS',
        //                                         'Interface::VendorType::ConsentBased')
        //   AND interfacevendorcontexttype.contextid IN (contextId, 1)
        //   AND interfacevendorcontexttype.interfacevendorid = interfaceVendorId
        //   AND interfacevendorcontexttype.deleted IS NULL
        // ORDER BY interfacevendorcontexttype.interfacevendorid,
        //          interfacevendorcontexttype.contextid DESC,
        //          interfacevendorcontexttype.interfacevendorid
        // LIMIT 1
        
        return interfaceVendorRepository.getInterfaceVendorContextTypeId(interfaceVendorId, contextId);
    }

    /**
     * Constructs the database key for storing/retrieving consent data.
     * 
     * @param interfaceVendorId The interface vendor ID
     * @param setting The consent setting
     * @param special Can be null, 'DATE', or 'CONSENTBY' for related data
     * @return The database key string
     */
    private String getConsentDatabaseKey(String interfaceVendorId, String setting, String special) {
        String prefix;
        if ("DATE".equals(special)) {
            prefix = "INTERFACECONSENTDATE.";
        } else if ("CONSENTBY".equals(special)) {
            prefix = "INTERFACECONSENTBY.";
        } else {
            prefix = "INTERFACECONSENT.";
        }
        return prefix + interfaceVendorId + "." + setting;
    }

    /**
     * Calculates age from date of birth.
     * 
     * @param dob Date of birth
     * @return Age in years
     */
    private int calculateAge(LocalDate dob) {
        if (dob == null) {
            return 0;
        }
        return Period.between(dob, LocalDate.now()).getYears();
    }

    /**
     * Repository interface for interface vendor data.
     */
    public interface InterfaceVendorRepository {
        /**
         * Gets the consent model for a vendor/setting combination.
         * 
         * @param interfaceVendorContextTypeId The interface vendor context type ID
         * @param contextId The context ID
         * @param setting The consent setting
         * @return The consent model string
         */
        String getConsentModel(Long interfaceVendorContextTypeId, Long contextId, String setting);

        /**
         * Gets the interface vendor context type ID.
         * 
         * Queries interfacevendortype and interfacevendorcontexttype tables.
         * 
         * @param interfaceVendorId The interface vendor ID
         * @param contextId The context ID
         * @return The interface vendor context type ID
         */
        Long getInterfaceVendorContextTypeId(String interfaceVendorId, Long contextId);
    }

    /**
     * Repository interface for chart data.
     */
    public interface ChartRepository {
        /**
         * Gets all chart IDs for a patient.
         * 
         * @param patientId The patient ID
         * @return List of chart IDs
         */
        List<Long> getChartIds(Long patientId);

        /**
         * Gets the chart ID for a patient in a specific department.
         * 
         * @param patientId The patient ID
         * @param departmentId The department ID
         * @return The chart ID
         */
        Long getChartId(Long patientId, Long departmentId);
    }

    /**
     * Repository interface for client (patient) data.
     */
    public interface ClientRepository {
        /**
         * Gets the patient's date of birth.
         * 
         * Query: SELECT dob FROM client WHERE id = ?
         * 
         * @param patientId The patient ID
         * @return The patient's date of birth
         */
        LocalDate getPatientDob(Long patientId);
    }

    /**
     * Repository interface for clinical patient data.
     */
    public interface ClinicalPatientDataRepository {
        /**
         * Gets a patient data element from the clinicalpatientdata table.
         * 
         * Query: SELECT value FROM clinicalpatientdata
         *        WHERE chartid = ? AND key = ? AND keyid = ?
         * 
         * @param chartId The chart ID
         * @param key The data key
         * @param keyId The key ID (usually 0 for consent data)
         * @return The value, or null if not found
         */
        String getPatientDataElement(Long chartId, String key, Integer keyId);
    }
}
