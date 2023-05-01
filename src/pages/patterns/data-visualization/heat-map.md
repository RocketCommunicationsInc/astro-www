---
title: Heat Map
description: A heat map is a graphical representation of the relationship between two variables based on a third.
tags: resources
path: /patterns/data-visualization/heat-map
date: Last Modified
layout: project:layouts/component-docs/component-docs-layout.astro
---

A heat map is a graphical representation of the relationship between two variables based on a third. It is called a heat map because it relies on a color scale to categorize the variables, such as red for hot and blue for cold. These colors can be narrowed into shades, such as bright red for low.

Operators use heat maps to easily identify patterns and trends in large datasets. Additionally, they use them to visualize categorical or numerical data of any type and to represent a range of metrics, such as frequency counts and summary statistics (e.g., mean or median).

For example, a heat map of aircraft performance data could show the correlation between flight altitude and fuel consumption, using a color scale to indicate engine temperature over time.

Ultimately, a heat map allows Operators to make data-informed decisions.

## Constructing a Heat Map

When constructing a heat map, the data must be binned (or divided) to form the grid cells where a color or shade is assigned based on each cell’s numerical or relative value and then plotted on the X-axis and Y-axis.

Cell colorings can correspond to a range of metrics. In certain applications, it is also possible for cells to be colored based on non-numeric values (e.g., general qualitative levels of low, medium, high).

A good way to begin is to visualize a table with color encoding on top of the cells.

## Best Practices

To create a heat map that clearly and effectively communicates the presented data:

- **Consider the audience** and design the heat map accordingly. For example, experts will be able to interpret a complex heat map more so than amateurs.
- **Choose the appropriate size and resolution** to ensure the heat map is easy to read and interpret.
- **Select a color scale suitable** for the represented data. For example, data representing temperature should range from blue (cold) to red (hot).
- **Use a consistent color scale** within a heat map so the viewer can easily compare data points.
- **Pick a limited number of colors** to ensure the heat map is easy to interpret.
- **Provide a legend** that explains the meaning of the color scale.
- **Clearly label and annotate data** so the viewer knows what it represents and can easily interpret it.
- **Sort levels by similarity or value** to clearly grasp patterns in data, such as sorting categories by average cell value or by grouping and clustering similar values.
- **Experiment with tick marks for label association and cell sizes** to aid in reading the data and to prevent overcrowding.
- **Include tools that allow for interactivity** so the viewer can easily explore the data, such as a zoom control, filters, and type-ahead search.

## Common Heat Maps

**Matrix Heat Map**

A matrix heat map, also known as a correlation matrix heat map, is a visual representation of data that uses color to indicate the relationship between different elements. It is commonly used to display the correlation between multiple variables in large and complex datasets, making it easy to identify patterns and relationships. The different color shades provide an easy way to understand the correlation strength between variables represented by the corresponding row and column, which aids in analyzing user behavior and making data-driven design decisions.

For example, a matrix heat map is used to display the data transmission capacity between satellites. The rows and columns of the matrix represent different satellites, while the cells display the amount of data that can be transmitted between the satellites. The color coding represents the data transmission rate: green for high, orange for medium, bright red for low, and dark red for very low.
<style>
	.heat-map-table{
		margin-bottom: 20px;
		&
	}
</style>
:::heat-map-table
|             | Satellite 1 | Satellite 2                          | Satellite 3                          | Satellite 4                          |
|:------------|:------------|:-------------------------------------|:-------------------------------------|:-------------------------------------|
| Satellite 1 |             | <span style="color:#FF8C00">#</span> | <span style="color:#00AD23">#</span> | <span style="color:#FF5F60">#</span> |
| Satellite 2 |             |                                      | <span style="color:#00AD23">#</span> | <span style="color:#FF3838">#</span> |
| Satellite 3 |             |                                      |                                      | <span style="color:#FF8C00">#</span> |
| Satellite 4 |             |                                      |                                      |                                      |
:::

**Clustered Heat Map**

A clustered heat map groups similar rows or columns based on the similarity of their values. This allows for patterns and trends within the data to be more easily identified. This type of heat map also identifies patterns and relationships that may not be immediately obvious.

For example, a clustered heat map is used to analyze data from multiple satellites, comparing their capabilities and telemetry data.

A more detailed real-world example of a clustered heat map used for an aerospace application is in the analysis of satellite imagery. In this scenario, a satellite captures images of a certain area of the Earth's surface and the image data is then processed to extract information (e.g., land use, vegetation cover, and land surface temperature). A clustered heat map would then be used to visualize this information and identify patterns and trends in the data. The map would show different clusters of land use, vegetation cover, and land surface temperature; these clusters could then be color-coded to indicate each type, which would help to identify areas of land use patterns, high vegetation density, and land surface temperature.

**2D Density Plot**

A 2D density plot uses the visual language of color to associate values with positions, like grid-based heat maps, but without the constraint of a grid structure. It is frequently used in website tracking tools to study user interactions, such as clicks and scroll depth. Each tracking event is associated with a position and a numeric value, which is accumulated across all events and plotted with an associated color scale.

An example of using a 2D density plot to visualize data is showing mouse click distribution on a webpage. Each click is recorded as a point on the plot, with the color of the point representing the number of clicks at that location. The resulting plot will show which areas of the page the users visited the most and the least, which helps website designers optimize the layout of their pages and identify areas that need more attention.

## Related Visualization

**Choropleth**

A choropleth is a type of data visualization that uses shading or patterns to indicate the relative density of a particular variable within a given area. It associates numeric values with colored areas on a map. Like a heat map, choropleths use color to encode values. These values, however, are associated with a geographic region rather than a strict grid.

As a visualization, it is often used to show the distribution of a particular variable across a geographical area (e.g., population density, GDP, and crime rate). The variable is usually represented by colors or patterns, with different shades or patterns indicating different levels of the variable.

A simple real-world example of a choropleth would be a map of a country showing the population density of each of its regions or states. According to population density, each region or state would be displayed in a specific shade. For example, regions or states with a higher population density would be in a darker shade than regions or states with a lower population density, making it a useful tool for identifying areas of high or low population density and for comparing different regions or states.
