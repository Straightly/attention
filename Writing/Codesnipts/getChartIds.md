# [Title]

## Description
Brief description of what this does

## Command/Code
```perl

BusCall::PatientDemographics::IsPatientConsenting($dbh, {
				INTERFACEVENDORID => 'RXHUB',
				SETTING => 'VERIFYMEDICATIONHISTORY',
				PATIENTID => $patientid,
				CHARTID => $chartid,
			})

=> my $consentmodel = GetConsentModel($dbh, {
		INTERFACEVENDORID => $args->{INTERFACEVENDORID},
		SETTING => $args->{SETTING},
		CONTEXTID => $args->{CONTEXTID},
	});

=> 			my $consentcount = 0;
			foreach my $chartid (@chartids) {
				$consentcount += IsPatientConsenting($dbh, {
					INTERFACEVENDORID => $args->{INTERFACEVENDORID},
					SETTING => $args->{SETTING},
					PATIENTID => $args->{PATIENTID},
					CHARTID => $chartid,
				});
			}

=> $args->{CHARTID} = BusCall::Chart::GetChartID($dbh, {
				PATIENTID => $args->{PATIENTID},
				DEPARTMENTID => $args->{DEPARTMENTID},
			});

```

## Notes
- Any important details or variations
- Common parameters or options

## Example
```bash
# Concrete example with real values
```

---

## Tags
`tag1` `tag2` `category`
