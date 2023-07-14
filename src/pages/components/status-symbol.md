---
title: Status Symbol
description: The Status Symbol combines color and shape to create a standard and consistent way to indicate the status of a device or feature. When shown in Light theme, the Status Symbols include an additional inner border.
layout: project:layouts/component-docs/component-docs-layout.astro
storybook: components-status--all-variants
height: 112px
git: rux-status
assets:
  name: Status Symbol
sandbox:
  style: "--y: 260px;"
---
## Interactive Examples

::tag{ is=a-playground tag=rux-status}

![Astro Status Symbols in context of a modem list layout.](/img/components/status-symbol/icons-symbols-modems.webp "Astro Status Symbols in context of a modem list layout.")

## Rules of Thumb

- Use the standard set of Status Symbols provided.
- Only use the provided colors for status.
- Use the highest color possible if multiple statuses are consolidated. For example, if the statuses of underlying components are green, yellow, and red, the consolidated indicator is red.

## Related Pages

- For a detailed description of how Status Symbols are used within Monitoring Icons, see [Icons and Symbols](/components/icons-and-symbols).
- To learn more about the usage of status colors, see [Status System](/patterns/status-system).

## Status Colors

Status colors are provided for both light and dark theme versions of Astro in Hex, RGB, and CSS Custom Property values.

### Dark Theme Status Colors

:::table-overflow
|                                                                                                                       | Hex     | RGB         | CSS                                           | Synonyms                                       |  |
|-----------------------------------------------------------------------------------------------------------------------|---------|-------------|-----------------------------------------------|------------------------------------------------|--|
| <div class="status-color">![Status Color: Critical ](/img/components/status-symbol/swatches/critical__dark.svg)</div> | #ff3838 | 255,56,56   | `--status-symbol-color-fill-critical-on-dark` | Critical, form error, alert, emergency, urgent |  |
| <div class="status-color">![Status Color: Serious ](/img/components/status-symbol/swatches/serious__dark.svg)</div>   | #ffb302 | 255,179,2   | `--status-symbol-color-fill-serious-on-dark`  | Serious, error, warning, needs attention       |  |
| <div class="status-color">![Status Color: Caution ](/img/components/status-symbol/swatches/caution__dark.svg)</div>   | #fce83a | 252,232,58  | `--status-symbol-color-fill-caution-on-dark`  | Caution, unstable, unsatisfactory              |  |
| <div class="status-color">![Status Color: Normal ](/img/components/status-symbol/swatches/normal__dark.svg)</div>     | #56f000 | 86,240,0    | `--status-symbol-color-fill-normal-on-dark`   | Normal, on, ok, fine, go, satisfactory         |  |
| <div class="status-color">![Status Color: Standby ](/img/components/status-symbol/swatches/standby__dark.svg)</div>   | #2dccff | 45,204,255  | `--status-symbol-color-fill-standby-on-dark`  | Standby, available, enabled                    |  |
| <div class="status-color">![Status Color: Off ](/img/components/status-symbol/swatches/off__dark.svg)</div>           | #a4abb6 | 158,167,173 | `--status-symbol-color-fill-off-on-dark`      | Off, unavailable, disabled                     |  |
:::

### Light Theme Status Colors

:::table-overflow
|                                                                                                                        | Hex     | RGB         | CSS                                            | Synonyms                                       |  |
|------------------------------------------------------------------------------------------------------------------------|---------|-------------|------------------------------------------------|------------------------------------------------|--|
| <div class="status-color">![Status Color: Critical ](/img/components/status-symbol/swatches/critical__light.svg)</div> | #ff2a04 | 255,42,4    | `--status-symbol-color-fill-critical-on-light` | Critical, form error, alert, emergency, urgent |  |
| <div class="status-color">![Status Color: Serious ](/img/components/status-symbol/swatches/serious__light.svg)</div>   | #ffaf3d | 255,175,61  | `--status-symbol-color-fill-serious-on-light`  | Serious, error, warning, needs attention       |  |
| <div class="status-color">![Status Color: Caution ](/img/components/status-symbol/swatches/caution__light.svg)</div>   | #fad800 | 250,216,0   | `--status-symbol-color-fill-caution-on-light`  | Caution, unstable, unsatisfactory              |  |
| <div class="status-color">![Status Color: Normal ](/img/components/status-symbol/swatches/normal__light.svg)</div>     | #00e200 | 0,226,0     | `--status-symbol-color-fill-normal-on-light`   | Normal, on, ok, fine, go, satisfactory         |  |
| <div class="status-color">![Status Color: Standby ](/img/components/status-symbol/swatches/standby__light.svg)</div>   | #2dccff | 45,204,255  | `--status-symbol-color-fill-standby-on-light`  | Standby, available, enabled                    |  |
| <div class="status-color">![Status Color: Off ](/img/components/status-symbol/swatches/off__light.svg)</div>           | #7b8089 | 123,128,137 | `--status-symbol-color-fill-off-on-light`      | Off, unavailable, disabled                     |  |
:::

### Light Theme Status Symbol Borders

- In light theme Status Symbols should have a 1px border set to the inside of the symbol.

:::table-overflow
|                                                                                                                               | Hex     | RGB       | CSS                                     | Synonyms                                 |  |
|-------------------------------------------------------------------------------------------------------------------------------|---------|-----------|-----------------------------------------|------------------------------------------|--|
| <div class="status-color">![Status Color: Critical ](/img/components/status-symbol/swatches/critical-border__light.svg)</div> | #661102 | 102,17,2  | `--status-symbol-color-border-critical` | Critical, alert, emergency, urgent       |  |
| <div class="status-color">![Status Color: Serious ](/img/components/status-symbol/swatches/serious-border__light.svg)</div>   | #664618 | 102,70,24 | `--status-symbol-color-border-serious`  | Serious, error, warning, needs attention |  |
| <div class="status-color">![Status Color: Caution ](/img/components/status-symbol/swatches/caution-border__light.svg)</div>   | #645600 | 100,86,0  | `--status-symbol-color-border-caution`  | Caution, unstable, unsatisfactory        |  |
| <div class="status-color">![Status Color: Normal ](/img/components/status-symbol/swatches/normal-border__light.svg)</div>     | #005a00 | 0,90,0    | `--status-symbol-color-border-normal`   | Normal, on, ok, fine, go, satisfactory   |  |
| <div class="status-color">![Status Color: Standby ](/img/components/status-symbol/swatches/standby-border__light.svg)</div>   | #285766 | 40,87,102 | `--status-symbol-color-border-standby`  | Standby, available, enabled              |  |
| <div class="status-color">![Status Color: Off ](/img/components/status-symbol/swatches/off-border__light.svg)</div>           | #3c3e42 | 60,62,66  | `--status-symbol-color-border-off`      | Off, unavailable, disabled               |  |
:::
