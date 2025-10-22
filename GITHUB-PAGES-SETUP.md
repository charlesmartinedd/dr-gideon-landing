# GitHub Pages Deployment - Dr. Gideon Landing Page

## ✅ Files Ready for Deployment

Your site is committed to Git and ready to deploy! All files are staged at:
```
C:\Users\MarieLexisDad\pai\Projects\dr-giddeon-landing
```

## 🚀 Deploy to GitHub Pages (5 Minutes)

### Step 1: Create GitHub Repository

1. Go to: https://github.com/new
2. **Repository name**: `dr-gideon-landing` (or your preferred name)
3. **Description**: Professional landing page for Dr. Gideon's AI training sessions
4. **Visibility**: ✅ Public (required for free GitHub Pages)
5. **DO NOT** initialize with README, .gitignore, or license (we already have these)
6. Click **"Create repository"**

### Step 2: Connect Your Local Repository to GitHub

After creating the repo, GitHub will show you commands. Run these in your terminal:

```bash
cd Projects/dr-giddeon-landing
git remote add origin https://github.com/YOUR_USERNAME/dr-gideon-landing.git
git branch -M main
git push -u origin main
```

**Replace `YOUR_USERNAME` with your actual GitHub username!**

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **"Settings"** tab
3. Scroll down to **"Pages"** in the left sidebar
4. Under **"Source"**, select:
   - Branch: `main`
   - Folder: `/ (root)`
5. Click **"Save"**
6. Wait 1-2 minutes for deployment

### Step 4: Update FormSubmit Redirect URL

Once your site is live, you need to update the form redirect:

1. GitHub Pages URL will be: `https://YOUR_USERNAME.github.io/dr-gideon-landing/`
2. Open `index.html` in an editor
3. Find line 50: `<input type="hidden" name="_next" value="https://yourdomain.com/index.html#resources">`
4. Replace with: `<input type="hidden" name="_next" value="https://YOUR_USERNAME.github.io/dr-gideon-landing/#resources">`
5. Save and commit:
   ```bash
   git add index.html
   git commit -m "Update FormSubmit redirect URL for GitHub Pages"
   git push
   ```

## 📧 FormSubmit First-Time Setup

**IMPORTANT**: The first time someone submits the form, FormSubmit will send a **confirmation email** to williamgideonjr@gmail.com.

**You MUST click the confirmation link** to activate form submissions!

After that, every teacher submission will arrive automatically at williamgideonjr@gmail.com.

## 🎉 Your Site Will Be Live At:

```
https://YOUR_USERNAME.github.io/dr-gideon-landing/
```

## 🔧 Custom Domain (Optional)

Want to use a custom domain like `aitraining.drgideon.com`?

1. Go to repository **Settings** → **Pages**
2. Under **"Custom domain"**, enter your domain
3. Follow the DNS configuration instructions
4. Update the FormSubmit `_next` URL to match your custom domain

## 🐛 Troubleshooting

**Site not loading?**
- Wait 2-3 minutes after enabling GitHub Pages
- Check Settings → Pages shows "Your site is live at..."
- Verify branch is set to `main` and folder is `/ (root)`

**Form not working?**
- Check that you confirmed the FormSubmit activation email
- Verify the `_next` URL matches your actual GitHub Pages URL
- Check browser console for errors (F12)

**PDF not downloading?**
- Make sure `AI Cheatsheet for educators for CAAASA.pdf` is in the root directory
- Check that it's committed to Git: `git ls-files | grep pdf`

## 📊 View Your Emails

All form submissions will arrive at: **williamgideonjr@gmail.com**

Email subject line: "New Teacher Registration - Dr. Gideon AI Training"

---

Need help? The site is ready to go - just follow these steps!
