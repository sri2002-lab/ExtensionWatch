import { getShortAlert } from "./categoryProfiles.js";

export function notifyUser(classifiedChanges) {
  console.log("Running Notification Engine...");

  const toNotify = classifiedChanges.filter(
    change => change.addedPermissions.length > 0 &&
    (change.riskLevel === "High" || change.riskLevel === "Medium")
  );

  if (toNotify.length === 0) {
    console.log("No notifications required.");
    return;
  }

  for (const change of toNotify) {
    sendNotification(change);
  }
}

function sendNotification(change) {

  const highPerms = change.reasons
    .filter(r => r.risk === "High")
    .map(r => r.permission);

  const targetPerms = highPerms.length > 0
    ? highPerms
    : change.addedPermissions;

  const title = change.riskLevel === "High"
    ? `⚠️ ${change.name} — Permission Alert`
    : `${change.name} — Permission Change`;

  const permLines = targetPerms.slice(0, 2).map(p =>
    getShortAlert(p, change.category)
  );

  if (targetPerms.length > 2) {
    permLines.push(`+${targetPerms.length - 2} more. Open ExtensionWatch for details.`);
  }

  const message = permLines.join(" ");

  const notificationId = `ew-${change.id}-${Date.now()}`;

  chrome.notifications.create(notificationId, {
    type: "basic",
    iconUrl: chrome.runtime.getURL("icons/icon48.png"),
    title,
    message,
    priority: change.riskLevel === "High" ? 2 : 1
  });

  console.log(`Notification fired: ${change.name} — ${change.riskLevel}`);
}

export async function saveNotificationHistory(classifiedChanges) {

  const toSave = classifiedChanges.filter(
    change => change.addedPermissions.length > 0
  );

  if (toSave.length === 0) return;

  const result = await chrome.storage.local.get("notificationHistory");
  const existing = result.notificationHistory || [];

  const logicalKey = (entry) => {
    const perms = (entry.addedPermissions || []).slice().sort().join(",");
    return `${entry.id}_${entry.oldVersion}_${entry.newVersion}_${perms}`;
  };

  const existingKeys = new Set(existing.map(logicalKey));

  const newEntries = toSave
    .filter(change => !existingKeys.has(logicalKey({
      id: change.id,
      oldVersion: change.oldVersion,
      newVersion: change.newVersion,
      addedPermissions: change.addedPermissions
    })))
    .map(change => ({
      id: change.id,
      name: change.name,
      category: change.categoryDisplayName,
      oldVersion: change.oldVersion,
      newVersion: change.newVersion,
      riskLevel: change.riskLevel,
      addedPermissions: change.addedPermissions,
      reasons: change.reasons,
      summary: change.summary,
      timestamp: Date.now()
    }));

  if (newEntries.length === 0) {
    console.log("No new logical alerts to save (duplicates skipped).");
    return;
  }

  const updated = [...newEntries, ...existing].slice(0, 50);
  await chrome.storage.local.set({ notificationHistory: updated });

  console.log(`Saved ${newEntries.length} notification(s) to history.`);
}
