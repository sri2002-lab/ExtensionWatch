import {
  identifyCategory,
  assessPermission,
  getPermissionExplanation,
  classifyPermissionRisk,
  categoryProfiles
} from "./categoryProfiles.js";

import {
  getUniversalRisk,
  getUniversalExplanation,
  getUniversalShortAlert,
  isUniversallyDangerous
} from "./universalRules.js";

export function classifyChanges(changes) {
  console.log("Running Evidence-Based Risk Classification...");

  for (const change of changes) {

    const categoryKey = identifyCategory(change.name, change.description || "");
    const categoryProfile = categoryProfiles[categoryKey];

    change.category = categoryKey;
    change.categoryDisplayName = categoryProfile
      ? categoryProfile.displayName
      : "Unknown";

    let highestRisk = "Low";
    const reasons = [];

    for (const permission of (change.addedPermissions || [])) {

      let risk = "Low";
      let explanation = "";
      let shortAlert = "";

      if (categoryKey !== "unknown") {
        const categoryAssessment = assessPermission(permission, categoryKey);
        risk = classifyPermissionRisk(permission, categoryKey);
        explanation = getPermissionExplanation(permission, categoryKey);
        shortAlert = getUniversalShortAlert(permission);

        if (isUniversallyDangerous(permission) && categoryAssessment === "unusual") {
          risk = "High";
          const universalNote = getUniversalExplanation(permission);
          explanation = explanation + " " + universalNote;
        }

      } else {
        risk = getUniversalRisk(permission);
        explanation = getUniversalExplanation(permission);
        shortAlert = getUniversalShortAlert(permission);
      }

      if (risk === "High") {
        highestRisk = "High";
      } else if (risk === "Medium" && highestRisk !== "High") {
        highestRisk = "Medium";
      }

      reasons.push({ permission, risk, explanation, shortAlert });
    }

    change.riskLevel = highestRisk;
    change.reasons = reasons;
    change.summary = generateSummary(change);
  }

  console.log("Risk Classification Results:");
  console.log(changes);

  return changes;
}

function generateSummary(change) {

  if ((change.addedPermissions || []).length === 0) {
    return `${change.name} updated from v${change.oldVersion} to v${change.newVersion}. No permission changes detected.`;
  }

  const highRiskReasons = change.reasons.filter(r => r.risk === "High");

  const categoryPhrase = change.categoryDisplayName !== "Unknown"
    ? `for a ${change.categoryDisplayName} extension`
    : "for this extension, whose category could not be identified";

  if (change.riskLevel === "High") {
    const permsText = highRiskReasons.map(r => r.permission).join(", ");
    return `${change.name} updated to v${change.newVersion} and gained unusual access: ${permsText}. This is unexpected ${categoryPhrase}.`;
  }

  const allPerms = (change.addedPermissions || []).join(", ");
  return `${change.name} updated to v${change.newVersion}. New permission(s): ${allPerms}. Risk level is low to medium.`;
}
