---
title: Button
description: Action Buttons allow users to trigger actions by clicking, tapping, or pressing a corresponding key on a keyboard, such as the “Enter” key.
layout: project:layouts/component-docs/component-docs-layout.astro
storybook: components-button--all-variants
height: 300px
git: rux-button
assets:
    name: Button
---

## Interactive Example

::tag{ is=a-playground tag=rux-button }

## Rules of Thumb

- Use only predefined Button colors, sizes and fonts — don’t customize or alter them.
- Don’t design elements which look similar to Buttons but act differently. Buttons are actionable elements.
- Don’t activate Pop Up Menus from Buttons.
- Space Buttons evenly.
- Clearly title Buttons by choosing a verb that describes the action the user performs at precisely the moment the Button is clicked: “Save, Close, Print, \* Delete, Change Password,” etc.
- Resize Button width to accommodate the title; do not abbreviate or truncate Button titles.
- Don’t use an outside label to introduce a Button. Instead, clearly title the Button.
- Add an ellipsis (…) to the Button title if it opens another window, Dialog, or app.
- When using an ellipsis (…), don’t use sentence fragments or leading commands.
- It is recommended that actions should not be truncated with an ellipsis (…). However, if you must use ellipses for both truncation and to indicate further action is needed, add additional space after the ellipsis for those that require further action in order to clarify that they are not truncated.
- In Button groups, the primary Button with the preferred user action shall be placed on the right and all Buttons with secondary actions to the left of the preferred action Button.
- Position Buttons consistently across the application. Unless there is a good reason not to, right-align Buttons in Astro applications.

## Secondary Button

Secondary Buttons are an alternative Button style to be used in situations where a de-emphasized Button is beneficial in guiding the user to a preferred option. For example, use a Secondary Button for the less preferred option in Ok/Cancel Button pairings.

## Appearance and Behavior

Buttons have consistent text and icon styling but can vary by size, state, and hierarchy.

### Size

Buttons come in three standard sizes: Small, Medium, and Large. Medium buttons are suggested as the default option to use in a layout. Small buttons can be used when there is not much space available. Large buttons are rarely used, but can highlight a particular action when more space is available like on a full page Sign In form.

### State

Standard states for Buttons include: Default (Button is enabled, clickable), Hover (the user has paused over an active or focused Button), and Disabled (the Button is not interactive, and its content is not sent when the form is submitted).

### Hierarchy

Astro uses Primary, Secondary, and Borderless buttons to help the user visually distinguish options and preferences. Primary buttons are visually emphasized to guide the user to the action that is most likely to be most desirable to them at a given point. Secondary Buttons are an alternative Button style to be used in situations where a de-emphasized Button is beneficial in guiding the user to a preferred option. For example, use a Secondary Button for the less preferred option in OK/Cancel Button pairings. Borderless Buttons use the same rules as Secondary Buttons but do not have borders.

## Examples

:::two-col

![Do: Use Buttons for actionable controls only](/img/components/button/button-do-1.webp "Do: Use Buttons for actionable controls only")

![Don’t: Use elements that look like Buttons but are not](/img/components/button-dont-1.webp "Don’t: Use elements that look like Buttons but are not")

![Do: Right-align Buttons and give them adequate spacing from fields.](/img/components/button/button-do-2.webp "Do: Right-align Buttons and give them adequate spacing from fields.")

![Don’t: Mix Button colors and sizes.](/img/components/button/button-dont-2.webp "Don’t: Mix Button colors and sizes.")

![Do: Use standardized Button colors only.](/img/components/button/button-do-3.webp "Do: Use standardized Button colors only.")

:::
