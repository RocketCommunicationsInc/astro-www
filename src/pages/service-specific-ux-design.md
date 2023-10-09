---
title: Service Specific UX Design
description: Service Specific UX Design promotes the development of consistent, robust applications to support Enterprise Ground Services (R2C2) by applying UX design process and the Astro Space UX Design System.
layout: project:layouts/docs/docs-layout.astro
---

:::note
The images depicted on this page use the color palette and fonts from Astro 4. All new projects should use Astro 7 colors and fonts to be considered an Astro application. Refer to this section for general user experience guidance only, _not_ visual design guidance.
:::
The Service Specific UX Design effort supported Rapid Resilient Command & Control (R2C2) to develop consistent, robust applications. The design efforts achieved the goal by applying UX Design processes aligned with the Astro Space UX Design System to create, document, and implement baseline designs as interactive sample apps. The work described here focused on two key R2C2 services, [Ground Resource Management (GRM)][grm-designs] and [Telemetry, Tracking & Command (TT&C)][ttc-designs] and followed the process below:

- Conducted [UX research](/design-process/research) with users and stakeholders to identify key task flows, constraints, and current pain points in existing systems.
- Used the findings from this research and the Astro Space UX Design System to [design](/design-process/ui-design) solutions to support GRM and TT&C Services.
- In partnership with users and stakeholders, iteratively evaluated and improved on the designs to ensure they support the key task flows in an efficient and usable manner.
- Implemented the resulting designs as interactive sample applications using the [Astro UI Components](/components/readme).
- Provided the detailed design specifications, wireframes, sample applications, and source code as [downloadable resources](/downloads) to teams looking to develop applications supporting GRM and TT&C Services.

Design efforts included several hours of user and stakeholder interviews, detailed task flow analysis, and iterative design evaluations based on user feedback. The result of the design activities produced sample app designs to reference for developing future GRM and TT&C apps, fostering consistent and functional user experience across systems. 


## GRM Service UX Design

The UX research conducted on GRM services drove the design of three sample apps integrated into the GRM App Suite. The [GRM Dashboard][grm-dashboard] provides space situational awareness to the operator by consolidating and surfacing the most important information related to contacts and equipment. In addition to this primary usage, the GRM App Suite supports a comprehensive set of secondary tasks for managing contacts and equipment in the [GRM Schedule][grm-schedule] and [GRM Equipment Manager][grm-equipment] apps. You can get an overview of the design work on the [About the GRM Designs page][grm-designs] or use one of the links below to get more information about a particular app.

![](/img/case-studies/grm/grm-dashboard.webp)

[GRM Dashboard][grm-dashboard]

![](/img/case-studies/grm/grm-equipment-manager.webp)

[GRM Equipment Manager][grm-equipment]

![](/img/case-studies/grm/grm-schedule.webp)

[GRM Schedule][grm-schedule]

## TT&C Service UX Design

The UX research for TT&C services resulted in designing the TT&C App Suite that supports ground-to-satellite communications, monitoring constellations, and maintaining spacecraft health. 

The [TT&C Monitor][ttc-monitor] app allows the operator to monitor status, alerts, health and function of an individual satellite and satellite constellations.
![](/img/service-specific-ux-design/ttc/ttc-monitor-app.webp)

[TT&C Monitor App][ttc-monitor]


The [TT&C Command][ttc-command] app allows the operator to send and receive streams of data to and from a spacecraft using a set of commands.
![](/img/service-specific-ux-design/ttc/ttc-command-app.webp)

[TT&C Command App][ttc-command]


The [TT&C Investigate][ttc-investigate] app allows the operator to investigate spacecraft alerts and anomalies and analyze subsystem mnemonics, measurements, limits, etc. 

[TT&C Investigate][ttc-investigate]

You can get an overview of the design work on the [About the TT&C Designs][ttc-designs] page or use one of the links below to get more information about a particular app.
![](/img/service-specific-ux-design/ttc/ttc-investigate-app.webp)


[grm-designs]: /grm-service-ux-design/about-the-grm-designs
[grm-dashboard]: /grm-service-ux-design/grm-dashboard
[grm-equipment]: /grm-service-ux-design/grm-equipment-manager
[grm-schedule]: /grm-service-ux-design/grm-schedule
[ttc-designs]: /ttc-service-ux-design/about-the-ttc-designs
[ttc-monitor]: /ttc-service-ux-design/ttc-monitor
[ttc-command]: /ttc-service-ux-design/ttc-command
[ttc-investigate]: /ttc-service-ux-design/ttc-investigate
