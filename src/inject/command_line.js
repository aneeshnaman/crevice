function CommandLine() {
  this.command = "";
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
  var parts = this.command.split(" ");
  if (!parts.length) return;

  var cmd = parts[0];
  var args = parts.splice(1);
  if (cmd == "open") {
    window.location = args[0];
  } else if (cmd == "tabopen") {
    openNewTab(args[0]);
  }
};

CommandLine.prototype.handleNewCharacter = function(character) {
  this.reset(this.command + character);
};

CommandLine.prototype.handleBackspace = function() {
  this.reset(this.command.substr(0, this.command.length - 1));
};
