/**
 * TODO
 *
 * backwards search
 * search history
 * search hints in scrollbar
 *
 * UI hints for current mode
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
 * b: go to tab using url/title etc.
 *
 * z: change page zoom
 *
 * launch gvim and paste text
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
