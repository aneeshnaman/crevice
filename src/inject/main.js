/**
 * TODO
 * t/o to open new tabs
 * reopen last tab
 *
 * UI hints for current mode
 *
 * marks
 * hints mode
 * command line
 *
 * backwards search
 * search history
 * search hints in scrollbar
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
