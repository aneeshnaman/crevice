/**
 * TODO
 * regex search
 * marks
 * hints mode
 * command line
 * passthrough when in input boxes
 * enable-disable plugin hot-keys
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
