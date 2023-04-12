---
title: Select
description: TWhen activated, Select Menus allow users to select a value from a list. Once a value is selected, the Select Menu displays the selected value.
layout: project:layouts/component-docs/component-docs-layout.astro
---

## Anatomy

<div class="spec-container -anatomy">
    <figure><img loading="lazy" width="270px" src="/img/components/select/select-anatomy.png" alt="Anatomy Image"/></figure>
    <ol>
        <li>Container</li>
        <li>Text</li>
  <li>Caret Selector</li>
  <li>Caret</li>
    </ol>
</div>

## Default Values

:::table-overflow
| Attribute                                 | Token                              | Value                                                                                                                 |
|:------------------------------------------|:-----------------------------------|:----------------------------------------------------------------------------------------------------------------------|
| <span class="attr-title">Container</span> |                                    |                                                                                                                       |
| Padding (left and right)                  | select-padding-y-medium             | 0.5rem                                                                                                                |
| Padding (top and bottom)                  | select-padding-x-medium             | 0.5rem                                                                                                                |
| Border width                              | select-border-width                 | 1px                                                                                                                   |
| Border radius                             | select-radius                       | 3px                                                                                                                   |
| Border color                              | select-color-border-default         | #2b659b                                                                                                               |
| Background color                          | select-color-background     | #101923                                                                                                               |
| <span class="attr-title">Text</span>     |                                    |                                                                                                                       |
| Font family                               | font-control-body-1-font-family    | 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif |
| Font size                                 | font-control-body-1-font-size      | 1rem                                                                                                                  |
| Font weight                               | font-control-body-1-font-weight    | 400                                                                                                                   |
| Line height                               | font-control-body-1-line-height    | calc(20 / 16)                                                                                                         |
| Letter spacing                            | font-control-body-1-letter-spacing | 0.005em                                                                                                               |
| Text color                                | select-color-text           | #4dacff                                                                                                               |
| <span class="attr-title">Caret Selector</span>     |                                    |                                                                                                                       |
| Width                                 | select-caret-selector-width           | 32px                                                                                                               |
| Background color                            | select-caret-selector-color-background | #1c3f5e                                                                                                               |
| <span class="attr-title">Caret</span>     |                                    |                                                                                                                       |
| Dimension                             | select-caret-dimension                       | 30px                                                                                                                   |
| Fill color                             | select-caret-color-fill                       |  #4dacff                                                                                                    |
:::

## States

<div class="spec-container -examples">
    <figure><img loading="lazy" width="170" src="/img/components/select/select-default.png" alt="Default select"/></figure>
    <figure><img loading="lazy" width="170" src="/img/components/select/select-hover.png" alt="Hover select"/></figure>
    <figure><img loading="lazy" width="170" src="/img/components/select/select-invalid.png" alt="Invalid select"/></figure>
    <figure><img loading="lazy" width="170" src="/img/components/select/select-disabled.png" alt="Disabled select"/></figure>
    <figure><img loading="lazy" width="170" src="/img/components/select/select-focus.png" alt="Focus select"/></figure>
</div>

### Default

:::table-overflow
| Attribute                                 | Token                    | Value   |
|:------------------------------------------|:-------------------------|:--------|
| <span class="attr-title">Container</span> |                          |         |
| Border color                              | select-color-border-default | #2b659b |
:::

### Hover

:::table-overflow
| Attribute                                 | Token                    | Value   |
|:------------------------------------------|:-------------------------|:--------|
| <span class="attr-title">Container</span> |                          |         |
| Border color                              | select-color-border-hover | #92cbff |
:::

### Invalid

:::table-overflow
| Attribute                                 | Token                      | Value   |
|:------------------------------------------|:---------------------------|:--------|
| <span class="attr-title">Container</span> |                            |         |
| Border color                              | select-color-border-invalid | #ff3838 |
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
    <figure><img loading="lazy" width="170" src="/img/components/select/select-small.png" alt="select Size Small"/></figure>
    <figure><img loading="lazy" width="170" src="/img/components/select/select-medium.png" alt="select Size Medium"/></figure>
    <figure><img loading="lazy" width="170" src="/img/components/select/select-large.png" alt="select Size Large"/></figure>
</div>

### Small

:::table-overflow
| Attribute                                 | Token                 | Value   |
|:------------------------------------------|:----------------------|:--------|
| <span class="attr-title">Container</span> |                       |         |
| Padding (left and right)                      | select-padding-y-small | 1rem  |
| Padding (top and bottom)                      | select-padding-x-small | 0.25rem |
:::

### Medium

:::table-overflow
| Attribute                                 | Token                 | Value   |
|:------------------------------------------|:----------------------|:--------|
| <span class="attr-title">Container</span> |                       |         |
| Padding (left and right)                      | select-padding-y-medium | 0.5rem  |
| Padding (top and bottom)                      | select-padding-x-medium | 0.5rem |
:::

### Large

:::table-overflow
| Attribute                                 | Token                 | Value   |
|:------------------------------------------|:----------------------|:--------|
| <span class="attr-title">Container</span> |                       |         |
| Padding (left and right)                      | select-padding-y-large | 0.25rem  |
| Padding (top and bottom)                      | select-padding-x-large | 0.75rem |
:::
