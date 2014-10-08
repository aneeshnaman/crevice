/**
 * TODO
 * t/o to open new tabs
 * J/K to move tabs
 * close / reopen tab
 * UI hints for current mode
 *
 * marks
 * hints mode
 * command line
 * search history
 *
 */

var gMode = Mode.NORMAL;

// Add search box
var gSearcher = new Searcher(document.body);
gSearcher.install(document.body);

// Start key handler
var gKeyHandler = new KeyHandler(ACTION_MAP);
document.addEventListener("keydown", function(e) {
  gKeyHandler.handleEvent(e, gMode);
});
