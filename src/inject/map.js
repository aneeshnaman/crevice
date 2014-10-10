var Mode = {
  DISABLED: "disabled",
  NORMAL: "normal",
  SEARCH: "search",
  INSERT: "insert",
};

var ACTION_MAP = {};

ACTION_MAP[Mode.DISABLED] = {
  "Ctrl+ ": ENABLE_CREVICE,
};

ACTION_MAP[Mode.NORMAL] = {
  "Ctrl+ ": DISABLE_CREVICE,
  "j": SCROLL_DOWN,
  "k": SCROLL_UP,
  "H": HISTORY_BACK,
  "L": HISTORY_FORWARD,
  "g_g": SCROLL_TOP,
  "G": SCROLL_BOTTOM,
  "Ctrl+f": PAGE_DOWN,
  "Ctrl+b": PAGE_UP,
  "Ctrl+d": PAGE_HALF_DOWN,
  "Ctrl+u": PAGE_HALF_UP,
  "/": START_SEARCH,
  "n": SEARCH_NEXT,
  "N": SEARCH_BACK,
  ",_ ": STOP_SEARCH,
  "r": REFRESH,
  "R": REFRESH_FORCE,
  "g_i": FOCUS_NEXT_INPUT,
  "t": NEW_TAB,
  "K": PREVIOUS_TAB,
  "J": NEXT_TAB,
  "g_T": PREVIOUS_TAB,
  "g_t": NEXT_TAB,
  "d": CLOSE_TAB,
  "u": REOPEN_LAST_CLOSED,
};

ACTION_MAP[Mode.SEARCH] = {
  "Ctrl+[": STOP_SEARCH,
  "<ret>": STOP_AND_SEARCH_NEXT,
  "<bksp>": SEARCH_BACKSPACE,
  "PASSTHROUGH": ADD_TO_SEARCH,
};

ACTION_MAP[Mode.INSERT] = {
  "Ctrl+[": EXIT_INSERT_MODE,
};
