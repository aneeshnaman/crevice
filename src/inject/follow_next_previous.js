var NEXT_PAGE_MATCHERS = [
  "next",
  ">>",
  "››",
  "»",
];

var PREVIOUS_PAGE_MATCHERS = [
  "previous",
  "<<",
  "‹‹",
  "«",
];

function followNext() {
  followNodeMatching(NEXT_PAGE_MATCHERS);
}

function followPrevious() {
  followNodeMatching(PREVIOUS_PAGE_MATCHERS);
}

function followNodeMatching(matchers) {
  var nodes = getMatchingNodes(document.body, matchers)
    .filter(isVisible)
    .sort(function(a, b) {
  });
  nodes.forEach(function(node) {
    var clickable = getClickableAncestor(node);
    if (clickable) {
      clickable.click();
    }
  });
}

function getMatchingNodes(node, matchers) {
  var childNodes = node.childNodes;
  if (childNodes.length > 0) {
    var res = [];
    Array.prototype.forEach.call(childNodes, function(childNode) {
      res = res.concat(getMatchingNodes(childNode, matchers));
    });
    return res;
  } else {
    var matches = false;
    matchers.forEach(function(matcher) {
      if (node.textContent.toLowerCase().match(matcher)) {
        matches = true;
      }
    });
    if (matches) {
      return [node];
    }
  }
  return [];
}
