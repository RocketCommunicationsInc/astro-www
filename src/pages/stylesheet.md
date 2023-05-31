---
# draft: true  When draft: true is in frontmatter the page is only available in dev #
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

## Colors

coming soon.


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

<div class="two-col">

:::col

#### First Column

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur fermentum, lectus nec blandit tincidunt, felis orci viverra nisi, nec vehicula enim arcu eget mi. Duis posuere nisl vel enim pharetra, et dapibus lacus viverra. Nulla nec turpis vel tortor fermentum consectetur. Vestibulum in diam vel lorem finibus egestas. Aliquam sed molestie libero. Integer sit amet egestas odio. Phasellus purus augue, maximus sed turpis eu, pretium finibus augue. Quisque sit amet pulvinar tortor. In arcu ligula, laoreet eget consectetur id, feugiat posuere neque.
:::

:::col

#### Second Column

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur fermentum, lectus nec blandit tincidunt, felis orci viverra nisi, nec vehicula enim arcu eget mi. Duis posuere nisl vel enim pharetra, et dapibus lacus viverra. Nulla nec turpis vel tortor fermentum consectetur. Vestibulum in diam vel lorem finibus egestas. Aliquam sed molestie libero. Integer sit amet egestas odio. Phasellus purus augue, maximus sed turpis eu, pretium finibus augue. Quisque sit amet pulvinar tortor. In arcu ligula, laoreet eget consectetur id, feugiat posuere neque.
:::

</div>


### Three Column

<div class="three-col">

:::col

#### First Column

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur fermentum, lectus nec blandit tincidunt, felis orci viverra nisi, nec vehicula enim arcu eget mi. Duis posuere nisl vel enim pharetra, et dapibus lacus viverra. Nulla nec turpis vel tortor fermentum consectetur. Vestibulum in diam vel lorem finibus egestas.

:::

:::col

#### Second Column

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur fermentum, lectus nec blandit tincidunt, felis orci viverra nisi, nec vehicula enim arcu eget mi. Duis posuere nisl vel enim pharetra, et dapibus lacus viverra. Nulla nec turpis vel tortor fermentum consectetur. Vestibulum in diam vel lorem finibus egestas.
:::

:::col

#### Third Column

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur fermentum, lectus nec blandit tincidunt, felis orci viverra nisi, nec vehicula enim arcu eget mi. Duis posuere nisl vel enim pharetra, et dapibus lacus viverra. Nulla nec turpis vel tortor fermentum consectetur. Vestibulum in diam vel lorem finibus egestas.

:::

</div>

### Standard Table

This is the standard table design. There are a couple of variations on pages but those typically just adjust the max width of one of the rows so that the table doesn't distort on mobile.

:::table-overflow
|       | Column 1 | Column 2 |
|-------|----------|----------|
| Row 1 | Content  | Content  |
| Row 2 | Content  | Content  |
:::

## Special Classes

### Notes

:::note

This is a  note, it is a div with the .note class
:::

:::caution

This is a caution note, it is a div with the .caution class
:::

### Code Blocks
This is a `` <code> `` block for html

```html
<div>
	<ul>
		<li>List Item</li>
		<li>List Item</li>
		<li>List Item</li>
	</ul>
</div>
```

This is a `` <code> `` block for javascript

```js
window.addEventListener('click', (event) => {
	// if the click is not on the key make sure it closes
	if (event.target.closest('.-toggle') === null) {
		eventElement.classList.remove('--open')
		eventElement.classList.add('--closed')
		return
	}
})
```
