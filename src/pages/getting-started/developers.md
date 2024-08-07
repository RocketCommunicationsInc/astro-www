---
layout: project:layouts/docs/docs-layout.astro
title: 'Getting Started for Developers'
description: The Astro UXDS Web Component library provides a starting point to build in-browser space app experiences and custom applications following today’s web development best practices.
---

The Astro UXDS Web Components are designed to be as platform and implementation-agnostic as possible, easy to implement or extend in existing projects, and generic by default. Astro UXDS Web Components adhere to Semantic Versioning. You can read more about our policy on breaking changes on the [releases](/releases/#web-component-breaking-changes) page.

:::note
You can view all our developer documentation on **[Storybook](https://astro-components.netlify.app/)**.
:::

## Astro Components

In an effort to provide as close to native a development experience as possible, we’ve provided a set of [Stencil-powered](https://stenciljs.com) [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components) distributed in a single packages on [npm](https://www.npmjs.com/package/@astrouxds/astro-web-components). You can also see the full source code here and instructions for importing the components in a typical NodeJS project [on GitHub](https://github.com/RocketCommunicationsInc/astro/blob/main/packages/web-components/README.md).

## Astro Icons, Fonts and Colors

We recognize that not all space application development projects are tooled for utilizing Web Components; you can leverage our [Design Tokens](/design-tokens/getting-started/) to create your own components using the Astro Visual Design Language.

You may also view a component's specifications under their [Specifications Tab](/components/button/specs/).

Icon assets are available as SVGs via the [Astro Github Repository](https://github.com/RocketCommunicationsInc/astro/tree/main/packages/web-components/src/icons) or export to the format and size you need from the [Astro Icons Figma library](https://www.figma.com/community/file/1022883566772542677).

Astro uses the freely available [Roboto](https://fonts.google.com/specimen/Roboto) font.

## Astro Storybook and Sample Apps

You can review the latest versions of the web components at the [Astro Storybook](https://astro-components.netlify.app/?path=/story/astro-uxds-welcome-start-here--page). The Astro development team uses Storybook as an environment for building and demonstrating the capabilities of each component. For online examples of full Astro app experiences, check out these R2C2 Service-Specific sample experiences:

:::table-overflow
| Ground Resources Management | Telemetry, Tracking, and Control |
|-------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------|
| [Dashboard](/grm-service-ux-design/grm-dashboard/) - <button data-app="GRM" type="button" class="p-source-code-dialog-open">Request Source Code Access</button> | [Monitor](/ttc-service-ux-design/ttc-monitor/) - <button data-app="TT&C" type="button" class="p-source-code-dialog-open">Request Source Code Access</button> |
| [Equipment Manager](/grm-service-ux-design/grm-equipment-manager/) - <button data-app="GRM" type="button" class="p-source-code-dialog-open">Request Source Code Access</button> | [Command](/ttc-service-ux-design/ttc-command/) - <button data-app="TT&C" type="button" class="p-source-code-dialog-open">Request Source Code Access</button> |
| [Schedule](/grm-service-ux-design/grm-schedule/) - <button data-app="GRM" type="button" class="p-source-code-dialog-open">Request Source Code Access</button> | [Investigate](/ttc-service-ux-design/ttc-investigate/) - <button data-app="TT&C" type="button" class="p-source-code-dialog-open">Request Source Code Access</button> |
:::

:::note
These examples use a previous release of Astro, and are not intended as boilerplates for building new applications. See below for easy ways to get started building Astro web applications.
:::

## R2C2 Compliance

The Astro team has worked with R2C2 to establish the R2C2 Compliance requirements for developers targeting the R2C2 Platform. These requirements are specific to R2C2 development; these requirements are based off of common best practices and accessibility guidance and it is highly recommended for all users to incorporate them into their applications.

## Offline Development Resources

This website and its contents are provided as separate downloadable files for the convenience of developers and designers working in closed environments. Designer and developer assets are provided as downloads on their respective ‘Getting Started’ sections:

[Gzip Archive of Astro](https://github.com/RocketCommunicationsInc/astro/releases)

## Reporting Bugs

If you’ve found a possible bug in Astro documentation or code, open a [support ticket](https://github.com/RocketCommunicationsInc/astro/issues) to let us know.

## Support

Each page on astrouxds.com has a support button at the bottom of the page for technical support.
