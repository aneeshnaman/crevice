function CommandLine(commandMap) {
  this.userInput = "";
  this.autoCompleteIndex = -1;
  this.command = "";
  this.commander = new Commander(commandMap);
  this.commandList = keys(commandMap);
  this.commandInput = new CommandInput(":");
}

CommandLine.prototype.install = function(container) {
  this.commandInput.install(container);
};

CommandLine.prototype.reset = function(command) {
  this.userInput = command;
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
};

CommandLine.prototype.execute = function() {
  if (!this.commander.execute(this.command)) {
    this.commandInput.flashError();
  }
};

CommandLine.prototype.handleNewCharacter = function(character) {
  if (character == "<tab>") {
    this.tryAutoComplete();
  } else {
    this.autoCompleteIndex = -1;
    this.reset(this.command + character);
  }
};

CommandLine.prototype.tryAutoComplete = function() {
  for (var i = this.autoCompleteIndex + 1; i < this.commandList.length; ++i) {
    if (startsWith(this.commandList[i], this.userInput)) {
      this.autoCompleteIndex = i;
      this.setCommand(this.commandList[i]);
      return;
    }
  }
  this.autoCompleteIndex = -1;
  this.reset(this.userInput);
};

CommandLine.prototype.handleBackspace = function() {
  this.reset(this.command.substr(0, this.command.length - 1));
};
