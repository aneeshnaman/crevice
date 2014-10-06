function SearchNode(element) {
  this.element = element;
  this.text = "";

  this.childrenData = [];
  this.children = [];

  var idx = 0;
  for (var i = 0; i < element.childNodes.length; ++i) {
    var child = element.childNodes[i];
    if (!isVisible(child)) continue;
    if (!child instanceof Text &&
        !child instanceof Element) continue;

    var childSearchNode = new SearchNode(child);
    this.text += childSearchNode.text;
    var length = childSearchNode.length;
    this.childrenData.push({ start: idx, length: length });
    this.children.push(childSearchNode);
    idx += length;
  }

  if (element.childNodes.length == 0) {
    // because of the previous conditions, this will always be a Text node,
    // and visible.
    this.text = element.textContent;
  }

  this.length = this.text.length;
}

SearchNode.prototype.getContainingNodes = function(pos, length) {
  if (pos > this.length || pos + length < 0) {
    return [];
  }

  if (this.children.length == 0) {
    return [this];
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
