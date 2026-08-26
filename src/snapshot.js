import { saveSnapshot, getSnapshot } from "./storage.js";
import { analyseExtension } from "./staticAnalysis.js";
import { compareSnapshots } from "./diff.js";
import { classifyChanges } from "./classifier.js";
import { notifyUser, saveNotificationHistory } from "./notifications.js";

self.compareSnapshots = compareSnapshots;
self.classifyChanges = classifyChanges;

export async function takeSnapshot() {

    const oldSnapshot = await getSnapshot();
    const extensions = await chrome.management.getAll();
    const newSnapshot = {};

    for (const ext of extensions) {
        newSnapshot[ext.id] = {
            id: ext.id,
            name: ext.name,
            description: ext.description || "",
            version: ext.version,
            permissions: ext.permissions || [],
            timestamp: Date.now()
        };

        const analysis = analyseExtension(newSnapshot[ext.id]);
        console.log(analysis);
    }

    const changes = compareSnapshots(oldSnapshot, newSnapshot);
    console.log("DIFF ENGINE OUTPUT", changes);

    const classifiedChanges = classifyChanges(changes);
    console.log("RISK CLASSIFICATION OUTPUT", classifiedChanges);

    notifyUser(classifiedChanges);
    await saveNotificationHistory(classifiedChanges);

    await saveSnapshot(newSnapshot);
    console.log("Snapshot saved successfully.");
}
