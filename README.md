## Google Calendar Cleaner

> A Google Apps Script utility to programmatically purge legacy Google Calendar events within a defined epoch.

## DISCLAIMER
Scope & Limitations: This repository represents a functional baseline rather than a finalized architecture. It is a highly specific, one-off execution built to clear an immediate bottleneck. Future commits will address race conditions, UI implementation, and execution efficiency.

## Architecture & Purpose
Designed for administrative onboarding workflows, this script sanitizes recycled role/alumni accounts before they are integrated into shared calendar groups. It mitigates privacy leaks and reduces storage bloat by systematically deleting historical event data.

## Core Logic
* **Targeting:** Interfaces with `CalendarApp.getDefaultCalendar()` to fetch events bounded by configurable start and end dates.
* **Rate Limit Mitigation:** Implements an 800ms thread sleep (`Utilities.sleep(800)`) during the deletion loop. This throttles API requests to prevent Google Workspace's "too many new or deleted events" exception.
* **Resilience:** Wraps the `deleteEvent()` method in a `try/catch` block to log dissonant events and exceptions without breaking the core execution loop.

## Configuration
Modify the `epochStart` and `epochEnd` variables within `makeCalendarClean()` to define the exact deletion window.

**Critical Note on Temporal Indexing:**
JavaScript `Date` objects utilize zero-indexed months. 
* `0` = January
* `11` = December
* *Example:* `new Date(2008, 0, 1)` strictly represents January 1, 2008. Misconfiguring this index will result in date overruns.

## Constraints & Future State
* **Execution Limits:** Bounded by the standard Google Apps Script 6-minute execution runtime cap. Particularly dense event epochs may require script execution batching if the runtime exceeds this limit.
* **Roadmap:**
  * Integrate UI prompts for dynamic epoch definition and user verification prior to execution.
  * Implement race condition monitoring.
  * Expand wrap-up logging with detailed statistical outputs.
