var Mode = {
  NORMAL: "normal",
  SEARCH: "search",
};

var ACTION_MAP = {};

ACTION_MAP[Mode.NORMAL] = {
  "j": SCROLL_DOWN,
  "k": SCROLL_UP,
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
};

ACTION_MAP[Mode.SEARCH] = {
  "Ctrl+[": STOP_SEARCH,
  "<ret>": STOP_AND_SEARCH_NEXT,
  "<bksp>": SEARCH_BACKSPACE,
  "PASSTHROUGH": ADD_TO_SEARCH,
};
