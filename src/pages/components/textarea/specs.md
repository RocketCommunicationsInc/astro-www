---
title: Textarea
description: Textareas are multi-line text inputs that allow for entering text in a larger area than a single-line text input would allow. They are typically used for multi-line input use cases like comments or feedback.
layout: project:layouts/component-docs/component-docs-layout.astro
---

## Anatomy

<div class="spec-container -anatomy">
    <figure><img loading="lazy" width="270px" src="/img/components/textarea/textarea-anatomy.png" alt="Anatomy Image"/></figure>
    <ol>
        <li>Container</li>
        <li>Input text</li>
    </ol>
</div>

## Default Values

:::table-overflow
| Attribute                                 | Token                              | Value                                                                                                                 |
|:------------------------------------------|:-----------------------------------|:----------------------------------------------------------------------------------------------------------------------|
| <span class="attr-title">Container</span> |                                    |                                                                                                                       |
| Padding (left and right)                  | textarea-padding-y-medium             | 0.5rem                                                                                                                |
| Padding (top and bottom)                  | textarea-padding-x-medium             | 0.5rem                                                                                                                |
| Border width                              | textarea-border-width                 | 1px                                                                                                                   |
| Border radius                             | textarea-radius                       | 3px                                                                                                                   |
| Border color                              | textarea-color-border-default         | #2b659b                                                                                                               |
| Background color                          | textarea-color-background-default     | #101923                                                                                                               |
| <span class="attr-title">Label</span>     |                                    |                                                                                                                       |
| Font family                               | font-control-body-1-font-family    | 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif |
| Font size                                 | font-control-body-1-font-size      | 1rem                                                                                                                  |
| Font weight                               | font-control-body-1-font-weight    | 400                                                                                                                   |
| Line height                               | font-control-body-1-line-height    | calc(20 / 16)                                                                                                         |
| Letter spacing                            | font-control-body-1-letter-spacing | 0.005em                                                                                                               |
| Text color                                | textarea-color-text-default           | #ffffff                                                                                                               |
:::

## States

<div class="spec-container -examples">
    <figure><img loading="lazy" width="170" src="/img/components/textarea/textarea-default.png" alt="Default Textarea"/></figure>
    <figure><img loading="lazy" width="170" src="/img/components/textarea/textarea-hover.png" alt="Hover Textarea"/></figure>
    <figure><img loading="lazy" width="170" src="/img/components/textarea/textarea-invalid.png" alt="Invalid Textarea"/></figure>
    <figure><img loading="lazy" width="170" src="/img/components/textarea/textarea-disabled.png" alt="Disabled Textarea"/></figure>
    <figure><img loading="lazy" width="170" src="/img/components/textarea/textarea-focus.png" alt="Focus Textarea"/></figure>
</div>

### Default

:::table-overflow
| Attribute                                 | Token                    | Value   |
|:------------------------------------------|:-------------------------|:--------|
| <span class="attr-title">Container</span> |                          |         |
| Border color                              | textarea-color-border-default | #2b659b |
:::

### Hover

:::table-overflow
| Attribute                                 | Token                    | Value   |
|:------------------------------------------|:-------------------------|:--------|
| <span class="attr-title">Container</span> |                          |         |
| Border color                              | textarea-color-border-hover | #92cbff |
:::

### Invalid

:::table-overflow
| Attribute                                 | Token                      | Value   |
|:------------------------------------------|:---------------------------|:--------|
| <span class="attr-title">Container</span> |                            |         |
| Border color                              | textarea-color-border-invalid | #ff3838 |
:::

### Disabled

:::table-overflow
| Attribute                                 | Token            | Value |
|:------------------------------------------|:-----------------|:------|
| <span class="attr-title">Container</span> |                  |       |
| Opacity                                   | opacity-disabled | 40%   |
:::

### Focus

:::table-overflow
| Attribute                                 | Token         | Value             |
|:------------------------------------------|:--------------|:------------------|
| <span class="attr-title">Container</span> |               |                   |
| Outline                                   | focus-outline | 1px solid #da9ce7 |
| Outline Offset                            | focus-offset  | 0.125rem          |
:::

## Sizes

<div class="spec-container -examples">
    <figure><img loading="lazy" width="170" src="/img/components/textarea/textarea-small-default.png" alt="Textarea Size Small"/></figure>
    <figure><img loading="lazy" width="170" src="/img/components/textarea/textarea-medium-default.png" alt="Textarea Size Medium"/></figure>
    <figure><img loading="lazy" width="170" src="/img/components/textarea/textarea-large-default.png" alt="Textarea Size Large"/></figure>
</div>

### Small

:::table-overflow
| Attribute                                 | Token                 | Value   |
|:------------------------------------------|:----------------------|:--------|
| <span class="attr-title">Container</span> |                       |         |
| Padding (left and right)                      | textarea-padding-y-small | 0.5rem  |
| Padding (top and bottom)                      | textarea-padding-x-small | 0.25rem |
:::

### Medium

:::table-overflow
| Attribute                                 | Token                 | Value   |
|:------------------------------------------|:----------------------|:--------|
| <span class="attr-title">Container</span> |                       |         |
| Padding (left and right)                      | textarea-padding-y-medium | 0.5rem  |
| Padding (top and bottom)                      | textarea-padding-x-medium | 0.5rem |
:::

### Large

:::table-overflow
| Attribute                                 | Token                 | Value   |
|:------------------------------------------|:----------------------|:--------|
| <span class="attr-title">Container</span> |                       |         |
| Padding (left and right)                      | textarea-padding-y-large | 0.5rem  |
| Padding (top and bottom)                      | textarea-padding-x-large | 0.75rem |
:::

## Variants

<div class="spec-container -examples">
    <figure><img loading="lazy" width="170" src="/img/components/textarea/textarea-placeholder.png" alt="Input Placeholder"/></figure>
</div>

### Placeholder Text

:::table-overflow
| Attribute                                 | Token                        | Value   |
|:------------------------------------------|:-----------------------------|:--------|
| <span class="attr-title">Container</span> |                              |         |
| Text color                                | textarea-color-text-placeholder | #a4abb6 |
:::
