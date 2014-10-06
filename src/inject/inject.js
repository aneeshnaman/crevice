var EVENT_KEYDOWN = "keydown";

// todo: make mode enums
var gMode = "NORMAL";

var gKeyHandler = new KeyHandler(ACTION_MAP);

document.addEventListener(EVENT_KEYDOWN, function(e) {
  gKeyHandler.handleEvent(e, gMode);
});
