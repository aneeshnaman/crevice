var CHAIN_TIMEOUT_MS = 300;
var EVENT_KEYPRESS = "keypress";
var ENABLE_LOGGING = false;

var currentlyInChain = false;

function log() {
  if (ENABLE_LOGGING) console.log(arguments);
}

function addChainedListener(e1) {
  if (currentlyInChain) return;

  var chainListener = function(e) {
    handleEvent(e1, e);
    log("removing chain listener at evaluate");
    document.removeEventListener(EVENT_KEYPRESS, chainListener);
    currentlyInChain = false;
  };
  log("adding chain listener");
  document.addEventListener(EVENT_KEYPRESS, chainListener);
  currentlyInChain = true;

  var timeoutID = window.setTimeout(function() {
    log("removing chain listener");
    document.removeEventListener(EVENT_KEYPRESS, chainListener);
    currentlyInChain = false;
  }, CHAIN_TIMEOUT_MS);
}

function executeAction(id) {
  var action = ACTION_MAP[id];
  if (action) {
    action.apply(this, arguments);
    return true;
  }
  return false;
}

function handleEvent(/* multiple events */) {
  log(arguments);
  var id = chainId.apply(this, arguments);
  log(id);
  if (executeAction(id)) return;

  var id = keyId(arguments[0]);
  for (var chain in ACTION_MAP) {
    if (chain.indexOf(id) == 0) {
      addChainedListener(arguments[0]);
      return;
    }
  }
}

document.addEventListener(EVENT_KEYPRESS, handleEvent);
