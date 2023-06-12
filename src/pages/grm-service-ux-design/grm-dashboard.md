---
tags: ["grm", "egs"]
path: /grm-service-ux-design/grm-dashboard
date: Last Modified
layout: project:layouts/docs/docs-layout.astro
title: GRM Dashboard
description: Helps operators maintain situational awareness.
---

:::note
The images depicted on this page use the color palette and fonts from Astro 4. All new projects should use Astro 7 colors and fonts to be considered an Astro application. Refer to this section for general user experience guidance only, _not_ visual design guidance.
:::
[Launch GRM Dashboard Sample App](https://grm-dashboard.astrouxds.com/) | [Design Materials and Source Code](/grm-service-ux-design/grm-dashboard/#design-materials-and-source-code)

Given the large number of satellite contacts and equipment assets that operators are responsible for, maintaining situational awareness poses a significant challenge. Operators must be able to quickly identify equipment issues and resolve them so that there are no missed opportunities to communicate with satellites. The GRM Dashboard app was designed with this goal in mind. As the operators’ primary GRM app, it would constantly occupy one of their large displays.

![GRM Dashboard App](/img/service-specific-ux-design/grm-dashboard/grm-dashboard-app.webp)

There are three main areas of the GRM Dashboard app: the Global Status Bar, the Alerts pane, and a tabbed content area that displays either the Contacts page or the Equipment page. The key elements are described below, but you can find much more design and task flow detail in the GRM Design Specifications and Wireframes documents. You can also launch the GRM Dashboard Sample App to explore the design interactively.

![GRM Dashboard App Details](/img/service-specific-ux-design/grm-dashboard/grm-dashboard-app-details.webp)

## Global Status Bar

As outlined on the [About GRM Designs](/grm-service-ux-design/about-the-grm-designs) page, each of the apps in the GRM Suite is designed to occupy its own browser window, allowing operators to focus on the task at hand. But by virtue of being integrated into a suite, the apps share common functionality, such as a single login. Much of the shared functionality is provided in the [Global Status Bar](/components/global-status-bar), an Astro component featured in all three apps. Though the status bar contents vary somewhat between apps in order to best support each app’s individual workflows, all contain a [Clock](/components/clock), [Monitoring Icons](/components/icons-and-symbols), and an App Switcher Menu that allows operators to transition quickly from one GRM task flow to another.

![GRM Dashboard App Details](/img/service-specific-ux-design/grm-dashboard/grm-dashboard-global-status-bar-details.webp)

1. **App Switcher Menu** - The App Switcher Menu allows the user to launch new instances of different GRM apps, sign in/sign out, and edit preferences.
2. **Global Clock** - Time is central to many GRM service task flows, so it is included in the Global Status Bar in all GRM apps.
3. **Monitoring Icons** - The Dashboard app includes Upcoming Contacts Allocated (UCA) and Software status indicators, as well as status and alert counts for each of the top categories in the equipment hierarchy.

## Alerts

The Alerts panel provides operators with a roll-up of issues across the ground system, satellite vehicles, and satellite subsystems. Operators can filter the alerts by Severity and Category, allowing them to quickly identify the most critical issues or focus in on particular areas of the global system. This allows operators to efficiently track their workflow and keeps the Alerts panel more sparsely populated, so they’ll be more likely to notice when new alerts come in.
:::two-col
![GRM Dashboard Alerts Details](/img/service-specific-ux-design/grm-dashboard/grm-dashboard-alert-details.webp)

1. **Active Alert Hero Number** - Shows number of active alerts at a glance.
2. **Filter Select menus** - Filters alert list by severity and category.
3. **Expandable List Items** - Expands to show alert details and call-to-action (if applicable).
4. **Investigate** - Sends operators to a page with full alert details and actions for resolving the alert.
5. **Acknowledge/Dismiss** - Acknowledges or dismisses alerts.
   :::

## Contacts

The Contacts tab allows operators to view all contacts configured in the GRM app. Contacts can be filtered by status to allow operators to quickly identify those that failed or are currently executing. The contacts are displayed in the table along with important information such as Ground Station, Equipment String, and AOS/LOS times, but can also be expanded to present additional detail. The Contacts Summary at the bottom provides operators with a view of contact counts over time, color coded by status.

![GRM Dashboard Contacts Details](/img/service-specific-ux-design/grm-dashboard/grm-dashboard-contact-details.webp)

1. **Contacts Hero Numbers** - Shows number of executing contacts at a glance.
2. **Segmented Button Filter** - Filters Current Contacts by All, Executing, or Failed.
3. **Histogram** - Y-axis measures contact counts, while the x-axis represents time.
4. **Histogram Filters** - Filters may be applied to one, many or all of the Contact States; Upcoming, Executing, Complete, Failed.
5. **Zoom Control** - Operators can drag the slider to zoom in or out of the Histogram

## Equipment

The Equipment tab provides operators with a usage summary of the major equipment categories in their ground systems. At a glance, operators can see overall what the current percentage of the equipment is in use, idle or inoperable. This data will help operators identify shortages in particular areas or be used to develop contact schedules that drive more efficient equipment utilization. In addition to the current snapshot displayed in the donut charts at the top of the panel, operators can also view how this data has trended over time at the bottom of the panel.

![GRM Dashboard Equipment Details](/img/service-specific-ux-design/grm-dashboard/grm-dashboard-equipment-details.webp)

1. **Equipment Allocation** - Shows percentage of usage across top line categories at a glance.
2. **Line Chart** - Y-axis displays percent of equipment in a given category allocated and x-axis represents time. A “Usage Threshold” value may be defined to identify equipment that exceeds this limit.
3. **Trending Equipment Status Filters** - Filters may be applied to one, many or all of the equipment categories defined.

## Alert Details

If operators choose to drill into an alert via the Investigate button in the Alerts panel, an Alert Details page is displayed in the main content area. The content of the page changes somewhat depending on whether the alert pertains to a contact or a piece of equipment, but each variant allows operators to view additional detail on the alert, dismiss, acknowledge it, or take some action to remedy it. The image below shows an example of the Alert Details page for a contact-related alert; you can find information on the equipment variant along with relevant task flows in the [GRM Design Specifications](/grm-service-ux-design/grm-dashboard/#design-materials-and-source-code) and Wireframes documents.

![GRM Dashboard Alert Details](/img/service-specific-ux-design/grm-dashboard/grm-dashboard-contact-alert-details.webp)

1. **Breadcrumb Navigation** - returns the user to the Dashboard view.
2. **Alert Details** - contains information relevant to the particular alert.
3. **Acknowledge/Dismiss** - operators can acknowledge or dismiss the alert.
4. **Contact Details** - because the alert in the example above is related to a contact, information relevant to that contact is displayed here.
5. **Status Information** - in this example, the equipment string indicates that an antenna is in a critical status for this contact.
6. **Event Log** - displays the events leading up to the alert, which could be useful in troubleshooting.
7. **Modify Button** - puts the contact in an editable mode to allow operators to resolve the issue, in this case by modifying the Equipment String.

## Task Flow Example - Modify Equipment String

Below is an animated walkthrough of a representative task flow using the GRM Dashboard app. In this flow, the operator notices a critical alert for an upcoming contact, investigates it via the Contact Alert Details page and then resolves the issue by selecting an alternative piece of equipment to use for the contact.

<div markdown="1">
 <figure>
  <a href="#demo" class="demo" name="close">
   <span class="icon-play"></span>
   <img src="/img/service-specific-ux-design/grm-dashboard/grm-dashboard-modify-string-placeholder.webp"
   alt="GRM Dashboard demo" />
  </a>
 </figure>
 <a href="#close" class="lightbox" id="demo" markdown="1">
  <img src="/img/service-specific-ux-design/grm-dashboard/grm-dashboard-modify-string.gif" alt="GRM Dashboard" />
 </a>
</div>

## Design Materials and Source Code

Below are design and development resources to get you started on an app that supports GRM services. Note that there are some discrepancies between the design documents and the [GRM Dashboard Sample App](https://grm-dashboard.astrouxds.com/) due to design improvements that were introduced late in the app development cycle.

:::table-overflow
| Resources                                                                                                                                       | Description                                                                                                                                                |
|-------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [GRM Design Specifications (pdf)](http://com.rocketcom.astrouxds.s3.amazonaws.com/attachments/cjx3r384i2gbihmqnxcwrq25d-grm-specifications.pdf) | The GRM Design Specification contains information on use cases, task flows, UX research and wireframes for key features of the GRM App Suite.              |
| [GRM Design Wireframes (pdf)](http://com.rocketcom.astrouxds.s3.amazonaws.com/attachments/cjtsx349t073s4iqnxbejjwg6-grm-wireframes.pdf)         | The GRM Design Wireframes document contains the complete set of wireframes (mid-fidelity renderings) of the screens designed for the GRM App Suite.        |
| [App Source Code (Git Repository)](https://bitbucket.org/rocketcom/grm-sample-apps-dashboard/src/master/)                                       | The source code Git repository and other useful documentation for the GRM Dashboard App is hosted at bitbucket.org so that you can check it out in detail. |
:::
