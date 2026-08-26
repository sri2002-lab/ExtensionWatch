// ExtensionWatch — Evidence-Based Permission Framework
//
// Empirical category profiles derived from the 217-extension dataset.
// 159 extensions form 12 qualifying categories; the remaining
// extensions are assessed through Layer 2 universal rules.
//
// A category requires at least 10 comparable extensions.
// Categories below this threshold are assessed through Layer 2.
//
// Layer 1 uses empirical category profiles.
// Layer 2 uses universal permission rules.
// Unusual Layer 1 findings are cross-checked against Layer 2.
//
// Category profiles are static and manually curated.
// Automatic discovery of new functional categories is not implemented.

export const categoryProfiles = {

  calculator: {
    displayName: "Calculator",
    sampleSize: 11,
    keywords: ["calculator", "calc", "math", "arithmetic", "computation", "grade calculator"],
    expected: ["storage"],
    optional: ["activeTab", "scripting", "clipboardWrite", "sidePanel"],
    unusual: ["history", "cookies", "webRequest", "tabs", "downloads", "bookmarks",
              "debugger", "nativeMessaging", "proxy", "notifications", "management",
              "geolocation", "browsingData", "identity", "background", "contentSettings",
              "userScripts", "clipboardRead"]
  },

  screenRecorder: {
    displayName: "Screen Recorder",
    sampleSize: 15,
    keywords: ["screen recorder", "screen capture", "screencast", "record screen",
               "screenshot recorder", "webcam recorder", "loom", "screencastify", "scrnli",
               "cursorful", "fullpage", "apowersoft"],
    expected: ["storage", "scripting", "desktopCapture"],
    optional: ["tabCapture", "tabs", "offscreen", "activeTab", "unlimitedStorage",
               "webNavigation", "contextMenus", "downloads", "alarms", "notifications",
               "system.display", "webRequest", "cookies", "windows", "favicon"],
    unusual: ["debugger", "clipboardRead", "contentSettings", "history", "proxy",
              "nativeMessaging", "management", "geolocation", "bookmarks",
              "browsingData", "identity", "background"]
  },

  passwordManager: {
    displayName: "Password Manager",
    sampleSize: 11,
    keywords: ["password manager", "password vault", "vault", "credentials", "autofill",
               "lastpass", "bitwarden", "1password", "dashlane", "keepass",
               "roboform", "keeper", "nordpass", "enpass"],
    expected: ["storage", "tabs", "webNavigation", "scripting", "contextMenus",
               "webRequest", "alarms"],
    optional: ["idle", "offscreen", "unlimitedStorage", "notifications", "clipboardWrite",
               "cookies", "privacy", "nativeMessaging", "activeTab", "sidePanel",
               "downloads", "webRequestAuthProvider", "declarativeNetRequest"],
    unusual: ["browsingData", "management", "history", "debugger", "proxy",
              "geolocation", "bookmarks", "background", "identity",
              "contentSettings", "userScripts"]
  },

  vpn: {
    displayName: "VPN",
    sampleSize: 14,
    keywords: ["vpn", "virtual private network", "privacy vpn", "free vpn",
               "secure vpn", "tunnelbear", "nordvpn", "expressvpn", "protonvpn",
               "windscribe", "browsec", "urban vpn", "veepn", "openvpn", "freezen"],
    expected: ["proxy", "storage", "webRequest"],
    optional: ["webRequestAuthProvider", "alarms", "management", "scripting", "tabs",
               "privacy", "offscreen", "notifications", "activeTab", "unlimitedStorage",
               "contextMenus", "webNavigation", "declarativeNetRequest", "cookies"],
    unusual: ["browsingData", "background", "downloads", "history",
              "debugger", "nativeMessaging", "geolocation", "bookmarks",
              "identity", "contentSettings", "userScripts"]
  },

  adBlocker: {
    displayName: "Ad Blocker",
    sampleSize: 16,
    keywords: ["adblocker", "ad blocker", "adblock", "block ads", "remove ads",
               "adguard", "ublock", "ghostery", "stands", "adremover", "adlock", "blockify"],
    expected: ["storage", "declarativeNetRequest", "scripting"],
    optional: ["tabs", "unlimitedStorage", "contextMenus", "webNavigation", "activeTab",
               "notifications", "webRequest", "alarms", "cookies", "idle", "userScripts",
               "offscreen", "privacy", "declarativeNetRequestFeedback",
               "declarativeNetRequestWithHostAccess", "background"],
    unusual: ["history", "proxy", "nativeMessaging", "debugger", "browsingData",
              "management", "geolocation", "bookmarks",
              "identity", "contentSettings"]
  },

  translator: {
    displayName: "Translator",
    sampleSize: 15,
    keywords: ["translate", "translator", "translation", "deepl", "google translate",
               "immersive translate", "bilingual", "anydoc", "dictionary"],
    expected: ["storage", "contextMenus"],
    optional: ["scripting", "tabs", "activeTab", "offscreen", "declarativeNetRequest",
               "sidePanel", "webRequest", "unlimitedStorage", "tts", "clipboardWrite",
               "alarms", "declarativeNetRequestWithHostAccess", "system.display"],
    unusual: ["cookies", "nativeMessaging", "identity", "history", "proxy",
              "browsingData", "debugger", "management", "geolocation",
              "notifications", "downloads", "background", "userScripts", "clipboardRead"]
  },

  shopping: {
    displayName: "Shopping and Coupon",
    sampleSize: 17,
    keywords: ["coupon", "discount", "cashback", "deals", "promo", "voucher",
               "price comparison", "honey", "shopping", "checkout", "coupons",
               "coupert", "karma", "moolah", "mino", "joko", "juicy", "shopilo"],
    expected: ["storage", "alarms"],
    optional: ["tabs", "cookies", "webRequest", "scripting", "unlimitedStorage",
               "offscreen", "activeTab", "webNavigation", "sidePanel", "contextMenus",
               "management"],
    unusual: ["identity", "proxy", "nativeMessaging", "debugger", "browsingData",
              "history", "geolocation", "notifications",
              "downloads", "background", "userScripts", "clipboardRead"]
  },

  aiAssistant: {
    displayName: "AI Assistant",
    sampleSize: 15,
    keywords: ["ai assistant", "chatgpt", "gpt", "claude", "gemini", "ai chat",
               "artificial intelligence", "merlin", "monica", "harpa", "sider",
               "copilot", "perplexity", "chatsnow", "grammarly", "quillbot",
               "tinamind", "voila", "questionai"],
    expected: ["storage", "scripting"],
    optional: ["sidePanel", "contextMenus", "tabs", "alarms", "webNavigation",
               "webRequest", "offscreen", "notifications", "unlimitedStorage", "idle",
               "activeTab", "declarativeNetRequest", "cookies"],
    unusual: ["browsingData", "background", "identity", "proxy",
              "nativeMessaging", "debugger", "management", "history",
              "geolocation", "downloads", "userScripts", "clipboardRead"]
  },

  focusWebsiteBlocker: {
    displayName: "Focus / Website Blocker",
    sampleSize: 15,
    keywords: ["block site", "website blocker", "site blocker", "focus", "stayfocusd",
               "leechblock", "screentime", "block website", "distraction", "productivity timer"],
    expected: ["storage", "tabs", "alarms"],
    optional: ["webNavigation", "contextMenus", "declarativeNetRequest", "notifications",
               "activeTab", "unlimitedStorage", "idle", "declarativeNetRequestWithHostAccess"],
    unusual: ["history", "cookies", "webRequest", "bookmarks", "identity", "system.display",
              "offscreen", "favicon", "declarativeNetRequestFeedback", "scripting",
              "proxy", "nativeMessaging", "debugger", "management", "geolocation",
              "browsingData", "background", "downloads", "userScripts", "clipboardRead"]
  },

  stickyNotesToDo: {
    displayName: "Sticky Notes / To-Do",
    sampleSize: 10,
    keywords: ["sticky notes", "note board", "to-do", "todo", "notes app",
               "floating notes", "planner", "todoist", "wrike"],
    expected: ["storage", "contextMenus", "scripting"],
    optional: ["tabs", "unlimitedStorage", "activeTab", "alarms", "identity",
               "sidePanel", "newTabPageOverride", "offscreen", "webNavigation"],
    unusual: ["history", "cookies", "webRequest", "proxy", "nativeMessaging",
              "debugger", "management", "geolocation", "browsingData", "background",
              "downloads", "userScripts", "clipboardRead", "bookmarks"]
  },

  screenVideoWatch: {
    displayName: "Screen / Video Watch Tools",
    sampleSize: 10,
    keywords: ["picture in picture", "watch party", "netflix party", "video playback",
               "youtube transcript", "google meet", "zoom to fill", "streaming enhanced"],
    expected: ["storage"],
    optional: ["scripting", "activeTab", "system.display", "tabs", "notifications",
               "identity", "unlimitedStorage"],
    unusual: ["history", "cookies", "webRequest", "proxy", "nativeMessaging",
              "debugger", "management", "geolocation", "browsingData", "background",
              "downloads", "userScripts", "clipboardRead", "bookmarks"]
  },

  pdfTools: {
    displayName: "PDF Tools",
    sampleSize: 10,
    keywords: ["pdf", "webpage to pdf", "merge pdf", "acrobat", "smallpdf", "printfriendly"],
    expected: ["storage", "scripting"],
    optional: ["tabs", "webNavigation", "downloads", "webRequest", "contextMenus",
               "notifications", "declarativeNetRequest", "offscreen", "alarms",
               "cookies", "identity", "activeTab"],
    unusual: ["debugger", "history", "management", "gcm", "nativeMessaging",
              "proxy", "browsingData", "geolocation", "userScripts", "clipboardRead",
              "background"]
  }

};

// Categories below the qualifying threshold are assessed through Layer 2.

export function identifyCategory(extensionName, extensionDescription) {
  const name = (extensionName || "").toLowerCase();
  const description = (extensionDescription || "").toLowerCase();

  // Check the extension name first.
  for (const [key, profile] of Object.entries(categoryProfiles)) {
    for (const keyword of profile.keywords) {
      if (name.includes(keyword.toLowerCase())) {
        return key;
      }
    }
  }

  // Use the description when the name does not provide a match.
  for (const [key, profile] of Object.entries(categoryProfiles)) {
    for (const keyword of profile.keywords) {
      if (description.includes(keyword.toLowerCase())) {
        return key;
      }
    }
  }

  return "unknown";
}

export function assessPermission(permission, categoryKey) {
  if (!categoryProfiles[categoryKey]) return "unknown_category";
  const profile = categoryProfiles[categoryKey];

  if (profile.expected.includes(permission)) return "expected";
  if (profile.optional.includes(permission)) return "optional";

  return "unusual";
}

export function getPermissionExplanation(permission, categoryKey) {
  const category = categoryProfiles[categoryKey];

  if (!category) {
    return `${permission} permission detected. Category could not be identified for context-aware assessment.`;
  }

  const assessment = assessPermission(permission, categoryKey);

  if (assessment === "expected") {
    return `${permission} is standard for ${category.displayName} extensions (found in majority of ${category.sampleSize} extensions analysed).`;
  }

  if (assessment === "optional") {
    return `${permission} is used by some ${category.displayName} extensions but is not required for core functionality.`;
  }

  return `${permission} is not commonly used by ${category.displayName} extensions. Analysis of ${category.sampleSize} legitimate ${category.displayName} extensions from the Chrome Web Store found this permission in very few or none of them.`;
}

export function classifyPermissionRisk(permission, categoryKey) {
  const assessment = assessPermission(permission, categoryKey);

  if (assessment === "expected") return "Low";
  if (assessment === "optional") return "Medium";
  if (assessment === "unusual") return "High";

  return "Medium";
}

export function getShortAlert(permission, categoryKey) {
  const category = categoryProfiles[categoryKey];
  const categoryName = category ? category.displayName : "this type of extension";
  const risk = classifyPermissionRisk(permission, categoryKey);

  if (risk === "High") {
    return `${permission} is unusual for ${categoryName} extensions.`;
  }

  if (risk === "Medium") {
    return `${permission} is not commonly needed by ${categoryName} extensions.`;
  }

  return `${permission} permission was added.`;
}
