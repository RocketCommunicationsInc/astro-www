---
title: Slider
description: A Slider allows users to choose from a range of continuous and discrete values arranged from minimum to maximum.
layout: project:layouts/component-docs/component-docs-layout.astro
---

## Anatomy

<div class="spec-container -anatomy">
    <figure><img loading="lazy" width="384px" src="/img/components/slider/slider-anatomy.png" alt="Anatomy Image"/></figure>
    <ol>
        <li>Thumb</li>
        <li>Track (active)</li>
        <li>Track (inactive)</li>
        <li>Axis Label</li>
        <li>Tick (optional)</li>
        <li>Container</li>
    </ol>
</div>

## Default Values

:::specs-table-container
| Attribute                                        | Token                             | Value                                                                                                                 |
|:-------------------------------------------------|:----------------------------------|:----------------------------------------------------------------------------------------------------------------------|
| <span class="attr-title">Thumb</span>            |                                   |                                                                                                                       |
| Border radius                                    | slider-thumb-radius               | 50%                                                                                                                   |
| Background color                                 | slider-thumb-color-background     | #101923                                                                                                               |
| Border width                                     | slider-thumb-border-width         | 2px                                                                                                                   |
| Border color                                     | slider-thumb-color-border-default | #4dacff                                                                                                               |
| <span class="attr-title">Track (active)</span>   |                                   |                                                                                                                       |
| Border radius                                    | slider-track-radius               | 3px                                                                                                                   |
| Height                                           | slider-track-height-active        | 4px                                                                                                                   |
| <span class="attr-title">Track (inactive)</span> |                                   |                                                                                                                       |
| Border radius                                    | slider-track-radius               | 3px                                                                                                                   |
| Height                                           | slider-track-height-inactive      | 1px                                                                                                                   |
| <span class="attr-title">Axis Label</span>       |                                   |                                                                                                                       |
| Font family                                      | font-body-3-font-family           | 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif |
| Font size                                        | font-body-3-font-size             | 0.75rem                                                                                                               |
| Font weight                                      | font-body-3-font-weight           | 400                                                                                                                   |
| Line height                                      | font-body-3-line-height           | calc(20 / 14)                                                                                                         |
| Letter spacing                                   | font-body-3-letter-spacing        | 0.005em                                                                                                               |
| Text color                                       | slider-axis-label-color-text      | #ffffff                                                                                                               |
| <span class="attr-title">Tick</span>             |                                   |                                                                                                                       |
| Border radius                                    | slider-tick-radius                | 50%                                                                                                                   |
| Dimension                                        | slider-tick-dimension             | 4px                                                                                                                   |
| Background color                                 | slider-tick-color-background      | #4dacff                                                                                                               |

:::

## States

<div class="spec-container -examples">
    <figure><img loading="lazy" width="280" src="/img/components/slider/slider-discrete-default.png" alt="Default Discrete Slider"/></figure>
    <figure><img loading="lazy" width="280" src="/img/components/slider/slider-discrete-hover.png" alt="Discrete Slider with Hover"/></figure>
    <figure><img loading="lazy" width="280" src="/img/components/slider/slider-discrete-disabled.png" alt="Disabled Discrete Slider"/></figure>
    <figure><img loading="lazy" width="280" src="/img/components/slider/slider-discrete-focus.png" alt="Discrete Slider with Focus"/></figure>
</div>

### Default

:::specs-table-container

| Attribute                             | Token                             | Value   |
|:--------------------------------------|:----------------------------------|:--------|
| <span class="attr-title">Thumb</span> |                                   |         |
| Border color                          | slider-thumb-color-border-default | #4dacff |

:::

### Hover

:::specs-table-container
| Attribute                             | Token                           | Value   |
|:--------------------------------------|:--------------------------------|:--------|
| <span class="attr-title">Thumb</span> |                                 |         |
| Border color                          | slider-thumb-color-border-hover | #92cbff |
:::

### Disabled

:::specs-table-container
| Attribute                                 | Token            | Value |
|:------------------------------------------|:-----------------|:------|
| <span class="attr-title">Container</span> |                  |       |
| Opacity                                   | opacity-disabled | 40%   |
:::

### Focus

:::specs-table-container
| Attribute                                 | Token         | Value             |
|:------------------------------------------|:--------------|:------------------|
| <span class="attr-title">Container</span> |               |                   |
| Outline                                   | focus-outline | 1px solid #da9ce7 |
| Outline Offset                            | focus-offset  | 0.125rem          |
:::
