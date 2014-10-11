function Commander(commandMap) {
  this.commandMap = commandMap;
}

Commander.prototype.execute = function(command) {
  var parts = command.split(" ");
  if (!parts.length) return true;

  var cmd = parts[0];
  var action = this.commandMap[cmd];
  if (!action) return false;

  var args = parts.splice(1);
  action.apply(this, args);
  return true;
}
