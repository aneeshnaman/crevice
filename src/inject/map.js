var Mode = {
  DISABLED: "disabled",
  NORMAL: "normal",
  SEARCH: "search",
  INSERT: "insert",
  COMMAND: "command",
  OPERATOR_PENDING: "operator_pending",
  HINTS: "hints",
};

var COMMAND_MAP = {
  "open": LOAD_URL,
  "tabopen": NEW_TAB,
  "reload": RELOAD,
  "reloadAll": RELOAD_ALL,
  "options": OPEN_OPTIONS,
};
