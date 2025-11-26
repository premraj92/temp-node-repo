# Git Multi-Account Management Guide
*A Beginner's Guide to Managing Multiple Git Accounts*

---

## 1. Understanding Git Accounts & Identity

### 📚 Theory & Concepts

Git doesn't have "accounts" in the traditional sense. Instead, Git uses **identity information** (name and email) to label your commits. When you push to a remote repository (like GitHub, GitLab, etc.), **authentication** happens separately from your commit identity.

**Key Concepts:**
- **Commit Identity**: Your name and email stored in commits (visible in git history)
- **Authentication**: Proving you have permission to push/pull (SSH keys, tokens, passwords)
- **Configuration Levels**: Git has 3 levels of configuration:
  - **System**: Applies to all users on the machine (`/etc/gitconfig`)
  - **Global**: Applies to all repos for your user account (`~/.gitconfig`)
  - **Local**: Applies only to a specific repository (`.git/config` in repo)

**How Multiple Accounts Work:**
When you have work and personal accounts, you need to manage:
1. Different commit identities (work email vs personal email)
2. Different authentication credentials (different SSH keys or tokens)

Git configurations follow a **precedence order**: Local > Global > System
This means local settings override global ones!

### 💻 Practical Commands

```bash
# View all Git configuration and where it's set from
git config --list --show-origin

# View configuration at specific levels
git config --system --list    # System level (rarely used)
git config --global --list    # Global level (your default)
git config --local --list     # Local level (current repo only)

# See where a specific config value comes from
git config --show-origin user.email
```

---

## 2. Finding Your Current Git Identity

### 📚 Theory & Concepts

Before making any changes, you need to know which identity you're currently using. Remember:
- **Global config** = Your default identity for all new repos
- **Local config** = Identity for the current repo (overrides global)

If a repo doesn't have local configuration, it uses the global configuration.

### 💻 Practical Commands

```bash
# Check which directory you're in
pwd

# Check global Git identity (your default for all repos)
git config --global user.name
git config --global user.email

# Check current repo's identity (if you're in a Git repo)
git config user.name
git config user.email
# Note: This shows the EFFECTIVE value (local if set, otherwise global)

# Check if current repo has LOCAL identity set (overriding global)
git config --local user.name
git config --local user.email
# Note: This shows ONLY local values, returns nothing if not set

# See all config for current repo with sources
git config --list --show-origin | grep user

# Quick way to see everything relevant
echo "Global Identity:"
git config --global user.name
git config --global user.email
echo ""
echo "Current Repo Identity:"
git config --local user.name
git config --local user.email
```

---

## 3. Setting Up Multiple Git Accounts (Work Primary, Personal Secondary)

### 📚 Theory & Concepts

**The Strategy:**
1. Keep your **work account as global** (default for all repos)
2. For **personal projects**, override the global config with **local config**
3. Set up **separate authentication** for each account

**Two Authentication Methods:**

**A. HTTPS with Personal Access Tokens (PATs)**
- Simpler for beginners
- Use credential managers to store tokens
- Can be account-specific via URLs

**B. SSH with Multiple Keys**
- More secure and convenient once set up
- Use different SSH keys for different accounts
- Configure SSH to use the right key automatically

### 💻 Practical Commands

#### Step 1: Set Your Work Account as Global Default

```bash
# Set work identity globally (this becomes your default)
git config --global user.name "Your Work Name"
git config --global user.email "your.email@company.com"

# Verify it's set
git config --global --list | grep user
```

#### Step 2: Set Up Authentication

**Option A: HTTPS with Credential Manager (Easier for Beginners)**

```bash
# Enable credential manager (usually already enabled on Windows)
git config --global credential.helper manager-core

# When you push to GitHub/GitLab, it will prompt for credentials
# For work repos: Use work GitHub username + Personal Access Token
# For personal repos: Use personal GitHub username + Personal Access Token
```

**To create a Personal Access Token:**
1. Go to GitHub: Settings → Developer Settings → Personal Access Tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Give it a descriptive name (e.g., "Personal Projects - Laptop")
4. Select scopes: At minimum check `repo` (full control of private repositories)
5. Click "Generate token"
6. **COPY THE TOKEN** (you won't see it again!)
7. Use this token as your password when Git prompts you

**Option B: SSH with Multiple Keys (More Advanced)**

```bash
# Generate SSH key for work (if not already done)
ssh-keygen -t ed25519 -C "your.email@company.com" -f ~/.ssh/id_ed25519_work

# Generate SSH key for personal projects
ssh-keygen -t ed25519 -C "your.personal@email.com" -f ~/.ssh/id_ed25519_personal

# Start SSH agent
eval "$(ssh-agent -s)"

# Add both keys to SSH agent
ssh-add ~/.ssh/id_ed25519_work
ssh-add ~/.ssh/id_ed25519_personal

# Create/edit SSH config file
notepad ~/.ssh/config
# Or on Linux/Mac: nano ~/.ssh/config
```

**Add this to your `~/.ssh/config` file:**

```
# Work GitHub account
Host github.com
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_ed25519_work
    IdentitiesOnly yes

# Personal GitHub account
Host github-personal
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_ed25519_personal
    IdentitiesOnly yes
```

**Add SSH keys to GitHub:**
1. Copy your public key: `cat ~/.ssh/id_ed25519_personal.pub`
2. Go to GitHub → Settings → SSH and GPG keys → New SSH key
3. Paste the key and save
4. Repeat for work account with work key

**Test your SSH connections:**
```bash
# Test work account
ssh -T git@github.com

# Test personal account
ssh -T git@github-personal
```

---

## 4. Creating & Pushing Personal Projects (Without Messing Up Global Config)

### 📚 Theory & Concepts

**The Workflow:**
1. Initialize Git in your project folder
2. Set **local** identity (overrides global work identity)
3. Add a remote with appropriate authentication
4. Commit and push

**Key Principle:** Local configuration is stored in `.git/config` inside your repo and ONLY affects that repo. Your global config remains untouched!

### 💻 Practical Commands

#### Scenario A: Brand New Local Project → Push to New GitHub Repo

```bash
# Navigate to your project folder
cd /path/to/your/personal/project

# Initialize Git repository
git init

# Set personal identity for THIS repo only (overrides global)
git config user.name "Your Personal Name"
git config user.email "your.personal@email.com"

# Verify local config is set
git config --local --list | grep user

# Create a .gitignore file (optional but recommended)
echo "node_modules/" >> .gitignore
echo ".env" >> .gitignore

# Add your files
git add .

# Make first commit
git commit -m "Initial commit"

# Create a new repo on GitHub first (via web interface)
# Then add the remote URL

# If using HTTPS:
git remote add origin https://github.com/your-personal-username/repo-name.git

# If using SSH with config:
git remote add origin git@github-personal:your-personal-username/repo-name.git

# Push to GitHub
git branch -M main  # Rename branch to main if needed
git push -u origin main

# If using HTTPS, you'll be prompted for credentials:
# Username: your-personal-username
# Password: your Personal Access Token (NOT your GitHub password)
```

#### Scenario B: Clone Existing Personal Repo → Work On It

```bash
# Clone the repo
# For HTTPS:
git clone https://github.com/your-personal-username/repo-name.git

# For SSH with config:
git clone git@github-personal:your-personal-username/repo-name.git

# Navigate into the repo
cd repo-name

# Set personal identity (IMPORTANT!)
git config user.name "Your Personal Name"
git config user.email "your.personal@email.com"

# Verify
git config --local --list | grep user

# Now work normally
git add .
git commit -m "Your changes"
git push
```

#### Scenario C: Link Existing Local Folder to Personal Remote

```bash
# You already have a folder with code
cd /path/to/existing/folder

# Initialize Git (if not already initialized)
git init

# Set personal identity
git config user.name "Your Personal Name"
git config user.email "your.personal@email.com"

# Add files and commit
git add .
git commit -m "Initial commit"

# Create empty repo on GitHub (DO NOT initialize with README)
# Then add remote
git remote add origin https://github.com/your-personal-username/repo-name.git
# OR with SSH:
git remote add origin git@github-personal:your-personal-username/repo-name.git

# Push
git branch -M main
git push -u origin main
```

---

## 5. The Superpower: Quick Setup on Any Machine

### 📚 Theory & Concepts

To work on any machine without disrupting existing setup:
1. Use **local config only** - never change global
2. Use **HTTPS with explicit credentials** OR **temporary SSH key**
3. Keep everything isolated to the project folder

### 💻 Practical Commands

#### One-Time Setup Script for Personal Projects

Create this as a script or run manually:

```bash
# Save this as setup-personal-repo.sh (Linux/Mac) or setup-personal-repo.bat (Windows)

#!/bin/bash
# Navigate to your project
cd /path/to/project

# Initialize if needed
if [ ! -d .git ]; then
    git init
fi

# Set local identity (never touches global config)
git config user.name "Your Personal Name"
git config user.email "your.personal@email.com"

# Show what's configured
echo "Local Git identity set:"
git config user.name
git config user.email

echo ""
echo "Global identity remains:"
git config --global user.name
git config --global user.email

# Optional: Set up remote if not exists
if ! git remote | grep -q origin; then
    read -p "Enter remote URL: " remote_url
    git remote add origin "$remote_url"
fi

echo ""
echo "✅ Personal Git setup complete! You can now commit and push."
```

#### Quick Command Checklist

```bash
# 1. Check current global config (don't change it!)
git config --global --list | grep user

# 2. In your project folder, set local identity
git config user.name "Personal Name"
git config user.email "personal@email.com"

# 3. Verify you didn't mess up global
git config --global user.email  # Should still be work email

# 4. Verify local is set correctly
git config user.email  # Should be personal email

# 5. Add remote with authentication
git remote add origin <url>

# 6. Commit and push
git add .
git commit -m "message"
git push -u origin main
```

---

## 6. Troubleshooting & Tips

### Common Issues

**Issue 1: Wrong email in commits**
```bash
# Check last commit author
git log -1 --pretty=format:"%an <%ae>"

# If wrong, you forgot to set local config!
git config user.name "Correct Name"
git config user.email "correct@email.com"

# Amend last commit with new author
git commit --amend --reset-author --no-edit
```

**Issue 2: Authentication failed**
```bash
# For HTTPS: Check which credentials are stored
git config --list | grep credential

# Clear cached credentials (Windows)
# Control Panel → Credential Manager → Windows Credentials
# Remove git:https://github.com entries

# Then try push again, enter correct credentials when prompted
```

**Issue 3: Accidentally pushed with wrong identity**
```bash
# Change author of last commit
git commit --amend --author="Personal Name <personal@email.com>"

# Force push (be careful!)
git push --force
```

### Best Practices

1. **Always check identity before first commit in a new repo**
   ```bash
   git config user.email
   ```

2. **Create a Git template for personal projects**
   ```bash
   # Create template directory
   mkdir -p ~/.git-templates/personal
   cd ~/.git-templates/personal
   
   # Create config
   cat > config << EOF
   [user]
       name = Your Personal Name
       email = your.personal@email.com
   EOF
   
   # Use template when creating repos
   git init --template=~/.git-templates/personal
   ```

3. **Use Git aliases for quick checks**
   ```bash
   # Add to global config for convenience
   git config --global alias.whoami "!git config user.name && git config user.email"
   
   # Now just run: git whoami
   ```

4. **Create a pre-commit hook to verify identity**
   ```bash
   # In any repo: .git/hooks/pre-commit
   #!/bin/sh
   EMAIL=$(git config user.email)
   if [[ $EMAIL == *"@company.com"* ]]; then
       echo "⚠️  Warning: Using work email in this repo!"
       echo "Current email: $EMAIL"
       read -p "Continue anyway? (y/n) " -n 1 -r
       echo
       if [[ ! $REPLY =~ ^[Yy]$ ]]; then
           exit 1
       fi
   fi
   ```

---

## Quick Reference Card

### Essential Commands

| Task | Command |
|------|---------|
| See global identity | `git config --global user.name && git config --global user.email` |
| See current repo identity | `git config user.name && git config user.email` |
| Set local identity | `git config user.name "Name" && git config user.email "email"` |
| Check where config comes from | `git config --show-origin user.email` |
| See last commit author | `git log -1 --pretty="%an <%ae>"` |
| List all remotes | `git remote -v` |
| Change remote URL | `git remote set-url origin <new-url>` |

### The Golden Rule

> **Local config overrides global config. Set local identity in every personal project, and your global work config stays untouched!**

---

## Summary: Your Workflow

1. **Keep work account global** ✓
2. **For each personal project:**
   ```bash
   cd project-folder
   git init
   git config user.name "Personal"
   git config user.email "personal@email.com"
   git remote add origin <personal-repo-url>
   git add .
   git commit -m "Initial commit"
   git push -u origin main
   ```
3. **Verify you didn't mess up global:**
   ```bash
   git config --global user.email  # Should still be work email
   ```

That's it! You now have the superpower to work with multiple Git identities seamlessly! 🚀
