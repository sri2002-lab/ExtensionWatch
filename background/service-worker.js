import { takeSnapshot } from "../src/snapshot.js";

const ALARM_NAME = "extensionwatch-periodic-check";
const ALARM_INTERVAL_MINUTES = 120;

chrome.runtime.onInstalled.addListener(async (details) => {
  console.log("ExtensionWatch installed. Reason:", details.reason);
  await setupAlarm();
  await takeSnapshot();
  await openStatusTab("installed");
});

chrome.runtime.onStartup.addListener(async () => {
  console.log("Chrome started. Running ExtensionWatch pipeline...");
  await setupAlarm();
  await takeSnapshot();
  await openStatusTab("startup");
});

chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name === ALARM_NAME) {
    console.log("Periodic check triggered. Running pipeline...");
    await takeSnapshot();
    await sendPeriodicNotification();
  }
});

async function openStatusTab(reason) {
  try {
    const popupUrl = chrome.runtime.getURL("popup/popup.html");
    const tabs = await chrome.tabs.query({ url: popupUrl });

    if (tabs.length > 0) {
      await chrome.tabs.update(tabs[0].id, { active: true });
      await chrome.windows.update(tabs[0].windowId, { focused: true });
    } else {
      await chrome.tabs.create({
        url: popupUrl,
        active: true
      });
    }
  } catch (e) {
    console.log("Could not open status tab:", e.message);
  }
}

async function sendPeriodicNotification() {
  const result = await chrome.storage.local.get("notificationHistory");
  const history = result.notificationHistory || [];

  const twoHoursAgo = Date.now() - (2 * 60 * 60 * 1000);

  const recentAlerts = history.filter(h =>
    h.timestamp > twoHoursAgo &&
    h.addedPermissions &&
    h.addedPermissions.length > 0
  );

  const highRisk = recentAlerts.filter(h => h.riskLevel === "High").length;
  const medium = recentAlerts.filter(h => h.riskLevel === "Medium").length;

  let title = "";
  let message = "";

  if (highRisk > 0) {
    title = `ExtensionWatch — ${highRisk} High Risk Alert${highRisk > 1 ? "s" : ""}`;
    message = `${highRisk} extension${highRisk > 1 ? "s have" : " has"} gained unusual permissions. Open ExtensionWatch to review.`;
  } else if (medium > 0) {
    title = `ExtensionWatch — ${medium} Caution Alert${medium > 1 ? "s" : ""}`;
    message = `${medium} extension${medium > 1 ? "s have" : " has"} gained new permissions worth reviewing.`;
  } else {
    title = "ExtensionWatch — All Clear";
    message = "Periodic check complete. No unusual permission changes detected in the last 2 hours.";
  }

  chrome.notifications.create(`ew-periodic-${Date.now()}`, {
    type: "basic",
    iconUrl: "../icons/icon48.png",
    title,
    message,
    priority: highRisk > 0 ? 2 : 0,
    buttons: [{ title: "Open ExtensionWatch" }]
  });
}

chrome.notifications.onButtonClicked.addListener((notificationId, buttonIndex) => {
  if (buttonIndex === 0) {
    openStatusTab("notification");
  }
});

chrome.notifications.onClicked.addListener((notificationId) => {
  openStatusTab("notification");
});

async function setupAlarm() {
  const existing = await chrome.alarms.get(ALARM_NAME);

  if (!existing) {
    chrome.alarms.create(ALARM_NAME, {
      delayInMinutes: ALARM_INTERVAL_MINUTES,
      periodInMinutes: ALARM_INTERVAL_MINUTES
    });

    console.log(`Alarm set. Checking every ${ALARM_INTERVAL_MINUTES} minutes.`);
  }
}
