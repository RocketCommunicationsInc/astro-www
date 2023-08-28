---
path: /platforms/astro-for-r2c2
date: Last Modified
layout: project:layouts/docs/docs-layout.astro
title: Astro for R2C2
description: The R2C2 program under the USSF utilizes OMG C2MS message standards; some of these underlying data messages carry status information and this guidance marries the Astro UXDS and R2C2' C2MS standards.
anchorNav: extended
---

## Tier Information

The Rapid Resilient Command and Control (R2C2) program under the United States Space Force (USSF) has four tiers of interface specification documents (ISDs).

Tier 1 and 2 are tactical command and control space vehicle message standards while Tier 3 and 4 are implementation specific interfaces for services in those satellite operating centers (SOCs). The R2C2 Tier 1 ISD clones [Object Management Group (OMG) Command Control Mission Systems (C2MS) v1.0](https://www.omg.org/spec/C2MS/1.0/PDF) with some alterations and message creations supporting DoD requirements or USSF space domain capabilities. Tier 2 ISDs are the R2C2 standards for system domain capabilities (e.g. Flight Dynamics, Telemetry Tracking & Commanding, Mission Planning & Scheduling, Ground Resource Management, Ground Resource Scheduling, etc.) which are based on Tier 1 messages. The Tier 3 ISDs are for service component’s or product’s interface implementation details while Tier 4 is the mission-specific interface details.

:::note
This page includes status guidance for R2C2’s Tier 1 message interface standard and additional alerts with AstroUXDS statuses. For information regarding the other Tiers, contact [Astro Support](/support/).
:::

## Message Fields

### RESPONSE-STATUS

Identifies the status of the message that was processed. The figure below of a status tree shows the behavioral paths a response status can take, given it is a more dynamic status type of field.

<div class="table-overflow table-dark short">

| Value                | Design Token                                | Status Symbol |
|----------------------|---------------------------------------------|---------------|
| ACKNOWLEDGEMENT:1    | color.status.standby or color.status.normal |               |
| WORKING_KEEP_ALIVE:2 | color.status.standby                        |               |
| SUCCESSFUL:3         | color.status.normal                         |               |
| FAILED:4             | color.status.critical                       |               |
| INVALID:5            | color.status.caution                        |               |
| FINAL_RESPONSE:6     | color.status.normal                         |               |

</div>

![](/img/platforms/r2c2/_RESPONSE-STATUS.svg)

RESPONSE-STATUS locations in the Message Interface Specification Document: 3.3 - Alert Notification Message, 3.7.2 - Archive Message Retrieval Response, 3.8.2 - Directive Response Message, 3.8.2 - Replay Telemetry Response Message, 3.12.2 - Mnemonic Value Response Message, 3.13.2 - Archive Mnemonic Value Response Message, 3.14.2 - Command Response Message, 3.15.2 - Product Response Message, 3.15.3 - Product Message, 3.16.2 - Simple Service Response Message.

### SEVERITY

Indicates the severity of the Log Message. Scale is traditionally applied to message based on requirements and characteristics of the component or ground system. The severity field may be used to alert the system such as triggering additional visual or audible operator notifications. Debug is typically used by software developers.

<div class="table-overflow table-dark short">

| Value      | Design Token          | Status Symbol |
|------------|-----------------------|---------------|
| DEBUG:0    | color.status.standby  |               |
| NORMAL:1   | color.status.normal   |               |
| MEDIUM:2   | color.status.caution  |               |
| HIGH:3     | color.status.serious  |               |
| CRITICAL:4 | color.status.critical |               |

</div>

SEVERITY locations in the Message Interface Specification Document: 3.6 - Log message.

### PRIORITY

Indicates processing priority, if applicable.

<div class="table-overflow table-dark short">

| Value    | Design Token          | Status Symbol |
|----------|-----------------------|---------------|
| Normal:1 | color.status.normal   |               |
| Medium:2 | color.status.caution  |               |
| High:3   | color.status.critical |               |

</div>

PRIORITY locations in the Message Interface Specification Document: 3.8.1 - Directive Request Message, 3.16.1 - Simple Service Request Message.

### DEVICE.N.STATUS

Condition of the device being reported. The criteria for selecting the DEVICE.N.STATUS description is left to the reporting component.

<div class="table-overflow table-dark short">

| Value          | Design Token          | Status Symbol |
|----------------|-----------------------|---------------|
| DEBUG:0        | color.status.standby  |               |
| NORMAL_GREEN:1 | color.status.normal   |               |
| YELLOW:2       | color.status.caution  |               |
| ORANGE:3       | color.status.serious  |               |
| RED:4          | color.status.critical |               |

</div>

DEVICE.N.STATUS locations in the Message Interface Specification Document: 3.9.3 - Component-To-Component Transfer Device Message.

### COMPONENT-STATUS

Indicates the condition of the component being monitored, typically itself, although it may be a proxy for a remote component. The component may choose the condition level based on its own criteria.

<div class="table-overflow table-dark short">

| Value          | Design Token          | Status Symbol |
|----------------|-----------------------|---------------|
| DEBUG:0        | color.status.standby  |               |
| NORMAL_GREEN:1 | color.status.normal   |               |
| YELLOW:2       | color.status.caution  |               |
| ORANGE:3       | color.status.serious  |               |
| RED:4          | color.status.critical |               |

</div>

COMPONENT-STATUS locations in the Message Interface Specification Document: 3.9.4 - Component-To-Component Transfer Heartbeat Message.

### MNEMONIC.N.STATUS

Status of the ‘nth’ mnemonic: valid mnemonic, valid mnemonic with no data, or invalid mnemonic.

<div class="table-overflow table-dark short">

| Value           | Design Token         | Status Symbol |
|-----------------|----------------------|---------------|
| VALID:1         | color.status.normal  |               |
| VALID_NO_DATA:2 | color.status.off     |               |
| INVALID:3       | color.status.caution |               |

</div>

MNEMONIC.N.STATUS locations in the Message Interface Specification Document: 3.10.4 - Processed Telemetry Frame Message, 3.12.2 - Mnemonic Value Response Message, 3.12.3 - Mnemonic Value Data Message, 3.13.2 - Archive Mnemonic Value Response Message, 3.13.3 - Archive Mnemonic Value Data Message.

### XTCE-STATUS

Status codes from the OMG XML Telemetric and Command Data Exchange (XTCE) specification. This status links the OMG XTCE with OMG C2MS in order to represent the command sequence progression against space assets. The most visual and status related fields for common display are INVALID:2, COMPLETED:9, FAILED:10.

If you have a use case where the other values for XTCE-Status ( 1 = ACKNOWLEDGEMENT,
3 = TRANSFERRED_TO_RANGE, 4 = SENT_FROM_RANGE, 5 = RECEIVED, 6 = ACCEPTED,
7 = QUEUED, 8 = EXECUTING) require a status color or symbol please reach out to Astro for assistance.

<div class="table-overflow table-dark short">

| Value       | Design Token          | Status Symbol |
|-------------|-----------------------|---------------|
| INVALID:2   | color.status.caution  |               |
| COMPLETED:9 | color.status.normal   |               |
| FALED:10    | color.status.critical |               |

</div>

XTCE-STATUS locations in the Message Interface Specification Document: 3.14.2 - Command Response Message.

### CMD-ECHO-RESULT

The Command-Echo-Message’s command echo result field enumeration descriptions: NOTC: Not Compared, GOOD: Good Compare, MISC: Miscompare, TOUT: Timeout waiting for echo, UNEX: Unexpected echo data received.

<div class="table-overflow table-dark short">

| Value | Design Token          | Status Symbol |
|-------|-----------------------|---------------|
| NOTC  | color.status.off      |               |
| GOOD  | color.status.normal   |               |
| MISC  | color.status.critical |               |
| TOUT  | color.status.serious  |               |
| UNEX  | color.status.caution  |               |

</div>

CMD-ECHO-RESULT in the Message Interface Specification Document: 3.14.3 - Command ECHO Message.

### DATA-QUALITY

The quality of the data. RAW = No quality check, VALIDATED = Checked and passed, DEGRADED = checked with quality issues.

**Note:** We do not provide color guidance for RAW since it is more of a state or process and not a status. If you have a use case that requires a status color or symbol please reach out to Astro support.

<div class="table-overflow table-dark short">

| Value     | Design Token         | Status Symbol |
|-----------|----------------------|---------------|
| VALIDATED | color.status.normal  |               |
| DEGRADED  | color.status.serious |               |

</div>

DATA-QUALITY locations in the Message Interface Specification Document: 3.17.6 - Tracking Data Message.

## Additional Guidance

The MNEMONIC.N.SAMPLE.M.Statuses; RED-HIGH, RED-LOW, YELLOW-HIGH, YELLOW-LOW Boolean fields within the mnemonic samples of telemetry data messages indicate thresholds of what state the data is currently in, in relation to the space vehicle qualitative metrics. The recommended color status reflect the accompanying names (e.g. RED-HIGH and RED-LOW are typically used with a Critical/Red AstroUXDS status and similar for the named Yellow fields.)

### MNEMONIC.N.SAMPLE.M.RED-HIGH

<div class="table-overflow table-dark short">

| Value    | Design Token          | Status Symbol |
|----------|-----------------------|---------------|
| Red High | color.status.critical |               |

</div>

MNEMONIC.N.SAMPLE.M.RED-HIGH locations in the Message Interface Specification Document: 3.12.2 - Mnemonic Value Response Message, 3.12.3 - Mnemonic Value Data Message, 3.13.3 - Archive Mnemonic Value Data Message.

### MNEMONIC.N.SAMPLE.M.RED-LOW

<div class="table-overflow table-dark short">

| Value   | Design Token          | Status Symbol |
|---------|-----------------------|---------------|
| Red Low | color.status.critical |               |

</div>

MNEMONIC.N.SAMPLE.M.RED-LOW locations in the Message Interface Specification Document: 3.12.2 - Mnemonic Value Response Message, 3.12.3 - Mnemonic Value Data Message, 3.13.3 - Archive Mnemonic Value Data Message.

### MNEMONIC.N.SAMPLE.M.YELLOW-HIGH

<div class="table-overflow table-dark short">

| Value       | Design Token         | Status Symbol |
|-------------|----------------------|---------------|
| Yellow High | color.status.caution |               |

</div>

MNEMONIC.N.SAMPLE.M.YELLOW-HIGH locations in the Message Interface Specification Document: 3.12.2 - Mnemonic Value Response Message, 3.12.3 - Mnemonic Value Data Message, 3.13.3 - Archive Mnemonic Value Data Message.

### MNEMONIC.N.SAMPLE.M.YELLOW-LOW

<div class="table-overflow table-dark short">

| Value      | Design Token         | Status Symbol |
|------------|----------------------|---------------|
| Yellow Low | color.status.caution |               |

</div>

MNEMONIC.N.SAMPLE.M.YELLOW-LOW locations in the Message Interface Specification Document: 3.12.2 - Mnemonic Value Response Message, 3.12.3 - Mnemonic Value Data Message, 3.13.3 - Archive Mnemonic Value Data Message.

### XTCE Alarm Levels

The OMG XTCE specification defines multiple alarm levels. This is defined within the AlarmConditionsType, AlarmRangesType, and ConcernLevelsType within the XTCE schema. These alarm levels are found within telemetry definitions that can be embedded in messages in the OMG C2MS and R2C2 C2MS message schemas. This section provides guidance for the colors that align to each level if this data is shown on screen. Since AstroUX does not define Watch or Severe levels, the next less critical level is recommended.

:::note
The OMG XTCE and OMG C2MS standards are constantly evolving. The teams are working to better align the statuses given the mismatch of quantity. In the interim, this translation table is our current guidance. We are aware that this can result in one-way translation or inability to reconstitute given duplicate statuses. This will be amended in the future and is stated as low risk given the small amount of use cases that require translating these statuses.
:::

<div class="table-overflow table-dark short small">

| Value    | Design Token          | C2MS STATUS | C2MS SEVERITY | Status Symbol |
|----------|-----------------------|-------------|---------------|---------------|
| NO ALARM | color.status.normal   | GREEN       | NORMAL        |               |
| WATCH    | color.status.caution  | YELLOW      | MEDIUM        |               |
| WARNING  | color.status.caution  | YELLOW      | MEDIUM        |               |
| DISTRESS | color.status.serious  | ORANGE      | HIGH          |               |
| CRITICAL | color.status.critical | RED         | CRITICAL      |               |
| SEVERE   | color.status.critical | RED         | CRITICAL      |               |

</div>

XTCE Alarm Levels location in the XML Telemetric and Command Exchange Document (XTCE): 6.1.3.2.5 DefaultSignificance and ContextSignificanceList.

## Versions

<div class="table-overflow short">

| Document                                            | Version                                  |
|-----------------------------------------------------|------------------------------------------|
| Message Interface Specific Document-Tier 1          | 5.2.0                                    |
| XML Telemetric and Command Exchange Document (XTCE) | [1.2](https://www.omg.org/spec/XTCE/1.2) |
</div>

<script type="module">
/** add color samples to the tables with colors */
/** Matches a value which is CSS custom property. */
const matchCustomProp = /\b\w+\.\w+\.\w+\b/g
const colors = {
	'off': '#A4ABB6',
	'standby': '#2DCCFF',
	'normal': '#56F000' ,
	'caution':'#FCE83A',
	'serious':'#FFB302',
	'critical':'#FF3838'
}

// transform tables within any available table overflow elements
for (const td of document.querySelectorAll('.table-dark td')) {
	const tdContent = td.textContent

	/* Whether the content of the TD matched a CSS custom property. */
	const allVars = tdContent.match(matchCustomProp)

	// conditionally add a color sample to the front of the wording
	if (allVars) {
		let iconhtml = [];
		const iconTd = (()=> {
      //gather siblings
      const children = Array.from(td.parentNode.children)
      //find the empty one
      return children.find((child) => child.textContent.length === 0)
    })()

		const newhtml = allVars.map((colorvar)=>{
			const color = colorvar.split('.').at(-1)
			iconhtml.push(`<img src='/img/platforms/r2c2/${color}.svg' alt=${color}>`)
			return `<color-sample style="--color:${colors[color]};--border:transparent; width:16px; height: 16px; margin-inline-end: .5rem; border-radius: 2px;vertical-align:middle;"></color-sample>${colorvar}`
		}).join(' or<br />')

		td.innerHTML = newhtml
		//add the icons to the next td
		if(iconTd) iconTd.innerHTML = iconhtml.join(' or ')
	}
}
</script>
