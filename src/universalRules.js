export const universalRules = {

  debugger: {
    risk: "High",
    chromeWarning: "Read and change all your data on websites",
    explanation: "Allows attaching a debugger to any webpage. Grants access to network traffic, JavaScript execution, and DOM manipulation. Extremely powerful and rarely needed by legitimate consumer extensions.",
    docsUrl: "https://developer.chrome.com/docs/extensions/reference/permissions-list"
  },

  proxy: {
    risk: "High",
    chromeWarning: "Read and change all your data on websites you visit",
    explanation: "Allows redirecting all browser traffic through a custom server. Only VPN extensions legitimately require this. Any non-VPN extension gaining this permission should be treated as high risk.",
    docsUrl: "https://developer.chrome.com/docs/extensions/reference/permissions-list"
  },

  browsingData: {
    risk: "High",
    chromeWarning: "Clear browsing history, cookies, cache, and other browsing data",
    explanation: "Allows permanently deleting browsing history, cookies, cached files, and stored passwords. This is destructive and rarely needed by any extension outside specialised privacy tools.",
    docsUrl: "https://developer.chrome.com/docs/extensions/reference/permissions-list"
  },

  nativeMessaging: {
    risk: "High",
    chromeWarning: "Communicate with cooperating native applications",
    explanation: "Allows the extension to communicate with applications installed on the user's computer outside the browser. This creates a bridge between the browser and the operating system.",
    docsUrl: "https://developer.chrome.com/docs/extensions/reference/permissions-list"
  },

  history: {
    risk: "High",
    chromeWarning: "Read and change your browsing history",
    explanation: "Grants access to the user's complete browsing history across all websites visited. No utility extension such as a calculator, translator, or note-taking tool requires this.",
    docsUrl: "https://developer.chrome.com/docs/extensions/reference/permissions-list"
  },

  management: {
    risk: "High",
    chromeWarning: "Manage your apps, extensions, and themes",
    explanation: "Allows viewing, enabling, disabling, and uninstalling all other Chrome extensions. Very few extensions legitimately need this outside of browser management tools.",
    docsUrl: "https://developer.chrome.com/docs/extensions/reference/permissions-list"
  },

  contentSettings: {
    risk: "High",
    chromeWarning: "Change your privacy-related settings",
    explanation: "Allows overriding site-level permissions including camera, microphone, geolocation, and JavaScript execution for any website the user visits.",
    docsUrl: "https://developer.chrome.com/docs/extensions/reference/permissions-list"
  },

  geolocation: {
    risk: "High",
    chromeWarning: "Detect your physical location",
    explanation: "Grants access to the user's physical location. Legitimate extensions such as weather tools may need this, but most extensions have no justification for requesting location data.",
    docsUrl: "https://developer.chrome.com/docs/extensions/reference/permissions-list"
  },

  webRequest: {
    risk: "High",
    chromeWarning: "Read and change all your data on websites you visit",
    explanation: "Allows intercepting, inspecting, and modifying all HTTP requests and responses made by the browser. Commonly used by ad blockers and VPNs but suspicious in utility extensions.",
    docsUrl: "https://developer.chrome.com/docs/extensions/reference/permissions-list"
  },

  cookies: {
    risk: "High",
    chromeWarning: "Read and change your data on websites",
    explanation: "Grants access to cookies for all websites, including session tokens and authentication cookies. Legitimate in shopping and password manager contexts but suspicious in utility tools.",
    docsUrl: "https://developer.chrome.com/docs/extensions/reference/permissions-list"
  },

  userScripts: {
    risk: "High",
    chromeWarning: null,
    explanation: "Allows injecting arbitrary scripts into webpages at runtime. This is a powerful capability that bypasses normal content security policies.",
    docsUrl: "https://developer.chrome.com/docs/extensions/reference/permissions-list"
  },

  background: {
    risk: "High",
    chromeWarning: null,
    explanation: "Allows the extension to run persistent background processes even after Chrome is closed. This means the extension consumes system resources and can perform actions without the user's browser being open.",
    docsUrl: "https://developer.chrome.com/docs/extensions/reference/permissions-list"
  },

  tabs: {
    risk: "Medium",
    chromeWarning: "Read your browsing history",
    explanation: "Grants access to the URL, title, and status of every browser tab the user has open. This is equivalent to reading browsing history in real time.",
    docsUrl: "https://developer.chrome.com/docs/extensions/reference/permissions-list"
  },

  downloads: {
    risk: "Medium",
    chromeWarning: "Manage your downloads",
    explanation: "Allows accessing and managing the user's download history and initiating new downloads.",
    docsUrl: "https://developer.chrome.com/docs/extensions/reference/permissions-list"
  },

  bookmarks: {
    risk: "Medium",
    chromeWarning: "Read and change your bookmarks",
    explanation: "Allows reading, creating, editing, and deleting all browser bookmarks.",
    docsUrl: "https://developer.chrome.com/docs/extensions/reference/permissions-list"
  },

  clipboardRead: {
    risk: "Medium",
    chromeWarning: "Read data you copy and paste",
    explanation: "Allows reading the contents of the clipboard at any time, including sensitive data the user has copied such as passwords or banking details.",
    docsUrl: "https://developer.chrome.com/docs/extensions/reference/permissions-list"
  },

  identity: {
    risk: "Medium",
    chromeWarning: null,
    explanation: "Allows the extension to request access to the user's Google account and obtain authentication tokens.",
    docsUrl: "https://developer.chrome.com/docs/extensions/reference/permissions-list"
  },

  storage: {
    risk: "Low",
    chromeWarning: null,
    explanation: "Allows saving and retrieving data locally within the browser. Standard infrastructure used by almost all extensions.",
    docsUrl: "https://developer.chrome.com/docs/extensions/reference/permissions-list"
  },

  activeTab: {
    risk: "Low",
    chromeWarning: null,
    explanation: "Grants temporary access to the current tab only when the user explicitly clicks the extension. Limited and safe.",
    docsUrl: "https://developer.chrome.com/docs/extensions/reference/permissions-list"
  },

  scripting: {
    risk: "Low",
    chromeWarning: null,
    explanation: "Allows injecting scripts into web pages. Commonly needed for extensions that modify page content. Risk depends on host permissions declared alongside it.",
    docsUrl: "https://developer.chrome.com/docs/extensions/reference/permissions-list"
  },

  notifications: {
    risk: "Low",
    chromeWarning: null,
    explanation: "Allows sending desktop notifications to the user.",
    docsUrl: "https://developer.chrome.com/docs/extensions/reference/permissions-list"
  },

  contextMenus: {
    risk: "Low",
    chromeWarning: null,
    explanation: "Allows adding items to the browser right-click context menu.",
    docsUrl: "https://developer.chrome.com/docs/extensions/reference/permissions-list"
  },

  alarms: {
    risk: "Low",
    chromeWarning: null,
    explanation: "Allows scheduling periodic or delayed tasks within the extension.",
    docsUrl: "https://developer.chrome.com/docs/extensions/reference/permissions-list"
  },

  offscreen: {
    risk: "Low",
    chromeWarning: null,
    explanation: "Allows creating offscreen documents for background processing such as audio or media capture.",
    docsUrl: "https://developer.chrome.com/docs/extensions/reference/permissions-list"
  },

  sidePanel: {
    risk: "Low",
    chromeWarning: null,
    explanation: "Allows the extension to display content in the browser side panel. Standard for AI assistants and reading tools.",
    docsUrl: "https://developer.chrome.com/docs/extensions/reference/permissions-list"
  },

  unlimitedStorage: {
    risk: "Low",
    chromeWarning: null,
    explanation: "Removes the storage quota limit for the extension. Used by extensions that handle large amounts of local data.",
    docsUrl: "https://developer.chrome.com/docs/extensions/reference/permissions-list"
  },

  declarativeNetRequest: {
    risk: "Low",
    chromeWarning: null,
    explanation: "Allows blocking or modifying network requests using declarative rules. The privacy-preserving replacement for webRequest used by ad blockers.",
    docsUrl: "https://developer.chrome.com/docs/extensions/reference/permissions-list"
  },

  clipboardWrite: {
    risk: "Low",
    chromeWarning: null,
    explanation: "Allows writing data to the clipboard. Commonly used by extensions that let users copy results.",
    docsUrl: "https://developer.chrome.com/docs/extensions/reference/permissions-list"
  },

  idle: {
    risk: "Low",
    chromeWarning: null,
    explanation: "Allows detecting when the user is idle or active. Used for features that pause when the user is not using the browser.",
    docsUrl: "https://developer.chrome.com/docs/extensions/reference/permissions-list"
  },

  tts: {
    risk: "Low",
    chromeWarning: null,
    explanation: "Allows using the browser's text-to-speech engine. Used by translator and accessibility extensions.",
    docsUrl: "https://developer.chrome.com/docs/extensions/reference/permissions-list"
  }

};

export function getUniversalRisk(permission) {
  const rule = universalRules[permission];

  if (!rule) return "Low";

  return rule.risk;
}

export function getUniversalExplanation(permission) {
  const rule = universalRules[permission];

  if (!rule) {
    return `${permission} permission detected. See Chrome documentation for details.`;
  }

  const chromeNote = rule.chromeWarning
    ? `Chrome warns: "${rule.chromeWarning}". `
    : "";

  return `${chromeNote}${rule.explanation} (Source: ${rule.docsUrl})`;
}

export function getUniversalShortAlert(permission) {
  const rule = universalRules[permission];

  if (!rule) {
    return `${permission} permission was added.`;
  }

  if (rule.chromeWarning) {
    return `Chrome warns: "${rule.chromeWarning}"`;
  }

  return rule.explanation.split('.')[0] + '.';
}

export function isUniversallyDangerous(permission) {
  const rule = universalRules[permission];

  if (!rule) return false;

  return rule.risk === "High";
}
