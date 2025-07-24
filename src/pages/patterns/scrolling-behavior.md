---
title: Scrolling Behavior
description: Guidance for scrolling patterns in Astro-compliant interfaces
tags: resources
path: /patterns/scrolling-behavior
date: Last Modified
layout: project:layouts/component-docs/component-docs-layout.astro
assets:
    name: Scrolling Behavior
---

## Appearance and Behavior
In Astro UXDS applications, scrolling is an acceptable and expected interaction pattern when used purposefully and in alignment with user-centered design. Interfaces should prioritize surfacing key actions and high value information without requiring scroll, particularly on primary screens. However, longer or scrollable layouts are entirely appropriate when the volume or complexity of the content justifies it — specifically when best practices are followed for accessibility, usability, and clarity.

These practices include:

- Managing focus appropriately for keyboard and assistive technologies
- Using system-standard, legible fonts (which are baked into Astro UXDS)
- Providing clear and intuitive navigation

Design decisions should be guided by UX research and the context of use — including modality, viewport size and type, monitor number and use, and user task flow. The presence of scrolling does not conflict with Astro UXDS principles, as long as the experience remains responsive and user-friendly across screen sizes and device types.

## Examples
### Above the Fold

In this example application, the content above the fold (immediately visible on the screen without scrolling) provides the most critical information immediately surfaced to support rapid decision making. Key elements include real-time alerts that require acknowledgement, open incident and maintenance tickets which are correlated with impacted devices, and a summary of affected locations and their related devices. Everything above the fold is connected, working together to give the operator a clear, immediate picture for effective triage.

![Image of a dashboard showing above the fold operational data, including alerts, impacted devices, location health, and open incident and maintenance tickets. The layout is designed for real-time triage and decision support.](/img/patterns/scrolling-behavior/above-the-fold.webp)


## Below the Fold

Below the fold (the area of an application or webpage that the user must scroll to) is reserved for deeper contextual data visualizations like capacity, utilization, and the like. While all of these metrics reflect the same devices and locations prioritized above the fold, these elements are not essential for immediate triage, alert response, or critical management by operators. This layer would support exploratory or analytical tasks, offering additional context that could be useful for informing the operator about relevant locations and devices, but not critical to their main tasks.

![Image of a dashboard displaying below the fold data visualizations, including graphs and charts for throughput, capacity, and trends. These metrics provide contextual information not essential for immediate operator action.](/img/patterns/scrolling-behavior/below-the-fold.webp)
