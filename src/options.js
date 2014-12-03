var __DEFAULT_OPTIONS__ = {
  "blacklist": [],
  "ignore": {
    ".*critique.corp.google.com/#review.*": ["u", "r"]
  },
  "enable": {
  ".*mail.google.com.*": ["Ctrl+H", "Ctrl+L", "Ctrl+<", "Ctrl+>", "g_T", "g_t", "d"],
  ".*drive.google.com.*": ["Ctrl+H", "Ctrl+L", "Ctrl+<", "Ctrl+>", "g_T", "g_t", "d"],
  ".*google.com/calendar.*": ["Ctrl+H", "Ctrl+L", "Ctrl+<", "Ctrl+>", "g_T", "g_t", "d"],
  },
  "actions": {
    "disabled": {
      "Ctrl+ ": "ENABLE_CREVICE",
    },
    "normal": {
      "Ctrl+ ": "DISABLE_CREVICE",
      "j": "SCROLL_DOWN",
      "k": "SCROLL_UP",
      "h": "SCROLL_LEFT",
      "l": "SCROLL_RIGHT",
      "H": "HISTORY_BACK",
      "L": "HISTORY_FORWARD",
      "g_g": "SCROLL_TOP",
      "G": "SCROLL_BOTTOM",
      "Ctrl+f": "PAGE_DOWN",
      "Ctrl+b": "PAGE_UP",
      "Ctrl+d": "PAGE_HALF_DOWN",
      "Ctrl+u": "PAGE_HALF_UP",
      "/": "START_SEARCH_MODE",
      "n": "SEARCH_NEXT",
      "N": "SEARCH_BACK",
      ",_ ": "CLEAR_SEARCH",
      "r": "RELOAD",
      "R": "RELOAD_FORCE",
      "g_i": "FOCUS_NEXT_INPUT",
      "Alt+h": "PREVIOUS_TAB",
      "Alt+l": "NEXT_TAB",
      "Alt+,": "MOVE_TAB_BEFORE",
      "Alt+.": "MOVE_TAB_AFTER",
      "g_T": "PREVIOUS_TAB",
      "g_t": "NEXT_TAB",
      "d": "CLOSE_TAB",
      "u": "REOPEN_LAST_CLOSED",
      ":": "START_COMMAND",
      "t": "CMD_NEW_TAB",
      "T": "CMD_NEW_TAB_RELATIVE",
      "o": "CMD_OPEN_TAB",
      "O": "CMD_OPEN_TAB_RELATIVE",
      "m": "START_OPERATOR",
      "'": "START_OPERATOR",
      "f": "START_HINTS",
      "F": "START_HINTS_NEW_WINDOW",
      "z_k": "ZOOM_UP",
      "z_j": "ZOOM_DOWN",
      "z_0": "ZOOM_DEFAULT",
      "x_k": "INCREASE_BODY_MARGIN",
      "x_j": "DECREASE_BODY_MARGIN",
      "]_]": "FOLLOW_NEXT_PAGE",
      "[_[": "FOLLOW_PREVIOUS_PAGE",
    },
    "search": {
      "Ctrl+[": "STOP_SEARCH",
      "<esc>": "STOP_SEARCH",
      "<ret>": "START_SEARCH",
      "<bksp>": "SEARCH_BACKSPACE",
      "PASSTHROUGH": "ADD_TO_SEARCH",
    },
    "command": {
      "Ctrl+[": "STOP_COMMAND",
      "<esc>": "STOP_COMMAND",
      "<ret>": "EXECUTE_COMMAND",
      "<bksp>": "COMMAND_BACKSPACE",
      "PASSTHROUGH": "ADD_TO_COMMAND",
    },
    "operator_pending": {
      "Ctrl+[": "CANCEL_OPERATOR",
      "<esc>": "CANCEL_OPERATOR",
      "PASSTHROUGH": "HANDLE_OPERATOR",
    },
    "hints": {
      "Ctrl+[": "CANCEL_HINTS",
      "<esc>": "CANCEL_HINTS",
      "PASSTHROUGH": "HANDLE_HINT_INPUT",
    },
    "insert": {
      "Ctrl+[": "EXIT_INSERT_MODE",
      "<esc>": "EXIT_INSERT_MODE",
    },
  },
};

function getUserOptions(callback) {
  chrome.storage.sync.get("options", function(data) {
    callback(data["options"]);
  });
}

function getComputedOptions(callback) {
  getUserOptions(function(optionsData) {
    var computed = copyUnsetKeys(__DEFAULT_OPTIONS__, optionsData);
    callback(computed);
  });
}

function saveUserOptions(optionsData, callback) {
  chrome.storage.sync.set({"options": optionsData}, callback);
}

function setJSONContents(elemId, data) {
  if (data) {
    document.getElementById(elemId).value = JSON.stringify(data, undefined, 2);
  }
}

function resetComputedOptionsText() {
  getComputedOptions(function(optionsData) {
    setJSONContents("options-computed", optionsData);
  });
}

function resetUserOptionsText() {
  getUserOptions(function(optionsData) {
    setJSONContents("options-user", optionsData);
  });
  document.getElementById("options-user").style.border = "1px solid grey";
}

function onSaveOptions() {
  var inputElem = document.getElementById("options-user");
  var json = inputElem.value;
  try {
    var data = JSON.parse(json);
    console.log(data);
    saveUserOptions(data);
    resetUserOptionsText();
    resetComputedOptionsText();
  } catch (e) {
    console.log("Syntax error");
    inputElem.style.border = "1px solid red";
  }
}

function setupOptionsPage() {
  setJSONContents("options-default", __DEFAULT_OPTIONS__);
  resetUserOptionsText();
  resetComputedOptionsText();

  document.getElementById("options-save").addEventListener("click", onSaveOptions);
  document.getElementById("options-undo").addEventListener(
      "click", resetUserOptionsText);
}

document.addEventListener("DOMContentLoaded", setupOptionsPage);
