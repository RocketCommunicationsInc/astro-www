---
title: Propose a Change
description: Submit changes to Astro through a standardized, tracked process using GitHub.
layout: project:layouts/docs/docs-layout.astro
---

## How to Propose a Change

The Astro User Experience Design System operates as an open source project on [GitHub](https://github.com) using [Markdown](https://guides.github.com/features/mastering-markdown/) for content management.

Changes to Astro require a GitHub account. For users new to Git and fork workflows, follow steps 1-4 using GitHub's online interface. Users familiar with Git repositories may proceed to step 5 for pull request procedures.

## Step 1 - Access the Target Page

Locate the **Propose a change or fix to this page** link at the bottom of any [AstroUXDS.com](https://www.astrouxds.com/) page. This link directs to the GitHub editing interface. Non-authorized contributors must fork the repository to proceed.

## Step 2 - Fork Repository

Non-team members initiate changes through Git's fork process, creating an isolated repository clone for modifications.

![GitHub repository fork interface](/img/community/step-1.webp)

## Step 3 - Implement Changes

Enter modifications using the GitHub integrated editor.

![GitHub Markdown editor interface](/img/community/step-2.webp)

## Step 4 - Submit Change Proposal

Navigate to the **Propose file change** interface:

1. Enter a concise description in the required first field
2. Use the second field for detailed explanations if required
3. Select **Propose file change**

This submission generates a permanent commit entry in the Astro changelog.

![GitHub change proposal interface](/img/community/step-3.webp)

## Step 5 - Review and Create Pull Request

1. Verify changes in the GitHub diff view:
   - Previous version displays in red
   - Proposed changes display in green
2. Select **Create pull request**
3. Review auto-populated commit messages
4. Add supplementary information if required

**NOTE**: Pull request submission establishes changes, messages, and requests as permanent public records.

![GitHub pull request interface](/img/community/step-4.webp)

## Step 6 - Access Preview

Each pull request generates a dedicated preview URL:

1. Locate the deploy/netlify status check
2. Select the _Details_ link for preview access
3. Preview URL remains active until pull request closure or merge

![GitHub deploy preview interface with status checks](/img/community/step-6.webp)

## Step 7 - Review Process

The Astro team conducts weekly pull request reviews. Potential outcomes:

- Immediate implementation in minor release
- Scheduled implementation for future release
- Return for clarification or modification
- Non-acceptance with explanation