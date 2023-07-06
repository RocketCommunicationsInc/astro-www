---
title: Tag
description: A Tag is a component made up of a text label, container, and color. Tags help users quickly identify important information related to an item and categorize items by keywords.
layout: project:layouts/component-docs/component-docs-layout.astro
storybook: components-tag--all-variants
height: 180px
git: rux-tag
assets:
  name: Tag
---
## Interactive Example

::tag{ is=a-playground tag=rux-tag }

Tags can be static, used to provide additional information on an item, or interactive, with the abilities such as editing or clearing them from data sets or linking to other similarly tagged elements.

## Appearance & Behavior

Tags are useful for identifying important information at a glance as well as filtering and categorizing items by keywords. Other visual indicators, such as color, help to draw users' attention and assist in categorization of like items.

## Tags in Astro

In code, Astro provides Status Tags. A Status Tag is system generated and typically has three states (Pass, Fail, and Unknown), though Astro provides tags outside of this scope as well. A Status Tag cannot be removed or cleared from the interface. There are two kinds of status tags: Pass/Fail/Unknown tags that are fixed in both text and color, and customizable tags correlating with status symbol colors that are text responsive. Status Tags should not be interactive. To use other colors or make a tag interactive, custom coding can be added on top of the provided Status Tag code.

## Use Cases

Status Tags are commonly used to show the status of a system such as an antennae or another communication device. Status Tags add important information to the status of a system and can use domain and system-specific terminology such as Offline, Online, Connecting, or Under Maintenance.

Tags are most commonly used in large data sets, such as tables, to help filter and organize information. Tags are especially useful for scanning and comparing data sets for meaningful information and relationships. Users are allowed to create, edit, and delete tags which help manage their large, dynamic data sets.

## Common Mistakes

- Users may confuse tags with buttons, so it is important to distinguish the shape and interaction of tags from button components.

- When using tags, colors should not overlap status or classification colors. We recommend using standard tag colors. For further color guidance, please refer to the usage documentation [Color](/design-tokens/reference/).

- Keep in mind that using tags adds to the visual noise of an interface, so use tags in moderation.

## Examples

:::two-col
![Do: Use tags when items are mapped to multiple categories and you need to differentiate between them.](/img/components/tag/tags-do-1.webp "Do: Use tags when items are mapped to multiple categories and you need to differentiate between them.")

![Don’t: When writing tags, avoid line-wrapping and utilize short keywords when possible.](/img/components/tag/tags-dont-1.webp "When writing tags, avoid line-wrapping and utilize short keywords when possible.")

![Do: Use Status Tags to show system status.](/img/components/tag/tags-do-2.webp "Do: Use Status Tags to show system status.")

![Don’t: Don't edit the text on Status Tags.](/img/components/tag/tags-dont-2.webp "Don’t: Don't edit the text on Status Tags.")

![Do: Use text colors in tags that pass WCAG AA contrast tests compared to the tags' background colors.](/img/components/tag/tags-do-3.webp "Do: Use text colors in tags that pass WCAG AA contrast tests compared to the tags' background colors.")

![Don’t: Use too many colors for tags. If you need to use multiple colors, ensure that the colors are meaningful or differentiated enough to your users to help recall and recognition.](/img/components/tag/tags-dont-3.webp "Don’t: Use too many colors for tags. If you need to use multiple colors, ensure that the colors are meaningful or differentiated enough to your users to help recall and recognition.")

:::
