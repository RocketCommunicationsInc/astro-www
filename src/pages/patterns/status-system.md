---
title: Status System
description: Consistent use of colors and symbols to convey status is critical for user success. 
tags: resources
path: /patterns/status-system
date: Last Modified
layout: project:layouts/component-docs/component-docs-layout.astro
class: color
assets:
    name: Status System
---

Astro's user research, conducted on a wide variety of space applications, showed that inconsistent and unconstrained use of colors and symbols left users confused and even dismissive of color systems. The research further showed that wide overuse of red to indicate both "off" and "emergency" stripped the color of its attention-getting power.

The Astro Status System is a standard to consistently indicate the state of an object or concept (typically represented by an Icon). The Status System consists of Status Symbols and Status Colors.

The Status Color palette for the Status System is based on a color temperature scale. The lowest level of severity, Off, is grey (neutral) and the highest level of severity, Alert, is red (hot).

![Status System Taxonomy](/img/patterns/status-system/status-system-fundamentals.webp "Figure 3.1.1 Status system taxonomy")

Each Status Symbol is a combination of a Status Color and a shape. The shapes are provided to ensure people with color blindness can also clearly identify the state of the object or concept

## Rules of Thumb

- A state change must be reflected by a change in the Status Color and, if appropriate, the Status Icon.
- Only use the standard set of Status Symbols and Status Colors provided.
- Use the highest level of urgency status if multiple statuses are consolidated. For example, if the statuses of underlying components are green, yellow, and red, the consolidated indicator is red.
- Reserve red for states that are urgent and require immediate attention.

## Status Colors

### Status Colors on Dark Backgrounds

For the Astro UXDS Dark Theme, and on dark backgrounds, the following Status Color values should be used. A border is not necessary, as these colors pass WCAG AA contrast ratios on dark backgrounds.

:::status-system-colors
|                                                              | Values                                                                                                 | Descriptions                                   |
|--------------------------------------------------------------|--------------------------------------------------------------------------------------------------------|------------------------------------------------|
| <div class="status-color" style="background: #FF3838"></div> | HEX: #FF3838 <br />RGB: 255,56,56<br />Token: color-status-critical<br />CSS: --color-status-critical  | Critical, alert, form error, emergency, urgent |
| <div class="status-color" style="background: #FFB302"></div> | HEX: #FFB302 <br />RGB: 255,179,2 <br />Token: color-status-serious <br />CSS: --color-status-serious  | Serious, error, warning, needs attention       |
| <div class="status-color" style="background: #FCE83A"></div> | HEX: #FCE83A <br />RGB: 252,232,58 <br />Token: color-status-caution <br />CSS: --color-status-caution | Caution, unstable, unsatisfactory              |
| <div class="status-color" style="background: #56F000"></div> | HEX: #56F000 <br />RGB: 86,240,0 <br />Token: color-status-normal <br />CSS: --color-status-normal     | Normal, on, ok, fine, go, satisfactory         |
| <div class="status-color" style="background: #2DCCFF"></div> | HEX: #2DCCFF <br />RGB: 45,204,255 <br />Token: color-status-standby <br />CSS: --color-status-standby | Standby, available, enabled                    |
| <div class="status-color" style="background: #A4ABB6"></div> | HEX: #A4ABB6 <br />RGB: 164,171,182 <br />Token: color-status-off <br />CSS: --color-status-off        | Off, unavailable, disabled                     |
:::

### Status Colors on Light Backgrounds

For the Astro UXDS Light Theme, and on light backgrounds, the following Status Color values should be used. When used, a darker border is necessary around the fill color, as the fill colors do not pass WCAG AA contrast ratios on light backgrounds. Those border colors have been specified here.

:::status-system-colors
|                                                                                     | Fill Values                                                                                                                    | Border Values                                                                                                                      |
|-------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------|
| <div class="status-color" style="background: #FF2A04; border-color: #661102"></div> | HEX: #FF2A04 <br />RGB: 255,42,4 <br />Token: status-symbol-color-fill-critical <br />CSS: --status-symbol-color-fill-critical | HEX: #661102 <br />RGB: 102,17,2 <br />Token: status-symbol-color-border-critical <br />CSS: --status-symbol-color-border-critical |
| <div class="status-color" style="background: #FFAF3D; border-color: #664618"></div> | HEX: #FFAF3D <br />RGB: 255,175,61 <br />Token: status-symbol-color-fill-serious <br />CSS: --status-symbol-color-fill-serious | HEX: #664618 <br />RGB: 102,70,24 <br />Token: status-symbol-color-border-serious <br />CSS: --status-symbol-color-border-serious  |
| <div class="status-color" style="background: #FAD800; border-color: #645600"></div> | HEX: #FAD800 <br />RGB: 250,216,0 <br />Token: status-symbol-color-fill-caution <br />CSS: --status-symbol-color-fill-caution  | HEX: #645600 <br />RGB: 100,86,0 <br />Token: status-symbol-color-border-caution <br />CSS: --status-symbol-color-border-caution   |
| <div class="status-color" style="background: #00E200; border-color: #005A00"></div> | HEX: #00E200 <br />RGB: 0,226,0 <br />Token: status-symbol-color-fill-normal <br />CSS: --status-symbol-color-fill-normal      | HEX: #005A00 <br />RGB: 0,90,0 <br />Token: status-symbol-color-border-normal <br />CSS: --status-symbol-color-border-normal       |
| <div class="status-color" style="background: #2DCCFF; border-color: #285766"></div> | HEX: #285766 <br />RGB: 45,204,255 <br />Token: status-symbol-color-fill-standby <br />CSS: --status-symbol-color-fill-standby | HEX: #285766 <br />RGB: 40,87,102 <br />Token: status-symbol-color-border-standby <br />CSS: --status-symbol-color-border-standby  |
| <div class="status-color" style="background: #7B8089; border-color: #3C3E42"></div> | HEX: #7B8089 <br />RGB: 123,128,137 <br />Token: status-symbol-color-fill-off <br />CSS: --status-symbol-color-fill-off        | HEX: #3C3E42 <br />RGB: 60,62,66 <br />Token: status-symbol-color-border-off <br />CSS: --status-symbol-color-border-off           |
:::

:::caution
Avoid adding additional colors if possible. Creating additional colors greatly reduces the user’s ability to learn and properly use the application.
:::
