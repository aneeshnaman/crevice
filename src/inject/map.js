var ACTION_MAP = {
  "NORMAL": {
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
  },
  "SEARCH": {
    "Ctrl+[": STOP_SEARCH,
    "<ret>": STOP_SEARCH,
    "<bksp>": SEARCH_BACKSPACE,
    "PASSTHROUGH": ADD_TO_SEARCH,
  },
};
