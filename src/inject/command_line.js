function CommandLine(commandMap) {
  this.userInput = "";
  this.tabIndex = -1;
  this.command = "";
  this.history = [];
  this.historyBox = new HistoryBox();
  this.commander = new Commander(commandMap);
  this.commandList = keys(commandMap);
  this.commandInput = new CommandInput(":");
}

CommandLine.prototype.install = function(container) {
  this.commandInput.install(container);
  this.historyBox.install(container);
};

CommandLine.prototype.reset = function(command) {
  this.userInput = command;
  this.tabIndex = -1;
  this.history = [];
  this.historyBox.hide();
  this.setCommand(command);
};

CommandLine.prototype.setCommand = function(command) {
  this.command = command;
  this.commandInput.reset(command);
};

CommandLine.prototype.start = function() {
  this.reset("");
  this.commandInput.show();
};

CommandLine.prototype.stop = function() {
  this.commandInput.hide();
  this.historyBox.hide();
};

CommandLine.prototype.execute = function() {
  if (!this.commander.execute(this.command)) {
    this.commandInput.flashError();
  }
};

CommandLine.prototype.handleNewCharacter = function(character) {
  if (character == "<tab>") {
    this.tryAutoComplete(true);
    return;
  } else if (character == "<TAB>") {
    this.tryAutoComplete(false);
    return;
  }

  this.reset(this.command + character);
  this.triggerHistorySearch();
}

CommandLine.prototype.handleBackspace = function() {
  this.reset(this.command.substr(0, this.command.length - 1));
  this.triggerHistorySearch();
};

CommandLine.prototype.triggerHistorySearch = function() {
  var openUrlParts = this.getOpenUrlParts(this.command);
  if (openUrlParts && openUrlParts.arg.length >= 2) {
    chrome.runtime.sendMessage({
      cmd: "search-history",
      text: openUrlParts.arg,
      maxResults: 20
    }, bind(this, this.handleHistory));
  }
};

CommandLine.prototype.getOpenUrlParts = function(command) {
  var parts = command.split(" ");
  if (!parts || parts.length <2 || !parts[0] || !parts[1]) {
    return;
  }

  if (this.commander.isOpenUrlCommand(parts[0])) {
    return {cmd: parts[0], arg: parts[1]};
  }
};

CommandLine.prototype.handleHistory = function(response) {
  var openUrlParts = this.getOpenUrlParts(this.command);
  if (openUrlParts && openUrlParts.arg != response.text) {
    log("stale results");
    return;
  }
  if (!response.results) {
    log("no history");
    return;
  }
  response.results.forEach(function(res) { log(res.url, res.title); });
  this.history = response.results;
  this.historyBox.show(this.history, -1);
};

CommandLine.prototype.tryAutoComplete = function(cycleForward) {
  var openUrlParts = this.getOpenUrlParts(this.command);
  if (openUrlParts && this.history) {
    cycleForward ? ++this.tabIndex : --this.tabIndex;
    var len = this.history.length + 1;
    this.tabIndex = (this.tabIndex + len) % len;
    var completion = this.tabIndex < len - 1 ?
        this.history[this.tabIndex].url :
        this.getOpenUrlParts(this.userInput).arg;
    this.setCommand(openUrlParts.cmd + " " + completion);
    this.historyBox.show(this.history, this.tabIndex);
    return;
  } else {
    for (var i = this.tabIndex + 1; i < this.commandList.length; ++i) {
      if (startsWith(this.commandList[i], this.userInput)) {
        this.tabIndex = i;
        this.setCommand(this.commandList[i]);
        return;
      }
    }
    this.reset(this.userInput);
  }
};
