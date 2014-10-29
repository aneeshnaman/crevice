function Options(data) {
  log("setting options from", data);
  this.data = data;
  this.blacklistedUrls = [];
  this.ignoreMap = {};
  this.enableMap = {};
  this.actionMap = {};
  this.init();
}

Options.prototype.init = function() {
  if ("blacklist" in this.data) {
    this.blacklistedUrls = this.data["blacklist"];
  }
  if ("ignore" in this.data) {
    this.ignoreMap = this.data["ignore"];
  }
  if ("enable" in this.data) {
    this.enableMap = this.data["enable"];
  }
  if ("actions" in this.data) {
    for (var m in Mode) {
      var mode = Mode[m];
      if (mode in this.data["actions"]) {
        this.actionMap[mode] = {};
        for (var id in this.data["actions"][mode]) {
          this.actionMap[mode][id] =
            Options.__OPTION_ACTION_MAP__[this.data["actions"][mode][id]];
        }
      }
    }
  }
};

Options.__OPTION_ACTION_MAP__ = {
  "ADD_TO_COMMAND": ADD_TO_COMMAND,
  "ADD_TO_SEARCH": ADD_TO_SEARCH,
  "CANCEL_HINTS": CANCEL_HINTS,
  "CANCEL_OPERATOR": CANCEL_OPERATOR,
  "CLOSE_TAB": CLOSE_TAB,
  "CMD_NEW_TAB": CMD_NEW_TAB,
  "CMD_NEW_TAB_RELATIVE": CMD_NEW_TAB_RELATIVE,
  "CMD_OPEN_TAB": CMD_OPEN_TAB,
  "CMD_OPEN_TAB_RELATIVE": CMD_OPEN_TAB_RELATIVE,
  "COMMAND_BACKSPACE": COMMAND_BACKSPACE,
  "DECREASE_BODY_MARGIN": DECREASE_BODY_MARGIN,
  "DISABLE_CREVICE": DISABLE_CREVICE,
  "ENABLE_CREVICE": ENABLE_CREVICE,
  "EXECUTE_COMMAND": EXECUTE_COMMAND,
  "EXIT_INSERT_MODE": EXIT_INSERT_MODE,
  "FOCUS_NEXT_INPUT": FOCUS_NEXT_INPUT,
  "HANDLE_HINT_INPUT": HANDLE_HINT_INPUT,
  "HANDLE_OPERATOR": HANDLE_OPERATOR,
  "HISTORY_BACK": HISTORY_BACK,
  "HISTORY_FORWARD": HISTORY_FORWARD,
  "INCREASE_BODY_MARGIN": INCREASE_BODY_MARGIN,
  "LOAD_URL": LOAD_URL,
  "MOVE_TAB_AFTER": MOVE_TAB_AFTER,
  "MOVE_TAB_BEFORE": MOVE_TAB_BEFORE,
  "NEW_BG_TAB": NEW_BG_TAB,
  "NEW_BG_TAB_AFTER_CURRENT": NEW_BG_TAB_AFTER_CURRENT,
  "NEW_TAB": NEW_TAB,
  "NEW_TAB_AFTER_CURRENT": NEW_TAB_AFTER_CURRENT,
  "NEXT_TAB": NEXT_TAB,
  "PAGE_DOWN": PAGE_DOWN,
  "PAGE_HALF_DOWN": PAGE_HALF_DOWN,
  "PAGE_HALF_UP": PAGE_HALF_UP,
  "PAGE_UP": PAGE_UP,
  "PREVIOUS_TAB": PREVIOUS_TAB,
  "RELOAD": RELOAD,
  "RELOAD_ALL": RELOAD_ALL,
  "RELOAD_FORCE": RELOAD_FORCE,
  "REOPEN_LAST_CLOSED": REOPEN_LAST_CLOSED,
  "SCROLL_BOTTOM": SCROLL_BOTTOM,
  "SCROLL_DOWN": SCROLL_DOWN,
  "SCROLL_TOP": SCROLL_TOP,
  "SCROLL_UP": SCROLL_UP,
  "SEARCH_BACK": SEARCH_BACK,
  "SEARCH_BACKSPACE": SEARCH_BACKSPACE,
  "SEARCH_NEXT": SEARCH_NEXT,
  "START_COMMAND": START_COMMAND,
  "START_HINTS": START_HINTS,
  "START_HINTS_NEW_WINDOW": START_HINTS_NEW_WINDOW,
  "START_OPERATOR": START_OPERATOR,
  "START_SEARCH": START_SEARCH,
  "STOP_AND_SEARCH_NEXT": STOP_AND_SEARCH_NEXT,
  "STOP_COMMAND": STOP_COMMAND,
  "STOP_SEARCH": STOP_SEARCH,
  "ZOOM_DEFAULT": ZOOM_DEFAULT,
  "ZOOM_DOWN": ZOOM_DOWN,
  "ZOOM_UP": ZOOM_UP,
};
