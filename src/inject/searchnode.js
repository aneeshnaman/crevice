function SearchNode(node) {
  this.node = node;
  this.text = "";
  this.childrenData = [];
  this.children = [];

  if (node instanceof Text) {
    this.resetFromTextNode(node);
  } else {
    var idx = 0;
    for (var i = 0; i < node.childNodes.length; ++i) {
      var child = node.childNodes[i];
      if (!isVisible(child)) continue;
      if (!child instanceof Text &&
          !child instanceof node) continue;

      var childSearchNode = new SearchNode(child);
      this.text += childSearchNode.text;
      var length = childSearchNode.length;
      this.childrenData.push({ start: idx, length: length });
      this.children.push(childSearchNode);
    idx += length;
    }
    this.length = this.text.length;
  }
}

SearchNode.prototype.resetFromTextNode = function(textNode) {
  this.node = textNode;
  this.text = textNode.textContent;
  this.length = this.text.length;
};

SearchNode.prototype.getContainingNodes = function(pos, length) {
  if (pos > this.length || pos + length < 0) {
    return [];
  }

  if (this.children.length == 0) {
    return [{
      searchNode: this,
      start: max(0, pos),
      end: min(this.length, pos + length)
    }];
  }

  var result = [];
  for (var i = 0; i < this.childrenData.length; ++i) {
    var childData = this.childrenData[i];
    if ((pos < childData.start + childData.length) &&
        (pos + length > childData.start)) {
      result = result.concat(
          this.children[i].getContainingNodes(pos - childData.start, length));
    }
  }
  return result;
};
