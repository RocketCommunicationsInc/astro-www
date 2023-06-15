---
title: Notifications
description: Notifications are timely and relevant communications triggered by a system, application or user action.
tags: resources
path: /patterns/notifications
date: Last Modified
layout: project:layouts/component-docs/component-docs-layout.astro
assets:
    name: Notifications
---
An event may be as inconsequential as a download completing or as important as equipment unexpectedly going offline. Astro provides a variety of situationally appropriate mechanisms to notify users of events with varying levels of urgency.

Below are suggested notification patterns to appropriately grab a user’s attention once it has been decided that a notification is necessary.

### Log

## Log

Events of least urgency may be added to a [Log](/components/log). Logged events aren’t likely to receive the user’s attention (Logs aren’t always in the user’s view), but are captured for later forensic use. Examples of low-level events are ordinary device state changes or routine consistency checks.

![Notification log example.](/img/patterns/notifications-log.png)

## Notification Symbol

Image 3 - Don’t obscure interface elements with a banner.

### Modal Dialog

For events that require the user’s immediate attention and response, a modal Dialog may be used. Modal Dialogs should be avoided if possible, as they deliberately interrupt all other user interaction which could be critical.

Modal Dialog example.



Examples

Image 1 - Do write clear titles for modal Dialog notifications.

Image 2 - Don’t use modal notifications for user feedback.

### Notification Status 

Guidance for communicating status can be found on the [Status System](/patterns/status-system/) page on the Astro UXDS website.