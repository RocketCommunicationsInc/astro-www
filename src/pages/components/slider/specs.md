---
title: Slider
description: A Slider allows users to choose from a range of continuous and discrete values arranged from minimum to maximum.
layout: project:layouts/component-docs/component-docs-layout.astro
---

## Anatomy

<div class="spec-container -anatomy">
    <figure><img loading="lazy" width="350px" src="/img/components/slider/slider-anatomy.png" alt="Anatomy Image"/></figure>
    <ol>
        <li>Thumb</li>
        <li>Track (active)</li>
        <li>Track (inactive)</li>
        <li>Axis Label</li>
        <li>Tick (optional)</li>
    </ol>
</div>

## Default Values

:::table-overflow
| Attribute                                        | Token                             | Value   |
|:-------------------------------------------------|:----------------------------------|:--------|
| <span class="attr-title">Track (active)</span>   |                                   |         |
| Border radius                                    | slider-track-radius               | 3px     |
| Height                                           | slider-track-height-active        | 4px     |
| <span class="attr-title">Track (inactive)</span> |                                   |         |
| Border radius                                    | slider-track-radius               | 3px     |
| Height                                           | slider-track-height-inactive      | 1px     |
| <span class="attr-title">Tick</span>             |                                   |         |
| Border radius                                    | slider-tick-radius                | 50%     |
| Dimension                                        | slider-tick-dimension             | 4px     |
| Background color                                 | slider-tick-color-background      | #4dacff |
| <span class="attr-title">Thumb</span>            |                                   |         |
| Border radius                                    | slider-thumb-radius               | 50%     |
| Background color                                 | slider-thumb-color-background     | #101923 |
| Border width                                     | slider-thumb-border-width         | 2px     |
| Border color                                     | slider-thumb-color-border-default | #4dacff |
:::

## States

<div class="spec-container -examples">
    <figure><img loading="lazy" width="280" src="/img/components/slider/slider-discrete-default.png" alt="Default Discrete Slider"/></figure>
    <figure><img loading="lazy" width="280" src="/img/components/slider/slider-discrete-hover.png" alt="Discrete Slider with Hover"/></figure>
    <figure><img loading="lazy" width="280" src="/img/components/slider/slider-discrete-disabled.png" alt="Disabled Discrete Slider"/></figure>
    <figure><img loading="lazy" width="280" src="/img/components/slider/slider-discrete-focus.png" alt="Discrete Slider with Focus"/></figure>
</div>

### Default

:::table-overflow

| Attribute                             | Token                             | Value   |
|:--------------------------------------|:----------------------------------|:--------|
| <span class="attr-title">Thumb</span> |                                   |         |
| Border color                          | slider-thumb-color-border-default | #4dacff |

:::

### Hover

:::table-overflow
| Attribute                             | Token                           | Value   |
|:--------------------------------------|:--------------------------------|:--------|
| <span class="attr-title">Thumb</span> |                                 |         |
| Border color                          | slider-thumb-color-border-hover | #92cbff |
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
