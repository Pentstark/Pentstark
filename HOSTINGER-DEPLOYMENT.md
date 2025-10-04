# Hostinger Git Deployment Configuration

## For Hostinger Git Auto-Deployment

This project is configured for Hostinger's Git auto-deployment feature.

### Setup Instructions:

1. **In Hostinger Control Panel:**
   - Go to Website → Git Deployment
   - Connect your GitHub repository: `https://github.com/Pentstark/Pentstark`
   - Set branch: `main`
   - Set deployment path: `public_html`
   - Set build command: `npm install && npm run build`
   - Set publish directory: `dist`

2. **Environment Variables in Hostinger:**
   - Add environment variable: `VITE_CLERK_PUBLISHABLE_KEY`
   - Value: Your production Clerk key (starts with `pk_live_...`)

3. **Important Notes:**
   - The `dist` folder is included in git for Hostinger deployment
   - `.env.local` and `.env.production` are excluded for security
   - Hostinger will automatically rebuild on every git push

### File Structure After Deployment:
```
public_html/
├── index.html (from dist/)
├── assets/ (from dist/assets/)
├── .htaccess (for React Router)
└── other dist files...
```

### Deployment Process:
1. Run `npm run build` locally
2. Commit and push to GitHub
3. Hostinger automatically pulls and deploys
4. Site is live!

### Troubleshooting:
- Check Hostinger deployment logs
- Verify environment variables are set
- Ensure .htaccess is properly configured
- Test all routes work correctly
