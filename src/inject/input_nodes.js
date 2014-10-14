function isNonCreviceInput(elem) {
  return elem.getAttribute("data-crevice") != "ignore-for-insert";
}

function focusNextInput() {
  // todo: merge and sort by document position
  var inputs = [].slice.call(document.getElementsByTagName("input"))
    .filter(isTextInput).filter(isVisible).filter(isNonCreviceInput);
  var textareas = [].slice.call(document.getElementsByTagName("textarea"))
    .filter(isVisible).filter(isNonCreviceInput);
  var sorted = inputs.concat(textareas).sort(compareByPosition);
  if (sorted.length > 0) {
    sorted[0].focus();
    return true;
  }
  return false;
}
