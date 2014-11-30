function SearchState() {
  this.reset("");
}

SearchState.prototype.reset = function(pattern) {
  this.pattern = pattern;
  if (startsWith(this.pattern, "\\C")) {
    this.re = new RegExp(escapeRegExp(this.pattern.substr(2)), "g");
  } else {
    this.re = new RegExp(escapeRegExp(this.pattern), "gi");
  }
  log(pattern, this.re.source);
};

function SearchHighlight() {
  this.highlights = [];
}

SearchHighlight.prototype.reset = function(matches) {
  if (this.highlights) {
    this.highlights.forEach(function(hl) {
      var parentElem = hl.span.parentElement;
      if (hl.original != hl.matched && hl.matched != hl.trailing) {
        hl.original.textContent = hl.original.textContent + hl.matched.textContent +
          hl.trailing.textContent;
        parentElem.removeChild(hl.span);
        parentElem.removeChild(hl.trailing);
      } else if (hl.original != hl.matched) {
        hl.original.textContent = hl.original.textContent + hl.matched.textContent;
        parentElem.removeChild(hl.span);
      } else if (hl.matched != hl.trailing) {
        hl.original.textContent = hl.matched.textContent + hl.trailing.textContent;
        parentElem.removeChild(hl.span);
        parentElem.removeChild(hl.trailing);
      } else {
        hl.original.textContent = hl.matched.textContent;
        parentElem.removeChild(hl.span);
      }
      hl.searchNode.resetFromTextNode(hl.original);
    });
  }

  this.highlights = [];
  if (!matches) return;

  for (var i = 0; i < matches.length; ++i) {
    var match = matches[i];
    var original = match.searchNode.node;
    var matched = match.searchNode.node;
    if (match.start != 0) {
      matched = matched.splitText(match.start);
    }
    var trailing = matched;
    if (match.end != matched.textContent.length) {
      trailing = matched.splitText(match.end - match.start);
    }
    var range = document.createRange();
    range.selectNode(matched);
    var span = document.createElement("span");
    range.surroundContents(span);
    span.style.background = "yellow";

    var focusableAncestor = getFocusableAncestor(span);
    if (focusableAncestor) {
      focusableAncestor.focus();
    }

    this.highlights.push({
      original: original,
      matched: matched,
      trailing: trailing,
      originalBackground: original.parentElement.style.background,
      span: span,
      searchNode: match.searchNode
    });
  }
};

SearchHighlight.prototype.getHighlightedSpans = function() {
  var spans = [];
  this.highlights.forEach(function(hl) {
    spans.push(hl.span);
  });
  return spans;
};

SearchHighlight.prototype.setOrange = function() {
  this.getHighlightedSpans().forEach(function(span) {
    span.style.background = "orange";
  });
};

SearchHighlight.prototype.setYellow = function() {
  this.getHighlightedSpans().forEach(function(span) {
    span.style.background = "yellow";
  });
};

function SearchHighlightSet() {
  this.hlSet = [];
  this.currentMatchIndex = -1;
}

SearchHighlightSet.prototype.reset = function(matches) {
  this.hlSet.forEach(function(hl) {
    hl.reset();
  });

  var hlSet = this.hlSet = [];
  this.currentMatchIndex = -1;

  if (matches) {
    matches.reverse().forEach(function(match) {
      var hl = new SearchHighlight();
      hl.reset(match.nodes);
      hlSet.push(hl);
    });
  }
  this.hlSet = this.hlSet.reverse();
};

SearchHighlightSet.prototype.showNextMatch = function() {
  this.hideMatch(this.currentMatchIndex);
  var len = this.hlSet.length;
  this.currentMatchIndex = (this.currentMatchIndex + len + 1) % len;
  this.showMatch(this.currentMatchIndex);
}

SearchHighlightSet.prototype.showPreviousMatch = function() {
  this.hideMatch(this.currentMatchIndex);
  var len = this.hlSet.length;
  this.currentMatchIndex = (this.currentMatchIndex + len - 1) % len;
  this.showMatch(this.currentMatchIndex);
}

SearchHighlightSet.prototype.hideMatch = function(index) {
  if (index < 0 || index >= this.hlSet.length) return;
  this.hlSet[index].setYellow();
};

SearchHighlightSet.prototype.showMatch = function(index) {
  if (index < 0 || index >= this.hlSet.length) return;

  this.hlSet[index].setOrange();
  var spans = this.hlSet[index].getHighlightedSpans();
  if (spans.length > 0) {
    var parent = spans[0].parentElement;
    parent.scrollIntoViewIfNeeded();
  }
};

function Searcher() {
  this.searchState = new SearchState();
  this.searchHighlightSet = new SearchHighlightSet();
  this.searchBox = new CommandInput("/");

  this.searchNode = null;
  this.rootNode = null;
}

Searcher.prototype.install = function(rootNode) {
  this.rootNode = rootNode;
  this.searchBox.install(rootNode);
};

Searcher.prototype.reset = function(pattern) {
  this.searchState.reset(pattern);
  this.searchBox.reset(pattern);
};

Searcher.prototype.startSearchMode = function() {
  var s = now();
  this.searchNode = new SearchNode(this.rootNode);
  log("search: ", now() - s);
  this.reset("");
  this.searchBox.show();
};

Searcher.prototype.startSearch = function() {
  // build index
  var searchIndex = this.searchIndex = [];
  var lastIndex = this.searchState.re.lastIndex;
  do {
    var match = this.searchState.re.exec(this.searchNode.text);
    if (!match) {
      log("NO MATCHES");
      break;
    }
    log(match.index, match[0]);
    var nodes = this.searchNode.getContainingNodes(match.index, match[0].length);
    if (nodes.length) {
      log(nodes);
      searchIndex.push({
        nodes: nodes,
        match: match[0]
      });
    }
  } while (this.searchState.re.lastIndex != lastIndex);
  log(searchIndex);

  // set highlight
  this.searchHighlightSet.reset(searchIndex);

  // set main-highglight
  this.searchHighlightSet.showNextMatch();
};

Searcher.prototype.clearSearch = function() {
  this.searchHighlightSet.reset();
  this.searchBox.hide();
};

Searcher.prototype.handleNewCharacter = function(character) {
  this.reset(this.searchState.pattern + character);
};

Searcher.prototype.handleBackspace = function() {
  this.reset(this.searchState.pattern.substr(
        0, this.searchState.pattern.length - 1));
};

Searcher.prototype.searchNext = function() {
  this.searchHighlightSet.showNextMatch();
};

Searcher.prototype.searchBack = function() {
  this.searchHighlightSet.showPreviousMatch();
};
