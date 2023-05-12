---
title: Container
description: Containers are used to group multiple components into a specific area that allows them to flow in a flexible/responsive manner.
layout: project:layouts/component-docs/component-docs-layout.astro
storybook: components-container--default-story
height: 140px
git: rux-container
assets:
  name: Container
sandbox:
  style: "--y: 180px;"
---
## Interactive Example

## Interactive Example

::tag{ is=a-playground tag=rux-container }

Containers can be used to help effectively manage lists, tables, dialogs, modals, slide out panels, content containers (top and bottom), and other components.

## Appearance and Behavior

Containers have sections for a header, a tab bar, a toolbar, body content, and a footer.

The Container component uses an optional drop shadow that can help distinguish it from other UI elements (e.g. applied in “overlay” situations, such as dialogs and slide-in panels).

Child containers (smaller Containers meant to reside inside of a larger Container) consist of a header, room for custom content on the left and right of the header text, and body sections. The body section can be used as a canvas to freely overlay multiple components.

## Examples

:::two-col

![Do: Use Containers to build lists, tables, slide outs, and the like with proper component usage and placement.](/img/components/container-do-1.png "Do: Use Containers to build lists, tables, slide outs, and the like with proper component usage and placement.")

![Don’t: Use Containers to add or stack components in an improper or confusing manner.](/img/components/container-dont-1.png "Don’t: Use Containers to add or stack components in an improper or confusing manner.")

:::
