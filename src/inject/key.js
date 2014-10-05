function getKey(keyCode, shiftKey) {
  log(keyCode, shiftKey);
  if (keyCode >= 48 && keyCode <= 57) {
    // 0-9
    if (!shiftKey) {
      return String.fromCharCode(keyCode);
    } else {
      return [')', '!', '@', '#', '$', '%', '^', '&', '*', '('][keyCode - 48]
    }
  }

  if (keyCode >= 65 && keyCode <= 90) {
    // a-z
    if (shiftKey) {
      return String.fromCharCode(keyCode).toUpperCase();
    } else {
      return String.fromCharCode(keyCode).toLowerCase();
    }
  }

  if (!shiftKey) {
    return {
      186: ';',
      187: '=',
      188: ',',
      189: '-',
      190: '.',
      191: '/',
      192: '`',
      219: '[',
      220: '\\',
      221: ']',
      222: '\''
    }[keyCode];
  } else {
    return {
      186: ':',
      187: '+',
      188: '<',
      189: '_',
      190: '>',
      191: '?',
      192: '~',
      219: '{',
      220: '|',
      221: '}',
      222: '"'
    }[keyCode];
  }
}

function KeyEvent(e) {
  this.e = e;
  this.timeStamp = e.timeStamp;
  this.ctrlKey = e.ctrlKey;
  this.altKey = e.altKey;
  this.shiftKey = e.shiftKey;
  this.key = getKey(e.keyCode, e.shiftKey);
}

function time(e) { return e.timeStamp; }
function ctrl(e) { return e.ctrlKey; }
function alt(e) { return e.altKey; }
function shift(e) { return e.shiftKey; }
function key(e) { return e.key; }
function hasKey(e) { return !!e.key; }
function setKey(e, key) { e.key = key; }

function keyId(e) {
  var CTRL_ID = "Ctrl+";
  var ALT_ID = "Alt+";

  var id = "";
  if (ctrl(e)) { id += CTRL_ID; }
  if (alt(e)) { id += ALT_ID; }
  id += key(e);
  return id;
}

function chainId(events) {
  var KEY_SEPARATOR = "_";

  var components = [];
  events.forEach(function(e) { components.push(keyId(e)); });
  return components.join(KEY_SEPARATOR);
}
