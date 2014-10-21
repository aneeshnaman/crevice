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
  gMode = Mode.SEARCH;
  gSearcher.startSearch();
}

function STOP_SEARCH(ke, id) {
  gMode = Mode.NORMAL;
  gSearcher.stopSearch();
}

function STOP_AND_SEARCH_NEXT(ke, id) {
  gMode = Mode.NORMAL;
  gSearcher.stopSearch();
  gSearcher.searchNext();
}

function ADD_TO_SEARCH(ke, id) { gSearcher.handleNewCharacter(id); }
function SEARCH_NEXT(ke, id) { gSearcher.searchNext(); }
function SEARCH_BACK(ke, id) { gSearcher.searchBack(); }
function SEARCH_BACKSPACE(ke, id) { gSearcher.handleBackspace(); }

function ENABLE_CREVICE(ke, id) { gMode = Mode.NORMAL; }
function DISABLE_CREVICE(ke, id) { gMode = Mode.DISABLED; }

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
  gMode = Mode.NORMAL;
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
  gMode = Mode.COMMAND;
  gCommand.start();
}

function STOP_COMMAND() {
  gCommand.stop();
  gMode = Mode.NORMAL;
}

function EXECUTE_COMMAND() {
  gCommand.execute();
}

function COMMAND_BACKSPACE() {
  gCommand.handleBackspace();
}

function ADD_TO_COMMAND(ke, id) {
  gCommand.handleNewCharacter(id);
}

function CMD_NEW_TAB() {
  START_COMMAND();
  gCommand.reset("tabopen ");
}

function CMD_NEW_TAB_RELATIVE() {
  START_COMMAND();
  gCommand.reset("tabopen " + document.URL);
}

function CMD_OPEN_TAB() {
  START_COMMAND();
  gCommand.reset("open ");
}

function CMD_OPEN_TAB_RELATIVE() {
  START_COMMAND();
  gCommand.reset("open " + document.URL);
}

function START_OPERATOR(ke, id) {
  gMode = Mode.OPERATOR_PENDING;
  gOp.start(id);
}

function CANCEL_OPERATOR() {
  gOp.cancel();
  gMode = Mode.NORMAL;
}

function HANDLE_OPERATOR(ke, id) {
  gOp.handle(id);
  gMode = Mode.NORMAL;
}

function START_HINTS() {
  gMode = Mode.HINTS;
  gHints.show(false);
}

function START_HINTS_NEW_WINDOW() {
  gMode = Mode.HINTS;
  gHints.show(true);
}

function CANCEL_HINTS() {
  gHints.hide();
  gMode = Mode.NORMAL;
}

function HANDLE_HINT_INPUT(ke, id) {
  if (gHints.handle(id)) {
    gMode = Mode.NORMAL;
  }
}
