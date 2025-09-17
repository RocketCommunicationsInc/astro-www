# Feedback Widget Web Component

A standalone, zero-dependency web component for collecting user feedback with declarative Shadow DOM support.

## Features

- 🎯 **Zero Dependencies** - Pure HTML/CSS/JavaScript
- 🔒 **Fully Encapsulated** - Shadow DOM isolation
- 🎨 **Themeable** - Light/dark themes with CSS custom properties
- 📱 **Responsive** - Works on all screen sizes
- ♿ **Accessible** - Keyboard navigation and ARIA labels
- 🚀 **Declarative Shadow DOM** - Modern web standards with automatic polyfill
- 📡 **Flexible Integration** - API endpoint or event-only mode
- 🎭 **Customizable** - Attributes, slots, and CSS variables

## Quick Start

```html
<!DOCTYPE html>
<html>
<head>
    <title>My Page</title>
</head>
<body>
    <!-- Include the component -->
    <script src="feedback-widget.html" type="module"></script>
    
    <!-- Use the widget -->
    <feedback-widget 
        api-endpoint="https://your-api.com/feedback"
        current-url="/current-page">
    </feedback-widget>
</body>
</html>
```

## Installation

### Option 1: Direct Include
Download `feedback-widget.html` and include it in your project:

```html
<script src="path/to/feedback-widget.html" type="module"></script>
```

### Option 2: Inline
Copy the entire component code directly into your HTML page.

### Option 3: CDN
```html
<script src="https://cdn.jsdelivr.net/gh/yourusername/feedback-widget/feedback-widget.html" type="module"></script>
```

## Usage

### Basic Usage
```html
<feedback-widget 
    api-endpoint="https://api.example.com/feedback"
    current-url="/page-path">
</feedback-widget>
```

### Custom Text
```html
<feedback-widget 
    title="How was this article?"
    description="Your feedback helps us improve"
    secondary-button-text="Reset"
    current-url="/article">
</feedback-widget>
```

### Dark Theme
```html
<feedback-widget 
    theme="dark"
    current-url="/page">
</feedback-widget>
```

### Event-Only Mode (No API)
```html
<feedback-widget 
    current-url="/page"
    id="my-widget">
</feedback-widget>

<script>
document.getElementById('my-widget').addEventListener('feedback-submitted', (e) => {
    console.log('Feedback:', e.detail);
    // Handle feedback data yourself
});
</script>
```

### Using Slots
```html
<feedback-widget current-url="/page">
    <span slot="title">Rate Our <strong>Service</strong></span>
    <span slot="description">How was your experience?</span>
    <span slot="secondary-button">Cancel</span>
</feedback-widget>
```

## Attributes

| Attribute | Description | Default |
|-----------|-------------|---------|
| `api-endpoint` | URL to POST feedback data | None (event-only mode) |
| `current-url` | Current page URL for tracking | `window.location.pathname` |
| `theme` | Color theme (`light` or `dark`) | `light` |
| `title` | Widget title text | "Help us improve" |
| `description` | Description text | "Please rate your experience:" |
| `secondary-button-text` | Clear button text | "Clear" |

## Events

### feedback-submitted
Fired when feedback is successfully submitted.

```javascript
widget.addEventListener('feedback-submitted', (event) => {
    const { feedback, thumbUp, thumbDown, email, pageURL } = event.detail;
});
```

### feedback-error
Fired when submission fails.

```javascript
widget.addEventListener('feedback-error', (event) => {
    console.error('Error:', event.detail.error);
});
```

## CSS Customization

The widget exposes CSS custom properties for theming:

```css
feedback-widget {
    --widget-primary: #ffffff;
    --widget-primary-text: #1a1a1a;
    --widget-secondary: #005a8f;
    --widget-secondary-light: #e6f2f8;
    --widget-accent: #ff7a45;
    --widget-success: #10b981;
    --widget-error: #ef4444;
    --widget-border: #d1d5db;
    --widget-focus: #3b82f6;
    --widget-radius: 4px;
}
```

## API Data Format

When using an API endpoint, the widget POSTs JSON data:

```json
{
    "feedback": "User's text feedback",
    "thumbUp": true,
    "thumbDown": false,
    "receiveResponse": false,
    "email": "user@example.com",
    "pageURL": "/current-page"
}
```

## Browser Support

- ✅ Chrome 90+
- ✅ Edge 90+
- ✅ Safari 16.4+
- ✅ Firefox 123+
- ✅ Older browsers (with automatic polyfill)

## Declarative Shadow DOM

This component uses the modern Declarative Shadow DOM standard:

```html
<template shadowrootmode="open">
    <!-- Shadow DOM content -->
</template>
```

The component includes an automatic polyfill for browsers that don't yet support this feature natively.

## Advanced Integration

### Programmatic Control
```javascript
const widget = document.querySelector('feedback-widget');

// Update attributes
widget.setAttribute('theme', 'dark');
widget.setAttribute('title', 'New Title');

// Listen for events
widget.addEventListener('feedback-submitted', handleFeedback);
```

### Framework Integration

**React:**
```jsx
import { useEffect, useRef } from 'react';

function FeedbackComponent() {
    const widgetRef = useRef();
    
    useEffect(() => {
        // Load the web component
        import('./feedback-widget.html');
        
        // Add event listener
        const handleFeedback = (e) => console.log(e.detail);
        widgetRef.current?.addEventListener('feedback-submitted', handleFeedback);
        
        return () => {
            widgetRef.current?.removeEventListener('feedback-submitted', handleFeedback);
        };
    }, []);
    
    return <feedback-widget ref={widgetRef} current-url="/page" />;
}
```

**Vue:**
```vue
<template>
    <feedback-widget 
        :current-url="currentPath"
        @feedback-submitted="handleFeedback">
    </feedback-widget>
</template>

<script>
export default {
    mounted() {
        import('./feedback-widget.html');
    },
    methods: {
        handleFeedback(event) {
            console.log(event.detail);
        }
    }
}
</script>
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.