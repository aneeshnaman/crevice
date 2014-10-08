function KeyHandler(actionMap) {
  this.actionMap = actionMap;
  this.eventChain = [];
}

KeyHandler.prototype.handleEvent = function(e, mode) {
  if (KeyHandler.shouldIgnoreEvent(e, mode)) return;
  var ke = new KeyEvent(e);
  if (hasKey(ke) && this.handleKey(ke, mode)) {
    e.preventDefault();
  }
}

KeyHandler.shouldIgnoreEvent = function(e, mode) {
  if (isTextInput(document.activeElement)) {
    log("ignoring input box");
    return true;
  }
  return false;
};

KeyHandler.CHAIN_TIMEOUT_MS = 300;

KeyHandler.prototype.handleKey = function(ke, mode) {
  if (this.eventChain.length > 0 &&
      (now() - time(last(this.eventChain))) > KeyHandler.CHAIN_TIMEOUT_MS) {
    this.eventChain = [];
  }

  this.eventChain.push(ke);
  var id = chainId(this.eventChain);
  log(this.eventChain, id);
  if (this.executeAction(ke, id, mode)) {
    this.eventChain = [];
    return true;
  } else {
    if (hasKeyStartingWith(this.actionMap[mode], id)) {
      // something more can happen, wait...
      return false;
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
    action();
    return true;
  } else if ("PASSTHROUGH" in this.actionMap[mode]) {
    this.actionMap[mode]["PASSTHROUGH"](ke, id);
    return true;
  }
  return false;
};
