---
title: Date Picker
description: The Date Picker allows users to select specific dates from a calendar display for the purpose of minimizing data entry errors.
layout: project:layouts/component-docs/component-docs-layout.astro
storybook: forms-input--types
assets:
  name: Date Picker

---

 The date picker is implemented by using an input field, which includes a text field and a calendar icon that triggers a pop-up calendar.

## Rules of Thumb

- Use the Date Picker when a calendar view is helpful for selecting a date.
- Do not use the Date Picker for dates easily remembered, such as birthdays; use a simple input field instead for faster input.
- The Date Picker should display the current month and year when activated; however, if a value has already been added to the input field, then the Date Picker will display the full date entered, including month, year, and day. 
- Use an identifier to specifically highlight the current day to give context cues to users.
- Use an “Apply” action button to finalize selection when possible.

## Appearance and Behavior

The Date Picker header contains both a month and a year dropdown. It also contains navigational arrows on either side to select a previous month (left arrow) or a future month (right arrow).

The calendar header displays a shortened version of the days of the week, starting with "Sun" for Sunday and ending with "Sat" for Saturday. Astro chose this format because it is the most widely used pattern for calendars.

The calendar body displays the dates of the selected month and year, with the ability to select any day of any month. Days from other months are presented in a different styling so that the users are aware that these days are outside of the current month being viewed. Despite this styling difference, days from other months can be selected while viewing the current month.

When present, the Date Picker footer contains two actionable items: an Apply button, which applies the selected date to the input field, and a Cancel button, which closes the Date Picker and returns focus to the date input field. While it is possible for a date selection to close the Date Picker and add the selected date to the input field, Astro recommends adding the Apply button to prevent the users from having to open and close the Date Picker multiple times to fix any mistakes and for clearer action states for accessibility. In addition, the users could click outside of the Date Picker to cancel selections and return the input field to its previous state.

**Calendar Day Swatch States**

- Default - Date numbers are styled as interactive elements.
- Hover - The background color of the day swatch changes.
- Focus - When tabbing through items, the color swatch displays an additional border to show the focus state of an item.
- Selected - When a day is selected, the background color of the day swatch changes and a new border is set.
- Previous or Future Day - Days from previous or future months will appear in the currently displayed month when they fall within the selected date range. These days are set to a different color so the users can differentiate them from the days of the currently displayed month.
- Disabled - Days that are not selectable are shown with a lower opacity.


## Date Format

Astro provides three date format options for the Date Picker: Gregorian, Julian, and a combined view displaying both date formats simultaneously.

### Default Calendar Format (Gregorian)

The Gregorian calendar is the default format used by Astro. It comprises 12 months, each with 28-31 days, and is formatted as YYYY-MM-DD in the date input. For example, March 7, 2023, is displayed as 2023-03-07.

### Julian Calendar Format

The Julian calendar format displays the day as an ordinal date, which is a consecutive count of days within a year, ranging from 001 to 365 (or 366 for leap years). It is formatted as YYYY-DDD in the date input. For example, March 7, 2023, is displayed as 2023-065 since March 7 is the 65th day of that year.

### Combined Format

The combined format displays the Gregorian format (in two digits) in the upper left corner of the day swatch. This is followed by the Julian date (in three digits) in the lower right corner of the day swatch. This allows for quick conversion between the two formats.

## Examples

- Don’t use a Date Picker for well known dates like a user’s birthday.
- Use a Date Picker when calendar context is helpful for selecting a date.