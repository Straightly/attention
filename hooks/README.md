# Git Hooks for Journal Tracking

This directory contains git hooks that can be installed to help maintain the journal.

## Installation

Run the install script:

```bash
./hooks/install.sh
```

Or manually copy:

```bash
cp hooks/pre-commit .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit
```

## Available Hooks

### pre-commit

Ensures `journal.md` is updated before committing.

**How it works:**
1. ✅ Passes if `journal.md` is staged in the commit
2. ✅ Passes if `journal.md` contains today's date
3. ⚠️ Prompts you if neither condition is met

**Usage:**
```bash
# Normal workflow - hook passes automatically
git add journal.md
git commit -m "Your commit message"

# Bypass if needed
git commit --no-verify -m "Your commit message"
```

## Why hooks/ directory?

Git's `.git/hooks/` directory is not version controlled, so we keep the source hooks here in `hooks/` and install them as needed. This allows:

- 📦 Version control of hooks
- 🔄 Easy sharing across machines
- 🔧 Simple updates and modifications

## Setup on New Machine

After cloning the repo, run:

```bash
./hooks/install.sh
```

This will copy all hooks to `.git/hooks/` and make them executable.
