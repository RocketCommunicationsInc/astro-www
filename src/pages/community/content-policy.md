---
title: Content Policy v0.2
description: How we create, maintain and version our content.
layout: project:layouts/docs/docs-layout.astro
---

## Policy Principles

1. Access and comprehension of Astro User Experience Design System information for space application development and design.
2. Content management aligned with Semantic Versioning principles for Astro UXDS editors.
3. Transparent, timely, and consistent content management process for designers, developers, and primary users.
4. Version transparency for long-term application support, ensuring access to previous Astro versions for extended development cycles.

## Content States

Astro UXDS documentation content exists in four states:

1. **Current**: Canonical, effective, supported content in the main branch
2. **Draft**: Proposed content open for review in compliance and next branches
3. **Deprecated**: Archived or obsolete content no longer recommended or supported
4. **Deleted**: Removed content due to relocation, publication error, or redaction

Program status and pipeline updates remain restricted to official channels and direct points of contact. Future release information requires additional development resources for public dissemination.

### Current Content

Main branch content on AstroUXDS.com represents current, canonical, and supported documentation. Published content addresses present implementation requirements without speculation on future changes. Content updates occur through deprecation and replacement processes.

### Draft Content

AstroUXDS contributors develop draft content on separate branches for review. Sensitive or pre-release content publishes to distinct, unlisted subdomains. Draft compliance or component documentation uses semantic versioning with "-alpha" or "-beta" suffixes when published on AstroUXDS.com or NPM.

### Modified or Deprecated Content

Content modifications require specific handling based on change scope:

#### Page-Level Deprecation

Set the deprecated attribute to true in the markdown file's YAML front matter to:
- Enable unlisted state
- Display deprecation banner
- Remove from site navigation and sitemap
- Add noindex tag
- Maintain site-wide search visibility

This modification requires a major version increment for compliance or component documentation.

#### Content Modifications

Primary content organization:
- Present current, canonical information first
- Append modified content by release version
- Increment minor version for backwards-compatible changes
- Increment major version for compatibility-affecting changes

#### Editorial Changes

For grammatical, typographic, or clarification updates that maintain original intent:
- Document changes in revision history
- Increment patch version in documentation

### Deleted Content

Content deletion occurs under specific conditions:
- Publication errors
- Private, confidential, or secure information exposure
- Content redundancy
- Information consolidation

#### Page Deletion Process

For error or sensitive content:
- Remove markdown file
- Delete navigation links
- Verify site-wide link integrity
- Increment patch version

For content relocation:
- Implement redirect to new location
- Transfer revision history
- Document changes
- Update navigation
- Increment major version

#### Content Removal Process

For error or sensitive content:
- Remove without annotation
- Increment patch version

For relocated content:
- Document in revision table
- Increment minor version for compatible changes
- Increment major version for incompatible changes

<br>

---

<br>

**Footnotes**

1\. <a name="footnote-1"></a>**Semantic Versioning**: Industry-standard change categorization methodology (SemVer) for dependency management. Reference: [SemVer documentation](https://semver.org/#why-use-semantic-versioning).

2\. <a name="footnote-2"></a>**YAML front matter**: AstroUXDS.com content management metadata variables for 11ty page template application.

3\. <a name="footnote-3"></a>**Sitemap.xml**: XML-formatted page index for search engine optimization.

4\. <a name="footnote-4"></a>**Noindex**: HTML HEAD tag directing search engines to exclude page from index results.