export async function saveSnapshot(snapshot) {

    await chrome.storage.local.set({
        extensionSnapshot: snapshot
    });

    console.log("Snapshot saved successfully.");
}

export async function getSnapshot() {

    const result = await chrome.storage.local.get("extensionSnapshot");

    return result.extensionSnapshot || {};
}
