---
title: Input Field
subtitle: Specification
description: Input Fields allow users to enter freeform text. Variations on this field often provide specific data entry formats such as masked data (e.g. passwords or phone numbers), date and time, and numeric data entry.
layout: project:layouts/component-docs/component-docs-layout.astro
config: '_config.ts'
storybook: forms-input--types
git: rux-input
---

## Anatomy
<div class="spec-container -anatomy">
    <figure><img src="/img/components/input-field/input-anatomy.png" alt="Anatomy Image"/></figure>
    <ol>
        <li>Container</li>
        <li>Label (using “default text”)</li>
        <li>Suffix Slot(optional)</li>
        <li>Prefix Slot(optional)</li>
    </ol>
</div>

## Default Values

:::table-overflow
| Element   | Attribute                | Token                              | Value |
|:----------|:-------------------------|:-----------------------------------|:------|
| Container | Padding (Left and Right) | input-padding-y-medium             |       |
|           | Padding (top and bottom) | input-padding-x-medium             |       |
|           | Border width             | input-border-width                 |       |
|           | Border radius            | input-radius                       |       |
|           | Border color             | input-color-border-default         |       |
|           | Background color         | input-color-background-default     |       |
| Label     | font family              | font-control-body-1-font-family    |       |
|           | font size                | font-control-body-1-font-size      |       |
|           | font weight              | font-control-body-1-font-weight    |       |
|           | line height              | font-control-body-1-line-height    |       |
|           | letter spacing           | font-control-body-1-letter-spacing |       |
|           | text color               | input-color-text-default           |       |
:::

## States

### Hover

:::table-overflow
| Element   | Attribute    | Token                    |
|:----------|:-------------|:-------------------------|
| Container | border color | input-color-border-hover |

:::

### Invalid

:::table-overflow
| Element   | Attribute    | Token                      |
|:----------|:-------------|:---------------------------|
| Container | border color | input-color-border-invalid |
:::

### Disabled

:::table-overflow
| Element   | Attribute | Token            |
|:----------|:----------|:-----------------|
| Container | opacity   | opacity-disabled |
:::

## Sizes

### Small

:::table-overflow
| Element   | ATtr                 | Token                 |
|:----------|:---------------------|:----------------------|
| Container | Padding (left/right) | input-padding-y-small |
|           | Padding (top/bottom) | input-padding-x-small |
:::

### Large

:::table-overflow
| Element   | ATtr                 | Token                 |
|:----------|:---------------------|:----------------------|
| Container | Padding (left/right) | input-padding-y-large |
|           | Padding (top/bottom) | input-padding-x-large |
:::

## Variants

### Placeholder Text

:::table-overflow
| Element   | Attribute  | Token                        |
|:----------|:-----------|:-----------------------------|
| Container | text color | input-color-text-placeholder |
:::

### With Prefix

:::table-overflow
| El     | Attr         | Token                         |
|:-------|:-------------|:------------------------------|
| Prefix | Dimension    | input-icon-dimension          |
|        | Margin right | input-prefix-margin-right     |
|        | Fill color   | input-icon-color-fill-default |
:::

### With Suffix

:::table-overflow
| El     | Attr        | Token                         |
|:-------|:------------|:------------------------------|
| Suffix | Dimension   | input-icon-dimension          |
|        | Margin left | input-suffix-margin-left      |
|        | Fill color  | input-icon-color-fill-default |
:::