function CommandLine() {
  this.command = "";
  this.commander = new Commander();
  this.commandInput = new CommandInput(":");
}

CommandLine.prototype.install = function(container) {
  this.commandInput.install(container);
};

CommandLine.prototype.reset = function(command) {
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
  this.reset(this.command + character);
};

CommandLine.prototype.handleBackspace = function() {
  this.reset(this.command.substr(0, this.command.length - 1));
};
