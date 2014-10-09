function focusNextInput() {
  // todo: merge and sort by document position
  var inputs = [].slice.call(document.getElementsByTagName("input"))
    .filter(isTextInput).filter(isVisible);
  var textareas = [].slice.call(document.getElementsByTagName("textarea"))
    .filter(isVisible);
  var sorted = inputs.concat(textareas).sort(compareByPosition);
  if (sorted.length > 0) {
    sorted[0].focus();
    return true;
  }
  return false;
}
