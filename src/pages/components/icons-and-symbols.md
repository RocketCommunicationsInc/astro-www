---
title: Icons and Symbols
description: Astro includes a library of common Icons, Symbols, and Notification Symbols. Persistent use of these will help ensure users are presented with consistent and meaningful information across applications.
layout: project:layouts/component-docs/component-docs-layout.astro
storybook: components-monitoring-icon--all-variants
height: 160px
git: rux-monitoring-icon
assets:
    name: Icons and Symbols
---
## Interactive Example

::tag{ is=a-playground tag=rux-monitoring-icon }

Each icon, symbol, or notification symbol must be easily identifiable by users and also be immediately distinguishable from each other, eliminating confusion and mistakes.

Astro’s icons have been designed to utilize the Astro Status System.

:::note
Monitoring Icons must include a label, and a status indicator. When used in a light theme status indicators must also include a border around the status indicator as assigned in Astro's [Component Design Tokens](design-tokens/component).
:::

## Astro Icon Classes

### Monitoring Icons

These icons represent objects, equipment, and concepts that are being administered or monitored. The purpose of these icons is to easily, concisely, and clearly visually communicate their status to users.

![Example of the same Monitoring Icon in all possible states](/img/components/icons-&-symbols/icons-monitoring-1.webp "Example of the same monitoring icon in all possible states")

![Example of different Monitoring Icon symbols](/img/components/icons-&-symbols/icons-monitoring-2.webp "Example of different monitoring icon symbols")

### Labeling

An Icon may also include a Label and Sub-Label.

![Anatomy of Icon Label and Sub-Label.](/img/components/icons-&-symbols/icons-labeling.webp "Anatomy of Icon Label and Sub-Label.")

An Icon Label provides the name of the item being represented. An Icon Label should not change.

An Icon Sub-Label provides additional information to the user and may be dynamic. Use Sub-Labels only as needed to avoid unnecessary distraction.

### Percentage Monitoring Icons

Percentage Monitoring Icons depict a value between 0 and 100 as an arc and a numeric display. Ranges within the arc may be mapped to the standard [Astro Status Colors](/patterns/status-system). In this example the range containing 80% is mapped to Serious.

![Anatomy of the Percentage Monitoring Icon](/img/components/icons-&-symbols/percentage-monitoring-graphic.webp "Anatomy of the Percentage Monitoring Icon")

### Notification Symbols

Events that require some user attention, but no immediate response, may be indicated by changes to a Notification Symbol.

This Notification Symbol shows that ninety-nine events related to a Satellite have occurred. You may hyperlink indicators to reveal a deeper view of relevant [Notification](/patterns/notifications) information. You may also link to the general Log.

![Anatomy of the Notification Symbol.](/img/components/icons-&-symbols/notifications-symbol.webp "Anatomy of the Notification Symbol.")

## Examples

:::two-col

![Do: When used in a group, keep Icons and Symbols equally sized.](/img/components/icons-&-symbols/icons-do-1.webp "Do: When used in a group, keep Icons and Symbols equally sized.")

![Do: Allow ample space between Icons and Symbols.](/img/components/icons-&-symbols/icons-do-2.webp "Do: Allow ample space between Icons and Symbols.")

![Do: In a horizontal layout, align horizontally based on the center of each Icon when height and width may vary.](/img/components/icons-&-symbols/icons-do-3.webp "Do: In a horizontal layout, align horizontally based on the center of each Icon when height and width may vary.")

![Do: Use Icons and Symbols consistently across applications.](/img/components/icons-&-symbols/icons-do-4.webp "Do: Use Icons and Symbols consistently across applications.")

![Do: Use standard Health and Status indication colors and Symbols.](/img/components/icons-&-symbols/icons-do-5.webp "Do: Use standard Health and Status indication colors and Symbols.")

![Do: In a vertical layout, align vertically based on the center of each Icon when height and width vary.](/img/components/icons-&-symbols/icons-do-6.webp "Do: In a vertical layout, align vertically based on the center of each Icon when height and width vary.")

:::
