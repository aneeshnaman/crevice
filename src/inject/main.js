/**
 * TODO
 * hints mode
 *
 * backwards search
 * search history
 * search hints in scrollbar
 *
 * UI hints for current mode
 *
 * cmd-line tab completion
 */

var gMode = Mode.NORMAL;

// Add search box
var gSearcher = new Searcher(document.body);
gSearcher.install(document.body);

var gCommand = new CommandLine(COMMAND_MAP);
gCommand.install(document.body);

var gOp = new Operator();

var gHints = new Hints();
gHints.install(document.body);

// Start key handler
var gKeyHandler = new KeyHandler(ACTION_MAP);
document.addEventListener("keydown", function(e) {
  gKeyHandler.handleEvent(e, gMode);
});
