---
draft: true # When draft: true is in frontmatter the page is only available in dev #
title: Style Guide
description: A (mostly) comprehensive list of styles/elements used on AstroUXDS
layout: project:layouts/component-docs/component-docs-layout.astro
---

## Text Styles

# h1 - 4rem

h1s are only used in the header of the page. In the body they have no style and should not be used.

<h2>h2 - 2.25rem</h2>

H2s are the primary heading in the body. They denote a new section on the page. They are the only element with 60px of margin above them and automatically propagate to the right side page navigation if there is more than one h2 on the page. *I have intentionally removed the link from this h2.

### h3 - 1.75rem

H3s are the secondary header in the body of the page. They do not propagate to the sidebar and have 20px of margin below them like all other elements.

#### h4 - 1.5rem

##### h5 - 1.5rem

H4s and H5s are the same at this time. H5s are not typically used. H4s are preferred.

1. First Item 
2. Second Item
3. Third Item
4. Forth Item
5. Fifth Item

- First Item 
- Second Item
- Third Item
- Forth Item
- Fifth Item

Paragraph - 1rem - This is just a normal paragraph of text. [This is a link inside a paragraph of text.](https://astrouxds.com) It is the default link style for the body of the site.

## Images

There are several sizes of images on the site but they all follow the same general pattern. The aspect ratio for images is around 16 x 9 but the height of the image can vary based on need.

### Small Image

Typically used for do/don't images.

![](/img/stylesheet/small-image.png)

### Medium Image

These images match the width of the text content.

![](/img/stylesheet/medium-image.png)

### Large Image

These images match the width of tables

<img src="/img/stylesheet/large-image.png" alt="" loading="lazy" width="920" height="518" style="max-width: 100%; margin-bottom: 20px;">

### Extra Large Image

These images are the full width of tthe content area.

<img src="/img/stylesheet/xl-image.png" alt="" loading="lazy" width="1016" height="572" style="max-width: 100%; margin-bottom: 20px;">

## Columns & Tables

We have two different types of columns for use on the site. 2-column width and 3-column width. These both automatically shift at various breakpoints for responsiveness.

### Two Column

:::two-col

:::


### Three Column

:::three-col

:::col
:::

:::col
:::

:::col
:::

:::



