---
title: Checkbox
description: A Checkbox describes a state or value that can be either "On" or "Off." Checkboxes are not mutually exclusive. More than one Checkbox may be checked at the same time.
layout: project:layouts/component-docs/component-docs-layout.astro
storybook: forms-checkbox-group--default
height: 188px
git: rux-checkbox
assets:
  name: Checkbox
---

:::note{.premium}
🔓 **Premium Content** - You're viewing the enhanced version with additional implementation examples and best practices.
:::

## Interactive Example

::tag{ is=a-playground tag=rux-checkbox }

## Rules of Thumb

- Use Checkboxes when there is a list of options from which the user may select any number of choices.
- In a list, each Checkbox is independent of all other Checkboxes.
- When asking the user to make a mutually exclusive choice, use a Radio Button not a Checkbox.
- Group Checkboxes whenever possible.
- When grouped without a parent Checkbox, provide a group label.

## Appearance and Behavior

A basic Checkbox consists of a visual indicator of its selected state followed by a label. Individual Checkboxes can appear selected (checked), Unselected (no check), and Disabled (no action can be taken by the user). An Indeterminate state (a dash symbol rather than checked) may display when a Checkbox is used as a parent of a group of Checkboxes where at least one child is selected and at least one is not.

A Checkbox can be configured for required input. Help Text for individual Checkbox list items left-aligns with the item's text and not its icon for easier text scanning. To learn more about adding Help Text or Validation to Checkboxes or Checkbox groups, see the [Forms and Validation](/patterns/forms-and-validation) guidance.

:::note
Don't use a Checkbox to initiate an action. Instead, use an [Action Button](/components/button) or a [Switch Button](/components/switch)
:::

## Examples

:::two-col
![Do: Neatly arrange and group multiple Checkboxes whenever possible.](/img/components/checkbox/checkbox-do-1.webp 'Do: Neatly arrange and group multiple Checkboxes whenever possible.')

![Don't: Poorly placed and misaligned Checkboxes make it difficult for users to differentiate one state from another.](/img/components/checkbox/checkbox-dont-1.webp 'Don't: Poorly placed and misaligned Checkboxes make it difficult for users to differentiate one state from another.')
:::

:::two-col
![Do: Use parent Checkboxes, when grouped, to select all or select none.](/img/components/checkbox/checkbox-do-2.webp 'Do: Use parent Checkboxes, when grouped, to select all or select none.')

![Don't: Group a single Checkbox under a parent checkbox unless you have a good reason to do so.](/img/components/checkbox/checkbox-dont-2.webp 'Group a single Checkbox under a parent Checkbox unless you have a good reason to do so.')
:::

:::two-col
![Do: Reflect an indeterminate state when a mix of child values are applied.](/img/components/checkbox/checkbox-do-3.webp 'Do: Reflect an indeterminate state when a mix of child values are applied.')

![Don't: Group Checkboxes without a parent label.](/img/components/checkbox/checkbox-dont-3.webp 'Don't: Group Checkboxes without a parent label.')
:::

---

## 🎯 Implementation Guide (Premium)

### Basic Usage

```html
<rux-checkbox>Enable notifications</rux-checkbox>
```

### Checked State

```html
<rux-checkbox checked>Pre-selected option</rux-checkbox>
```

### Disabled State

```html
<rux-checkbox disabled>Unavailable option</rux-checkbox>
<rux-checkbox checked disabled>Pre-selected and locked</rux-checkbox>
```

### Indeterminate State

```html
<rux-checkbox indeterminate>Mixed selection</rux-checkbox>
```

## 🔧 Advanced Patterns (Premium)

### Checkbox Group with Parent Control

```html
<rux-checkbox-group>
  <rux-checkbox id="select-all">Select All</rux-checkbox>
  <div style="margin-left: 1.5rem;">
    <rux-checkbox class="child-checkbox">Option 1</rux-checkbox>
    <rux-checkbox class="child-checkbox">Option 2</rux-checkbox>
    <rux-checkbox class="child-checkbox">Option 3</rux-checkbox>
  </div>
</rux-checkbox-group>

<script>
  const selectAll = document.getElementById('select-all');
  const children = document.querySelectorAll('.child-checkbox');
  
  selectAll.addEventListener('change', (e) => {
    children.forEach(child => child.checked = e.target.checked);
  });
  
  children.forEach(child => {
    child.addEventListener('change', () => {
      const checkedCount = Array.from(children).filter(c => c.checked).length;
      selectAll.checked = checkedCount === children.length;
      selectAll.indeterminate = checkedCount > 0 && checkedCount < children.length;
    });
  });
</script>
```

### Form Integration

```html
<form id="preferences-form">
  <rux-checkbox name="notifications" value="email">
    Email notifications
  </rux-checkbox>
  <rux-checkbox name="notifications" value="sms">
    SMS notifications
  </rux-checkbox>
  <rux-checkbox name="analytics" value="enabled">
    Enable analytics
  </rux-checkbox>
  
  <button type="submit">Save Preferences</button>
</form>

<script>
  document.getElementById('preferences-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const preferences = {
      notifications: formData.getAll('notifications'),
      analytics: formData.get('analytics') === 'enabled'
    };
    console.log('Saving preferences:', preferences);
  });
</script>
```

## 🎨 Styling and Customization (Premium)

### Custom CSS Variables

```css
rux-checkbox {
  --checkbox-size: 1.25rem;
  --checkbox-border-color: #4dacff;
  --checkbox-background-checked: #005a8f;
}
```

### Responsive Layout

```css
.checkbox-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

@media (max-width: 768px) {
  .checkbox-grid {
    grid-template-columns: 1fr;
  }
}
```

## ♿ Accessibility Best Practices (Premium)

### Proper Labeling

```html
<!-- Good: Label wraps checkbox -->
<label>
  <rux-checkbox></rux-checkbox>
  Enable feature
</label>

<!-- Good: Explicit association -->
<rux-checkbox id="feature-toggle"></rux-checkbox>
<label for="feature-toggle">Enable feature</label>
```

### ARIA Attributes for Groups

```html
<div role="group" aria-labelledby="notification-group">
  <h3 id="notification-group">Notification Preferences</h3>
  <rux-checkbox>Email</rux-checkbox>
  <rux-checkbox>SMS</rux-checkbox>
  <rux-checkbox>Push</rux-checkbox>
</div>
```

### Keyboard Navigation

```javascript
// Enhance keyboard navigation within checkbox groups
const checkboxGroup = document.querySelectorAll('.checkbox-group rux-checkbox');
checkboxGroup.forEach((checkbox, index) => {
  checkbox.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' && index < checkboxGroup.length - 1) {
      e.preventDefault();
      checkboxGroup[index + 1].focus();
    } else if (e.key === 'ArrowUp' && index > 0) {
      e.preventDefault();
      checkboxGroup[index - 1].focus();
    }
  });
});
```

## 🚀 Performance Optimization (Premium)

### Handling Large Lists

```javascript
// Virtual scrolling for large checkbox lists
import { VirtualScroller } from '@astro-uxds/virtual-scroller';

const items = generateLargeDataset(1000);
const scroller = new VirtualScroller({
  items,
  container: document.getElementById('checkbox-container'),
  itemHeight: 32,
  renderItem: (item) => `
    <rux-checkbox value="${item.id}">
      ${item.label}
    </rux-checkbox>
  `
});
```

## 🧪 Testing Guidelines (Premium)

### Unit Testing

```javascript
import { fixture, expect } from '@open-wc/testing';

describe('rux-checkbox', () => {
  it('toggles checked state on click', async () => {
    const el = await fixture('<rux-checkbox>Test</rux-checkbox>');
    
    expect(el.checked).to.be.false;
    el.click();
    expect(el.checked).to.be.true;
  });
  
  it('handles indeterminate state', async () => {
    const el = await fixture('<rux-checkbox indeterminate>Test</rux-checkbox>');
    
    expect(el.indeterminate).to.be.true;
    el.click();
    expect(el.indeterminate).to.be.false;
    expect(el.checked).to.be.true;
  });
});
```

## 📊 Common Use Cases (Premium)

### Settings Panel

```html
<div class="settings-panel">
  <h3>Display Settings</h3>
  <rux-checkbox checked>Dark mode</rux-checkbox>
  <rux-checkbox>Compact view</rux-checkbox>
  <rux-checkbox checked>Show tooltips</rux-checkbox>
  
  <h3>Privacy Settings</h3>
  <rux-checkbox>Share analytics</rux-checkbox>
  <rux-checkbox checked>Enable cookies</rux-checkbox>
</div>
```

### Filter Panel

```html
<aside class="filter-panel">
  <h3>Filter Results</h3>
  
  <div class="filter-group">
    <h4>Status</h4>
    <rux-checkbox data-filter="status" value="active">Active</rux-checkbox>
    <rux-checkbox data-filter="status" value="inactive">Inactive</rux-checkbox>
  </div>
  
  <div class="filter-group">
    <h4>Priority</h4>
    <rux-checkbox data-filter="priority" value="high">High</rux-checkbox>
    <rux-checkbox data-filter="priority" value="medium">Medium</rux-checkbox>
    <rux-checkbox data-filter="priority" value="low">Low</rux-checkbox>
  </div>
</aside>
```

## 🔗 Related Components

- [Radio Button](/components/radio) - For mutually exclusive choices
- [Switch](/components/switch) - For binary on/off actions
- [Segmented Button](/components/segmented-button) - For mode selection