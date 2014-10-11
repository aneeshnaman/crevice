chrome.runtime.onMessage.addListener(
    function(request, sender, response) {
      if (request.cmd == "new-tab") {
        chrome.tabs.create({url: request.url});
      } else if (request.cmd == "previous-tab") {
        chrome.tabs.query(
            { index: sender.tab.index - 1, windowId: sender.tab.windowId },
            activateTab);
      } else if (request.cmd == "next-tab") {
        chrome.tabs.query(
            { index: sender.tab.index + 1, windowId: sender.tab.windowId },
            activateTab);
      } else if (request.cmd == "close-tab") {
        chrome.tabs.remove(sender.tab.id);
      } else if (request.cmd == "reopen-last-closed") {
        chrome.sessions.restore();
      } else if (request.cmd == "reload-all") {
        chrome.tabs.getAllInWindow(chrome.windows.WINDOW_ID_CURRENT,
            function(tabs) {
              console.log(tabs);
              tabs.forEach(function(tab) { chrome.tabs.reload(tab.id); });
            });
      }
    });

function activateTab(tabs) {
  if (tabs.length > 0) {
    chrome.tabs.update(tabs[0].id, {active: true});
  }
}
