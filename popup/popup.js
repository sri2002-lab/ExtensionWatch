document.addEventListener("DOMContentLoaded", async () => {

  document.querySelectorAll(".tab").forEach(tab => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
      document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));
      tab.classList.add("active");
      document.getElementById("tab-" + tab.dataset.tab).classList.add("active");
    });
  });

  await refresh();
});

async function refresh() {
  const result = await chrome.storage.local.get([
    "extensionSnapshot",
    "notificationHistory",
    "clearedAlerts"
  ]);

  const snapshot = result.extensionSnapshot || {};
  const history = result.notificationHistory || [];
  const cleared = result.clearedAlerts || [];

  const extensions = Object.values(snapshot)
    .filter(e => e.name !== "ExtensionWatch");

  const total = extensions.length;

  const allAlerts = history.filter(h =>
    h.addedPermissions && h.addedPermissions.length > 0
  );

  const clearedIds = new Set(cleared);
  const activeAlerts = allAlerts.filter(h => !clearedIds.has(alertId(h)));
  const pastAlerts = allAlerts.filter(h => clearedIds.has(alertId(h)));

  const highCount = activeAlerts
    .filter(h => h.riskLevel === "High" && h.name !== "ExtensionWatch").length;

  const medCount = activeAlerts
    .filter(h => h.riskLevel === "Medium" || h.name === "ExtensionWatch").length;

  const safeCount = Math.max(0, total - highCount - medCount);

  const banner = document.getElementById("statusBanner");
  const icon = document.getElementById("statusIcon");
  const title = document.getElementById("statusTitle");
  const desc = document.getElementById("statusDesc");

  if (highCount > 0) {
    banner.className = "status-banner risk";
    icon.textContent = "🔴";
    title.textContent = "Action Required";
    desc.textContent = `${highCount} extension${highCount > 1 ? "s have" : " has"} gained high risk permissions. Review the alerts below.`;
  } else if (medCount > 0) {
    banner.className = "status-banner caution";
    icon.textContent = "🟡";
    title.textContent = "Review Recommended";
    desc.textContent = `${medCount} extension${medCount > 1 ? "s have" : " has"} gained unusual permissions. Worth checking.`;
  } else {
    banner.className = "status-banner clear";
    icon.textContent = "✅";
    title.textContent = "All Clear";
    desc.textContent = `Monitoring ${total} extensions. No suspicious permission changes detected.`;
  }

  document.getElementById("totalCount").textContent = total || "0";
  document.getElementById("highCount").textContent = highCount || "0";
  document.getElementById("medCount").textContent = medCount || "0";
  document.getElementById("safeCount").textContent = safeCount || "0";

  const timestamps = extensions.map(e => e.timestamp || 0);
  const lastCheck = timestamps.length > 0
    ? formatTime(Math.max(...timestamps))
    : "never";

  document.getElementById("footerText").textContent =
    `Monitoring ${total} extensions — Last checked: ${lastCheck}`;

  renderAlerts(activeAlerts);
  renderExtensions(extensions);
  renderHistory(pastAlerts);
}

function renderAlerts(alerts) {
  const container = document.getElementById("alertsContainer");

  if (alerts.length === 0) {
    container.innerHTML = `
      <div class="empty">
        <div class="empty-icon">🛡️</div>
        <div class="empty-title">No active alerts</div>
        <div class="empty-sub">ExtensionWatch is monitoring your extensions.<br>You will be notified when permission changes are detected.</div>
      </div>`;
    return;
  }

  const sorted = [...alerts].sort((a, b) => {
    const order = { High: 0, Medium: 1, Low: 2 };
    return (order[a.riskLevel] ?? 2) - (order[b.riskLevel] ?? 2);
  });

  let html = `<div class="section-label">${alerts.length} active alert${alerts.length > 1 ? "s" : ""}</div>`;

  for (const alert of sorted) {
    html += buildAlertCard(alert, false);
  }

  container.innerHTML = html;
  attachCardEvents(container);
}

function buildAlertCard(alert, isPast) {
  const risk = (alert.riskLevel || "low").toLowerCase();
  const reasons = alert.reasons || [];
  const addedPerms = alert.addedPermissions || [];
  const id = alertId(alert);
  const isSelf = alert.name === "ExtensionWatch";

  const mainReason =
    reasons.find(r => r.risk === "High")?.explanation
    || reasons.find(r => r.risk === "Medium")?.explanation
    || alert.summary
    || "Permission change detected.";

  let advice = "";

  if (isSelf) {
    advice = "ExtensionWatch detected a change in its own permissions. This may occur during development or reloading and is logged for transparency.";
  } else if (risk === "high") {
    advice = "This permission change is unusual for this type of extension. You may want to review or remove it if you do not trust it.";
  } else if (risk === "medium") {
    advice = "This permission is not commonly needed by this type of extension but may still be legitimate. Check the extension's update notes or reviews before acting.";
  }

  const docsUrl = "https://developer.chrome.com/docs/extensions/reference/permissions-list";

  const permTags = addedPerms.map(p => {
    const flagged = reasons.find(r => r.permission === p && r.risk === "High");
    return `<span class="perm-tag ${flagged ? "flagged" : ""}">${p}</span>`;
  }).join("");

  const selfLabel = isSelf
    ? `<span style="font-size:9px;color:#888;margin-left:6px;font-weight:400;">Self-monitored</span>`
    : "";

  const actionBtn = isPast
    ? `<button class="clear-btn restore" data-restore-id="${id}">↩ Restore to Alerts</button>`
    : `<button class="clear-btn" data-clear-id="${id}">✓ Dismiss this alert</button>`;

  return `
    <div class="alert-card" data-id="${id}">
      <div class="alert-card-header">
        <div class="alert-card-left">
          <div class="alert-name">${esc(alert.name)}${selfLabel}</div>
          <div class="alert-meta">v${esc(alert.oldVersion)} → v${esc(alert.newVersion)} · ${formatTime(alert.timestamp)}</div>
        </div>
        <div class="alert-card-right">
          <div class="risk-badge ${risk}">${alert.riskLevel || "Low"}</div>
          <div class="expand-arrow">▼</div>
        </div>
      </div>

      <div class="perm-row">${permTags}</div>

      <div class="alert-detail">
        <div class="detail-reason">${esc(mainReason)}</div>
        ${advice ? `<div class="detail-advice">${esc(advice)}</div>` : ""}
        <div class="detail-disclaimer">
          ⚠️ ExtensionWatch flags unexpected permission changes based on empirical research and Chrome's official permission documentation. It does not confirm malicious intent and is not responsible for any action taken based on these alerts. Always verify with the extension's official update notes before acting.
        </div>
        <a class="docs-link" href="${docsUrl}" target="_blank">📖 View Chrome permission documentation →</a>
        ${actionBtn}
      </div>
    </div>`;
}

function attachCardEvents(container) {
  container.querySelectorAll(".alert-card-header").forEach(header => {
    header.addEventListener("click", () => {
      const card = header.closest(".alert-card");
      card.classList.toggle("expanded");
    });
  });

  container.querySelectorAll("[data-clear-id]").forEach(btn => {
    btn.addEventListener("click", async (e) => {
      e.stopPropagation();
      const id = btn.getAttribute("data-clear-id");
      await clearAlert(id);
    });
  });

  container.querySelectorAll("[data-restore-id]").forEach(btn => {
    btn.addEventListener("click", async (e) => {
      e.stopPropagation();
      const id = btn.getAttribute("data-restore-id");
      await restoreAlert(id);
    });
  });

  container.querySelectorAll(".docs-link").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      chrome.tabs.create({ url: link.href });
    });
  });
}

async function clearAlert(id) {
  const result = await chrome.storage.local.get("clearedAlerts");
  const cleared = result.clearedAlerts || [];

  if (!cleared.includes(id)) {
    cleared.push(id);
  }

  await chrome.storage.local.set({ clearedAlerts: cleared });
  await refresh();
}

async function restoreAlert(id) {
  const result = await chrome.storage.local.get("clearedAlerts");
  const cleared = (result.clearedAlerts || []).filter(c => c !== id);

  await chrome.storage.local.set({ clearedAlerts: cleared });
  await refresh();

  document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
  document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));
  document.querySelector('[data-tab="alerts"]').classList.add("active");
  document.getElementById("tab-alerts").classList.add("active");
}

function renderExtensions(extensions) {
  const container = document.getElementById("extensionsContainer");

  if (extensions.length === 0) {
    container.innerHTML = `
      <div class="empty">
        <div class="empty-icon">🔍</div>
        <div class="empty-title">No extensions found</div>
        <div class="empty-sub">Could not detect installed extensions.</div>
      </div>`;
    return;
  }

  const sorted = [...extensions].sort((a, b) => a.name.localeCompare(b.name));
  let html = `<div class="section-label">${extensions.length} extensions monitored</div>`;

  for (const ext of sorted) {
    html += `
      <div class="ext-row">
        <div class="ext-name" title="${esc(ext.name)}">${esc(ext.name)}</div>
        <div class="ext-ver">v${esc(ext.version)}</div>
      </div>`;
  }

  container.innerHTML = html;
}

function renderHistory(past) {
  const container = document.getElementById("historyContainer");

  if (past.length === 0) {
    container.innerHTML = `
      <div class="empty">
        <div class="empty-icon">🕘</div>
        <div class="empty-title">No past activity yet</div>
        <div class="empty-sub">Dismissed alerts appear here.<br>You can restore any alert back to the Alerts tab.</div>
      </div>`;
    return;
  }

  let html = `<div class="section-label">${past.length} dismissed alert${past.length > 1 ? "s" : ""}</div>`;

  for (const alert of past) {
    html += buildAlertCard(alert, true);
  }

  container.innerHTML = html;
  attachCardEvents(container);
}

function alertId(alert) {
  const perms = (alert.addedPermissions || []).slice().sort().join(",");
  return `${alert.id || alert.name}_${alert.oldVersion}_${alert.newVersion}_${perms}`;
}

function formatTime(ts) {
  if (!ts) return "unknown";

  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60000);

  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;

  const hours = Math.floor(mins / 60);

  if (hours < 24) return `${hours}h ago`;

  return `${Math.floor(hours / 24)}d ago`;
}

function esc(str) {
  if (!str) return "";

  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
