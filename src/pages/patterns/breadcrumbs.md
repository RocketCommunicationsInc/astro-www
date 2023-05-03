---
title: Breadcrumbs
description: Breadcrumbs are a secondary navigation pattern that provides users with an ordered list of links that helps visualize locational awareness within a site’s hierarchy.
layout: project:layouts/component-docs/component-docs-layout.astro
storybook: components-breadcrumb--default-story
height: 120px
git: rux-breadcrumb
assets:
    name: Breadcrumbs
---
## Interactive Example

::tag{ is=a-playground tag=rux-breadcrumb }

Breadcrumbs provide a user with their current site location and allows them to quickly navigate to a parent page or previous step.

## Rules of Thumb

- Don’t use Breadcrumbs as a replacement for the primary navigation.
- A Breadcrumb item label should match the page title that they link with.

## Appearance and Behavior

Breadcrumbs should be positioned in the top portion of a page, ideally below the application bar and primary navigation and above the page title (if present).

Each Breadcrumb item is comprised of a clickable page link followed by a dividing icon. However, the final Breadcrumb, representing the current page, has a static text label and no divider.

Breadcrumb links should be styled in the Astro-defined primary interactive color. Breadcrumb items that are hovered over should be styled in the interactive hover color and have no underline. The last current page Breadcrumb item should not be interactive and should be styled as the primary text color.

When used in applications intended for large monitors, Breadcrumb trails should span no more than half of the parent window’s width, beyond which label truncation or line wrapping should be used.

![](/img/patterns/breadcrumbs-halfway.png)

While presenting a single non-interactive Breadcrumb on a homepage is relatively uncommon, it is a permitted option.

![](/img/patterns/breadcrumbs-single.png)

## Examples

:::two-col
![Do: Show active links on previous/parent pages. The current page is not active or clickable.](/img/patterns/breadcrumbs-do-1.png "Do: Show active links on previous/parent pages. The current page is not active or clickable.")

![Don’t: Show the current page as an active link or with a divider to its right.](/img/patterns/breadcrumbs-dont-1.png "Don't: Show the current page as an active link or with a divider to its right.")

![Do: Hovering over Breadcrumbs changes the interactive color to hover.](/img/patterns/breadcrumbs-do-2.png "Do: Hovering over Breadcrumbs changes the interactive color to hover.")

![Don’t: Display hovered Breadcrumbs with an underline.](/img/patterns/breadcrumbs-dont-2.png "Don’t: Display hovered Breadcrumbs with an underline.")

![Do: When using icons in the item label make sure to include a label with the icon. The exception to this is a home icon at the beginning of the Breadcrumb list.](/img/patterns/breadcrumbs-do-3.png "Do: When using icons in the item label make sure to include a label with the icon. The exception to this is a home icon at the beginning of the Breadcrumb list.")

![Don’t: Only use icons to identify separate Breadcrumbs.](/img/patterns/breadcrumbs-dont-3.png "Don’t: Only use icons to identify separate Breadcrumbs.")

![Do: Truncate breadcrumbs with an ellipsis when space is limited or the seven item limit is reached. It is also recommended to show at least three items in addition to an ellipsis at a minimum.](/img/patterns/breadcrumbs-do-4.png "Do: Truncate breadcrumbs with an ellipsis when space is limited or the seven item limit is reached. It is also recommended to show at least three items in addition to an ellipsis at a minimum.")

![Don’t: Truncate Breadcrumbs when there are three or fewer items if space allows.](/img/patterns/breadcrumbs-dont-4.png "Don’t: Truncate Breadcrumbs when there are three or fewer items if space allows.")

![Do: Use an ellipsis to trigger a Pop Up Menu of hidden page links on-click.](/img/patterns/breadcrumbs-do-5.png "Do: Use an ellipsis to trigger a Pop Up Menu of hidden page links on-click.")

![Don’t: Orphan the last Breadcrumb item when line-wrapping.](/img/patterns/breadcrumbs-dont-5.png "Don’t: Orphan the last Breadcrumb item when line-wrapping.")

![Do: Nest all truncated links under a single ellipsis if more than one Breadcrumb item needs to be truncated.](/img/patterns/breadcrumbs-do-6.png "Do: Nest all truncated links under a single ellipsis if more than one Breadcrumb item needs to be truncated.")

![Don’t: Truncate a single item with an ellipsis unless space is limited.](/img/patterns/breadcrumbs-dont-6.png "Truncate a single item with an ellipsis unless space is limited.")
:::
