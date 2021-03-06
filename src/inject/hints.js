function Hints() {
  this.focusableNodes = [];
  this.hintToNodeMap = {};
  this.hintSpans = [];
  this.currentChain = "";
  this.newTab = false;
  this.rootNode = null;
  this.idGenerator = new HintsIdGenerator(
    ['a', 's', 'd', 'f', 'j', 'k', 'l', 'w', 'e', 'r', 'u', 'i', 'y', 'n']);
}

Hints.prototype.install = function(node) {
  this.rootNode = node;
  this.rescan();
};

Hints.prototype.rescan = function(node) {
  this.focusableNodes = [];
  var s = now();
  this.scan(this.rootNode);
  log("hints: ", now() - s);
};

Hints.prototype.scan = function(node) {
  if (isFocusable(node)) {
    this.focusableNodes.push(node);
  }
  for (var i = 0; i < node.childNodes.length; ++i) {
    this.scan(node.childNodes[i]);
  }
};

Hints.prototype.show = function(newTab) {
  this.rescan();

  this.newTab = newTab;
  var inViewport = this.focusableNodes.filter(isNodeInViewport);
  // If the list of nodes is same as the last time, reuse the map so that we
  // show the same hint for the same node.
  if (!arraySame(inViewport, this.inViewport)) {
    this.inViewport = inViewport;
    ids = this.idGenerator.generate(inViewport.length);
    this.hintToNodeMap = mapTogether(ids, inViewport);
  }

  var rootNode = this.rootNode;
  var hintSpans = this.hintSpans = [];
  for (var id in this.hintToNodeMap) {
    var span = document.createElement("span");
    span.textContent = id.toUpperCase();
    span.className = "hint-span";

    span.style.border = "1px solid rgb(255, 200, 90)";
    span.style.fontWeight = "bold";
    span.style.background = "-webkit-linear-gradient(yellow, rgb(250, 210, 140))";
    span.style.display = "block";
    span.style.fontSize = "11px";
    span.style.borderRadius = "3px";
    span.style.padding = "1px 3px 0 3px";
    span.style.lineHeight = "100%";
    span.style.color = "black";
    span.style.boxShadow = "1px 1px 5px #aaa";
    span.style.position = "fixed";
    span.style.zIndex = "9999";

    var node = this.hintToNodeMap[id];

    span.style.top = node.getBoundingClientRect().top + "px";
    span.style.left = node.getBoundingClientRect().left + "px";

    rootNode.appendChild(span);
    hintSpans.push({id: id, span: span});
  }

  this.currentChain = "";
};

Hints.prototype.hide = function() {
  var rootNode = this.rootNode;
  this.hintSpans.forEach(function(span) {
    rootNode.removeChild(span.span);
  });
  this.hintSpans = [];
};

Hints.prototype.handle = function(id) {
  this.currentChain += id;
  var currentChain = this.currentChain.toLowerCase();

  if (currentChain in this.hintToNodeMap) {
    this.hide();
    this.execute(this.hintToNodeMap[currentChain],
                 isUpperCaseChar(this.currentChain[0]));
    return true;
  }

  var found = false;
  this.hintSpans.forEach(function(span) {
    if (!startsWith(span.id, currentChain)) {
      span.span.style.visibility = "hidden";
    } else {
      var first = document.createElement("span");
      first.textContent = currentChain.toUpperCase();
      first.style.color = "rgb(215, 200, 70)";
      var second = document.createElement("span");
      second.textContent = span.id.substr(currentChain.length).toUpperCase();
      span.span.innerHTML = "";
      span.span.appendChild(first);
      span.span.appendChild(second);

      found = true;
    }
  });
  if (!found) {
    this.hide();
    return true;
  }

  return false;
};

Hints.prototype.execute = function(node, inBackground) {
  if (node instanceof HTMLAnchorElement && node.href && this.newTab) {
    if (inBackground) {
      NEW_BG_TAB_AFTER_CURRENT(node.href);
    } else {
      NEW_TAB_AFTER_CURRENT(node.href);
    }
  } else if (isTextInput(node)) {
    node.focus();
  } else {
    node.click();
  }
}

// for simplicity this assumes that we won't need to go beyond three letters.
function HintsIdGenerator(letters) {
  this.letters = letters;
  this.positions = map(letters, function(letter) {
    return letters.indexOf(letter);
  });
}

HintsIdGenerator.prototype.generate = function(num) {
  if (num == 0) return [];

  var ids = [str(this.letters[0], 2)];  // seed, e.g. "aa"
  while (ids.length < num) {
    var id = last(ids);
    var pos = id.length - 1;
    for (pos = id.length - 1; pos >= 0; --pos) {
      if (id[pos] != this.lastAllowed(id.length, pos)) {
        ids.push(
            id.substr(0, pos) +
            this.letters[this.positions[id[pos]] + 1] +
            str(this.letters[0], max(0, id.length - pos - 1)));
        break;
      } else if (pos == 0) {
        ids.push(this.firstAllowed(id.length + 1, pos)
            + str(this.letters[0], id.length));
      }
    }
  }
  return shuffleArray(ids);
};

HintsIdGenerator.prototype.firstAllowed = function(length, pos) {
  if (pos != 0) {
    return this.letters[0];
  }

  if (length == 2) {
    return this.letters[0];
  } else {
    return this.letters[Math.floor(this.letters.length / 2) + 1];
  }
};

HintsIdGenerator.prototype.lastAllowed = function(length, pos) {
  if (pos != 0) {
    return last(this.letters);
  }

  if (length == 2) {
    return this.letters[Math.floor(this.letters.length / 2)];
  } else {
    return last(this.letters);
  }
};
