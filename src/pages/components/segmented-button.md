---
title: Segmented Button
description: Segmented Buttons allow users to select one item at a time from two to four options. Selecting one option automatically turns off the last selection made. Segmented Buttons are mutually exclusive.
layout: project:layouts/component-docs/component-docs-layout.astro
storybook: components-segmented-button--default
height: 80px
git: rux-segmented-button
assets:
  name: Segmented Button
---

## Interactive Example

::tag{ is=a-playground tag=rux-segmented-button }

## Rules of Thumb

- Use Segmented Buttons:
  - To filter a Grid or Table.
  - To switch a view's display mode.
- One option must always be selected.

## Appearance and Behavior

To learn more about adding Help Text to Segmented Buttons, see the [Forms and Validation](/patterns/forms-and-validation) guidance.

## Examples

:::two-col
![Do: Use Segmented Buttons to filter an associated table or grid.](/img/components/segmented-button/segmented-button-do-1.webp 'Do: Use Segmented Buttons to filter an associated Table or Grid.')

![Don’t: Use Segmented Buttons to switch between separate views. Use Tabs instead.](/img/components/segmented-button/segmented-button-dont-1.webp 'Don’t: Use Segmented Buttons to switch between separate views. Use Tabs instead.')

![Do: Use Segmented Buttons to switch a view’s display mode.](/img/components/segmented-button/segmented-button-do-2.webp 'Do: Use Segmented Buttons to switch a view’s display mode.')

![Don’t: Use Segmented Buttons for user input in a form. Use Radio Buttons or Select Menus instead.](/img/components/segmented-button/segmented-button-dont-2.webp 'Don’t: Use Segmented Buttons for user input in a form. Use Radio Buttons or Select Menus instead.')

:::
