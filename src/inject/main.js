/**
 * FEATURE TODOS
 *
 * search history
 *
 * b: go to tab using url/title etc.
 *
 * UI hints for current mode: DISABLED, OPERATOR PENDING
 *
 * y: yank current url or selected link's href or selected text
 * p/P: open url in clipboard (new tab)
 *
 * marks for urls
 *
 * launch gvim and paste text
 */

/**
 * CODE TODOS
 *
 * move all styling to css
 * move mode changes to a single place
 * use kvo to change UI rather than explicit calls to show/hide etc.
 * split util.js into specific modules.
 */

var Crevice = {};

function setup(options) {
  Crevice.mode = Mode.NORMAL;
  Crevice.searcher = new Searcher();
  Crevice.command = new CommandLine(COMMAND_MAP);
  Crevice.op = new Operator();
  Crevice.hints = new Hints();
  Crevice.keyHandler = new KeyHandler(
      options.actionMap, options.ignoreMap, options.enableMap);

  Crevice.install = function() {
    log("installing modules");
    Crevice.searcher.install(document.body);
    Crevice.command.install(document.body);
    Crevice.hints.install(document.body);
  };

  (function() {
    var ID = window.setInterval(function() {
      if (!document.body) return;
      window.clearInterval(ID);
      Crevice.install();
    }, 100);

    // Escape any insert mode that the page might be setting on load.
    // The 1s timeout is heuristic and will not work on all pages. Currently
    // works for the internal corp sites.
    window.setTimeout(function() {
      EXIT_INSERT_MODE();
    }, 1000);
  })();

  // Capture all keydowns on the document.
  document.addEventListener("keydown", function(e) {
    Crevice.keyHandler.handleEvent(e, Crevice.mode);
  }, true);
}

function main(options) {
  var excludeUrl = arrayAny(options.blacklistedUrls, function(pattern) {
    return document.URL.match(pattern);
  });

  if (excludeUrl) {
    log("Skipping this url...");
  } else {
    setup(options);
  }
}

chrome.runtime.sendMessage({cmd: "get-options"}, function(optionsData) {
  main(new Options(optionsData));
});
