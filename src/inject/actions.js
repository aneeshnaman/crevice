function SCROLL_DOWN(ke, id) { window.scrollBy(0, 100); }
function SCROLL_UP(ke, id) { window.scrollBy(0, -100); }
function SCROLL_TOP(ke, id) { window.scrollTo(0, 0); }
function SCROLL_BOTTOM(ke, id) { window.scrollTo(0, document.body.scrollHeight); }
function PAGE_DOWN(ke, id) { window.scrollBy(0, 500); }
function PAGE_UP(ke, id) { window.scrollBy(0, -500); }
function PAGE_HALF_DOWN(ke, id) { window.scrollBy(0, 250); }
function PAGE_HALF_UP(ke, id) { window.scrollBy(0, -250); }

function START_SEARCH(ke, id) {
  gMode = Mode.SEARCH;
  gSearcher.startSearch();
}

function STOP_SEARCH(ke, id) {
  gMode = Mode.NORMAL;
  gSearcher.stopSearch();
}

function ADD_TO_SEARCH(ke, id) { gSearcher.handleNewCharacter(id); }
function SEARCH_NEXT(ke, id) { gSearcher.searchNext(); }
function SEARCH_BACKSPACE(ke, id) { gSearcher.handleBackspace(); }
