var EVENT_KEYDOWN = "keydown";

var gMode = Mode.NORMAL;
var gKeyHandler = new KeyHandler(ACTION_MAP);

document.addEventListener(EVENT_KEYDOWN, function(e) {
  gKeyHandler.handleEvent(e, gMode);
});
