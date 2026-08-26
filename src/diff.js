export function compareSnapshots(oldSnapshot, newSnapshot) {

  const changes = [];

  for (const extensionId in newSnapshot) {

    const oldExtension = oldSnapshot[extensionId];
    const newExtension = newSnapshot[extensionId];

    if (!oldExtension) {
      continue;
    }

    const oldPermissions = oldExtension.permissions || [];
    const newPermissions = newExtension.permissions || [];

    const addedPermissions = newPermissions.filter(
      permission => !oldPermissions.includes(permission)
    );

    const removedPermissions = oldPermissions.filter(
      permission => !newPermissions.includes(permission)
    );

    const versionChanged = oldExtension.version !== newExtension.version;

    const hasChanges =
      versionChanged ||
      addedPermissions.length > 0 ||
      removedPermissions.length > 0;

    if (hasChanges) {
      changes.push({
        id: extensionId,
        name: newExtension.name,
        description: newExtension.description || "",
        oldVersion: oldExtension.version,
        newVersion: newExtension.version,
        versionChanged,
        addedPermissions,
        removedPermissions
      });
    }
  }

  console.log("Diff Engine Results");
  console.log(changes);

  return changes;
}
