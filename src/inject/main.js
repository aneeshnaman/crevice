/**
 * TODO
 *
 * wrap tab moves around the first/last tabs
 *
 * make commandline t/o more useful, e.g. "define abc" doesn't work.
 *
 * backwards search
 * search history
 * search hints in scrollbar
 *
 * b: go to tab using url/title etc.
 *
 * UI hints for current mode: DISABLED, OPERATOR PENDING
 *
 * cmd-line tab completion
 *
 * follow previous/next links on <</>>
 *
 * y: yank current url or selected link's href or selected text
 * p/P: open url in clipboard (new tab)
 *
 * marks for urls
 *
 * launch gvim and paste text
 */

var Crevice = {};

function main() {
  Crevice.mode = Mode.NORMAL;
  Crevice.searcher = new Searcher();
  Crevice.command = new CommandLine(COMMAND_MAP);
  Crevice.op = new Operator();
  Crevice.hints = new Hints();
  Crevice.keyHandler = new KeyHandler(ACTION_MAP, IGNORE_MAP);

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
  })();

  // Start key handler
  document.addEventListener("keydown", function(e) {
    Crevice.keyHandler.handleEvent(e, Crevice.mode);
  });
}

var excludeUrl = false;
EXCLUDE_LIST.forEach(function(pattern) {
  if (document.URL.match(pattern)) {
    excludeUrl = true;
  }
});

if (excludeUrl) {
  log("Skipping this url...");
} else {
  main();
}
