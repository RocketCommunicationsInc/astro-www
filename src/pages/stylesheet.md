---
#draft: true   When draft: true is in frontmatter the page is only available in dev #
title: Style Guide
description: A (mostly) comprehensive list of styles/elements used on AstroUXDS
layout: project:layouts/component-docs/component-docs-layout.astro
---

## Text Styles

:::note

<strong>A note on H1s:</strong><br />
H1s appear ONLY once in the header of the page and should not be used in the body. They are 4rem.
:::

<h2>h2 - 2.25rem</h2>

H2s are the primary heading in the body. They denote a new section on the page. They are the only element with 60px of margin above them and automatically propagate to the right side page navigation if there is more than one h2 on the page. *I have intentionally removed the link from this h2.

### h3 - 1.75rem

H3s are the secondary header in the body of the page. They do not propagate to the sidebar and have 20px of margin below them like all other elements.

#### h4 - 1.5rem

##### h5 - 1.5rem

H4s and H5s are the same at this time. H5s are not typically used. H4s are preferred.

### Lists

:::two-col

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
:::

### Paragraphs and links

Paragraph - 1rem - This is just a normal paragraph of text. [This is a link inside a paragraph of text.](https://astrouxds.com)` It is the default link style for the body of the site.

## Spacing

### `--step` and `--rpx`
We use a 4px grid system. There are two special variables that you can use in our css: `--step` and `--rpx` you don't use these as you would normal variables. Instead you can simply write something like `margin: 2--step`  or `border-width: 1--rpx` and the site will compile it for you.

<div class="two-col">

:::col

#### Steps
1 `--step` is equivalent to .25rem or 4px. You can add any number in front to make a multiple of 1 --step. For example:

- `1--step` = 4px (0.25rem)
- `2--step` = 8px (0.5rem)
- `3--step` = 12px (0.75rem)
- etc..
:::

:::col

#### Rpx

`--rpx` is similar to `--step` except that it represents 0.0625rem or 1px. For example:

- `1--rpx` = 1px (.0625rem)
- `2--rpx` = 2px (.125rem)
- `3--rpx` = 3px (.1875rem)
- etc...
:::
</div>

### General spacing rules

- New sections are defined by H2s they have 60px of space above them.
- Within a section, each element should have 20px of space between it and the next element.
- Check out this [Figma](https://www.figma.com/file/LZaOyLpIMq3ZGZbx5X7ium/ASTROUXDS.com---Site-Redesign?type=design&node-id=2499-28393&t=76WRDonfbAmlcD1O-0) for specifics. (Must be logged in to figma)


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
|       | `--BaseColorDefault`  | `var(--DarkBlue800Color)`   | Dark table background color                 |
|       | `--BaseHeaderColor`   | `var(--DarkBlue900Color)`   | Dark table header background                |
|       | `--BaseHoverColor`    | `var(--BrightBlue850Color)` | Not Currently Used                          |
|       | `--BaseSelectedColor` | `var(--DarkBlue700Color)`   | Not Currently Used                          |
:::

### Interactive Colors

:::color-table
| Color | Variable                  | Reference Variable          | Use                                                                           |
|-------|---------------------------|-----------------------------|-------------------------------------------------------------------------------|
|       | `--InteractiveColor`      | `var(--BrightBlue500Color)` | Color of borders/text that are interactive in dark areas(homepage/navigation) |
|       | `--InteractiveHoverColor` | `var(--BrightBlue400Color)` | Hover color of text/borders using InteractiveColor (homepage/navigation)      |
|       | `--InteractivePressColor` | `var(--BrightBlue300Color)` | Not currently Used                                                            |
|       | `--InteractiveMutedColor` | `var(--BrightBlue700Color)` | Hover/selected background color of interactive blocks (homepage)              |
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
| Color | Variable               | HSL                  | Use                                                                                                                                                                        |
|-------|------------------------|----------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|       | `--BrightBlue200Color` | `hsl(205 88% 90%)`   | icon background color(icon library), component playground behind select indicator                                                                                          |
|       | `--BrightBlue300Color` | `hsl(209 100% 86%)`  | --InteractivePressColor (not currently use)                                                                                                                                |
|       | `--BrightBlue400Color` | `hsl(209 100% 79%)`  | --InteractiveHoverColor  (homepage)                                                                                                                                        |
|       | `--BrightBlue500Color` | `hsl(208 100% 65%)`  | --InteractiveColor  (homepage)                                                                                                                                             |
|       | `--BrightBlue600Color` | `hsl(209 61% 52%)`   | Compliance t2 tag color                                                                                                                                                    |
|       | `--BrightBlue700Color` | `hsl(209 57% 39%)`   | --InteractiveMutedColor (homepage)                                                                                                                                         |
|       | `--BrightBlue800Color` | `hsl(208 49% 21%)`   | --SurfaceHoverColor (not currently used)                                                                                                                                   |
|       | `--BrightBlue850Color` | `hsl(211 45% 14%)`   | Code Block Background Color                                                                                                                                                |
|       | `--BrightBlue900Color` | `hsl(212 37% 10%)`   | --BaseColor (homepage)                                                                                                                                                     |
|       | `--DarkBlue400Color`   | `hsl(203 56% 42%)`   | Component Playground border color of select menus and text fields (maybe retire this and use 500 instead)                                                                  |
|       | `--DarkBlue500Color`   | `hsl(202 100% 28%)`  | Playground: Border colors  all other components, base color of navigation items, feedback widget borders & Header: tabs hover/current & Note color & Aside Highlight color |
|       | `--DarkBlue600Color`   | `hsl(202 100% 22%)`  | Playground: Border hover color for switch, select, and text. Also navigation icons.                                                                                        |
|       | `--DarkBlue700Color`   | `hsl(208 54% 24%)`   | Compliance hover color, support page submit button, --SurfaceSelectedColor, --BaseSelectedColor (not currently used)                                                       |
|       | `--DarkBlue800Color`   | `hsl(209 39% 17%)`   | --BaseColorDefault, page header text color, playground: background color, icon library: sidepanel background, spec pages: images background color                          |
|       | `--DarkBlue850Color`   | `hsl(209 39% 17%)`   | --SurfaceColor                                                                                                                                                             |
|       | `--DarkBlue900Color`   | `hsl(210 39% 15%)`   | --SurfaceHeaderColor, --BaseHeaderColor can combine these two variables and name them something else                                                                       |
|       | `--DarkBlue950Color`   | `hsl(213 36% 5%)`    | --InverseColor                                                                                                                                                             |
|       | `--Grey200Color`       | `hsl(216 31% 94%)`   | Playground: panel header background, text, radio, switch, select(off) background & Header background. Icon search background, table header background                      |
|       | `--Grey300Color`       | `hsl(213 12% 85%)`   | --SecondaryColor, also default table borders, and the icon library sidepanel text color                                                                                    |
|       | `--Grey400Color`       | `hsl(214 11% 76%)`   | Icon Library search border color (recommendation: replace with something close)                                                                                            |
|       | `--Grey500Color`       | `hsl(217 11% 68%)`   | --PlaceholderColor, also complicance `deprecated` tag color and close button on icon library sidebar                                                                       |
|       | `--Grey600Color`       | `hsl(219 6% 51%)`    |                                                                                                                                                                            |
|       | `--Grey700Color`       | `hsl(216 6% 34%)`    |                                                                                                                                                                            |
|       | `--Grey800Color`       | `hsl(220 5% 24.7%)`  |                                                                                                                                                                            |
|       | `--Grey900Color`       | `hsl(225 5% 16.86%)` |                                                                                                                                                                            |
|       | `--HotOrange600Color`  | `hsl(20, 89%, 36%)`  |                                                                                                                                                                            |
|       | `--Neutral000Color`    | `hsl(0 0% 100%)`     |                                                                                                                                                                            |
|       | `--Orange400Color`     | `hsl(42 100% 67%)`   |                                                                                                                                                                            |
|       | `--Orange600Color`     | `hsl(35 100% 62%)`   |                                                                                                                                                                            |
|       | `--Orange700Color`     | `hsl(33 100% 50%)`   |                                                                                                                                                                            |
|       | `--Pink600Color`       | `hsl(290 100% 30%)`  |                                                                                                                                                                            |
|       | `--Purple300Color`     | `hsl(250 54% 78%)`   |                                                                                                                                                                            |
|       | `--Red500Color`        | `hsl(0 100% 61%)`    |                                                                                                                                                                            |
|       | `--Red800Color`        | `hsl(9 96% 28%)`     |                                                                                                                                                                            |
|       | `--Teal600Color`       | `hsl(181 100% 32%)`  |                                                                                                                                                                            |
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
| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Row 1    | Content  | Content  |
| Row 2    | Content  | Content  |
:::

### Dark Table

<div class="table-overflow table-dark">

| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Row 1    | Content  | Content  |
| Row 2    | Content  | Content  |
</div>

## Special Components

### Notes

:::note

This is a  note, it is a div with the .note class. [Link](#)
:::

:::caution

This is a caution note, it is a div with the .caution class. [Link](#)
:::

### Do/Don't

Many component pages have specific do/don't images. These are usually side by side in a two column layout.

:::two-col

![Do: Add 'Do:' in the front of this image](/img/stylesheet/small-image.png "Do:  Add Do: to the front of this image")

![Don’t: Add it in front of this one. Add 'Don't:' instead](/img/stylesheet/small-image.png "Don’t: Add 'do' in front of this one. Add 'Don't:' instead")

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
