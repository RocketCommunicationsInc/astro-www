---
# draft: true  When draft: true is in frontmatter the page is only available in dev #
title: Style Guide
description: A (mostly)` comprehensive list of styles/elements used on AstroUXDS
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

Paragraph - 1rem - This is just a normal paragraph of text. [This is a link inside a paragraph of text.](https://astrouxds.com)` It is the default link style for the body of the site.

## Colors Variable

### System Colors

:::color-table
| Color | Variable             | Reference Variable        | Use                                                                  |
|-------|----------------------|---------------------------|----------------------------------------------------------------------|
|       | `--InverseColor`     | `var(--DarkBlue950Color)` | Main text color on light backgrounds                                 |
|       | `--PlaceholderColor` | `var(--Grey500Color)`     | Placeholder color for inputs                                         |
|       | `--PrimaryColor`     | `var(--Neutral000Color)`  | Background of all docs pages and White text used on dark backgrounds |
|       | `--SecondaryColor`   | `var(--Grey300Color)`     | Subtitle color for dark backgrounds                                  |
:::

### Base Colors

:::color-table
| Color | Variable              | Reference Variable          | Use                                         |
|-------|-----------------------|-----------------------------|---------------------------------------------|
|       | `--BaseColor`         | `var(--BrightBlue900Color)` | The dark background of home page containers |
|       | `--BaseHeaderColor`   | `var(--DarkBlue900Color)`   | Not Currently used                          |
|       | `--BaseHoverColor`    | `var(--BrightBlue850Color)` | Not Currently Used                          |
|       | `--BaseSelectedColor` | `var(--DarkBlue700Color)`   | Not Currently Used                          |
:::

### Interactive Colors

:::color-table
| Color | Variable                  | Reference Variable          | Use                                                              |
|-------|---------------------------|-----------------------------|------------------------------------------------------------------|
|       | `--InteractiveColor`      | `var(--BrightBlue500Color)` | Color of borders/text that are interactive                       |
|       | `--InteractiveHoverColor` | `var(--BrightBlue400Color)` | Hover color of text/borders using InteractiveColor               |
|       | `--InteractivePressColor` | `var(--BrightBlue300Color)` | Not currently Used                                               |
|       | `--InteractiveMutedColor` | `var(--BrightBlue700Color)` | Hover/selected background color of interactive blocks (homepage) |
:::

### Surface Colors

:::color-table
| Color | Variable                 | Reference Variable          | Use                                       |
|-------|--------------------------|-----------------------------|-------------------------------------------|
|       | `--SurfaceColor`         | `var(--DarkBlue850Color)`   | Dark background color usually on homepage |
|       | `--SurfaceHeaderColor`   | `var(--DarkBlue900Color)`   | Dark background header color (homepage)   |
|       | `--SurfaceHoverColor`    | `var(--BrightBlue800Color)` | Not currently in use                      |
|       | `--SurfaceSelectedColor` | `var(--DarkBlue700Color)`   | Interactive element background (homepage) |
:::

### Misc colors

:::color-table
| Color | Variable               | hsl/variable               | Use                                                     |
|-------|------------------------|----------------------------|---------------------------------------------------------|
|       | `--ExampleDoColor`     | `hsl(109 82% 39%)`         | Color of border separating Example Do image and text    |
|       | `--ExampleDontColor`   | `hsl(13 99% 50%)`          | Color of border separating Example Don't image and text |
|       | `--CautionBorderColor` | `var(--HotOrange600Color)` | Caution note border color                               |
|       | `--CautionColor`       | `var(--HotOrange600Color)` | Caution note background color                           |
|       | `--NoteBorderColor`    | `var(--DarkBlue500Color)`  | Note border color                                       |
|       | `--NoteColor`          | `var(--DarkBlue500Color)`  | Note background color                                   |
:::

### Reference colors

TODO: we are currently using these colors directly. If we want a design system thinking these should be used in terms of other variables.

:::color-table
| Color | Variable               | HSL                  |
|-------|------------------------|----------------------|
|       | `--BrightBlue200Color` | `hsl(205 88% 90%)`   |
|       | `--BrightBlue300Color` | `hsl(209 100% 86%)`  |
|       | `--BrightBlue400Color` | `hsl(209 100% 79%)`  |
|       | `--BrightBlue500Color` | `hsl(208 100% 65%)`  |
|       | `--BrightBlue600Color` | `hsl(209 61% 52%)`   |
|       | `--BrightBlue700Color` | `hsl(209 57% 39%)`   |
|       | `--BrightBlue800Color` | `hsl(208 49% 21%)`   |
|       | `--BrightBlue850Color` | `hsl(211 45% 14%)`   |
|       | `--BrightBlue900Color` | `hsl(212 37% 10%)`   |
|       | `--DarkBlue400Color`   | `hsl(203 56% 42%)`   |
|       | `--DarkBlue500Color`   | `hsl(202 100% 28%)`  |
|       | `--DarkBlue600Color`   | `hsl(202 100% 22%)`  |
|       | `--DarkBlue700Color`   | `hsl(208 54% 24%)`   |
|       | `--DarkBlue800Color`   | `hsl(209 39% 17%)`   |
|       | `--DarkBlue850Color`   | `hsl(209 39% 17%)`   |
|       | `--DarkBlue900Color`   | `hsl(210 39% 15%)`   |
|       | `--DarkBlue950Color`   | `hsl(213 36% 5%)`    |
|       | `--Grey200Color`       | `hsl(216 31% 94%)`   |
|       | `--Grey300Color`       | `hsl(213 12% 85%)`   |
|       | `--Grey400Color`       | `hsl(214 11% 76%)`   |
|       | `--Grey500Color`       | `hsl(217 11% 68%)`   |
|       | `--Grey600Color`       | `hsl(219 6% 51%)`    |
|       | `--Grey700Color`       | `hsl(216 6% 34%)`    |
|       | `--Grey800Color`       | `hsl(220 5% 24.7%)`  |
|       | `--Grey900Color`       | `hsl(225 5% 16.86%)` |
|       | `--HotOrange600Color`  | `hsl(20, 89%, 36%)`  |
|       | `--Neutral000Color`    | `hsl(0 0% 100%)`     |
|       | `--Orange400Color`     | `hsl(42 100% 67%)`   |
|       | `--Orange600Color`     | `hsl(35 100% 62%)`   |
|       | `--Orange700Color`     | `hsl(33 100% 50%)`   |
|       | `--Pink600Color`       | `hsl(290 100% 30%)`  |
|       | `--Purple300Color`     | `hsl(250 54% 78%)`   |
|       | `--Red500Color`        | `hsl(0 100% 61%)`    |
|       | `--Red800Color`        | `hsl(9 96% 28%)`     |
|       | `--Teal600Color`       | `hsl(181 100% 32%)`  |
:::


<script type="module">
/** add color samples to the tables with colors */
/** Matches a value which is CSS custom property. */
const matchCustomProp = /^--[\w]+/
// transform tables within any available table overflow elements
for (const td of document.querySelectorAll('.color-table td')) {
	const tdContent = td.textContent

	/* Whether the content of the TD matched a CSS custom property. */
	const isTdColor = matchCustomProp.test(tdContent)

	// conditionally add a color sample to the previous td if it is empty
	if (isTdColor && td.previousSibling.textContent == '') {
		const previousTd = td.previousSibling
		
		previousTd.innerHTML = (
			`<color-sample style="--color:var(${tdContent});--border:transparent"></color-sample>`
		)
	}
}
</script>


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
