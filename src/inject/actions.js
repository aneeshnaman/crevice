function SCROLL_DOWN() { window.scrollBy(0, 100); }
function SCROLL_UP() { window.scrollBy(0, -100); }
function SCROLL_TOP() { window.scrollTo(0, 0); }
function SCROLL_BOTTOM() { window.scrollTo(0, document.body.scrollHeight); }
function PAGE_DOWN() { window.scrollBy(0, 500); }
function PAGE_UP() { window.scrollBy(0, -500); }
function PAGE_HALF_DOWN() { window.scrollBy(0, 250); }
function PAGE_HALF_UP() { window.scrollBy(0, -250); }
function SEARCH() {
  log("SEARCH");
  code = "f".charCodeAt(0);
  var e = document.createEvent("KeyboardEvent");
  e.initKeyboardEvent("keypress", true, true, null, true, false, false, false, code, code);
  document.dispatchEvent(e);
}
