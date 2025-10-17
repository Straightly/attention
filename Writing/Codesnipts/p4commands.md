# Perforce (p4) Switch Command

## Description
Switch between different Perforce workspaces/clients without changing directories. The `-Rn` flag creates a new workspace if it doesn't exist and switches to it.

## Command/Code
```bash
# Switch to a workspace, creating it if needed
p4 switch -Rn <workspace_path>

# Switch to an existing workspace
p4 switch <workspace_name>

# List all workspaces
p4 clients

# Show current workspace
p4 client -o
```

## Notes
- `-R` flag creates a new workspace from a stream or template
- `-n` flag specifies the workspace name (often derived from the path)
- The workspace path typically follows the pattern `//depot/branch/path`
- Use `p4 switch -l` to list available workspaces
- Switching workspaces changes the context for all subsequent p4 commands

## Example
```bash
# p4 switch -Rn //anet/tasks/CLAP_filtered/clap_12216
```

---

## Tags
`perforce` `p4` `version-control` `workspace`
