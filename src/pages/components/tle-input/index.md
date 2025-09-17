---
title: TLE Input
description: A specialized input component for Two-Line Element (TLE) data used in satellite tracking and orbit calculations.
layout: project:layouts/component-docs/component-docs-layout.astro
storybook: forms-tle-input--default
git: rux-tle-input
assets:
  name: TLE Input
sandbox:
  style: '--y: 350px;'
---

## Interactive Example

::tag{ is=a-playground tag=rux-tle-input }

## Rules of Thumb

- Use the TLE Input component when users need to enter, paste, or view Two-Line Element sets for satellite tracking or orbital calculations.
- Use validation features to ensure entered TLEs conform to the expected format before processing.
- Provide clear help text that explains the expected TLE format.
- Include example TLEs when possible to help users understand the expected format.
- Don't use this component for general text input; use a standard Textarea instead.
- Consider providing a read-only mode when displaying reference TLEs that should not be modified.

## Appearance and Behavior

The TLE Input appears similar to a standard text area but is specifically configured for the two-line format of TLEs. It has the following states:

- **Default**: Empty input field ready for TLE entry
- **Valid**: Contains a properly formatted TLE
- **Invalid**: Contains an improperly formatted TLE, showing validation errors
- **Disabled**: Input is unavailable for interaction
- **Read-only**: TLE is displayed but cannot be edited
- **Required**: Indicates that a valid TLE must be provided

The component provides real-time validation as users input TLE data and emits specialized events when validation status changes.

### Standard TLE Format

A standard TLE consists of two 69-character lines that include satellite identification information, orbital parameters, and checksums. Example:

```
1 25544U 98067A   08264.51782528 -.00002182  00000-0 -11606-4 0  2927
2 25544  51.6416 247.4627 0006703 130.5360 325.0288 15.72125391563537
```

### Alpha-5 Format

The component also supports the Alpha-5 format, which extends the satellite catalog number range by using alphanumeric identifiers:

```
1 A0001U 23001A   24123.45678901  .00012345  00000-0  00000-0 0 00018
2 A0001  51.6000 247.0000 0001234 130.0000 325.0000 15.50000000 10004
```

## Examples

:::two-col

![Do: Use the TLE Input for specialized satellite tracking applications where orbital data needs to be entered.]( 'Do: Use the TLE Input for specialized satellite tracking applications where orbital data needs to be entered.')

![Don't: Use the TLE Input for general multi-line text input that doesn't require TLE validation.]( 'Don't: Use the TLE Input for general multi-line text input that doesn't require TLE validation.')

![Do: Provide helpful validation and error messages specific to TLE format requirements.]( 'Do: Provide helpful validation and error messages specific to TLE format requirements.')

![Don't: Use placeholder text as the only explanation of the expected TLE format.]( 'Don't: Use placeholder text as the only explanation of the expected TLE format.')

:::

## Usage in Space Applications

The TLE Input component is particularly valuable in several space application scenarios:

### Satellite Tracking Consoles
Allows operators to input, validate, and update TLE data for satellites being tracked.

### Conjunction Assessment Tools
Enables analysts to input TLEs for objects being assessed for potential conjunctions or collisions.

### Ground Station Pass Scheduling
Facilitates entering satellite TLEs to calculate future passes over ground stations.

### Space Situational Awareness Applications
Supports the input of TLEs for newly identified space objects or updated orbital parameters.

### Space Traffic Management
Allows for the input and validation of TLEs when coordinating space traffic and maintaining orbital safety.
