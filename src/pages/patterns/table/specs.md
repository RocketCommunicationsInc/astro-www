---
title: Table
description: Tables are a fundamental UX design tool for organizing and displaying data.
layout: project:layouts/component-docs/component-docs-layout.astro
assets:
    name: Table
---

## Anatomy

<ol>
    <li>Container</li>
    <li>Header Row</li>
    <li>Rows</li>
    <li>Cell</li>
</ol>

## Default Values

:::specs-table-container
| Attribute                                            | Token                                   | Value                                                                                                                 |
|:-----------------------------------------------------|:----------------------------------------|:----------------------------------------------------------------------------------------------------------------------|
| <span class="attr-title">Header</span>            |                                         |                                                                                                                       |
| Padding                              | table-header-cell-padding                 | 0.5rem                                                                                                                  |
| Background Color                              | table-header-color-background                 | #172635                                                                                                                  |
| Shadow                               | table-header-shadow                 | 0px 4px 8px 0px rgba(0, 0, 0, 0.45);                                                                                                                  |
| Font family                                          | font-heading-5-font-family         | 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif |
| Font size                                            | font-heading-5-font-size           | 1.125rem                                                                                                                  |
| Font weight                                          | font-heading-5-font-weight         | 400                                                                                                                   |
| Line height                                          | font-heading-5-line-height         | calc(24 / 18)                                                                                                         |
| Letter spacing                                       | font-heading-5-letter-spacing      | 0em
| <span class="attr-title">Body Cell</span>            |                                         |                                                                                                                       |
| Padding (left and right)                             | table-body-cell-padding-x                 | 0.5rem                                                                                                                  |
| Padding (top and bottom)                             | table-body-cell-padding-y                 | 0.25rem                                                                                                                |
| <span class="attr-title">Row</span>            |                                         |                                                                                                                       |
| Bottom Border Color                             | table-row-color-border                 | #101923                                                                                                                  |
| Border Width                             | table-row-border-width                 | 1px                                                                                                                  |
| Text Color                             | table-row-color-text                 | #ffffff                                                                                                                  |
| Background Color                             | table-row-color-background-default                 | #1b2d3e                                                                                                                  |
| Font family                                          | font-body-1-font-family         | 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif |
| Font size                                            | font-body-1-font-size           | 1rem                                                                                                                  |
| Font weight                                          | font-body-1-font-weight         | 400                                                                                                                   |
| Line height                                          | font-body-1-line-height         | calc(24 / 16)                                                                                                         |
| Letter spacing                                       | font-body-1-letter-spacing      | 0.005em                                                                                                               |
:::

## States

### Hover

:::specs-table-container
| Attribute                                 | Token                  | Value   |
|:------------------------------------------|:-----------------------|:--------|
| <span class="attr-title">Row</span> |                        |         |
| Background Color                  | table-row-color-background-hover | #1c3851    |
:::

### Selected

:::specs-table-container
| Attribute                                 | Token                   | Value  |
|:------------------------------------------|:------------------------|:-------|
| <span class="attr-title">Row</span> |                         |        |
| Background Color                | table-row-color-background-selected | #1c3f5e   |
:::
