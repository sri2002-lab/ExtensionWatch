import {
  identifyCategory,
  assessPermission,
  getPermissionExplanation,
  categoryProfiles
} from "./categoryProfiles.js";

import {
  getUniversalRisk,
  getUniversalExplanation,
  isUniversallyDangerous
} from "./universalRules.js";

export function analyseExtension(extension) {
  console.log("Running static analysis for:", extension.name);

  const categoryKey = identifyCategory(
    extension.name,
    extension.description || ""
  );

  const categoryProfile = categoryProfiles[categoryKey];

  const permissionAssessments = [];
  const unusualPermissions = [];
  const optionalPermissions = [];
  const expectedPermissions = [];
  const universallyDangerous = [];

  for (const permission of (extension.permissions || [])) {

    let assessment = "unknown";
    let explanation = "";
    let risk = "Low";

    if (categoryKey !== "unknown") {
      assessment = assessPermission(permission, categoryKey);
      explanation = getPermissionExplanation(permission, categoryKey);

      risk = assessment === "unusual" ? "High"
           : assessment === "optional" ? "Medium"
           : "Low";

      if (isUniversallyDangerous(permission) && assessment === "unusual") {
        universallyDangerous.push(permission);
      }

    } else {
      risk = getUniversalRisk(permission);
      explanation = getUniversalExplanation(permission);

      assessment = risk === "High" ? "unusual"
                 : risk === "Medium" ? "optional"
                 : "expected";
    }

    permissionAssessments.push({
      permission,
      assessment,
      risk,
      explanation
    });

    if (assessment === "unusual") {
      unusualPermissions.push(permission);
    } else if (assessment === "optional") {
      optionalPermissions.push(permission);
    } else {
      expectedPermissions.push(permission);
    }
  }

  let status = "Safe";
  let riskLevel = "Low";
  let reason = "All permissions appear appropriate for this extension.";

  if (unusualPermissions.length > 0 && categoryKey !== "unknown") {
    status = "Suspicious";
    riskLevel = "High";

    const category = categoryProfile.displayName;

    reason = `This extension has ${unusualPermissions.length} permission(s) unusual for ${category} extensions: ${unusualPermissions.join(", ")}. Based on analysis of ${categoryProfile.sampleSize} legitimate ${category} extensions from the Chrome Web Store, these permissions are not commonly required.`;

  } else if (unusualPermissions.length > 0 && categoryKey === "unknown") {
    status = "Review Recommended";
    riskLevel = "High";

    reason = `Category could not be identified. The following permissions are classified as high risk by Chrome's official documentation: ${unusualPermissions.join(", ")}.`;

  } else if (optionalPermissions.length > 0) {
    status = "Acceptable";
    riskLevel = "Low";

    reason = `Permissions appear within acceptable range. Some optional permissions noted: ${optionalPermissions.join(", ")}.`;
  }

  return {
    extensionId: extension.id,
    extensionName: extension.name,
    category: categoryKey,
    categoryDisplayName: categoryProfile
      ? categoryProfile.displayName
      : "Unknown",
    status,
    riskLevel,
    reason,
    permissionAssessments,
    unusualPermissions,
    optionalPermissions,
    expectedPermissions,
    universallyDangerous,
    totalPermissions: (extension.permissions || []).length
  };
}
