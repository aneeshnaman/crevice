function openNewTab() {
  chrome.runtime.sendMessage(null, {cmd: "new-tab"});
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