# Hostinger Deployment Instructions

## Steps to Deploy on Hostinger:

### 1. Build the Project Locally
```bash
npm run build
```

### 2. Upload ONLY the dist folder contents
- Go to your Hostinger File Manager
- Navigate to public_html folder
- Upload ALL contents from the `dist` folder (not the dist folder itself)
- Your structure should look like:
  ```
  public_html/
  ├── index.html
  ├── assets/
  │   ├── index-xxxxx.css
  │   └── index-xxxxx.js
  └── other files...
  ```

### 3. Set Environment Variables in Hostinger
- Go to Hostinger Control Panel
- Find "Environment Variables" or "Node.js Settings"
- Add: VITE_CLERK_PUBLISHABLE_KEY=pk_live_YOUR_PRODUCTION_KEY

### 4. Create .htaccess for Single Page Application
Create a `.htaccess` file in `public_html` with this content (this repo includes one under `public/.htaccess` which gets copied to `dist/.htaccess`):

```apache
RewriteEngine On
RewriteBase /

# Don't rewrite real files or directories
RewriteCond %{REQUEST_FILENAME} -f [OR]
RewriteCond %{REQUEST_FILENAME} -d
RewriteRule ^ - [L]

# Don't rewrite built assets (js, css, images, fonts)
RewriteCond %{REQUEST_URI} \.(?:js|mjs|css|map|png|jpe?g|gif|svg|webp|ico|woff2?|ttf|eot)$ [NC]
RewriteRule ^ - [L]

# Single Page App fallback
RewriteRule . /index.html [L]
```

### 5. Common Issues:
- **Failed to load module script / MIME type text/html**: Your assets are being rewritten to `index.html`. Ensure `.htaccess` matches the above and that Vite `base` is set to `/` (see `vite.config.js`).
- **Blank page**: Usually missing `.htaccess` file.
- **404 errors**: Environment variables not set.
- **CSS/JS not loading on deep routes**: Make sure `vite.config.js` has `base: '/'` so assets resolve from site root.

### 6. Testing:
- Test all routes work
- Test authentication
- Check browser console for errors
 - Open a chunk URL directly (e.g. `/assets/index-xxxxx.js`) and verify it returns JavaScript, not HTML
