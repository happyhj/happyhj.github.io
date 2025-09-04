# Google Analytics Setup Instructions

## 1. Create Google Analytics Account
1. Go to [Google Analytics](https://analytics.google.com)
2. Sign in with your Google account
3. Click "Start measuring" or "Create Account"

## 2. Set up Property
1. Account name: "Hee Jae Kim Portfolio" (or your preference)
2. Property name: "happyhj.github.io"
3. Time zone: Select your timezone
4. Currency: Select your currency

## 3. Configure Data Stream
1. Choose "Web" platform
2. Website URL: `https://happyhj.github.io`
3. Stream name: "Portfolio Website"

## 4. Get Measurement ID
1. After creating the data stream, you'll get a Measurement ID
2. It looks like: `G-XXXXXXXXXX`
3. Copy this ID

## 5. Update the Website
Replace `GA_MEASUREMENT_ID` in `index.html` (lines 10 and 15) with your actual Measurement ID:

```html
<!-- Before -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'GA_MEASUREMENT_ID');
</script>

<!-- After (example) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-ABC123DEF4"></script>
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-ABC123DEF4');
</script>
```

## 6. Test the Setup
1. Deploy your changes to GitHub Pages
2. Visit your website: `https://happyhj.github.io`
3. In Google Analytics, go to Reports > Realtime
4. You should see your visit appear within a few minutes

## 7. Additional Tracking (Optional)
You can add custom event tracking for:
- Project card clicks
- Contact link clicks
- Button interactions

Example:
```javascript
// Track project card clicks
document.querySelectorAll('.project-card__links a').forEach(link => {
    link.addEventListener('click', function() {
        gtag('event', 'project_click', {
            'project_name': this.closest('.project-card').querySelector('.project-card__title').textContent,
            'link_type': this.textContent
        });
    });
});
```

## Important Notes
- Don't commit your actual Measurement ID to public repositories if privacy is a concern
- You can use environment variables or separate config files for sensitive data
- GA4 data appears with some delay (up to 24 hours for some reports)