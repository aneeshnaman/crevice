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
  action.call(this, args.join(" "));
  return true;
}

Commander.prototype.isOpenUrlCommand = function(command) {
  var action = this.commandMap[command];
  return arrayContains([
      NEW_TAB,
      NEW_TAB_AFTER_CURRENT,
      NEW_BG_TAB,
      NEW_BG_TAB_AFTER_CURRENT,
      LOAD_URL,
  ], action);
};
