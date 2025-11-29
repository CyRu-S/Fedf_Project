# Troubleshooting GitHub Push Issues

If you are unable to push your code to GitHub, here are the most common reasons and solutions.

## 1. Check the Error Message
Run `git push` in your terminal and look at the error message.

## 2. Common Scenarios

### Scenario A: "Permission denied" or Authentication failed
GitHub no longer accepts passwords for command line access. You must use a **Personal Access Token** or **SSH key**.

**Solution:**
1. Go to GitHub Settings > Developer Settings > Personal access tokens > Tokens (classic).
2. Generate a new token with `repo` permissions.
3. Copy the token.
4. When asked for a password in the terminal, paste this token.

### Scenario B: "Updates were rejected because the remote contains work that you do not have locally"
This happens if someone else (or you from another computer) pushed changes to the repository.

**Solution:**
You need to pull the changes first.
```bash
git pull origin main
# Fix any merge conflicts if they happen
git push origin main
```

### Scenario C: "fatal: 'origin' does not appear to be a git repository"
Your local folder isn't connected to a GitHub repository yet.

**Solution:**
```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

### Scenario D: Large Files
If you have files larger than 100MB, GitHub will reject the push.

**Solution:**
Remove the large file from git history or use Git LFS.

## 3. Basic Git Workflow
Ensure you have committed your changes before pushing:

```bash
git status          # Check which files are changed
git add .           # Stage all changes
git commit -m "Fix layout and update profile" # Save changes
git push origin main # Send to GitHub
```