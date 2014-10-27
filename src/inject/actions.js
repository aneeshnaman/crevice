function SCROLL_DOWN(ke, id) { scrollBy(0, 100); }
function SCROLL_UP(ke, id) { scrollBy(0, -100); }
function SCROLL_TOP(ke, id) { scrollTo(0, 0); }
function SCROLL_BOTTOM(ke, id) { scrollTo(0, 100000); }
function PAGE_DOWN(ke, id) { scrollBy(0, 500); }
function PAGE_UP(ke, id) { scrollBy(0, -500); }
function PAGE_HALF_DOWN(ke, id) { scrollBy(0, 250); }
function PAGE_HALF_UP(ke, id) { scrollBy(0, -250); }

function ZOOM_UP() { zoomUp(); }
function ZOOM_DOWN() { zoomDown(); }
function ZOOM_DEFAULT() { zoomDefault(); }

function START_SEARCH(ke, id) {
  Crevice.mode = Mode.SEARCH;
  Crevice.searcher.startSearch();
}

function STOP_SEARCH(ke, id) {
  Crevice.mode = Mode.NORMAL;
  Crevice.searcher.stopSearch();
}

function STOP_AND_SEARCH_NEXT(ke, id) {
  Crevice.mode = Mode.NORMAL;
  Crevice.searcher.stopSearch();
  Crevice.searcher.searchNext();
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

function LOAD_URL(url) { window.location = fixUrl(url); }
function NEW_TAB(url) { openNewTab(fixUrl(url)); }
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
