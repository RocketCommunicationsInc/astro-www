---
title: Pop Up
layout: project:layouts/component-docs/component-docs-layout.astro
storybook: components-pop-up--default-story
height: 220px
git: rux-pop-up
---

# Pop Up Menu

::storybook-demo

A Pop Up Menu provides users with a quick way to access common actions for a highlighted item.

## Rules of Thumb

- Select menu item names that are accurate and informative allowing user to predict the result of choosing an item.
- Use separators to indicate groups of related items.
- Use an ellipsis (…) to indicate to users that further action is required to complete the command. The ellipsis character means that a Dialog Box or a separate window will open allowing users to make additional choices or supply additional information to complete the action.
- If you use more than one word in a menu item name, be sure to use sentence case capitalization.
- Choose menu names that are short and precise. Do not use an ellipsis to truncate overflow text as this indicates that further action or another dialog or window is required before the action takes place.
- Avoid combining actions and attributes in the same group. Users tend to view choosing an action differently from choosing an attribute.

## Examples

:::two-col
![Do: Position Pop Up Menus to avoid obscuring vital screen elements like Classification Banners](/img/components/popup-do-1.png "Do: Position Pop Up Menus to avoid obscuring vital screen elements like Classification Banners")

![Don’t: Cover vital screen elements like Classification Markings](/img/components/popup-dont-1.png "Cover vital screen elements like Classification Markings")

![Do: Position a Pop Up Menu so it stays within the edges of the frame](/img/components/popup-do-2.png "Position a Pop Up Menu so it stays within the edges of the frame")

![Don’t: Position Pop Up Menu so it exceeds the limits of the frame](/img/components/popup-dont-2.png "Don’t: Position Pop Up Menu so it exceeds the limits of the frame")

![Do: Originate Pop Up Menu from obvious, interactable triggers](/img/components/popup-do-3.png "Do: Originate Pop Up Menu from obvious, interactable triggers")

![Don’t: Trigger Pop Up Menu from items that don’t appear to be interactable](/img/components/popup-dont-3.png "Don’t: Trigger Pop Up Menu from items that don’t appear to be interactable")

![Do: Use ellipses to indicate when further action will be required for that item](/img/components/popup-do-4.png "Do: Use ellipses to indicate when further action will be required for that item")

![Don’t: Use long menu item names that cause the the text to wrap](/img/components/popup-dont-4.png "Don’t: Use long menu item names that cause the the text to wrap")
