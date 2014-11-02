chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.cmd == "new-tab") {
        chrome.tabs.create({url: request.url, openerTabId: sender.tab.id});
      } else if (request.cmd == "new-bg-tab") {
        chrome.tabs.create({
          url: request.url,
          active: false,
          openerTabId: sender.tab.id
        });
      } else if (request.cmd == "new-tab-after-current") {
        chrome.tabs.create({
          url: request.url,
          index: sender.tab.index + 1,
          openerTabId: sender.tab.id
        });
      } else if (request.cmd == "new-bg-tab-after-current") {
        chrome.tabs.create({
          url: request.url,
          index: sender.tab.index + 1,
          active: false,
          openerTabId: sender.tab.id
        });
      } else if (request.cmd == "previous-tab") {
        chrome.tabs.query(
            { windowId: sender.tab.windowId },
            createTabActivator(sender.tab.index - 1));
      } else if (request.cmd == "next-tab") {
        chrome.tabs.query(
            { windowId: sender.tab.windowId },
            createTabActivator(sender.tab.index + 1));
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
      } else if (request.cmd == "zoom-up") {
        chrome.tabs.getZoom(sender.tab.id, function(z) {
          chrome.tabs.setZoom(sender.tab.id, z * 1.1);
        });
      } else if (request.cmd == "zoom-down") {
        chrome.tabs.getZoom(sender.tab.id, function(z) {
          chrome.tabs.setZoom(sender.tab.id, z / 1.1);
        });
      } else if (request.cmd == "zoom-default") {
        chrome.tabs.setZoom(sender.tab.id, 1.0);
      } else if (request.cmd == "move-tab-before") {
        chrome.tabs.move(sender.tab.id, {index: sender.tab.index - 1});
      } else if (request.cmd == "move-tab-after") {
        chrome.tabs.move(sender.tab.id, {index: sender.tab.index + 1});
      } else if (request.cmd == "get-options") {
        getComputedOptions(function(data) {
          sendResponse(data);
        });
      } else if (request.cmd == "open-options") {
        chrome.tabs.create({"url": chrome.extension.getURL("src/options.html")});
      }
      // Return true to keep the response channel active. Required for the
      // async stuff here like getting the user options.
      return true;
    });

function createTabActivator(requiredIndex) {
  return function(tabs) {
    var calculatedIndex = (requiredIndex + tabs.length) % tabs.length;
    for (var i = 0; i < tabs.length; ++i) {
      if (tabs[i].index == calculatedIndex) {
        chrome.tabs.update(tabs[i].id, {active: true});
      }
    }
  };
}
