---
title: Tooltip
description: A Tooltip is a message box that provides a concise amount of relevant contextual information about an associated UI element. Tooltips are activated by hovering over or focusing on an element.
layout: project:layouts/component-docs/component-docs-layout.astro
storybook: components-tooltip--default-story
height: 216px
git: rux-tooltip
assets:
    name: Tooltip
---

## Interactive Example

::tag{ is=a-playground tag=rux-tooltip }

## Rules of Thumb

- Important information should always be visible on the page.
- Don’t use to mirror visible content, communicate errors, or display interactive links or menus.
- Use for small amounts of contextual information.
- Avoid tooltips in areas with dense information, as the screen may become crowded as the user moves throughout the application, blocking other visual information. Instead, use a [Pop Up](/components/pop-up/) to have information appear on click rather than hover.

## Appearance and Behavior

**Appearance**

Tooltips have consistent text styling and do not include icons, rich text, images, links, or actions. If those options are desired, consider using the [Pop Up](/components/pop-up/) component.

**Behavior**

Tooltips display informative text in a message box when the user has hovered or paused their mouse over an associated UI element for a brief length of time (800 ms by default). They can also be activated by focusing an element using the keyboard or voice activation. They should remain visible if the user briefly moves the mouse off and back on to the target. When the user exits the element area, moves the cursor off the element by scrolling, or clicks on another UI element, the Tooltip is hidden.

## Examples

:::two-col

![Do: Tooltips can be used to clarify iconography with actions.](/img/components/tooltip/tooltip-do-1.webp 'Do: Tooltips can be used to clarify iconography with actions.')

![Don’t: Use tooltips to restate visible text.](/img/components/tooltip/tooltip-dont-1.webp 'Don’t: Use tooltips to restate visible text.')

![Do: Keep the position of the tooltip visible.](/img/components/tooltip/tooltip-do-2.webp 'Do: Keep the position of the tooltip visible.')

![Don’t: Crop tooltips.](/img/components/tooltip/tooltip-dont-2.webp 'Don’t: Crop tooltips.')

![Do: Tooltips can be used to show shortcuts or hotkeys.](/img/components/tooltip/tooltip-do-3.webp 'Do: Tooltips can be used to show shortcuts or hotkeys.')

![Don’t: Use rich text, icons, links, or other actions in Tooltips.](/img/components/tooltip/tooltip-dont-3.webp 'Don’t: Use rich text, icons, links, or other actions in Tooltips.')

![Do: Use Tooltips to add context to an item.](/img/components/tooltip/tooltip-do-4.webp 'Do: Use Tooltips to add context to an item.')

![Don’t: Convey errors or status using Tooltips.](/img/components/tooltip/tooltip-dont-4.webp 'Don’t: Convey errors or status using Tooltips.')

:::
