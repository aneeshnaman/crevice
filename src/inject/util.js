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
  return ["email", "number", "password", "search", "tel", "text", "url"]
    .indexOf(type) >= 0;
}

function isTextInput(node) {
  if (node instanceof HTMLInputElement && isInputTypeText(node.type)) return true;
  if (node instanceof HTMLTextAreaElement) return true;

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
    isNumber(node.getAttribute("tabindex"));
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
  if (startsWith(url, "http://" || startsWith(url, "https://"))) {
    return url;
  } else {
    return "http://" + url;
  }
}
