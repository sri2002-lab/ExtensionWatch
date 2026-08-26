# ExtensionWatch

ExtensionWatch is a Manifest V3 Chrome extension developed as part of an MSc Cybersecurity research project at Technological University Dublin.

The system monitors the declared permission state of installed Chrome extensions and compares successive observations to identify newly introduced permissions. Detected changes are assessed using empirical permission patterns derived from a collected extension population and permission information documented by Chrome.

The project investigates whether periodic, user-level monitoring of extension permissions can provide additional visibility into potentially concerning permission changes, complementing existing browser security controls.

## Research Objective

Browser extensions may change their declared permissions when they are updated. ExtensionWatch investigates a practical approach for observing these changes after installation.

The implementation provides two complementary capabilities:

1. Current permission assessment of installed extensions.
2. Periodic comparison of successive extension states.

A resulting classification is an evidence-based risk indicator intended to support user review. It does not establish that an extension is malicious.

## Main Features

- Current permission assessment
- Periodic permission monitoring
- Local extension snapshots
- Successive snapshot comparison
- Added and removed permission detection
- Functional category identification
- Category-based permission assessment
- Universal permission rules
- High, Medium and Low risk classification
- Chrome desktop notifications
- Alert history
- Alert dismissal and restoration
- Live extension inventory

## Monitoring Approach

ExtensionWatch uses the following processing pipeline:

```text
Chrome Management API
        |
        v
Extension Snapshot
        |
        v
Static Permission Assessment
        |
        v
Successive Snapshot Comparison
        |
        v
Risk Classification
        |
        v
Notification and Alert History
        |
        v
Popup Review
