# 📢 BlessedBump Ad Script - Usage Guide

## 🎯 Overview

The `blessedbump-ad.js` file creates beautiful, interactive advertisements that can be embedded on any website. It includes click tracking, analytics, and responsive design.

---

## 🚀 Quick Start

### Step 1: Include the Script

Add this to your HTML page (or the website where you want to show the ad):

```html
<script src="https://blessedbump.in/blessedbump-ad.js"></script>
```

Or if hosting locally:

```html
<script src="blessedbump-ad.js"></script>
```

### Step 2: Add Container

Add a container div where you want the ad to appear:

```html
<div id="blessedbump-ad"></div>
```

### Step 3: Initialize (Optional)

If using auto-init, add the `data-auto-init` attribute:

```html
<div id="blessedbump-ad" data-auto-init="true"></div>
```

Or manually initialize:

```html
<script>
  BlessedBumpAd.init({
    container: 'blessedbump-ad'
  });
</script>
```

---

## 📝 Usage Examples

### Example 1: Basic Auto-Init (Easiest)

```html
<!DOCTYPE html>
<html>
<head>
  <title>My Website</title>
</head>
<body>
  <h1>Welcome to My Site</h1>
  
  <!-- Include ad script -->
  <script src="blessedbump-ad.js"></script>
  
  <!-- Add ad container with auto-init -->
  <div id="blessedbump-ad" data-auto-init="true"></div>
</body>
</html>
```

### Example 2: Custom Configuration

```html
<div id="my-custom-ad"></div>

<script>
  BlessedBumpAd.init({
    container: 'my-custom-ad',
    websiteUrl: 'https://blessedbump.in',
    tagline: 'Your Journey, Your Glow, Your Village',
    primaryColor: '#FF9FB8',
    secondaryColor: '#7C72FF',
    trackClicks: true,
    trackViews: true,
    animation: true
  });
</script>
```

### Example 3: Sidebar Ad

```html
<aside>
  <div id="sidebar-ad" style="max-width: 300px;"></div>
</aside>

<script>
  BlessedBumpAd.init({
    container: 'sidebar-ad',
    minHeight: '250px'
  });
</script>
```

### Example 4: Multiple Ads on Same Page

```html
<!-- Ad 1 -->
<div id="ad-top" data-auto-init="true"></div>

<!-- Ad 2 -->
<div id="ad-sidebar"></div>

<script>
  // Initialize second ad manually
  BlessedBumpAd.init({
    container: 'ad-sidebar'
  });
</script>
```

---

## ⚙️ Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `container` | string | `'blessedbump-ad'` | ID of the container element |
| `websiteUrl` | string | `'https://blessedbump.in'` | Your website URL |
| `tagline` | string | `'Your Journey, Your Glow, Your Village'` | Ad tagline |
| `primaryColor` | string | `'#FF9FB8'` | Primary brand color |
| `secondaryColor` | string | `'#7C72FF'` | Secondary brand color |
| `minHeight` | string | `'200px'` | Minimum ad height |
| `trackClicks` | boolean | `true` | Track click events |
| `trackViews` | boolean | `true` | Track view events |
| `animation` | boolean | `true` | Enable animations |
| `analyticsEndpoint` | string | `null` | Custom analytics endpoint URL |

---

## 📊 Analytics & Tracking

### Automatic Tracking

The script automatically tracks:
- **Views**: When the ad is displayed
- **Clicks**: When users click the ad

### Google Analytics Integration

If Google Analytics (gtag) is available, events are automatically sent:

```javascript
// Automatically sent if gtag is available
gtag('event', 'blessedbump_ad_click', {
  event_category: 'advertisement',
  event_label: window.location.href
});
```

### Custom Analytics Endpoint

To send data to your own analytics server:

```javascript
BlessedBumpAd.init({
  container: 'blessedbump-ad',
  analyticsEndpoint: 'https://your-analytics-server.com/track'
});
```

The script will POST JSON data:
```json
{
  "event": "blessedbump_ad_click",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "url": "https://example.com/page",
  "referrer": "https://google.com"
}
```

### Console Logging

For debugging, events are logged to the browser console:
```
BlessedBump Ad Event: { event: 'blessedbump_ad_view', ... }
```

---

## 🎨 Styling & Customization

### Responsive Design

The ad is fully responsive and adapts to:
- Desktop screens
- Tablets
- Mobile devices

### Custom CSS

You can override styles by targeting the ad classes:

```css
.blessedbump-ad {
  /* Your custom styles */
}

.blessedbump-ad-title {
  /* Custom title styles */
}

.blessedbump-ad-cta {
  /* Custom button styles */
}
```

### Width Control

Control ad width with CSS:

```html
<div id="blessedbump-ad" style="max-width: 300px;"></div>
```

---

## 🔧 Advanced Usage

### Programmatic Control

```javascript
// Initialize ad
BlessedBumpAd.init({
  container: 'my-ad'
});

// Track custom event
BlessedBumpAd.trackEvent('custom_event', {
  customData: 'value'
});
```

### Multiple Instances

```javascript
// Ad 1
BlessedBumpAd.init({
  container: 'ad-1',
  tagline: 'First Ad'
});

// Ad 2
BlessedBumpAd.init({
  container: 'ad-2',
  tagline: 'Second Ad'
});
```

---

## 📱 Platform-Specific Examples

### WordPress

Add to your theme's `footer.php` or use a plugin:

```php
<script src="https://blessedbump.in/blessedbump-ad.js"></script>
<div id="blessedbump-ad" data-auto-init="true"></div>
```

### Blogger

Add to your template:

```html
<script src="https://blessedbump.in/blessedbump-ad.js"></script>
<div id="blessedbump-ad" data-auto-init="true"></div>
```

### Shopify

Add to your theme's liquid file:

```liquid
<script src="https://blessedbump.in/blessedbump-ad.js"></script>
<div id="blessedbump-ad" data-auto-init="true"></div>
```

---

## ✅ Best Practices

1. **Placement**: Place ads in visible but non-intrusive locations
2. **Frequency**: Don't show too many ads on one page
3. **Mobile**: Test on mobile devices
4. **Performance**: Load script asynchronously if possible
5. **Analytics**: Set up tracking to measure performance

### Async Loading

```html
<script src="blessedbump-ad.js" async></script>
```

### Defer Loading

```html
<script src="blessedbump-ad.js" defer></script>
```

---

## 🐛 Troubleshooting

### Ad Not Showing

1. Check container ID matches
2. Verify script is loaded
3. Check browser console for errors
4. Ensure container element exists

### Click Tracking Not Working

1. Verify `trackClicks: true` is set
2. Check browser console for errors
3. Ensure analytics endpoint is accessible (if using)

### Styling Issues

1. Check for CSS conflicts
2. Verify container has proper dimensions
3. Test in different browsers

---

## 📞 Support

For issues or questions:
- Check browser console for errors
- Verify script is loaded correctly
- Test with minimal configuration first

---

## 🎯 Example Files

- `blessedbump-ad.js` - Main ad script
- `ad-example.html` - Live examples
- `AD_SCRIPT_USAGE.md` - This guide

---

**Ready to start advertising!** 🚀

