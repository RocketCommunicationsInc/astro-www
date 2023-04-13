---
path: /platforms/astro-for-grafana
date: Last Modified
layout: project:layouts/docs/docs-layout.astro
title: Astro for Grafana
---

# Astro for Grafana

Astro for Grafana extends the Astro Space UX Design System to the Grafana dashboard environment, offering select Astro colors and components.

## Toolkits

Astro for Grafana is implemented as an open source Grafana plugin available in two forms.

* grafana-theme is for self-hosted environments. Code and documentation are on [GitHub](https://github.com/RocketCommunicationsInc/grafana-theme).

* Astro Theme is packaged for Grafana Cloud and is available in Grafana’s [plugin store](https://grafana.com/grafana/plugins/rocketcom-astrotheme-panel/).

The plugin is based on Astro 7 and Astro Design Tokens and requires Grafana 9.1.6.

## Features

* Light and dark Astro background colors

* Astro [typography](https://www.astrouxds.com/design-guidelines/typography/)

* Optional [Classification Marking](https://www.astrouxds.com/components/classification-markings/)

* Optional [Clock](https://www.astrouxds.com/components/clock/)

## Sample Apps
<style>
    figcaption a{
        text-decoration: underline;
        text-decoration-color:var(--LinkColor);
    }
</style>
![](/img/platforms/grafana-sample-dashboard.png)
<figcaption>A <a href="https://rocketcom.grafana.net/public-dashboards/2fb84c7af5064b51a2c13578e5567980?orgId=1">sample dashboard</a> shows the plugin in action, along with some Astro themed data visualizations.</figcaption>

