var EVENT_KEYDOWN = "keydown";

var gMode = Mode.NORMAL;

// Add search box
var gSearcher = new Searcher(document.body);
gSearcher.install(document.body);

// Start key handler
var gKeyHandler = new KeyHandler(ACTION_MAP);
document.addEventListener(EVENT_KEYDOWN, function(e) {
  gKeyHandler.handleEvent(e, gMode);
});
