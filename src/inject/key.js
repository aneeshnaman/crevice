function time(e) { return e.timeStamp; }
function ctrl(e) { return e.ctrlKey; }
function alt(e) { return e.altKey; }
function shift(e) { return e.shiftKey; }

function keyId(e) {
  var CTRL_ID = "Ctrl+";
  var ALT_ID = "Alt+";

  var id = "";
  if (ctrl(e)) { id += CTRL_ID; }
  if (alt(e)) { id += ALT_ID; }
  id += String.fromCharCode(e.charCode);
  return id;
}

function chainId(events) {
  var KEY_SEPARATOR = "_";

  var components = [];
  events.forEach(function(e) { components.push(keyId(e)); });
  return components.join(KEY_SEPARATOR);
}
