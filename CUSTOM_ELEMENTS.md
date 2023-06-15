## Custom Elements used on Astro WWW

### Feedback Widget

The Feedback Widget element presents a form to users that is used to capture feedback related to the experience of using Astro.

```html
<a-feedback-widget current-url="/url/of/page/">
  <h3 slot="title">Feedback Form Title</h3>
  <p slot="description">Description of the feedback form.</p>
  <span slot="secondaryButtonName">Clear</span>
</a-feedback-widget>
```

### Icon Panel

The Icon Panel element presents information related to a given icon. It displays a given icon, its name, its associated category, any associated keywords; and it also provides clipboard copy and download functionality.

```html
<icon-panel use="#icon-name"></icon-panel>
```

### Navigation Disclosure

The Navigation Disclosure element presents a set of links associated with a given category within a disclosure interface. It displays the category name, which also serves as a button that is used to show or hide the set of associated links.

```html
<navigation-disclosure>
  <span>Category Name</span>
  <ul>
    <li>
      <a href="/category/page-1/">Category Page 1 of 3</a>
    </li>
    <li>
      <a href="/category/page-2/">Category Page 2 of 3</a>
    </li>
    <li>
      <a href="/category/page-3/">Category Page 3 of 3</a>
    </li>
  </ul>
</navigation-disclosure>
```

### Navigation List

The Navigation List element presents the main navigation within a disclosure interface on smaller width screens. On those smaller screens, it displays a trigram (`☰`) button that is used to show or hide the entire navigation.

```html
<h-navigation-list>
  <ul>
    <li>
      <a href="/page-1/">Page 1 of 3</a>
    </li>
    <li>
      <a href="/page-2/">Page 2 of 3</a>
    </li>
    <li>
      <a href="/page-3/">Page 3 of 3</a>
    </li>
  </ul>
</h-navigation-list>
```

### Slideshow

The Slideshow element presents a set of items by displaying a subset of those items sequentially along the horizontal axis. It provides controls to traverse the visible items, which can also be navigated by swiping or scrolling horizontally within the element.

```html
<h-slideshow>
  <article>
    <img src="/path/to/image.web" alt="Image for Page 1 of 3" />
    <h4><a href="/page-1/">Page 1 of 3</a></h4>
    <p>Description of Page 1 of 3.</p>
  </article>

  <article>
    <img src="/path/to/image.web" alt="Image for Page 2 of 3" />
    <h4><a href="/page-2/">Page 2 of 3</a></h4>
    <p>Description of Page 2 of 3.</p>
  </article>

  <article>
    <img src="/path/to/image.web" alt="Image for Page 3 of 3" />
    <h4><a href="/page-3/">Page 3 of 3</a></h4>
    <p>Description of Page 3 of 3.</p>
  </article>
</h-slideshow>
```

### Color Swab

The Color Swab element presents a visualization for a given color as it is written out. Before the written out color, it displays a small box filled with the given color.

```html
<color-swab>HotPink</color-swab>
```
