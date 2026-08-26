export const testExtensions = {

    calculator: {
        id: "calc001",
        name: "Calculator",
        version: "1.0.0",
        permissions: [
            "storage"
        ],
        hostPermissions: []
    },

    passwordManager: {
        id: "pass001",
        name: "Bitwarden Password Manager",
        version: "2026.1",
        permissions: [
            "storage",
            "tabs",
            "clipboardRead"
        ],
        hostPermissions: [
            "https://*/*",
            "http://*/*"
        ]
    },

    screenRecorder: {
        id: "screen001",
        name: "Screen Recorder",
        version: "3.2.1",
        permissions: [
            "activeTab",
            "storage",
            "downloads"
        ],
        hostPermissions: []
    },

    adBlocker: {
        id: "adblock001",
        name: "Ad Blocker",
        version: "5.4.0",
        permissions: [
            "storage",
            "tabs",
            "webRequest"
        ],
        hostPermissions: [
            "<all_urls>"
        ]
    },

    translator: {
        id: "translate001",
        name: "Translator",
        version: "2.1.0",
        permissions: [
            "storage",
            "contextMenus"
        ],
        hostPermissions: [
            "<all_urls>"
        ]
    },

    vpn: {
        id: "vpn001",
        name: "VPN Extension",
        version: "4.5.2",
        permissions: [
            "proxy",
            "storage",
            "tabs"
        ],
        hostPermissions: [
            "<all_urls>"
        ]
    },

    notes: {
        id: "notes001",
        name: "Notes",
        version: "1.3.0",
        permissions: [
            "storage"
        ],
        hostPermissions: []
    },

    downloader: {
        id: "download001",
        name: "Video Downloader",
        version: "6.0.1",
        permissions: [
            "downloads",
            "storage"
        ],
        hostPermissions: [
            "<all_urls>"
        ]
    },

    aiAssistant: {
        id: "ai001",
        name: "AI Sidebar",
        version: "1.8.0",
        permissions: [
            "storage",
            "tabs",
            "activeTab"
        ],
        hostPermissions: [
            "https://*/*"
        ]
    },

    shoppingHelper: {
        id: "shop001",
        name: "Shopping Helper",
        version: "3.0.4",
        permissions: [
            "storage",
            "tabs"
        ],
        hostPermissions: [
            "<all_urls>"
        ]
    }

};
