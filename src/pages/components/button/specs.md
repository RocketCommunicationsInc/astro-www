---
title: Button
description: Action Buttons allow users to trigger actions by clicking, tapping, or pressing a corresponding key on a keyboard, such as the “Enter” key.
layout: project:layouts/component-docs/component-docs-layout.astro
---
## Anatomy

<div class="spec-container -anatomy">
    <figure><img width="350px" src="/img/components/button/button-anatomy.png" alt="Anatomy Image"/></figure>
    <ol>
        <li>Container</li>
        <li>Left icon (optional)</li>
        <li>Label</li>
    </ol>
</div>

## Default Values

:::table-overflow
| Attribute                                 | Token                              | Value                                                                                                                 |
|:------------------------------------------|:-----------------------------------|:----------------------------------------------------------------------------------------------------------------------|
| <span class="attr-title">Container</span> |                                    |                                                                                                                       |
| Padding (left and right)                  | button-padding-y-medium             | 0.5rem                                                                                                                |
| Padding (top and bottom)                  | button-padding-x-medium             | 0.5rem                                                                                                                |
| Border width                              | button-border-width                 | 1px                                                                                                                   |
| Border radius                             | button-radius                       | 3px                                                                                                                   |
| Border color                              | button-color-border-primary-default         | #2b659b                                                                                                               |
| Background color                          | button-color-background-primary-default     | #101923                                                                                                               |
| <span class="attr-title">Label</span>     |                                    |                                                                                                                       |
| Font family                               | font-control-body-1-font-family    | 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif |
| Font size                                 | font-control-body-1-font-size      | 1rem                                                                                                                  |
| Font weight                               | font-control-body-1-font-weight    | 400                                                                                                                   |
| Line height                               | font-control-body-1-line-height    | calc(20 / 16)                                                                                                         |
| Letter spacing                            | font-control-body-1-letter-spacing | 0.005em                                                                                                               |
| Text color                                | button-color-text-primary           | #ffffff                                                                                                               |
| <span class="attr-title">Left icon</span>     |                                    |                                                                                                                       |
| Dimension                                | button-icon-dimension           | #ffffff                                                                                                               |
| Margin (right)                                | button-icon-margin-right           | #ffffff                                                                                                               |
| Fill color                                | button-icon-color-fill-primary           | #ffffff                                                                                                               |
:::

## Kinds

### Primary

<div class="spec-container -examples">
    <figure><img width="139" src="/img/components/button/button-primary-medium-default.png" alt="Default Primary Button"/></figure>
    <figure><img width="139" src="/img/components/button/button-primary-medium-hover.png" alt="Primary Button with Hover State"/></figure>
    <figure><img width="139" src="/img/components/button/button-primary-medium-disabled.png" alt="Disabled Primary Button"/></figure>
</div>

#### Default

:::table-overflow

| Attribute                                 | Token                    | Value   |
|:------------------------------------------|:-------------------------|:--------|
| <span class="attr-title">Container</span> |                          |         |
| Background color                              | button-color-background-primary-default | #92cbff |
| <span class="attr-title">Label</span>      |                          |         |
| Text color                              | button-color-text-primary | #92cbff |
| <span class="attr-title">Left icon</span>      |                          |         |
| Fill color                              | button-icon-color-fill-primary | #92cbff |

:::

#### Hover

:::table-overflow
| Attribute                                 | Token                    | Value   |
|:------------------------------------------|:-------------------------|:--------|
| <span class="attr-title">Container</span> |                          |         |
| Background color                              | button-color-background-primary-hover | #92cbff |
:::

### Disabled

:::table-overflow
| Attribute                                 | Token            | Value |
|:------------------------------------------|:-----------------|:------|
| <span class="attr-title">Container</span> |                  |       |
| Opacity                                   | opacity-disabled | 40%   |
:::

### Secondary

<div class="spec-container -examples">
    <figure><img width="139" src="/img/components/button/button-secondary-medium-default.png" alt="Default Secondary Button"/></figure>
    <figure><img width="139" src="/img/components/button/button-secondary-medium-hover.png" alt="Secondary Button with Hover State"/></figure>
    <figure><img width="139" src="/img/components/button/button-secondary-medium-disabled.png" alt="Disabled Secondary Button"/></figure>
</div>

#### Default

:::table-overflow

| Attribute                                 | Token                    | Value   |
|:------------------------------------------|:-------------------------|:--------|
| <span class="attr-title">Container</span> |                          |         |
| Background color                              | button-color-background-secondary-default | #92cbff |
| <span class="attr-title">Label</span>      |                          |         |
| Text color                              | button-color-text-secondary-default | #92cbff |
| <span class="attr-title">Left icon</span>      |                          |         |
| Fill color                              | button-icon-color-fill-secondary-default | #92cbff |

:::

#### Hover

:::table-overflow
| Attribute                                 | Token                    | Value   |
|:------------------------------------------|:-------------------------|:--------|
| <span class="attr-title">Container</span> |                          |         |
| Background color                              | button-color-background-secondary-hover | #92cbff |
| <span class="attr-title">Label</span> |                          |         |
| Text color                              | button-color-text-secondary-hover | #92cbff |
| <span class="attr-title">Left icon</span> |                          |         |
| Fill color                              | button-icon-color-fill-secondary-hover | #92cbff |
:::

### Disabled

:::table-overflow
| Attribute                                 | Token            | Value |
|:------------------------------------------|:-----------------|:------|
| <span class="attr-title">Container</span> |                  |       |
| Opacity                                   | opacity-disabled | 40%   |
:::

### Borderless

<div class="spec-container -examples">
    <figure><img width="139" src="/img/components/button/button-borderless-medium-default.png" alt="Default Borderless Button"/></figure>
    <figure><img width="139" src="/img/components/button/button-borderless-medium-hover.png" alt="Borderless Button with Hover State"/></figure>
    <figure><img width="139" src="/img/components/button/button-borderless-medium-disabled.png" alt="Disabled Borderless Button"/></figure>
</div>

#### Default

:::table-overflow
| Attribute                                 | Token                    | Value   |
|:------------------------------------------|:-------------------------|:--------|
| <span class="attr-title">Container</span> |                          |         |
| Background color                              | button-color-background-borderless | #92cbff |
| Border color                              | button-color-border-borderless | #92cbff |
| <span class="attr-title">Label</span> |                          |         |
| Text color                              | button-color-text-borderless-default | #92cbff |
| <span class="attr-title">Left icon</span> |                          |         |
| Fill color                              | button-icon-color-fill-borderless-default | #92cbff |
:::

#### Hover

:::table-overflow
| Attribute                                 | Token                    | Value   |
|:------------------------------------------|:-------------------------|:--------|
| <span class="attr-title">Container</span> |                          |         |
| <span class="attr-title">Label</span> |                          |         |
| Text color                              | button-color-text-borderless-hover | #92cbff |
| <span class="attr-title">Left icon</span> |                          |         |
| Fill color                              | button-icon-color-fill-borderless-hover | #92cbff |
:::

### Disabled

:::table-overflow
| Attribute                                 | Token            | Value |
|:------------------------------------------|:-----------------|:------|
| <span class="attr-title">Container</span> |                  |       |
| Opacity                                   | opacity-disabled | 40%   |
:::

## Sizes

<div class="spec-container -examples">
    <figure><img width="170" src="/img/components/button/button-primary-small-default.png" alt="Small Primary Button"/></figure>
    <figure><img width="170" src="/img/components/button/button-primary-medium-default.png" alt="Medium Primary Button"/></figure>
    <figure><img width="170" src="/img/components/button/button-primary-large-default.png" alt="Large Primary Button"/></figure>
</div>

### Small

:::table-overflow
| Attribute                                 | Token                 | Value   |
|:------------------------------------------|:----------------------|:--------|
| <span class="attr-title">Container</span> |                       |         |
| Padding (left and right)                      | button-padding-y-small | 0.5rem  |
| Padding (top and bottom)                      | button-padding-x-small | 0.25rem |
:::

### Medium

:::table-overflow
| Attribute                                 | Token                 | Value   |
|:------------------------------------------|:----------------------|:--------|
| <span class="attr-title">Container</span> |                       |         |
| Padding (left and right)                      | button-padding-y-medium | 0.5rem  |
| Padding (top and bottom)                      | button-padding-x-medium | 0.25rem |
:::

### Large

:::table-overflow
| Attribute                                 | Token                 | Value   |
|:------------------------------------------|:----------------------|:--------|
| <span class="attr-title">Container</span> |                       |         |
| Padding (left and right)                      | button-padding-y-large | 0.5rem  |
| Padding (top and bottom)                      | button-padding-x-large | 0.75rem |
:::

## Icon Only

<div class="spec-container -examples">
    <figure><img width="42" src="/img/components/button/button-primary-small-default-icon-only.png" alt="Small Icon Only Primary Button"/></figure>
    <figure><img width="60" src="/img/components/button/button-primary-medium-default-icon-only.png" alt="Medium Icon Only Primary Button"/></figure>
    <figure><img width="44" src="/img/components/button/button-primary-large-default-icon-only.png" alt="Large Icon Only Primary Button"/></figure>
</div>

### Small

:::table-overflow
| Attribute                                 | Token                 | Value   |
|:------------------------------------------|:----------------------|:--------|
| <span class="attr-title">Container</span> |                       |         |
| Padding (left and right)                      | button-padding-y-small-icon-only | 0.5rem  |
| Padding (top and bottom)                      | button-padding-x-small-icon-only | 0.25rem |
:::

### Medium

:::table-overflow
| Attribute                                 | Token                 | Value   |
|:------------------------------------------|:----------------------|:--------|
| <span class="attr-title">Container</span> |                       |         |
| Padding (left and right)                      | button-padding-y-medium-icon-only | 0.5rem  |
| Padding (top and bottom)                      | button-padding-x-medium-icon-only | 0.25rem |
:::

### Large

:::table-overflow
| Attribute                                 | Token                 | Value   |
|:------------------------------------------|:----------------------|:--------|
| <span class="attr-title">Container</span> |                       |         |
| Padding (left and right)                      | button-padding-y-large-icon-only | 0.5rem  |
| Padding (top and bottom)                      | button-padding-x-large-icon-only | 0.75rem |
:::

### Focus

<div class="spec-container -examples">
    <figure><img width="139" src="/img/components/button/button-primary-medium-focus.png" alt="Primary Button with Focus State"/></figure>
</div>

:::table-overflow
| Attribute                                 | Token                 | Value   |
|:------------------------------------------|:----------------------|:--------|
| <span class="attr-title">Container</span> |                       |         |
| Outline                      | focus-outline | 0.5rem  |
| Outline Offset                      | focus-offset | 0.75rem |
:::
