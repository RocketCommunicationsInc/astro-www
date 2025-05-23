---
title: Global Status Bar
description: The Global Status Bar is a full width view across the top of an application — an area commonly reserved for global status, global command and top-level navigation.
layout: project:layouts/component-docs/component-docs-layout.astro
storybook: components-global-status-bar--default
height: 140px
git: rux-global-status-bar
assets:
  name: Global Status Bar
---

## Interactive Example

::tag{ is=a-playground tag=rux-global-status-bar }

## Appearance and Behavior

The Global Status Bar has four main parts: App Icon, App Title, App State, and Logged-in Username. Additional custom features can be added to the Global Status bar. Suggested elements include Clock, Monitoring Icons, and Buttons.

![Simplest Global Status Bar - Only include the App Title.](/img/components/global-status-bar/global-status-simple.webp 'Simplest Global Status Bar - Only include the App Title.')

![Standard Global Status Bar - App Icon, App Title, App State, and Logged-in Username](/img/components/global-status-bar/global-status-standard.webp 'Standard Global Status Bar - App Icon, App Title, App State, and Logged-in Username')

![Complex Global Status Bar - App Icon, App Title, App State, Logged-in Username, Clock, and Monitoring Icons.](/img/components/global-status-bar/global-status-complex.webp 'Complex Global Status Bar - App Icon, App Title, App State, Logged-in Username, Clock, and Monitoring Icons.')

:::note
When using the alternate light theme in Astro, the Global Status Bar and all of the elements it contains still use the default dark theme styling.
:::

## Examples

:::two-col

![Do: Correctly and consistently utilize the standard elements that comprise the Global Status Bar.](/img/components/global-status-bar/global-status-do-1.webp 'Do: Correctly and consistently utilize the standard elements that comprise the Global Status Bar.')

![Don’t: Use icons, labels and colors incorrectly.](/img/components/global-status-bar/global-status-dont-1.webp 'Don’t: Use icons, labels, and colors incorrectly.')

![Do: Left justify the application name. Additional custom elements should be centered in the Global Status Bar or right justified (when utilized).](/img/components/global-status-bar/global-status-do-2.webp 'Do: Left justify the application name and Top Level Nav (when utilized). Right justify Icons and Emergency Shut Off (when utilized).')

![Don’t: Use the Global Status Bar for controls or indications that come and go with different app modes. Reserve it for truly global elements.](/img/components/global-status-bar/global-status-dont-2.webp 'Don’t: Use the Global Status Bar for controls or indications that come and go with different app modes. Reserve it for truly global elements.')

:::
