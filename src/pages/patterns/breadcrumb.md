---
title: Breadcrumb
layout: project:layouts/component-docs/component-docs-layout.astro
storybook: components-breadcrumb--default-story
height: 250px
git: rux-breadcrumb
---

# Breadcrumb

::storybook-demo

:::note
The Breadcrumbs web component is currently in development. Astro provides the guidance here for using Breadcrumbs and has developed a Figma design component for use in UI mockups.
:::
 
Breadcrumbs are a secondary navigation pattern that provides users with an ordered list of links that helps visualize locational awareness within a site’s hierarchy. Breadcrumbs provide a user with their current site location and allows them to quickly navigate to a parent page or previous step.

## Rules of Thumb

- Don’t use Breadcrumbs as a replacement for the primary navigation.
- A Breadcrumb item label should match the page title that they link with.

## Appearance and Behavior

Breadcrumbs should be positioned in the top portion of a page, ideally below the application bar and primary navigation and above the page title (if present). 

Each Breadcrumb item is comprised of a clickable page link followed by a dividing icon. However, the final Breadcrumb, representing the current page, has a static text label and no divider.

Breadcrumb links should be styled in the Astro-defined primary interactive color. Breadcrumb items that are hovered over should be styled in the interactive hover color and have no underline. The last current page Breadcrumb item should not be interactive and should be styled as the primary text color.

A Breadcrumb trail should span no more than half of the parent window’s width, beyond which label truncation or line wrapping should be used.

While presenting a single non-interactive Breadcrumb on a homepage is relatively uncommon, it is a permitted option.

## Examples

:::two-col
![Do: Position Pop Ups to avoid obscuring vital screen elements like classification banners](/img/components/popup-do-1.png "Do: Position Pop Ups to avoid obscuring vital screen elements like classification banners")

![Don’t: Cover vital screen elements like classification markings](/img/components/popup-dont-1.png "Don't: Cover vital screen elements like classification markings")

![Do: Position a Pop Up so it stays within the edges of the frame](/img/components/popup-do-2.png "Do: Position a Pop Up so it stays within the edges of the frame")

![Don’t: Position Pop Up so it exceeds the limits of the frame](/img/components/popup-dont-2.png "Don’t: Position Pop Up so it exceeds the limits of the frame")

![Do: Originate Pop Up from obvious, interactable triggers](/img/components/popup-do-3.png "Do: Originate Pop Up from obvious, interactable triggers")

![Don’t: Trigger Pop Up from items that don’t appear to be interactable](/img/components/popup-dont-3.png "Don’t: Trigger Pop Up from items that don’t appear to be interactable")
:::
