# ExtensionWatch

## Detecting Silent Permission Abuse in Chrome Extensions Through Periodic Update Monitoring

ExtensionWatch is a Manifest V3 Chrome extension developed as part of an MSc Cybersecurity research project at Technological University Dublin.

The project investigates whether monitoring the declared permission state of browser extensions over time can provide additional security visibility at the individual browser level. ExtensionWatch maintains local snapshots of installed extensions, compares successive observations, and assesses detected permission changes using contextual evidence.

The implementation combines empirical permission patterns derived from a collected population of Chrome extensions with permission information documented by Google Chrome Developers. The resulting classifications are presented as security indicators for user review and are intended to complement existing browser security controls rather than replace them.

---

## Research Context

Chrome extensions operate with declared permissions that determine the browser capabilities available to them. These permissions may change when an extension is updated, creating a potential point at which additional visibility can be useful to the user.

ExtensionWatch addresses this problem through two related forms of assessment:

**Current permission assessment**

The system evaluates the declared permissions of extensions currently installed in the browser using functional context and universal permission rules.

**Successive permission monitoring**

The system maintains successive snapshots of installed extension states and identifies permissions introduced between observations.

The research therefore considers both the current permission state and changes to that state over time.

A detected permission change is not treated as proof of malicious behaviour. The system provides an evidence based indicator intended to support further user review.

---

## System Overview

The implementation follows a periodic monitoring pipeline:

```text
Chrome Management API
        |
        v
Current Extension Snapshot
        |
        v
Current Permission Assessment
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
User Review through Popup Interface
