---
tags: ["ttc", "egs", "r2c2"]
path: /ttc-service-ux-design/about-the-ttc-designs
date: Last Modified
layout: project:layouts/docs/docs-layout.astro
title: Telemetry, Tracking, and Command
description: The purpose of a Telemetry, Tracking, and Command (TT&C) system is to support missions requiring communication between satellites and ground systems.
---

Essential aspects of a TT&C system include tracking satellites, monitoring and maintaining state of health (SOH) via telemetry data, and transmitting commands to achieve mission objectives. Analyzing existing systems and task flows revealed three main components for supporting TT&C services:

- **Monitor Constellation** - Monitor the status, health, and function of a satellite constellation and the systems it relies on.
- **Command Satellites** - Send and receive streams of data to and from a spacecraft, done using a set of commands arranged into a pass plan.
- **Investigate Anomalies** - Investigate spacecraft alerts and anomalies, as well as analyze subsystem mnemonics, measurements, value limits, etc.

The animated graphic, TT&C Phases, depicts a simplified overview of TT&C task flow phases and activities.

<div markdown="1">
 <figure markdown="1">
  <a href="#demo" class="demo" name="close">
   <span class="icon-play"></span>
   <img src="/img/service-specific-ux-design/ttc/ttc-phases-placeholder.png" markdown="1"
   alt="TT&C Phases" />
  </a>
 </figure>
 <a href="#close" class="lightbox" id="demo">
  <img src="/img/service-specific-ux-design/ttc/ttc-phases.gif" alt="TT&C Phases" />
 </a>
</div>

## UX Research Findings

UX research conducted in collaboration with users and domain experts on existing TT&C workflows and systems found that:

- There are operational differences based on mission, but the job of interacting with TT&C solutions is in the hands of Satellite Systems Operators (SSO) or Satellite Vehicle Operators (SVO). These operators can range from entry-level to advanced in terms of skill and engineering knowledge and generally work in a control center environment using a dedicated computer system with 2 or 3 large displays.
- The majority of operators’ TT&C activities take place when a target satellite is within contact range, but there are activities to be completed between contacts, including preparing for contact with the next satellite in the constellation.
- Accomplishing all the necessary tasks during a pass (when the satellite is within contact) can require switching between many windows or workstations to access controls and information.
- Current TT&C solutions lack a centralized place for operators to view important information at-a-glance.
- Operators are responsible for multiple satellites and there is a limited window to communicate with each, so it is imperative that they be able to perform their tasks quickly and with a minimum of cognitive load.
  The software used for these systems often appears dated and visually disjointed.

## UX Design and Sample Apps

The UX research and follow-up design iterations with operators and stakeholders produced a suite of three TT&C Sample Apps. Each suite app occupies a separate browser window, allowing operators to focus on a task while still being integrated into a suite designed to share functionality and support common workflows. 


### TT&C App Suite

:::two-col

![TT&C Application Suite](/img/service-specific-ux-design/ttc/ttc-suite-apps.webp)

:::col
The TT&C App Suite comprises three integrated apps: Monitor, Command, & Investigate.

- [TT&C Design Specifications (pdf)](/pdf/ttc-specifications.pdf)
- [TT&C Wireframes (pdf)](/pdf/ttc-wireframes.pdf)
  :::

### TT&C Monitor

:::two-col

![TT&C Monitor App](/img/case-studies/tt&c/ttc-monitor-app.webp)

:::col
The TT&C Monitor app allows operators to monitor status, alerts, health, and function of an individual satellite and satellite constellations.

- [Overview of TT&C Monitor](/ttc-service-ux-design/ttc-monitor)
- [Launch TT&C Monitor Sample App](https://monitor-ttc.netlify.app)
- [App Source Code (Git Repository)](https://github.com/RocketCommunicationsInc/ttc-monitor-react)
  :::

### TT&C Command

:::two-col

![TT&C Command App](/img/service-specific-ux-design/ttc/ttc-command-app.webp)

:::col
The TT&C Command app allows operators to send and receive streams of data to and from a spacecraft using a set of commands, often referred to as a pass plan.

- [Overview of TT&C Command](/ttc-service-ux-design/ttc-command)
- [Launch TT&C Command Sample App](https://ttc-command-react.netlify.app/)
- [App Source Code (Git Repository)](https://github.com/RocketCommunicationsInc/ttc-command-react)

:::

### TT&C Investigate

:::two-col

![TT&C Schedule App](/img/service-specific-ux-design/ttc/ttc-investigate-app.webp)

:::col
The TT&C Investigate App allows operators to investigate spacecraft alerts and anomalies and analyze subsystem mnemonics, measurements, limits, etc.

- [Overview of TT&C Investigate](/ttc-service-ux-design/ttc-investigate)
- [Launch TT&C Investigate Sample App](https://ttc-command-react.netlify.app)
- [App Source Code (Git Repository)](https://github.com/RocketCommunicationsInc/ttc-command-react)
  :::
