---
title: Clock
layout: project:layouts/component-docs/component-docs-layout.astro
storybook: components-clock--default-story
height: 220px
git: rux-clock
---

# Clock

::storybook-demo

Clock shows the current time and optional date, AOS, and LOS timers. It will typically be positioned on the Global Status Bar.

## Appearance and Behavior

The Clock is not an interactive component. Time is always present. Date, AOS and LOS are optional. The time is UTC by default but can be configured for any time zone.

The optional date feature uses the Julian day number format. Julian day number format requires 3 digits with placeholder 0s for the hundreds and tens places.

All digits should be displayed using the system mono font, system font, or Roboto with [tabular numbers](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric) enabled. Monospace font and [Tabular number](https://www.fonts.com/content/learning/fontology/level-3/numbers/proportional-vs-tabular-figures) geometry ensure that the display will not jitter as the numbers change.

## Examples

![Example Clock](/img/components/clock-roboto-mono.png "Example Clock")
