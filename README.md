# ExtensionWatch

ExtensionWatch is a Manifest V3 Chrome extension for monitoring the declared permissions of installed Chrome extensions.

It maintains local permission snapshots and periodically compares successive observations to identify newly introduced permissions. Detected changes are assessed using functional permission profiles and documented Chrome permission information.

The system combines current permission assessment with periodic permission-change monitoring at the individual-browser level. Detected changes are assigned Low, Medium, or High risk classifications to support user review.

ExtensionWatch is designed as a complementary security mechanism that provides additional visibility into declared permission states and changes over time. A risk classification is an evidence-based indicator and does not by itself establish malicious intent.
