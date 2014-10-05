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
