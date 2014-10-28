function KeyHandler(actionMap, ignoreMap, enableMap) {
  this.actionMap = actionMap;
  this.ignoreMap = ignoreMap;
  this.enableMap = enableMap;
  this.eventChain = [];
}

KeyHandler.prototype.handleEvent = function(e, mode) {
  if (isTextInput(document.activeElement) &&
      document.activeElement.getAttribute("data-crevice") != "ignore-for-insert") {
    mode = Mode.INSERT;
  }
  var ke = new KeyEvent(e);
  if (hasKey(ke) && this.handleKey(ke, mode)) {
    e.stopImmediatePropagation();
    e.preventDefault();
  }
}

KeyHandler.CHAIN_TIMEOUT_MS = 300;

KeyHandler.prototype.handleKey = function(ke, mode) {
  if (this.eventChain.length > 0 &&
      (now() - time(last(this.eventChain))) > KeyHandler.CHAIN_TIMEOUT_MS) {
    this.eventChain = [];
  }

  this.eventChain.push(ke);
  var id = chainId(this.eventChain);
  log(this.eventChain, id);

  // If url in enable-map, ignore all keys that don't match its list
  for (var pattern in this.enableMap) {
    if (document.URL.match(pattern) &&
        !arrayContains(this.enableMap[pattern], id)) {
      log("This key not enabled for this URL. Ignoring...");
      return false;
    }
  }

  // If url in ignore-map, ignore all keys that match its list
  for (var pattern in this.ignoreMap) {
    if (document.URL.match(pattern) &&
        arrayContains(this.ignoreMap[pattern], id)) {
      log("This key not enabled for this URL. Ignoring...");
      return false;
    }
  }

  if (this.executeAction(ke, id, mode)) {
    this.eventChain = [];
    return true;
  } else {
    if (hasKeyStartingWith(this.actionMap[mode], id)) {
      // something more can happen, wait...
      return true;
    }
    // nothing more can happen. now see if any suffix of the current event-seq
    // is a valid key combo, and execute that.
    for (var i = 1; i < this.eventChain.length; ++i) {
      var slice = this.eventChain.slice(i);
      var id = chainId(slice);
      if (this.executeAction(ke, id, mode)) {
        this.eventChain = [];
        return true;
      }
    }
  }
  return false;
};

KeyHandler.prototype.executeAction = function(ke, id, mode) {
  var action = this.actionMap[mode][id];
  if (action) {
    action(ke, id);
    return true;
  } else if ("PASSTHROUGH" in this.actionMap[mode]) {
    this.actionMap[mode]["PASSTHROUGH"](ke, id);
    return true;
  }
  return false;
};
