/**
 * TODO
 * command line
 * t/o to open new tabs
 *
 * marks
 * hints mode
 *
 * backwards search
 * search history
 * search hints in scrollbar
 *
 * UI hints for current mode
 */

var gMode = Mode.NORMAL;

// Add search box
var gSearcher = new Searcher(document.body);
gSearcher.install(document.body);

var gCommand = new CommandLine();
gCommand.install(document.body);

// Start key handler
var gKeyHandler = new KeyHandler(ACTION_MAP);
document.addEventListener("keydown", function(e) {
  gKeyHandler.handleEvent(e, gMode);
});
