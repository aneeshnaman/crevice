var ENABLE_LOGGING = true;
function log() {
  if (ENABLE_LOGGING) console.log(arguments);
}

function now() {
  return new Date().getTime();
}

function last(list) {
  return list[list.length -1];
}

function arrayContains(list, elem) {
  return list.indexOf(elem) >= 0;
}

function arrayAny(list, pred) {
  for (var i = 0; i < list.length; ++i) {
    if (pred(list[i])) {
      return true;
    }
  }
  return false;
}

function startsWith(str, prefix) {
  return str.indexOf(prefix) == 0;
}

function hasKeyStartingWith(map, prefix) {
  for (var key in map) {
    if (startsWith(key, prefix)) {
      return true;
    }
  }
  return false;
}

function escapeRegExp(string){
  //return string.replace(/([.*+?^${}()|\[\]\/\\])/g, "\\$1");
  return string.replace(/([\\])/g, "\\$1");
}

function isVisible(node) {
  if (node instanceof Text) {
    return isVisible(node.parentElement);
  }
  return node.offsetHeight > 0;
}

function max(a, b) {
  return a > b ? a : b;
}

function min(a, b) {
  return a < b ? a : b;
}

function isInputTypeText(type) {
  return arrayContains(
      ["email", "number", "password", "search", "tel", "text", "url"],
      type);
}

function isTextInput(node) {
  if (node instanceof HTMLInputElement && isInputTypeText(node.type)) return true;
  if (node instanceof HTMLTextAreaElement) return true;

  var userModify = node.style["-webkit-user-modify"];
  if (userModify == "read-write" || userModify == "read-write-plaintext-only") {
    return true;
  }

  if (node.isContentEditable) return true;

  if (node.parentElement && isTextInput(node.parentElement)) return true;

  return false;
}

function compareByPosition(node1, node2) {
  var comp = node1.compareDocumentPosition(node2);
  if (comp & Node.DOCUMENT_POSITION_PRECEDING) return 1;
  if (comp & Node.DOCUMENT_POSITION_FOLLOWING) return -1;
  return 0;
}

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function isFocusable(node) {
  return (node instanceof HTMLAnchorElement && node.getAttribute("href")) ||
    ((node instanceof HTMLInputElement ||
      node instanceof HTMLSelectElement ||
      node instanceof HTMLTextAreaElement ||
      node instanceof HTMLButtonElement) &&
     node.getAttribute("disabled") != null) ||
    (node.getAttribute && isNumber(node.getAttribute("tabindex")));
}

function getFocusableAncestor(node) {
  while (node != document.body) {
    if (isFocusable(node)) {
      return node;
    }
    node = node.parentElement;
  }
  return null;
}

function fixUrl(url) {
  if (startsWith(url, "http://") || startsWith(url, "https://")) {
    return url;
  } else {
    return "http://" + url;
  }
}

function isNodeInViewport(node) {
  if (!node instanceof Element || !node instanceof Text) return false;

  var rect = node.getBoundingClientRect();
  return rect.bottom > 0 &&
    rect.right > 0 &&
    rect.left < (window.innerWidth || document. documentElement.clientWidth) &&
    rect.top < (window.innerHeight || document. documentElement.clientHeight);
}

function map(list, mapper) {
  var result = [];
  list.forEach(function(element) {
    result[element]  = mapper(element);
  });
  return result;
}

function transform(list, mapper) {
  var result = [];
  list.forEach(function(element) {
    result.push(mapper(element));
  });
  return result;
}

function mapTogether(from, to) {
  if (from.length != to.length) return null;
  var result = {};
  for (var i = 0; i < from.length; ++i) {
    result[from[i]] = to[i];
  }
  return result;
}

function invertMap(map) {
  var result = {};
  for (var v in map) {
    result[map[v]] = v;
  }
  return result;
}

function str(c, length) {
  var s = "";
  for (var i = 0; i < length; ++i) {
    s += c;
  }
  return s;
};

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

function isScrollable(elem) {
  return isVisible(elem) && elem.scrollHeight > elem.offsetHeight;
}

function isUpperCaseChar(c) {
  return c.toUpperCase() == c;
}

function isObject(o) {
  return typeof o === 'object' && !(o instanceof Array);
}

function copyUnsetKeys(from, to) {
  for (var key in from) {
    if (!(key in to)) {
      to[key] = from[key];
    } else if (isObject(from[key])) {
      copyUnsetKeys(from[key], to[key]);
    }
  }
  return to;
}
