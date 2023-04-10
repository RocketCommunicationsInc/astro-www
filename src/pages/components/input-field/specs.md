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
    <figure><img width="350px" src="/img/components/input-field/input-anatomy.png" alt="Anatomy Image"/></figure>
    <ol>
        <li>Container</li>
        <li>Label (using “default text”)</li>
        <li>Suffix Slot(optional)</li>
        <li>Prefix Slot(optional)</li>
    </ol>
</div>

## Default Values 

:::table-overflow
| Attribute                                 | Token                              | Value                                                                                                                 |
|:------------------------------------------|:-----------------------------------|:----------------------------------------------------------------------------------------------------------------------|
| <span class="attr-title">Container</span> |                                    |                                                                                                                       |
| Padding (Left and Right)                  | input-padding-y-medium             | 0.5rem                                                                                                                |
| Padding (top and bottom)                  | input-padding-x-medium             | 0.5rem                                                                                                                |
| Border width                              | input-border-width                 | 1px                                                                                                                   |
| Border radius                             | input-radius                       | 3px                                                                                                                   |
| Border color                              | input-color-border-default         | #2b659b                                                                                                               |
| Background color                          | input-color-background-default     | #101923                                                                                                               |
| <span class="attr-title">Label</span>     |                                    |                                                                                                                       |
| font family                               | font-control-body-1-font-family    | 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif |
| font size                                 | font-control-body-1-font-size      | 1rem                                                                                                                  |
| font weight                               | font-control-body-1-font-weight    | 400                                                                                                                   |
| line height                               | font-control-body-1-line-height    | calc(20 / 16)                                                                                                         |
| letter spacing                            | font-control-body-1-letter-spacing | 0.005em                                                                                                               |
| text color                                | input-color-text-default           | #ffffff                                                                                                               |
:::

## States

<div class="spec-container -examples">
    <figure><img width="170" src="/img/components/input-field/input-global-default.png" alt="Default Input Field"/></figure>
    <figure><img width="170" src="/img/components/input-field/input-global-hover.png" alt="Hover Input Field"/></figure>
    <figure><img width="170" src="/img/components/input-field/input-global-invalid.png" alt="Invalid Input Field"/></figure>
    <figure><img width="170" src="/img/components/input-field/input-global-disabled.png" alt="Disabled Input Field"/></figure>
    <figure><img width="170" src="/img/components/input-field/input-global-focus.png" alt="Focus Input Field"/></figure>
</div>

### Hover

:::table-overflow
| Attribute                                 | Token                    | Value   |
|:------------------------------------------|:-------------------------|:--------|
| <span class="attr-title">Container</span> |                          |         |
| border color                              | input-color-border-hover | #92cbff |
:::

### Invalid

:::table-overflow
| Attribute                                 | Token                      | Value   |
|:------------------------------------------|:---------------------------|:--------|
| <span class="attr-title">Container</span> |                            |         |
| border color                              | input-color-border-invalid | #ff3838 |
:::

### Disabled

:::table-overflow
| Attribute                                 | Token            | Value |
|:------------------------------------------|:-----------------|:------|
| <span class="attr-title">Container</span> |                  |       |
| opacity                                   | opacity-disabled | 40%   |
:::

## Sizes

<div class="spec-container -examples">
    <figure><img width="170" src="/img/components/input-field/input-size-small.png" alt="Input Size Small"/></figure>
    <figure><img width="170" src="/img/components/input-field/input-size-medium.png" alt="Input Size Medium"/></figure>
    <figure><img width="170" src="/img/components/input-field/input-size-large.png" alt="Input Size Large"/></figure>
</div>

### Small

:::table-overflow
| Attribute                                 | Token                 | Value   |
|:------------------------------------------|:----------------------|:--------|
| <span class="attr-title">Container</span> |                       |         |
| Padding (left/right)                      | input-padding-y-small | 0.5rem  |
| Padding (top/bottom)                      | input-padding-x-small | 0.25rem |
:::

### Large

:::table-overflow
| Attribute                                 | Token                 | Value   |
|:------------------------------------------|:----------------------|:--------|
| <span class="attr-title">Container</span> |                       |         |
| Padding (left/right)                      | input-padding-y-large | 0.5rem  |
| Padding (top/bottom)                      | input-padding-x-large | 0.75rem |
:::

## Variants
<div class="spec-container -examples">
    <figure><img width="170" src="/img/components/input-field/input-placeholder.png" alt="Input Placeholder"/></figure>
</div>

### Placeholder Text

:::table-overflow
| Attribute                                 | Token                        | Value   |
|:------------------------------------------|:-----------------------------|:--------|
| <span class="attr-title">Container</span> |                              |         |
| text color                                | input-color-text-placeholder | #a4abb6 |
:::

<div class="spec-container -examples">
    <figure><img width="170" src="/img/components/input-field/input-type-search.png" alt="Search Input"/></figure>
</div>

### With Prefix

:::table-overflow
| Attribute                              | Token                         | Value   |
|:---------------------------------------|:------------------------------|:--------|
| <span class="attr-title">Prefix</span> |                               |         |
| Dimension                              | input-icon-dimension          | 20px    |
| Margin right                           | input-prefix-margin-right     | 0.25rem |
| Fill color                             | input-icon-color-fill-default | #4dacff |
:::

<div class="spec-container -examples">
    <figure><img width="170" src="/img/components/input-field/input-type-password.png" alt="Password Input"/></figure>
    <figure><img width="170" src="/img/components/input-field/input-type-number.png" alt="Number Input"/></figure>
</div>

### With Suffix

:::table-overflow
| Attribute                              | Token                         | Value   |
|:---------------------------------------|:------------------------------|:--------|
| <span class="attr-title">Suffix</span> |                               |         |
| Dimension                              | input-icon-dimension          | 20px    |
| Margin left                            | input-suffix-margin-left      | 0.25rem |
| Fill color                             | input-icon-color-fill-default | #4dacff |
:::