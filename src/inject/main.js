/**
 * TODO
 * regex search
 * marks
 * hints mode
 * command line
 * passthrough when in input boxes
 * history navigation
 * focus first input box
 * UI hints for current mode
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
