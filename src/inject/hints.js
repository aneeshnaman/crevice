function Hints() {
  this.focusableNodes = [];
  this.hintToNodeMap = {};
  this.hintSpans = [];
  this.currentChain = "";
  this.newWindow = false;
  this.idGenerator = new HintsIdGenerator(
    ['a', 's', 'd', 'f', 'j', 'k', 'l', 'w', 'e', 'r', 'u', 'i']);
}

Hints.prototype.install = function(node) {
  this.focusableNodes = [];
  this.scan(node);
};

Hints.prototype.scan = function(node) {
  if (isFocusable(node)) {
    this.focusableNodes.push(node);
  }
  for (var i = 0; i < node.childNodes.length; ++i) {
    this.scan(node.childNodes[i]);
  }
};

Hints.prototype.show = function(newWindow) {
  var s = now();
  this.newWindow = newWindow;
  var inViewport = this.focusableNodes.filter(isNodeInViewport);
  var ids = this.idGenerator.generate(inViewport.length);
  var map = this.hintToNodeMap = mapTogether(ids, inViewport);
  log(now() - s);

  var hintSpans = this.hintSpans = [];
  ids.forEach(function(id) {
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

    var node = map[id];
    span.style.top = node.getBoundingClientRect().top + "px";
    span.style.left = node.getBoundingClientRect().left + "px";

    node.appendChild(span);
    hintSpans.push({id: id, span: span});
  });
  log(now() - s);

  this.currentChain = "";
};

Hints.prototype.hide = function() {
  this.hintSpans.forEach(function(span) {
    span.span.parentElement.removeChild(span.span);
  });
  this.hintSpans = [];
};

Hints.prototype.handle = function(id) {
  var currentChain = this.currentChain = this.currentChain + id;

  if (currentChain in this.hintToNodeMap) {
    this.hide();
    this.execute(this.hintToNodeMap[currentChain]);
    return true;
  }

  var found = false;
  this.hintSpans.forEach(function(span) {
    if (!startsWith(span.id, currentChain)) {
      span.span.style.visibility = "hidden";
    } else {
      found = true;
    }
  });
  if (!found) {
    this.hide();
    return true;
  }

  return false;
};

Hints.prototype.execute = function(node) {
  if (node instanceof HTMLAnchorElement && node.href && this.newWindow) {
    NEW_TAB(node.href);
  } else {
    node.click();
  }
}

function HintsIdGenerator(letters) {
  this.letters = letters;
  this.positions = map(letters, function(letter) {
    return letters.indexOf(letter);
  });
}

HintsIdGenerator.prototype.generate = function(num) {
  var ids = ['aa'];
  while (ids.length < num) {
    var id = last(ids);
    var pos = id.length - 1;
    for (pos = id.length - 1; pos >= 0; --pos) {
      if (id[pos] != last(this.letters)) {
        ids.push(
            id.substr(0, pos) +
            this.letters[this.positions[id[pos]] + 1] +
            str(this.letters[0], max(0, id.length - pos - 1)));
        break;
      }
    }
    if (pos < 0) {
      ids.push(str(this.letters[0], id.length + 1));
    }
  }
  return ids;
};
