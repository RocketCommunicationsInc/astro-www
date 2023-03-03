---
title: Pop Up Menu
layout: project:layouts/component-docs/component-docs-layout.astro
storybook: components-pop-up--default-story
height: 250px
git: rux-pop-up-menu
---

# Pop Up Menu

::storybook-demo
 
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
- When using an ellipsis (…), don’t use sentence fragments or leading commands. 
- It is recommend that actions should not be truncated with an ellipsis (…).  However, if you must use ellipses for both truncation and to indicate further action is needed, add additional space after the ellipsis for those that require further action in order to clarify that they are not truncated.

## Examples
:::two-col
![Do: Use ellipses to indicate when further action will be required for that item](/img/patterns/popup-menu-do-1.png "Do: Use ellipses to indicate when further action will be required for that item")

![Don’t: Use long menu item names that cause the the text to wrap](/img/patterns/popup-menu-dont-1.png "Don't: Use long menu item names that cause the the text to wrap")
:::
