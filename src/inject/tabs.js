function openNewTab(url) {
  chrome.runtime.sendMessage(null, {cmd: "new-tab", url: url});
}

function previousTab() {
  chrome.runtime.sendMessage(null, {cmd: "previous-tab"});
}

function nextTab() {
  chrome.runtime.sendMessage(null, {cmd: "next-tab"});
}

function closeTab() {
  chrome.runtime.sendMessage(null, {cmd: "close-tab"});
}

function reopenLastClosed() {
  chrome.runtime.sendMessage(null, {cmd: "reopen-last-closed"});
}

function reloadAll() {
  chrome.runtime.sendMessage(null, {cmd: "reload-all"});
}

function zoomUp() {
  chrome.runtime.sendMessage(null, {cmd: "zoom-up"});
}

function zoomDown() {
  chrome.runtime.sendMessage(null, {cmd: "zoom-down"});
}

function zoomDefault() {
  chrome.runtime.sendMessage(null, {cmd: "zoom-default"});
}

function moveTabBefore() {
  chrome.runtime.sendMessage(null, {cmd: "move-tab-before"});
}

function moveTabAfter() {
  chrome.runtime.sendMessage(null, {cmd: "move-tab-after"});
}
