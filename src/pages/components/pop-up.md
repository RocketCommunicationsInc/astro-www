---
tags: components
path: /components/pop-up
date: Last Modified
layout: project:layouts/docs/docs-layout.astro
title: Pop Up
demo: components-pop-up--default-story
storybook: components-pop-up--default-story
git: rux-pop-up
height: 250px
theme: true
---

# Pop Up

::storybook-demo

Typically invoked upon clicking an identifiable interactable element, a Pop Up contains a curated set of common actions, display controls, or rich data/imagery associated with the interactable element.


## Appearance and Behavior

Usually hidden on load, a Pop Up is invoked by clicking an interactable element with a defined target area. To close a Pop Up, the user may click outside its bounds, click a dedicated close button, or select an option within.

Anatomically, a Pop Up is comprised of content container with an arrow protruding from its edge that always points at the item from which it was invoked. Depending on a variety of factors – such as the size of the Pop Up itself, the size of the display, and scrolled position of the window – the arrow’s location along the Pop Up’s edge is variable. The width of the Pop will be pre-defined and specific to its content.

In terms of placement screen, the entire Pop Up must always be visible and never exceed the window frame. Furthermore, it must never obscure other screen items that require persistent visibility (such as Classification Banners or Application States).

All interactable items (e.g. menu items, links, buttons, checkboxes) appearing within a Pop Up are displayed using the appropriate Astro color representing the unselected state. Color changes corresponding to hover, focus, and select actions all apply. Disabled items are indicated by reduced opacity.

## Rules of Thumb

- Avoid loading the container with too many interactions or data. 
- Aim to provide the user with a quick, easy to operate mechanism for executing focused, contextual actions.
- Keep explanatory text to a minimum. If more extensive instruction is required, consider providing a link to a dedicated help page. 
- Use when you need to display information with formatting that a tooltip cannot provide. 

## Examples

:::two-col
![Do: Position Pop Ups to avoid obscuring vital screen elements like classification banners](/img/components/popup-do-1.png "Do: Position Pop Ups to avoid obscuring vital screen elements like classification banners")

![Don’t: Cover vital screen elements like classification markings](/img/components/popup-dont-1.png "Cover vital screen elements like classification markings")

![Do: Position a Pop Up so it stays within the edges of the frame](/img/components/popup-do-2.png "Position a Pop Up so it stays within the edges of the frame")

![Don’t:Position Pop Up so it exceeds the limits of the frame](/img/components/popup-dont-2.png "Don’t: Position Pop Up so it exceeds the limits of the frame")

![Do: Originate Pop Up from obvious, interactable triggers](/img/components/popup-do-3.png "Do: Originate Pop Up from obvious, interactable triggers")

![Don’t: Trigger Pop Up from items that don’t appear to be interactable](/img/components/popup-dont-3.png "Don’t: Trigger Pop Up from items that don’t appear to be interactable")
:::


# Pop Up Menu
 
A Pop Up Menu provides users with an ordered list of available actions for a interactable item, contained within a Pop Up container component.

## Appearance and Behavior

While rules governing the Pop Up Menu appearance and behavior generally mirror that of the generic Pop Up component, the width of its container will automatically adjust based on the width of the text content, which may be comprised of anything from a single menu item to a list of multiple items (up to a limit of 25 items).

## Rules of Thumb for Pop Up Menus

- Select menu item names that are accurate and informative allowing user to predict the result of choosing an item.
- Use separators to indicate groups of related items.
- Use an ellipsis (…) to indicate to users that further action is required to complete the command. The ellipsis character means that a Dialog Box or a separate window will open allowing users to make additional choices or supply additional information to complete the action.
- If you use more than one word in a menu item name, be sure to use sentence case capitalization.
- Choose menu names that are short and precise. Do not use an ellipsis to truncate overflow text as this indicates that further action or another dialog or window is required before the action takes place.
- Avoid combining actions and attributes in the same group. Users tend to view choosing an action (e.g. “Delete item”) differently from choosing an attribute (e.g. “Rating”).

## Examples
:::two-col
![Do: Use ellipses to indicate when further action will be required for that item](/img/components/popup-do-4.png "Do: Use ellipses to indicate when further action will be required for that item")

![Don’t: Use long menu item names that cause the the text to wrap](/img/components/popup-dont-4.png "Don't: Use long menu item names that cause the the text to wrap")
:::
