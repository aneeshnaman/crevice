/**
 * TODO
 * marks
 * regex search
 * hints mode
 * command line
 */

function getKey(keyCode, shiftKey) {
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
      8: '<bksp>',
      13: '<ret>',
      32: ' ',
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

function time(ke) { return ke.timeStamp; }
function ctrl(ke) { return ke.ctrlKey; }
function alt(ke) { return ke.altKey; }
function shift(ke) { return ke.shiftKey; }
function key(ke) { return ke.key; }
function hasKey(ke) { return !!ke.key; }
function setKey(ke, key) { ke.key = key; }

function keyId(ke) {
  var CTRL_ID = "Ctrl+";
  var ALT_ID = "Alt+";

  var id = "";
  if (ctrl(ke)) { id += CTRL_ID; }
  if (alt(ke)) { id += ALT_ID; }
  id += key(ke);
  return id;
}

function chainId(events) {
  var KEY_SEPARATOR = "_";

  var components = [];
  events.forEach(function(ke) { components.push(keyId(ke)); });
  return components.join(KEY_SEPARATOR);
}
