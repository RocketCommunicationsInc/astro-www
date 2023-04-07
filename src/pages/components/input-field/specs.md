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
:::anatomy-container

1. Container
2. Label (using “default text”)
3. Suffix Slot(optional)
4. Prefix Slot(optional)
:::

## Default Values

:::table-overflow
<table>
    <thead>
        <tr>
            <th>Element</th>
            <th>Attribute</th>
            <th>Token</th>
            <th>Value</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Container</td>
            <td>Padding (Left and Right)</td>
            <td>input-padding-y-medium</td>
            <td></td>
        </tr>
        <tr>
            <td></td>
            <td>Padding (top and bottom)</td>
            <td>input-padding-x-medium</td>
            <td></td>
        </tr>
        <tr>
            <td></td>
            <td>Border width</td>
            <td>input-border-width</td>
            <td></td>
        </tr>
        <tr>
            <td></td>
            <td>Border radius</td>
            <td>input-radius</td>
            <td></td>
        </tr>
        <tr>
            <td></td>
            <td>Border color</td>
            <td>input-color-border-default</td>
            <td></td>
        </tr>
        <tr>
            <td></td>
            <td>Background color</td>
            <td>input-color-background-default</td>
            <td></td>
        </tr>
        <tr>
            <td>Label</td>
            <td>font family</td>
            <td>font-control-body-1-font-family</td>
            <td></td>
        </tr>
        <tr>
            <td></td>
            <td>font size</td>
            <td>font-control-body-1-font-size</td>
            <td></td>
        </tr>
        <tr>
            <td></td>
            <td>font weight</td>
            <td>font-control-body-1-font-weight</td>
            <td></td>
        </tr>
        <tr>
            <td></td>
            <td>line height</td>
            <td>font-control-body-1-line-height</td>
            <td></td>
        </tr>
        <tr>
            <td></td>
            <td>letter spacing</td>
            <td>font-control-body-1-letter-spacing</td>
            <td></td>
        </tr>
        <tr>
            <td></td>
            <td>text color</td>
            <td>input-color-text-default</td>
            <td></td>
        </tr>
    </tbody>
</table>
:::

## States

### Hover

:::table-overflow
<table>
    <thead>
        <tr>
            <th>Element</th>
            <th>Attribute</th>
            <th>Token</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Container</td>
            <td>border color</td>
            <td>input-color-border-hover</td>
        </tr>
    </tbody>
</table>
:::

### Invalid

:::table-overflow
<table>
    <thead>
        <tr>
            <th>Element</th>
            <th>Attribute</th>
            <th>Token</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Container</td>
            <td>border color</td>
            <td>input-color-border-invalid</td>
        </tr>
    </tbody>
</table>
:::

### Disabled

:::table-overflow
<table>
    <thead>
        <tr>
            <th>Element</th>
            <th>Attribute</th>
            <th>Token</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Container</td>
            <td>opacity</td>
            <td>opacity-disabled</td>
        </tr>
    </tbody>
</table>
:::

## Sizes

### Small

:::table-overflow
<table>
    <thead>
        <tr>
            <th>Element</th>
            <th>Attribute</th>
            <th>Token</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Container</td>
            <td>border color</td>
            <td>input-color-border-hover</td>
        </tr>
    </tbody>
</table>
:::

### Large

:::table-overflow
<table>
    <thead>
        <tr>
            <th>Element</th>
            <th>Attribute</th>
            <th>Token</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Container</td>
            <td>border color</td>
            <td>input-color-border-hover</td>
        </tr>
    </tbody>
</table>
:::

## Variants

### Placeholder Text

:::table-overflow
<table>
    <thead>
        <tr>
            <th>Element</th>
            <th>Attribute</th>
            <th>Token</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Container</td>
            <td>border color</td>
            <td>input-color-border-hover</td>
        </tr>
    </tbody>
</table>
:::

### With Prefix

:::table-overflow
<table>
    <thead>
        <tr>
            <th>El</th>
            <th>Attr</th>
            <th>Token</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Prefix</td>
            <td>Dimension</td>
            <td>input-icon-dimension</td>
        </tr>
        <tr>
            <td></td>
            <td>Margin right</td>
            <td>input-prefix-margin-right</td>
        </tr>
        <tr>
            <td></td>
            <td>Fill color</td>
            <td>input-icon-color-fill-default</td>
        </tr>
    </tbody>
</table>
:::

### With Suffix

:::table-overflow
<table>
    <thead>
        <tr>
            <th>El</th>
            <th>Attr</th>
            <th>Token</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Suffix</td>
            <td>Dimension</td>
            <td>input-icon-dimension</td>
        </tr>
        <tr>
            <td></td>
            <td>Margin left</td>
            <td>input-suffix-margin-left</td>
        </tr>
        <tr>
            <td></td>
            <td>Fill color</td>
            <td>input-icon-color-fill-default</td>
        </tr>
    </tbody>
</table>
:::