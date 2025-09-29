---
title: Timeline
description: Timeline displays a sequence of realtime events during a fixed time span. The Playhead indicates the current time of day. Time Regions represent events.
layout: project:layouts/component-docs/component-docs-layout.astro
storybook: beta-timeline-beta--default
height: 700px
git: rux-timeline
assets:
  name: Timeline
status: beta
---

## Interactive Example

::tag{ is=a-playground tag=rux-timeline }

## Anatomy

![Anatomy of a simple Timeline element](/img/components/timeline/timeline-anatomy.webp 'Anatomy of a simple Timeline element')

## Appearance and Behavior

### Header

The header houses the Timeline Title and Status Symbol as well as Zoom control. The Status Symbol represents the overall status of the Timeline.

### Track

A Track is a row of Time Regions. A Timeline can have multiple Tracks. When the Timeline reaches maximum height, the Track area becomes vertically scrollable.

The Timeline Track is the focus of the Timeline and should occupy the majority of the screen space. There is an optional label area fixed to the left end of the Track, to allow for a title to be added to each Track. When the Track title happens to be a long text string, it may be wrapped to a maximum of three lines. The Track title may be truncated if the title is not of critical importance, but it must always fully display the text string in a Tooltip on hover. Make sure that the Track title column only takes up a minimum amount of space and provides the timeline with the majority of the space to display Time Regions and Events.

### Ruler

The Ruler spans the bottom of the Tracks and shows increments of time in the standard formats of: seconds, minutes, hours, days, weeks, months, etc. The Ruler may have day markers at midnight.

### Scroll Bar

The Scroll Bar moves the Timeline forward and backward in the viewport. Even when scrolling, the Playhead stays at the current time of day. The Scroll Bar's appearance and interaction are managed by the OS and browser and will look different on each system.

### Time Region

Time Regions show blocks of time. Each Time Region has a title, status symbol, and time span. Regions are automatically rendered as 'current' if under the Playhead. Time Regions may also be selected by the user.

Time Regions can overlap. If they do, a small indicator will appear showing how many Time Blocks are overlapping. Upon hover a popup will appear showing title, time, and status for each of the overlapping Time Regions.

### Playhead

The Playhead indicates current time of day. Time Blocks underneath the playhead have a special 'current' appearance.

## Rules of Thumb

- Always manage the zoom level such that the time span at least fills the viewport.
- Concurrent Time Regions on the same Track should stack with the longest Time Region on bottom and shortest Time Region on top.
