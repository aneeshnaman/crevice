var CHAIN_TIMEOUT_MS = 300;
var EVENT_KEYDOWN = "keydown";
var ENABLE_LOGGING = true;

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

function handleKey(e) {
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
      // something more can happen, wait...
      return;
    }
    // nothing more can happen. now see if any suffix of the current event-seq
    // is a valid key combo, and execute that.
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

function handleEvent(e) {
  if (e.keyCode >= 32 && e.keyCode <= 126) {
    log(e.keyCode, e.shiftKey);
    if (shift(e)) {
      e.keyCode = String.fromCharCode(e.keyCode).toUpperCase().charCodeAt(0);
    } else {
      e.keyCode = String.fromCharCode(e.keyCode).toLowerCase().charCodeAt(0);
    }
    log(e.keyCode, e.shiftKey);
    handleKey(e);
  }
}
document.addEventListener(EVENT_KEYDOWN, handleEvent);
