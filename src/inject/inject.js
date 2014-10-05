var CHAIN_TIMEOUT_MS = 300;
var EVENT_KEYDOWN = "keydown";
var ENABLE_LOGGING = true;

function log() {
  if (ENABLE_LOGGING) console.log(arguments);
}

function executeAction(ke, id) {
  var action = ACTION_MAP[gMode][id];
  if (action) {
    action();
    return true;
  } else if ("PASSTHROUGH" in ACTION_MAP[gMode]) {
    ACTION_MAP[gMode]["PASSTHROUGH"](ke, id);
    return true;
  }
  return false;
}

var gEvents = [];
var gMode = "NORMAL";

// todo: remove access to globals
function handleKey(ke) {
  if (gEvents.length > 0 && (now() - time(last(gEvents))) > CHAIN_TIMEOUT_MS) {
    gEvents = [];
  }

  gEvents.push(ke);
  var id = chainId(gEvents);
  log(gEvents, id);
  if (executeAction(ke, id)) {
    gEvents = [];
    return true;
  } else {
    if (hasKeyStartingWith(ACTION_MAP[gMode], id)) {
      // something more can happen, wait...
      return false;
    }
    // nothing more can happen. now see if any suffix of the current event-seq
    // is a valid key combo, and execute that.
    for (var i = 1; i < gEvents.length; ++i) {
      var slice = gEvents.slice(i);
      var id = chainId(slice);
      if (executeAction(ke, id)) {
        gEvents = [];
        return true;
      }
    }
  }
  return false;
}

function handleEvent(e) {
  var ke = new KeyEvent(e);
  if (hasKey(ke) && handleKey(ke)) {
    e.preventDefault();
  }
}

document.addEventListener(EVENT_KEYDOWN, handleEvent);
