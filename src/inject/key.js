function KeyEvent(e) {
  this.timeStamp = e.timeStamp;
  this.ctrlKey = e.ctrlKey;
  this.altKey = e.altKey;
  this.shiftKey = e.shiftKey;
  this.keyCode = e.keyCode;
}

function time(e) { return e.timeStamp; }
function ctrl(e) { return e.ctrlKey; }
function alt(e) { return e.altKey; }
function shift(e) { return e.shiftKey; }
function key(e) { return e.keyCode; }
function setKey(e, key) { e.keyCode = key; }

function keyId(e) {
  var CTRL_ID = "Ctrl+";
  var ALT_ID = "Alt+";

  var id = "";
  if (ctrl(e)) { id += CTRL_ID; }
  if (alt(e)) { id += ALT_ID; }
  id += String.fromCharCode(key(e));
  return id;
}

function chainId(events) {
  var KEY_SEPARATOR = "_";

  var components = [];
  events.forEach(function(e) { components.push(keyId(e)); });
  return components.join(KEY_SEPARATOR);
}
