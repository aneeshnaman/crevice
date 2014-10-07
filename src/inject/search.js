// TODO
// * backwards match
// * highlight only the matching text

function SearchState() {
  this.reset("");
}

SearchState.prototype.reset = function(pattern) {
  this.pattern = pattern;
  if (startsWith(this.pattern, "\\c")) {
    this.re = new RegExp(escapeRegExp(this.pattern.substr(2)), "gi");
  } else {
    this.re = new RegExp(escapeRegExp(this.pattern), "g");
  }
  log(pattern, this.re.source);
};

function SearchHighlight() {
}

SearchHighlight.prototype.reset = function(matches) {
  if (this.highlights) {
    this.highlights.forEach(function(hl) {
      var newText = document.createTextNode("");
      var parentElem = hl.span.parentElement;
      if (hl.original != hl.element && hl.element != hl.trailing) {
        newText.textContent = hl.original.textContent + hl.element.textContent +
          hl.trailing.textContent;
        parentElem.insertBefore(newText, hl.original);
        parentElem.removeChild(hl.original);
        parentElem.removeChild(hl.span);
        parentElem.removeChild(hl.trailing);
      } else if (hl.original != hl.element) {
        newText.textContent = hl.original.textContent + hl.element.textContent;
        parentElem.insertBefore(newText, hl.original);
        parentElem.removeChild(hl.original);
        parentElem.removeChild(hl.span);
      } else if (hl.element != hl.trailing) {
        newText.textContent = hl.element.textContent + hl.trailing.textContent;
        parentElem.insertBefore(newText, hl.span);
        parentElem.removeChild(hl.span);
        parentElem.removeChild(hl.trailing);
      } else {
        newText.textContent = hl.element.textContent;
        parentElem.insertBefore(newText, hl.span);
        parentElem.removeChild(hl.span);
      }
      hl.node.resetFromTextNode(newText);
    });
  }

  this.highlights = [];
  if (!matches) return;

  for (var i = 0; i < matches.length; ++i) {
    var match = matches[i];
    var original = match.node.element;
    var element = match.node.element;
    if (match.start != 0) {
      element = element.splitText(match.start);
    }
    var trailing = element;
    if (match.end != element.textContent.length) {
      trailing = element.splitText(match.end - match.start);
    }
    var range = document.createRange();
    range.selectNode(element);
    var span = document.createElement("span");
    range.surroundContents(span);
    span.style.background = "yellow";

    this.highlights.push({
      original: original,
      element: element,
      trailing: trailing,
      originalBackground: original.parentElement.style.background,
      span: span,
      node: match.node
    });
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
};

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
  this.searchHighlight.reset();
  this.searchBox.hide();
};

Searcher.prototype.getNextMatches = function() {
  var lastIndex = this.searchState.re.lastIndex;
  do {
    var match = this.searchState.re.exec(this.searchNode.text);
    if (!match) {
      log("NO MATCHES");
      return null;
    }
    log(match.index, match[0]);
    var nodes = this.searchNode.getContainingNodes(match.index, match[0].length);
    if (nodes.length) {
      log(nodes);
      return {
        nodes: nodes,
        match: match[0]
      };
    }
  } while (this.searchState.re.lastIndex != lastIndex);
  return null;
};

Searcher.prototype.handleNewCharacter = function(character) {
  this.reset(this.searchState.pattern + character);
};

Searcher.prototype.handleBackspace = function() {
  this.reset(this.searchState.pattern.substr(
        0, this.searchState.pattern.length - 1));
};

Searcher.prototype.searchNext = function() {
  this.searchHighlight.reset();

  var matches = this.getNextMatches();
  if (matches && matches.nodes[0].node.element == this.searchBox.textElem) {
    matches = this.getNextMatches();
  }
  if (!matches) return;

  // element will always be a Text node, so take its parent.
  if (matches.nodes.length > 0) {
    var parent = matches.nodes[0].node.element.parentElement;
    parent.scrollIntoViewIfNeeded();
  }

  this.searchHighlight.reset(matches.nodes);
};

Searcher.prototype.searchBack = function() {
  // todo: implement
};

function styleSearchBox(elem) {
  elem.style.width = "100%";
  elem.style.padding = "0 5px";

  elem.style.background = "#efefef";
  elem.style.position = "fixed";
  elem.style.borderTop = "1px solid #aaa";

  elem.style.bottom = "0";
  elem.style.visibility = "hidden";
}
