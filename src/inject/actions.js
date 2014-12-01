function SCROLL_DOWN(ke, id) { scrollBy(0, 100); }
function SCROLL_UP(ke, id) { scrollBy(0, -100); }
function SCROLL_LEFT(ke, id) { scrollBy(-100, 0); }
function SCROLL_RIGHT(ke, id) { scrollBy(100, 0); }
function SCROLL_TOP(ke, id) { scrollTo(0, 0); }
function SCROLL_BOTTOM(ke, id) { scrollTo(0, 100000); }
function PAGE_DOWN(ke, id) { scrollBy(0, 500); }
function PAGE_UP(ke, id) { scrollBy(0, -500); }
function PAGE_HALF_DOWN(ke, id) { scrollBy(0, 250); }
function PAGE_HALF_UP(ke, id) { scrollBy(0, -250); }

function ZOOM_UP() { zoomUp(); }
function ZOOM_DOWN() { zoomDown(); }
function ZOOM_DEFAULT() { zoomDefault(); }

function START_SEARCH_MODE(ke, id) {
  Crevice.mode = Mode.SEARCH;
  Crevice.searcher.startSearchMode();
}

function CLEAR_SEARCH(ke, id) {
  Crevice.mode = Mode.NORMAL;
  Crevice.searcher.clearSearch();
}

function START_SEARCH(ke, id) {
  Crevice.mode = Mode.NORMAL;
  Crevice.searcher.clearSearch();
  Crevice.searcher.startSearch();
}

function ADD_TO_SEARCH(ke, id) { Crevice.searcher.handleNewCharacter(id); }
function SEARCH_NEXT(ke, id) { Crevice.searcher.searchNext(); }
function SEARCH_BACK(ke, id) { Crevice.searcher.searchBack(); }
function SEARCH_BACKSPACE(ke, id) { Crevice.searcher.handleBackspace(); }

function ENABLE_CREVICE(ke, id) { Crevice.mode = Mode.NORMAL; }
function DISABLE_CREVICE(ke, id) { Crevice.mode = Mode.DISABLED; }

function HISTORY_BACK() { window.history.back(); }
function HISTORY_FORWARD() { window.history.forward(); }
function RELOAD() { window.location.reload(); }
function RELOAD_FORCE() { window.location.reload(true); }
function RELOAD_ALL() { reloadAll(); }

function FOCUS_NEXT_INPUT() { focusNextInput(); }

function EXIT_INSERT_MODE() {
  if (isTextInput(document.activeElement)) {
    document.activeElement.blur();
  }
  Crevice.mode = Mode.NORMAL;
}

function LOAD_URL(url) { window.location = createUrl(url); }
function NEW_TAB(url) { openNewTab(createUrl(url)); }
function NEW_BG_TAB(url) { openNewBgTab(createUrl(url)); }
function NEW_TAB_AFTER_CURRENT(url) { openNewTabAfterCurrent(createUrl(url)); }
function NEW_BG_TAB_AFTER_CURRENT(url) { openNewBgTabAfterCurrent(createUrl(url)); }
function PREVIOUS_TAB() { previousTab(); }
function NEXT_TAB() { nextTab(); }
function CLOSE_TAB() { closeTab(); }
function REOPEN_LAST_CLOSED() { reopenLastClosed(); }
function MOVE_TAB_BEFORE() { moveTabBefore(); }
function MOVE_TAB_AFTER() { moveTabAfter(); }

function START_COMMAND() {
  Crevice.mode = Mode.COMMAND;
  Crevice.command.start();
}

function STOP_COMMAND() {
  Crevice.command.stop();
  Crevice.mode = Mode.NORMAL;
}

function EXECUTE_COMMAND() {
  STOP_COMMAND();
  Crevice.command.execute();
}

function COMMAND_BACKSPACE() {
  Crevice.command.handleBackspace();
}

function ADD_TO_COMMAND(ke, id) {
  Crevice.command.handleNewCharacter(id);
}

function CMD_NEW_TAB() {
  START_COMMAND();
  Crevice.command.reset("tabopen ");
}

function CMD_NEW_TAB_RELATIVE() {
  START_COMMAND();
  Crevice.command.reset("tabopen " + document.URL);
}

function CMD_OPEN_TAB() {
  START_COMMAND();
  Crevice.command.reset("open ");
}

function CMD_OPEN_TAB_RELATIVE() {
  START_COMMAND();
  Crevice.command.reset("open " + document.URL);
}

function START_OPERATOR(ke, id) {
  Crevice.mode = Mode.OPERATOR_PENDING;
  Crevice.op.start(id);
}

function CANCEL_OPERATOR() {
  Crevice.op.cancel();
  Crevice.mode = Mode.NORMAL;
}

function HANDLE_OPERATOR(ke, id) {
  Crevice.op.handle(id);
  Crevice.mode = Mode.NORMAL;
}

function START_HINTS() {
  Crevice.mode = Mode.HINTS;
  Crevice.hints.show(false);
}

function START_HINTS_NEW_WINDOW() {
  Crevice.mode = Mode.HINTS;
  Crevice.hints.show(true);
}

function CANCEL_HINTS() {
  Crevice.hints.hide();
  Crevice.mode = Mode.NORMAL;
}

function HANDLE_HINT_INPUT(ke, id) {
  if (Crevice.hints.handle(id)) {
    Crevice.mode = Mode.NORMAL;
  }
}

function INCREASE_BODY_MARGIN() {
  setBodyMarginEm(function(current) { return current + 5; });
}

function DECREASE_BODY_MARGIN() {
  setBodyMarginEm(function(current) {
    // leave some margin always
    return current - 5 <= 0 ? 1 : current - 5;
  });
}

function setBodyMarginEm(callback) {
  var marginLeft = document.body.style.marginLeft;
  if (marginLeft && !isNumber(parseFloat(marginLeft))) {
    log("Not changing margin. Current is some non-number value: ", marginLeft);
    return;
  }

  var currentMargin = marginLeft ? parseFloat(marginLeft) : 0;
  var newMargin = callback(currentMargin) + "em";

  document.body.style.marginLeft = newMargin;
  document.body.style.marginRight = newMargin;
}

function OPEN_OPTIONS() {
  chrome.runtime.sendMessage(null, {cmd: "open-options"});
}

function FOLLOW_NEXT_PAGE() {
  followNext();
}

function FOLLOW_PREVIOUS_PAGE() {
  followPrevious();
}
