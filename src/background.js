chrome.runtime.onMessage.addListener(
    function(request, sender, response) {
      if (request.cmd == "new-tab") {
        chrome.tabs.create({url: request.url});
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
      }
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
