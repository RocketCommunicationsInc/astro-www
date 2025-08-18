# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the Astro UXDS (User Experience Design System) website - a design system documentation site built with Astro framework. The website provides comprehensive documentation for space-themed UI components, design patterns, and guidelines for aerospace and satellite operations applications.

## Essential Commands

### Development
- `npm start` or `npm run start` - Start local dev server at localhost:3000
- `npm install` - Install all dependencies

### Build & Production
- `npm run build` - Build the production site to ./dist/
- `npm run serve` - Serve the production build locally at localhost:3000

### Code Quality Checks
- `npm run check` - Check all .astro files for errors
- `npm run check:astro` - Lint .astro files with ESLint
- `npm run check:css` - Lint CSS files with stylelint
- `npm run check:js` - Lint JavaScript/TypeScript files with ESLint
- `npm run check:ts` - Type check TypeScript files

### Special Commands
- `npm run fetch:images` - Pull Figma assets (requires .env configuration)

## Architecture & Structure

### Technology Stack
- **Framework**: Astro 2.8.3 with MDX support
- **UI Components**: Lit web components (@astrojs/lit)
- **Styling**: PostCSS with custom properties, logical properties, and CSS nesting
- **Documentation Components**: @astrouxds/documentation-components
- **Design Tokens**: @astrouxds/tokens

### Key Directories

- `/src/pages/` - Content pages using .astro, .md, and .mdx files
  - `/components/` - Component documentation with playground examples
  - `/patterns/` - UX patterns and best practices
  - `/design-tokens/` - Design system tokens documentation
  - `/compliance/` - Compliance and standards documentation
  - `/case-studies/` - Service-specific UX designs (FDS, GRM, TTC)

- `/src/components/` - Reusable Astro components and web components
  - `/component-playground/` - Interactive component sandbox system
  - `/home/` - Homepage-specific components
  - Custom elements like feedback widgets, icon search, glossary search

- `/src/data/` - JSON configuration files
  - `navigation.json` - Main site navigation structure
  - `compliance.json` - Compliance data
  - `icons.json` - Icon library metadata
  - Component playground configurations

- `/src/layouts/` - Page layout templates
  - `/default/` - Base layout with navigation
  - `/docs/` - Documentation pages layout
  - `/component-docs/` - Component documentation specific layout
  - `/home/` - Homepage layout

### Custom Elements

The site uses several custom web components (documented in CUSTOM_ELEMENTS.md):
- `<a-feedback-widget>` - User feedback forms
- `<icon-panel>` - Icon display with download/copy functionality
- `<navigation-disclosure>` - Collapsible navigation sections
- `<h-navigation-list>` - Mobile navigation menu
- `<h-slideshow>` - Horizontal carousel component
- `<color-swab>` - Color visualization component

### Component Playground System

The site features an interactive component playground for demonstrating UI components with live controls. Components are configured via JSON files in `/src/data/component-playgrounds.record.json`.

### Content Management

- Pages can be written in Astro (.astro), Markdown (.md), or MDX (.mdx)
- MDX pages support React components and interactive elements
- Component documentation typically includes:
  - Main documentation page (index.md)
  - Interactive specs page (specs.astro) with playground
  - Usage examples and guidelines

### Routing

- Site uses trailing slashes (configured in astro.config.js)
- Multi-page component docs use folder structure with index files
- Dynamic routes like `/playground/[tag].astro` for component sandboxes

## Code Style Guidelines

### TypeScript/JavaScript
- ESLint configuration extends "dev/astro-strict"
- Use single quotes for strings
- Use tabs for indentation (except in Markdown - 2 spaces)

### CSS
- Use CSS custom properties for theming
- Prefer logical properties (inline/block) over physical (left/right)
- Use CSS nesting where appropriate
- Color values in long hex format (#ffffff not #fff)
- Never use color names, always hex values
- Double quotes for strings in CSS

### Component Development
- Follow existing patterns in neighboring components
- Use Lit for web components when needed
- Leverage existing @astrouxds components and tokens
- Check component playground configurations for interactive examples

## Important Files

- `astro.config.js` - Astro configuration
- `package.json` - Dependencies and scripts
- `/src/data/navigation.json` - Site navigation structure
- `/src/data/component-playgrounds.record.json` - Component playground configs
- `CUSTOM_ELEMENTS.md` - Documentation for custom web components