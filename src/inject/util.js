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
