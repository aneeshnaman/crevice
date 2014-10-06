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
  return string.replace(/([.*+?^${}()|\[\]\/\\])/g, "\\$1");
}

function getText(element) {
  return element.textContent || "";
}

function isVisible(node) {
  return node.offsetHeight > 0;
}
