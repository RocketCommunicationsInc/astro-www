---
title: Using MDX
description: Guide to using MDX files with Astro UXDS site
layout: project:layouts/docs/docs-layout.astro
---

# Using MDX in Astro UXDS

This guide explains how to use MDX files in the Astro UXDS documentation site.

## What is MDX?

MDX is an extension of Markdown that allows you to use JSX (JavaScript and XML) directly in your Markdown documents. This means you can:

- Import and use React components
- Define and use custom components within your content
- Use JavaScript expressions
- Create interactive content
- Use Web Components

## Component Integration

The site is configured to use MDX with both React components and standard W3C Web Components:

### React Components

1. Create React components in separate files (`.jsx` or `.tsx`)
2. Import and use those components in your MDX files
3. Use React hooks and state in your components

### Web Components

We support two approaches for using Web Components in MDX:

#### 1. React Wrapper Approach (Simpler)
- Create W3C standard Web Components in separate files
- Create a React wrapper for client-side only usage
- Use the wrapper component in your MDX content for safe server-side rendering

#### 2. Declarative Shadow DOM Approach (Advanced)
- Create SSR-compatible Web Components with declarative shadow DOM support
- Use the `set:html` directive with a static `renderToString()` method
- Apply the declarative shadow DOM polyfill for browser support

## File Extensions and Structure

- MDX files use the `.mdx` extension rather than the `.md` extension used by standard Markdown files
- Both `.md` and `.mdx` files can coexist in the same directories
- MDX files follow the same routing conventions as Markdown files (they become pages at the same URL path)
- React components should be placed in the `src/components/` directory with `.jsx` or `.tsx` extensions

## Frontmatter

Just like regular Markdown files, MDX files support frontmatter. Here's an example:

```yaml
---
title: My MDX Page
description: A description of my MDX page
layout: project:layouts/docs/docs-layout.astro
---
```

The following frontmatter properties are supported:

- `title`: The title of the page
- `description`: A brief description of the page content
- `layout`: The layout to use for the page (same as Markdown files)
- `draft`: Set to `true` for draft pages (optional)
- `status`: Status indicator for the page (optional)

## Creating Interactive Components

Here's an example of how to define and use a simple interactive component in MDX:

```jsx
import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}

<Counter />
```

## Importing Components

You can import components from other files:

```jsx
import MyComponent from '../components/MyComponent';

<MyComponent prop="value" />
```

## Mixing Markdown and JSX

You can freely mix Markdown and JSX:

```mdx
# My Title

This is regular **Markdown** content.

<div className="custom-container">
  This is JSX content.
  
  ## This is still JSX
  
  Because it's inside a JSX element.
</div>

Back to regular Markdown.
```

## Examples

We've created several example pages to help you understand how to use MDX effectively:

1. [Basic MDX Example](/getting-started/mdx-example/) - A simple example showing basic MDX functionality with inline components.

2. [MDX with React](/getting-started/mdx-with-react/) - A more advanced example showing how to import and use React components with state.

3. [MDX with Web Components](/getting-started/mdx-web-components/) - An example demonstrating how to use W3C standard Web Components with React wrappers in MDX.

4. [MDX with SSR Web Components](/getting-started/mdx-ssr-components/) - An advanced example showing how to use declarative shadow DOM for SSR-compatible Web Components without React wrappers.

For a comprehensive overview of all MDX capabilities with visual examples, see the [MDX Capabilities](/getting-started/mdx-capabilities/) page.

### Creating a React Component for MDX

Here's an example of creating a React component in a separate file that can be imported into MDX:

```jsx
// src/components/MyComponent.jsx
import React, { useState } from 'react';

export function MyComponent({ initialValue = 0 }) {
  const [value, setValue] = useState(initialValue);
  
  return (
    <div>
      <p>Current value: {value}</p>
      <button onClick={() => setValue(value + 1)}>Increment</button>
    </div>
  );
}
```

### Using the React Component in MDX

Then import and use it in your MDX file:

```mdx
---
title: My Page
layout: project:layouts/docs/docs-layout.astro
---

import { MyComponent } from 'project:components/MyComponent.jsx';

# My Page with React Component

Here's my interactive component:

<MyComponent initialValue={5} />
```

### Creating a Web Component for MDX

First, create a standard Web Component:

```js
// src/components/info-card.js
export class InfoCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  get title() {
    return this.getAttribute('title') || 'Information';
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .card {
          border: 1px solid #ddd;
          border-radius: 4px;
          overflow: hidden;
        }
        .card-header {
          background-color: #2196F3;
          color: white;
          padding: 0.8rem;
        }
        .card-body {
          padding: 1rem;
        }
      </style>
      <div class="card">
        <div class="card-header">${this.title}</div>
        <div class="card-body">
          <slot></slot>
        </div>
      </div>
    `;
  }
}
```

### Creating a Client-side Wrapper

Then create a React wrapper component for client-side only usage:

```jsx
// src/components/ClientOnlyInfoCard.jsx
import React, { useEffect, useRef, useState } from 'react';

export function ClientOnlyInfoCard(props) {
  const { title, type, children, ...rest } = props;
  const ref = useRef(null);
  const [isMounted, setIsMounted] = useState(false);

  // Only run this on the client side
  useEffect(() => {
    // Mark component as mounted
    setIsMounted(true);

    // Dynamically import and register the web component
    const registerComponent = async () => {
      if (!customElements.get('info-card')) {
        try {
          const module = await import('./info-card.js');
          customElements.define('info-card', module.InfoCard);
        } catch (err) {
          console.error('Failed to register info-card:', err);
        }
      }
    };
    
    registerComponent();
  }, []);

  // During SSR and first client render, render a placeholder
  if (!isMounted) {
    return (
      <div ref={ref} style={{ border: '1px solid #ddd', padding: '1rem' }} {...rest}>
        <div style={{ fontWeight: 'bold' }}>{title}</div>
        <div>{children}</div>
      </div>
    );
  }

  // After hydration, render the actual web component
  return (
    <info-card ref={ref} title={title} type={type} {...rest}>
      {children}
    </info-card>
  );
}
```

### Using the Web Component in MDX

Then use the client-side wrapper in your MDX file:

```mdx
---
title: My Page
layout: project:layouts/docs/docs-layout.astro
---

import { ClientOnlyInfoCard } from 'project:components/ClientOnlyInfoCard.jsx';

# My Page with Web Component

Here's my custom element:

<ClientOnlyInfoCard title="Hello World">
  This content is inside a web component with shadow DOM!
</ClientOnlyInfoCard>
```

This client-side only approach avoids server-side rendering errors that can occur with web components.

## Advanced: SSR Web Components with Declarative Shadow DOM

For advanced use cases, you can leverage declarative shadow DOM to create SSR-compatible web components:

### Creating an SSR-compatible Web Component

```js
// ssr-card.js
export class SSRCard extends HTMLElement {
  // For use during SSR - generates HTML with declarative shadow DOM
  static renderToString(props = {}) {
    const { title = 'Card Title' } = props;
    
    return `
      <ssr-card title="${title}">
        <template shadowroot="open">
          <style>
            :host { display: block; }
            .card { /* styles */ }
          </style>
          <div class="card">
            <div class="header">${title}</div>
            <div class="content"><slot></slot></div>
          </div>
        </template>
      </ssr-card>
    `;
  }
  
  // Standard web component lifecycle methods
  constructor() {
    super();
    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' });
      this.updateRendering();
    }
  }
  
  // ... other methods
}
```

### Using with `set:html` in MDX

```mdx
---
title: SSR Components
layout: project:layouts/docs/docs-layout.astro
---

import { SSRCard } from '../components/ssr-card.js';
import { polyfillDeclarativeShadowDOM } from '../utils/shadow-dom-polyfill.js';

<script>
  // Optional polyfill for older browsers
  // Modern browsers (Chrome 90+, Safari 16.4+, Firefox 123+) have native support
  polyfillDeclarativeShadowDOM();
  
  // Register the component
  customElements.define('ssr-card', SSRCard);
</script>

{/* Server-side rendered with declarative shadow DOM */}
<div set:html={SSRCard.renderToString({ title: 'Server Rendered' })}>
  This content is rendered by the server with declarative shadow DOM.
</div>

{/* After registration, can be used directly */}
<ssr-card title="Client Rendered">
  This uses the registered component.
</ssr-card>
```

> **Note:** Declarative Shadow DOM is now supported in all modern browsers (Chrome 90+, Safari 16.4+, Firefox 123+), making the polyfill optional for most use cases.

For a complete example, see the [MDX with SSR Web Components](/getting-started/mdx-ssr-components/) example.

## Resources

### MDX Resources
- [Official MDX Documentation](https://mdxjs.com/)
- [Astro MDX Integration](https://docs.astro.build/en/guides/integrations-guide/mdx/)

### React Resources
- [React Documentation](https://react.dev/)
- [Using React with Astro](https://docs.astro.build/en/guides/integrations-guide/react/)

### Web Components Resources
- [Web Components on MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_components)
- [Custom Elements v1](https://developers.google.com/web/fundamentals/web-components/customelements)
- [Shadow DOM v1](https://developers.google.com/web/fundamentals/web-components/shadowdom)
- [Using Web Components with Astro](https://docs.astro.build/en/guides/client-side-scripts/)
- [Declarative Shadow DOM](https://web.dev/declarative-shadow-dom/)
- [Web Components with SSR](https://webkit.org/blog/13851/declarative-shadow-dom/)