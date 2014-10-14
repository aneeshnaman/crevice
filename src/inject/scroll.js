function scrollTo(x, y) {
  var elem = getScrollableElem();
  if (!elem) return;
  elem.scrollLeft = x;
  elem.scrollTop = y;

}

function scrollBy(x, y) {
  var elem = getScrollableElem();
  if (!elem) return;
  elem.scrollLeft += x;
  elem.scrollTop += y;
}

function getScrollableElem() {
  var elem = document.activeElement;
  while (elem != document.body && !isScrollable(elem)) {
    elem = elem.parentElement;
  }
  return elem;
}
