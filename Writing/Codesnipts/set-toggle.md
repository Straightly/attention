# Set Toggle

## Description
Set feature toggle state for a specific context and environment

## Command/Code
```bash
$P4_HOME/intranet/scripts/quick_toggle.py --name [TOGGLE_NAME] --contexts [CONTEXT_ID] --state [0|1] --env [ENVIRONMENT]
```

## Notes
- `--name`: Toggle identifier (e.g., CLAP-11844_EI_MEDICATIONREQUEST)
- `--contexts`: Context ID number
- `--state`: 0 (off) or 1 (on)
- `--env`: Environment name (e.g., db-dtest)

## Example
```bash
$P4_HOME/intranet/scripts/quick_toggle.py --name CLAP-11844_EI_MEDICATIONREQUEST --contexts 432 --state 1 --env db-dtest
```

---

## Tags
`p4` `toggle` `feature-flag` `deployment`
