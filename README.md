# ExtensionWatch

ExtensionWatch is a Manifest V3 Chrome extension developed as part of an MSc Cybersecurity research project at Technological University Dublin.

It provides periodic monitoring of installed Chrome extensions by maintaining local permission snapshots and comparing successive observations to identify newly introduced permissions.

## Research Approach

ExtensionWatch combines two assessment layers.

Layer 1 uses functional category profiles derived from a collected population of Chrome extensions.

Layer 2 uses documented Chrome permission information for extensions that do not match a qualifying category and as an additional evidence source.

Detected permission changes are classified as Low, Medium, or High risk to support user review. A classification does not establish malicious intent.

## Main Features

Current permission assessment

Periodic permission monitoring

Permission snapshot and comparison

Functional category assessment

Universal permission rules

Risk classification

Chrome notifications

Alert history and review

## Project Structure

```text
ExtensionWatch/
├── background/
├── icons/
├── popup/
├── src/
├── tests/
├── manifest.json
└── README.md
