/**
 * TODO
 *
 * user options for disabling on specific sites
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

var gMode = Mode.NORMAL;
var gSearcher = new Searcher();
var gCommand = new CommandLine(COMMAND_MAP);
var gOp = new Operator();
var gHints = new Hints();
var gKeyHandler = new KeyHandler(ACTION_MAP, IGNORE_MAP);

function init() {
  log("initing modules");
  gSearcher.install(document.body);
  gCommand.install(document.body);
  gHints.install(document.body);
}

(function() {
  var ID = window.setInterval(function() {
    if (!document.body) return;
    window.clearInterval(ID);
    init();
  }, 100);
})();

// Start key handler
document.addEventListener("keydown", function(e) {
  gKeyHandler.handleEvent(e, gMode);
});
