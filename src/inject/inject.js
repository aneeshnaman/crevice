var CHAIN_TIMEOUT_MS = 300;
var EVENT_KEYPRESS = "keypress";
var ENABLE_LOGGING = false;

var currentlyInChain = false;

function log() {
  if (ENABLE_LOGGING) console.log(arguments);
}

function executeAction(id) {
  var action = ACTION_MAP[id];
  if (action) {
    action.call(this, id);
    return true;
  }
  return false;
}

var gEvents = [];

function handleEvent(e) {
  if (gEvents.length > 0 && (now() - time(last(gEvents))) > CHAIN_TIMEOUT_MS) {
    gEvents = [];
  }

  gEvents.push(e);
  var id = chainId(gEvents);
  log(gEvents, id);
  if (executeAction(id)) {
    gEvents = [];
    return;
  } else {
    if (hasKeyStartingWith(ACTION_MAP, id)) {
      return;
    }
    for (var i = 1; i < gEvents.length; ++i) {
      var slice = gEvents.slice(i);
      var id = chainId(slice);
      if (executeAction(id)) {
        gEvents = [];
        return;
      }
    }
  }
}

document.addEventListener(EVENT_KEYPRESS, handleEvent);
