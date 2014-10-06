// TODO
// * backwards match
// * case-insensitive match
// * highlight only the matching text
// * match can span multiple elements

function SearchState() {
  this.reset("");
}

SearchState.prototype.reset = function(pattern) {
  this.pattern = pattern;
  this.re = new RegExp(escapeRegExp(pattern), "g");
};

function SearchHighlight() {
  this.matchedElem = null;
  this.originalBackground = "";
};

SearchHighlight.prototype.reset = function(elem) {
  if (this.matchedElem) {
    this.matchedElem.style.background = this.originalBackground;
  }
  this.matchedElem = elem;
  if (elem) {
    this.originalBackground = elem.style.background;
    this.matchedElem.style.background = "yellow";
  }
};

function SearchBox() {
  this.boxElem = document.createElement("div");
  this.textElem = document.createTextNode("");
  this.boxElem.appendChild(this.textElem);
  styleSearchBox(this.boxElem);
}

SearchBox.prototype.show = function() {
  this.boxElem.style.visibility = "visible";
};

SearchBox.prototype.hide = function() {
  this.boxElem.style.visibility = "hidden";
};

SearchBox.prototype.reset = function(pattern) {
  this.textElem.textContent = "/" + pattern;
}

function Searcher(rootElement) {
  this.rootElement = rootElement;

  this.searchNode = new SearchNode(rootElement);
  this.searchState = new SearchState();
  this.searchHighlight = new SearchHighlight();
  this.searchBox = new SearchBox();
}

Searcher.prototype.install = function(container) {
  container.appendChild(this.searchBox.boxElem);
};

Searcher.prototype.reset = function(pattern) {
  this.searchState.reset(pattern);
  this.searchBox.reset(pattern);
};

Searcher.prototype.startSearch = function() {
  this.reset("");
  this.searchBox.show();
};

Searcher.prototype.stopSearch = function() {
  this.searchHighlight.reset(null);
  this.searchBox.hide();
};

Searcher.prototype.getNextMatchingElem = function() {
  var lastIndex = this.searchState.re.lastIndex;
  do {
    var match = this.searchState.re.exec(getText(this.rootElement));
    if (!match) {
      log("NO FIND");
      return null;
    }
    log(match.index, match[0]);
    var node = this.searchNode.getContainingNode(match.index);
    if (node && node.element && isVisible(node.element.parentElement)) {
      return node.element;
    }
  } while (this.searchState.re.lastIndex != lastIndex);
  return null;
}

Searcher.prototype.handleNewCharacter = function(character) {
  this.reset(this.searchState.pattern + character);
  this.searchNext();
}

Searcher.prototype.handleBackspace = function() {
  this.reset(this.searchState.pattern.substr(
        0, this.searchState.pattern.length - 1));
  this.searchNext();
}

Searcher.prototype.searchNext = function() {
  this.searchHighlight.reset(null);

  var elem = this.getNextMatchingElem();
  if (elem && elem == this.searchBox.textElem) {
    elem = this.getNextMatchingElem();
  }
  if (!elem) {
    return;
  }

  log(elem);
  if (!elem.style) elem = elem.parentElement;

  this.searchHighlight.reset(elem);
  elem.scrollIntoViewIfNeeded();
}

Searcher.prototype.searchBack = function() {
  // todo: implement
};

function styleSearchBox(elem) {
  elem.style.width = "15em";
  elem.style.padding = "0 5px";
  elem.style.background = "#333";
  elem.style.color = "white";
  elem.style.position = "fixed";
  elem.style.bottom = "0";
  elem.style.right = "0";
  elem.style.visibility = "hidden";
};
