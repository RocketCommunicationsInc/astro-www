# AstroUXDS Statistics Dashboard Requirements

## Project Overview
Create an infographic-style statistics page for the AstroUXDS design system to showcase its impact and usage.

**Location:** Add to the "funding" section of the Astro website
**Purpose:** Demonstrate measurable value and adoption of the AstroUXDS design system, with focus on quantifiable cost savings to justify continued investment and showcase ROI.

## Static Metrics (Manually Updated)
These values should be easily editable in the page frontmatter:
- Program Offices: 4
- Applications: 60+
- Organizations: 40

## Dynamic Metrics (API-Driven)

### NPM Downloads (Last 30 Days)
Track downloads for these 6 packages via NPM API:
- `@astrouxds/web-components` (Web Component Library)
- `@astrouxds/ag-grid-theme` (agGrid Theme)
- `@astrouxds/tailwind-theme` (Tailwind Theme)
- `@astrouxds/design-tokens` (Design Tokens)
- `@astrouxds/angular` (Angular Wrapper)
- `@astrouxds/react` (React Wrapper)

**API Endpoint:** `https://api.npmjs.org/downloads/range/last-month/{package-name}`

### jsDelivr CDN Hits
Track CDN usage via jsDelivr API:
**API Endpoint:** `https://data.jsdelivr.com/v1/package/npm/@astrouxds/{package-name}/stats`

### Money Saved Calculator (Centerpiece Feature)
**Methodology:** Use Knapsack.com's formula
- Base calculation: Downloads × Hours Saved Per Download × Developer Hourly Rate
- Show year-to-date savings (January 1st to current date)
- Use web components downloads as primary metric
- Update in real-time while users view the page (savings increase per minute)

**Constants to Configure:**
- Developer hourly rate: $85 (adjustable)
- Hours saved per component download: 2.5 hours (Knapsack estimate)
- Working hours per year: 2080
- Working minutes per year: 124,800

**Display Requirements:**
- Prominent featured card showing total savings
- Breakdown of calculation formula
- Live indicator showing real-time updates
- Update interval: Every 10 seconds

## Potential Additional Metrics (Future Implementation)
These require further API research:
- Monthly website visits to astrouxds.com (requires analytics API access)
- Grafana theme downloads (investigate cURL command for API access)
- GitHub statistics (leverage existing Google Sheet data or GitHub API)

## Technical Implementation Notes
- Built as Astro page with server-side rendering for initial data
- Client-side JavaScript for real-time savings counter
- Error handling for API failures
- Responsive grid layout for infographic presentation
- Use existing design system tokens for styling consistency

## Success Metrics
- Showcase quantifiable ROI of design system investment
- Demonstrate widespread adoption across program offices and applications
- Provide compelling visual representation of cost savings
- Real-time engagement through live updating savings counter
