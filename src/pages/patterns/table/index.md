---
title: Table
description: Tables are a fundamental UX design tool for organizing and displaying data.
tags: components
path: /patterns/table
date: Last Modified
layout: project:layouts/component-docs/component-docs-layout.astro
assets:
name: Table
---

## Appearance and Behavior

Tables are a fundamental UX design tool for organizing and displaying data. They are used throughout space applications and may take many forms. Tables are comprised of columns and rows of cells and typically have column headers oriented horizontally across the top of a table. The principal table interactions and styles are illustrated below, and demonstrated in the [GRM](https://grm-dashboard.astrouxds.com/) and [TT&C](https://ttc-monitor.astrouxds.com/) sample applications. Types of content used in table cells varies by use case, but can include [Text](/design-guidelines/typography/), [Checkboxes](/components/checkbox/), [Icons](/components/icons-and-symbols/), [Status Indicators](/components/status-symbol/), or [Buttons](/components/button/).

## Filtering

Filters, to narrow what is displayed in the Table, may be presented in the header as [Select Menus](/components/select/), a [Segmented Button](/components/segmented-button/), or an [Input Field](/components/input-field/). If it is critical that the user knows that not all data is displayed, a warning may be shown when filters are applied. Though it is not a requirement to display filters in the header row of the column to which they correspond, tables created using ag-Grid default to this design pattern.

## Sorting

By default, tables are sorted by the data in the first column with an arrow pointing up or down to indicate whether the column is being sorted in ascending or descending order, respectively. However, the default sorting order may vary based on the specific use case or the results of user testing. For example, a table that populates new content based on time entries, such as a log, may make more sense to default sorting by time.

Manual sorting can be accomplished by clicking the text in a column header. On initial sort, data may sort either ascending or descending, depending on what type of data is contained in that column, with subsequent clicks toggling between the two. It's important to consider the specific use case and the needs of the users when determining the default sorting order for a table.

## Selection and Action

Tables use a familiar Selection/Action model. In simple Tables, selection can be accomplished by clicking in a row. [Checkboxes](/components/checkbox/) can also be used for single selection actions in Tables where content is dense and interactable to avoid triggering unintended actions during selection. Checkboxes are also recommended for multiple row selection. Action [Buttons](/components/button/) may appear in an inline detail area or in a footer.

## Rules of Thumb

- Tables shall always fit within the confines of the user's display.
  - Overflow of row or column data shall be accomplished via scrolling, [Pagination](/components/pagination/), or tabbing.
  - Clearly indicate to the user if a Table is scrollable.
- By default, arrange columns in order of importance from left to right.
- Keep column headers short, ideally one or two words. If column headers must be longer, the text can either be truncated or wrapped. For truncation, truncate the text with an ellipsis and provide a tooltip on hover that displays the full text. If the data is critical and cannot be hidden with a tooltip, wrap the text. Be consistent within a Table and across an application about whether to truncate or wrap text.
- Ensure the data within the table is user-facing and human-readable. Translate backend or other system-facing data into information that can be more easily read by users. Consider how much precision is needed for numerical data for the audience.
- Body text size should generally be used for data within a table. Some Tables may use a larger text size for column headers. If space is limited or the table is dense, a smaller text size may be used. Text should be no smaller than 14 px/0.875 rem, or the Body 2 text size.
- Generally, data should be left-aligned. However, if the data is a date, time, currency, or numerical data related to size (i.e., values that a user might want to quickly scan and compare), it should be right-aligned. Column headers match the alignment of the data in the column.
- In a table with a column of checkboxes, if one or more rows are selected (but not all rows) then the parent checkbox in the column header row should be in the indeterminate state. This behavior is in keeping with checkbox guidance.

## Design Token Example

<iframe
  src="https://codesandbox.io/embed/astro-uxds-with-table-tokens-tz9mpr?fontsize=14&hidenavigation=1&theme=dark"
  style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
  title="Astro UXDS with Table Tokens"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

<a-iframe-fallback>
  <details>
    <summary>index.js</summary>

```javascript
  const getRandomNum = (min, max, roundTo = 0) => {
    const num = Math.random() * max + min;
    return num.toFixed(roundTo);
  };

  const checkAll = 'checkAll';

  const headers = [
    { header: '', field: checkAll },
    { header: 'Current tag', field: 'currentTag' },
    { header: 'Original tag', field: 'originalTag' },
    { header: 'Sensor', field: 'sensor' },
    { header: 'ASTAT', field: 'astat' },
    { header: 'Obs time', field: 'obsTime' },
    { header: 'Ob type', field: 'obType' },
    { header: 'Az/Rt asc', field: 'azRtAsc' },
    { header: 'El/Dec', field: 'elDec' },
    { header: 'Range', field: 'range' },
    { header: 'Range rate', field: 'rangeRate' },
  ];

  const rows = Array.from({ length: 24 }, () => ({
    id: getRandomNum(19999999, 9999999),
    currentTag: getRandomNum(19999999, 9999999),
    originalTag: '0000' + getRandomNum(11111, 99999),
    sensor: getRandomNum(250, 450),
    astat: getRandomNum(-1, 3) > 0 ? 'FULL' : 'SP_FULL',
    obsTime: '2020 158 01:23:45:678',
    obType: 'OBTYPE_' + getRandomNum(1, 9),
    azRtAsc: getRandomNum(120, 150, 4),
    elDec: getRandomNum(1000, 3500, 3),
    range: getRandomNum(1500, 7500, 3),
    rangeRate: getRandomNum(-10, 10, 5),
  }));

  document.querySelector('#app').innerHTML = `
    <section>
      <table>
        <thead>
          <tr>
            ${headers
              .map(({ field, header }) => {
                const isCheckAll = field === checkAll;
                if (isCheckAll) {
                  return `
                    <th>
                      <rux-checkbox id=${field}></rux-checkbox>
                    </th>
                  `;
                }
                return `<th>${header}</th>`;
              })
              .join('')}
          </tr>
        </thead>
        <tbody>
          ${rows
            .map((row) => {
              return `
                <tr id="${row.id}">
                  ${Object.entries(row)
                    .map(([key, value]) => {
                      const isId = key === 'id';
                      if (isId) {
                        return `
                          <td>
                            <rux-checkbox></rux-checkbox>
                          </td>
                        `;
                      }
                      return `<td>${value}</td>`;
                    })
                    .join('')}
                </tr>
              `;
            })
            .join('')}
        </tbody>
      </table>
    </section>
  `;

  const checkboxs = document.querySelectorAll('rux-checkbox');

  checkboxs.forEach((checkbox) => {
    checkbox.addEventListener('ruxchange', (e) => {
      const isChecked = e.target.checked;

      if (e.target.id === checkAll) {
        checkboxs.forEach((checkbox) => {
          checkbox.setAttribute('checked', isChecked);
          const rowId = checkbox.parentElement.parentElement.id;
          const rowEle = document.getElementById(rowId);
          if (!rowEle) return;
          rowEle.setAttribute('selected', isChecked);
        });
        return;
      }

      const rowId = checkbox.parentElement.parentElement.id;
      const rowEle = document.getElementById(rowId);
      rowEle.setAttribute('selected', isChecked);

      const checkeds = [];
      checkboxs.forEach((checkbox) => {
        if (checkbox.id === checkAll) return;
        checkeds.push(checkbox.checked);
      });

      const areAllRowsChecked = checkeds.every((check) => check);
      const checkAllEle = document.getElementById(checkAll);
      checkAllEle.setAttribute('checked', areAllRowsChecked);
    });
  });
```
  </details>
  <details>
    <summary>index.css</summary>

```css
  section {
    padding: var(--spacing-8);
  }

  table {
    width: 100%;
    border-collapse: collapse;
    background-color: var(--table-row-color-background-default);
  }

  table rux-checkbox {
    display: flex;
  }

  thead {
    box-shadow: var(--table-header-shadow);
  }

  th {
    padding: var(--table-header-cell-padding);
    text-align: left;
    background-color: var(--table-header-color-background);
    font-family: var(--font-heading-5-font-family);
    font-size: var(--font-heading-5-font-size);
    font-weight: var(--font-heading-5-font-weight);
    line-height: var(--font-heading-5-line-height);
    letter-spacing: var(--font-heading-5-letter-spacing);
  }

  tbody tr {
    color: var(--table-row-color-text);
    border-bottom-style: solid;
    border-bottom-color: var(--table-row-color-border);
    border-bottom-width: var(--table-row-border-width);
    font-family: var(--font-body-1-font-family);
    font-size: var(--font-body-1-font-size);
    font-weight: var(--font-body-1-font-weight);
    line-height: var(--font-body-1-line-height);
    letter-spacing: var(--font-body-1-letter-spacing);
  }

  tbody tr:hover {
    background-color: var(--table-row-color-background-hover);
  }

  tbody tr[selected='true'] {
    background-color: var(--table-row-color-background-selected);
  }

  td {
    padding-inline: var(--table-body-cell-padding-x);
    padding-block: var(--table-body-cell-padding-y);
  }
```
  </details>
</a-iframe-fallback>

## Complex Tables

For more complex Tables, we recommend using either the community or enterprise tier of [AG Grid](https://www.ag-grid.com/). While we cannot provide support for AG Grid or its many features, we do provide light and dark variants of Astro in a theme file consumable by AG Grid.

### AG Grid Theme

The Astro AG-Grid theme follows the [Astro theming guidelines](https://www.astrouxds.com/design-guidelines/theme/) and the [AG-Grid theme development guidelines](https://www.ag-grid.com/javascript-grid-themes-customising/).

There are three parts to the Astro AG-Grid theme:

1. [Astro UXDS Design tokens](https://www.npmjs.com/package/@astrouxds/tokens) which are already imported and consumed in `@astrouxds/ag-grid-theme`.
2. The AG Grid community alpine-dark theme that the Astro AG-Grid theme builds off of, which is imported from the `ag-grid-community` repository.
3. The Astro AG-Grid theme itself, which is defined in `@astrouxds/ag-grid-theme/dist/main.css` and consumes the imported design tokens above.

The @astrouxds/ag-grid-theme/dist/main.css file merges the ag-grid.css, ag-theme-alpine.css and the astro ag-grid theme sources so you will only need to import one file.

### Installation

:::note
The default installation method of AG Grid can add a considerable amount to your bundle size. Instead, consider using [AG Grid Modules](https://www.ag-grid.com/javascript-data-grid/modules/) to cherry pick the features you need.
:::

Import the Astro AG Grid theme via NPM:

```
npm install @astrouxds/ag-grid-theme
```

### Usage

In your main css entrypoint:

```css
@import '~@astrouxds/ag-grid-theme/dist/main.css';
```

> If you are already importing `ag-grid-community/dist/styles/ag-grid.css` or `ag-grid-community/dist/styles/ag-theme-alpine.css` you can remove them as they are already bundled in our ag-grid-theme css.

Apply the class "ag-theme-astro" to your `ag-grid` element:

```html
<ag-grid class="ag-theme-astro" ...></ag-grid>
```

### Themes

The Astro Dark variant is the default theme. The Light variant can be assigned by wrapping the grid in an element with the "light-theme" class.

```html
<section class="light-theme">
  <ag-grid- class="ag-theme-astro" ...></ag-grid->
</section>
```

### Example Project

<iframe
      src="https://codesandbox.io/embed/github/RocketCommunicationsInc/astro/tree/main/packages/web-components/src/stories/astro-sandboxes/themes/ag-grid"
      class="sandbox"
      style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
      title="Astro AG-Grid Theme Example"
      allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
      sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  ></iframe>

<a-iframe-fallback>
  <details>
    <summary>index.js</summary>

```javascript
  import '@astrouxds/ag-grid-theme/dist/main.css'
  import { Grid } from 'ag-grid-community'

  const getRandomNum = (min, max, roundTo = 0) => {
      const num = Math.random() * max + min
      return num.toFixed(roundTo)
  }
  const columnData = [
      { headerName: '', field: 'control' },
      { headerName: 'Current tag', field: 'currentTag' },
      { headerName: 'Original tag', field: 'originalTag' },
      { headerName: 'Sensor', field: 'sensor' },
      { headerName: 'ASTAT', field: 'astat' },
      { headerName: 'Obs time', field: 'obsTime' },
      { headerName: 'Ob type', field: 'obType' },
      { headerName: 'Az/Rt asc', field: 'azRtAsc' },
      { headerName: 'El/Dec', field: 'elDec' },
      { headerName: 'Range', field: 'range' },
      { headerName: 'Range rate', field: 'rangeRate' },
  ]
  const agColumnData = columnData.slice(0)

  agColumnData.shift()

  const agRowData = Array(24)
  for (let i = 0; i < agRowData.length; i++) {
      agRowData[i] = {
          selected: false,
          currentTag: getRandomNum(19999999, 9999999),
          originalTag: '0000' + getRandomNum(11111, 99999),
          sensor: getRandomNum(250, 450),
          astat: getRandomNum(-1, 3) > 0 ? 'FULL' : 'SP_FULL',
          obsTime: '2020 158 01:23:45:678',
          obType: 'OBTYPE_' + getRandomNum(1, 9),
          azRtAsc: getRandomNum(120, 150, 4),
          elDec: getRandomNum(1000, 3500, 3),
          range: getRandomNum(1500, 7500, 3),
          rangeRate: getRandomNum(-10, 10, 5),
      }
  }

  const gridOptions = {
      columnDefs: agColumnData,
      rowData: agRowData,
  }

  function startAGGrid() {
      const eGridDiv = document.querySelector('#myGrid')
      new Grid(eGridDiv, gridOptions)
  }

  startAGGrid()
```
  </details>
  <details>
  <summary>index.html</summary>

```html
  <!DOCTYPE html>
  <html>
      <head>
          <title>Parcel Sandbox</title>
          <meta charset="UTF-8" />
          <title>Astro AG-Grid Theme</title>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
              href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
              rel="stylesheet"
          />
          <link
              rel="stylesheet"
              href="https://unpkg.com/@astrouxds/astro-web-components/dist/astro-web-components/astro-web-components.css"
          />
      </head>

      <body>
          <div style="padding: 2rem">
              <div
                  id="myGrid"
                  class="ag-theme-astro"
                  style="width: 100%; height: 80vh"
              ></div>
          </div>

          <script src="src/index.js"></script>
      </body>
  </html>
```
  </details>
</a-iframe-fallback>

### Support

Please report any issues on our [AG Grid Theme](https://github.com/RocketCommunicationsInc/ag-grid-theme) repository on Github.

## Headless Tables

In the headless category, we recommend [Tanstack Table](https://tanstack.com/table/). Tanstack table offers integrations for many UI frameworks, such as Vue and React.

It is easy to work with, and because it does not bring any HTML or styles itself, you can use it to render a plain, semantic `<table>` and add the necessary design tokens to your styles as shown in the React example below.

### Example Project

<iframe
  style="border: 1px solid rgba(0, 0, 0, 0.1);border-radius:2px;"
  width="800"
  height="450"
  src="https://codesandbox.io/p/sandbox/astro-uxds-with-tanstack-react-table-4mcgfx?embed=1"
  allowfullscreen></iframe>
<a-iframe-fallback>
  <details>
    <summary>App.js</summary>

```javascript
  import { useMemo, useState } from "react";
  import { RuxCheckbox } from "@astrouxds/react";
  import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
    RowSelectionState,
  } from "@tanstack/react-table";
  import "./App.css";

  const getRandomNum = (min: number, max: number, roundTo = 0) => {
    const num = Math.random() * max + min;
    return num.toFixed(roundTo);
  };

  const columnDefs: { header: string; field: keyof Data }[] = [
    { header: "", field: "id" },
    { header: "Current tag", field: "currentTag" },
    { header: "Original tag", field: "originalTag" },
    { header: "Sensor", field: "sensor" },
    { header: "ASTAT", field: "astat" },
    { header: "Obs time", field: "obsTime" },
    { header: "Ob type", field: "obType" },
    { header: "Az/Rt asc", field: "azRtAsc" },
    { header: "El/Dec", field: "elDec" },
    { header: "Range", field: "range" },
    { header: "Range rate", field: "rangeRate" },
  ];

  type Data = {
    id: string;
    currentTag: string;
    originalTag: string;
    sensor: string;
    astat: string;
    obsTime: string;
    obType: string;
    azRtAsc: string;
    elDec: string;
    range: string;
    rangeRate: string;
  };

  const defaultData: Data[] = Array.from({ length: 24 }, () => ({
    id: getRandomNum(19999999, 9999999),
    currentTag: getRandomNum(19999999, 9999999),
    originalTag: "0000" + getRandomNum(11111, 99999),
    sensor: getRandomNum(250, 450),
    astat: Number(getRandomNum(-1, 3)) > 0 ? "FULL" : "SP_FULL",
    obsTime: "2020 158 01:23:45:678",
    obType: "OBTYPE_" + getRandomNum(1, 9),
    azRtAsc: getRandomNum(120, 150, 4),
    elDec: getRandomNum(1000, 3500, 3),
    range: getRandomNum(1500, 7500, 3),
    rangeRate: getRandomNum(-10, 10, 5),
  }));

  const columnHelper = createColumnHelper<Data>();

  const App = () => {
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

    const columns = useMemo(() => {
      return columnDefs.map(({ field, header }) => {
        const isId = field === "id";

        const columnDef = columnHelper.accessor(field, {
          header: (info) => {
            if (isId) {
              return (
                <RuxCheckbox
                  checked={info.table.getIsAllRowsSelected()}
                  onRuxchange={info.table.getToggleAllRowsSelectedHandler()}
                />
              );
            }
            return header;
          },
          cell: (info) => {
            if (isId) {
              return (
                <RuxCheckbox
                  checked={info.row.getIsSelected()}
                  onRuxchange={info.row.getToggleSelectedHandler()}
                />
              );
            }
            return info.getValue();
          },
        });

        return columnDef;
      });
    }, []);

    const data = useMemo(() => [...defaultData], []);

    const table = useReactTable({
      columns,
      data,
      getCoreRowModel: getCoreRowModel(),
      enableRowSelection: true,
      state: { rowSelection },
      onRowSelectionChange: setRowSelection,
    });

    return (
      <section>
        <table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} data-selected={row.getIsSelected()}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    );
  };

  export default App;
```
  </details>
  <details>
    <summary>App.css</summary>

```css
  section {
    padding: var(--spacing-8);
  }

  table {
    width: 100%;
    border-collapse: collapse;
    background-color: var(--table-row-color-background-default);
  }

  table rux-checkbox {
    display: flex;
  }

  thead {
    box-shadow: var(--table-header-shadow);
  }

  th {
    padding: var(--table-header-cell-padding);
    text-align: left;
    background-color: var(--table-header-color-background);
    font-family: var(--font-heading-5-font-family);
    font-size: var(--font-heading-5-font-size);
    font-weight: var(--font-heading-5-font-weight);
    line-height: var(--font-heading-5-line-height);
    letter-spacing: var(--font-heading-5-letter-spacing);
  }

  tbody tr {
    color: var(--table-row-color-text);
    border-bottom-style: solid;
    border-bottom-color: var(--table-row-color-border);
    border-bottom-width: var(--table-row-border-width);
    font-family: var(--font-body-1-font-family);
    font-size: var(--font-body-1-font-size);
    font-weight: var(--font-body-1-font-weight);
    line-height: var(--font-body-1-line-height);
    letter-spacing: var(--font-body-1-letter-spacing);
  }

  tbody tr:hover {
    background-color: var(--table-row-color-background-hover);
  }

  tbody tr[data-selected='true'] {
    background-color: var(--table-row-color-background-selected);
  }

  td {
    padding-inline: var(--table-body-cell-padding-x);
    padding-block: var(--table-body-cell-padding-y);
  }
```

  </details>
</a-iframe-fallback>
