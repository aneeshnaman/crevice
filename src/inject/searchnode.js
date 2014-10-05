function SearchNode(element) {
  this.element = element;
  this.length = element.textContent.length;

  this.childrenData = [];
  this.children = [];

  var idx = 0;
  for (var i = 0; i < element.childNodes.length; ++i) {
    var child = element.childNodes[i];
    if (!child instanceof Text &&
        !child instanceof Element) return;
    this.children.push(new SearchNode(child));
    var length = child.textContent.length;
    this.childrenData.push({ start: idx, length: length });
    idx += length;
  }
}

SearchNode.prototype.getContainingNode = function(pos) {
  if (pos < 0 || pos > this.length) {
    return null;
  }

  if (this.children.length == 0) {
    return this;
  }

  for (var i = 0; i < this.childrenData.length; ++i) {
    var childData = this.childrenData[i];
    if (pos >= childData.start && pos < childData.start + childData.length) {
      return this.children[i].getContainingNode(pos - childData.start);
    }
  }

  return null;
};
