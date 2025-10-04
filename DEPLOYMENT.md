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
Create a `.htaccess` file in public_html with this content:

```apache
RewriteEngine On
RewriteBase /

# Handle Angular and React Router
RewriteRule ^(?!.*\.).*$ /index.html [L]

# Handle files with extensions normally
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

### 5. Common Issues:
- **Blank page**: Usually missing .htaccess file
- **404 errors**: Environment variables not set
- **CSS not loading**: Wrong base path configuration

### 6. Testing:
- Test all routes work
- Test authentication
- Check browser console for errors
