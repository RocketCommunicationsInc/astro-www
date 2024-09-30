---
draft: true
title: Tabs
description: Tabs in Astro applications are used to divide major areas of content and to indicate work process.
layout: project:layouts/component-docs/component-docs-layout.astro
storybook: components-tabs--default
height: 160px
git: rux-tabs
assets:
  name: All Options
# to get tabs you need to add them to project:data/navigation.secondary.json
---

## Interactive Example

::storybook-demo

## Rules of Thumb

- Use only one row of Tabs.
- Use higher level Tabs only on top of the panel.
- Tab labels should not be more than two words and should accurately reflect what underlying content the user can expect to reveal.
- Use title-style capitalization for labels.
- High level Tabs are often used to organize an application by work process.

:::note
High Level Tabs are often process/workflow oriented. Process oriented Tabs should:

- Appear in the upper left quadrant.
- Be clearly labeled.
- Guide users through a sequential process.

:::

## Interior/Compact Tabs

For use outside of main navigation, a more compact Tab component can be used.

## Rules of Thumb

- Use only one row of Tabs.
- Tab labels should not be more than two words and should accurately reflect what the user can expect to see.
- Use sentence case capitalization for labels.

## Examples

:::two-col
![Do: To guide users through a process, correctly place and label Tabs to reflect a step-by-step process.](/img/components/tab/nav-tabs-do-1.webp 'Do: To guide users through a process, correctly place and label Tabs to reflect a step-by-step process.')

![Don’t: Stack or improperly nest Tabs.](/img/components/tab/nav-tabs-dont-1.webp 'Don’t: Stack or improperly nest Tabs.')

:::
