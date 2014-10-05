var gSearchBox = document.createElement("div");
var gSearchText = document.createTextNode("/");
gSearchBox.appendChild(gSearchText);
gSearchBox.style.width = "15em";
gSearchBox.style.padding = "0 5px";
gSearchBox.style.background = "#333";
gSearchBox.style.color = "white";
gSearchBox.style.position = "fixed";
gSearchBox.style.bottom = "0";
gSearchBox.style.right = "0";
gSearchBox.style.visibility = "hidden";
document.body.appendChild(gSearchBox);

var gSearchNode = new SearchNode(document.body);

function startSearch() {
  gMode = "SEARCH";
  gSearchText.textContent = "/";
  gSearchBox.style.visibility = "visible";
  gSearchPattern = "";
}

function stopSearch() {
  gMode = "NORMAL";
  gSearchBox.style.visibility = "hidden";
  resetSearchHighlight();
}

var gSearchRE;
var gSearchPattern;
var gMatchedElem;
var gMatchedElemBackground;

function getMatchingElement() {
  var result = gSearchRE.exec(document.body.textContent);
  if (!result) {
    log("NO FIND");
    return null;
  }
  log(result.index, result[0]);
  var node = gSearchNode.getContainingNode(result.index);
  return node && node.element || null;
}

function handleSearch(id) {
  gSearchPattern += id;
  gSearchText.textContent = "/ " + gSearchPattern;
  gSearchRE = new RegExp(gSearchPattern, "g");

  searchNext();
}

function searchBackspace() {
  gSearchPattern = gSearchPattern.substr(0, gSearchPattern.length - 1);
  gSearchText.textContent = "/ " + gSearchPattern;
  gSearchRE = new RegExp(gSearchPattern, "g");

  searchNext();
}

function searchNext() {
  resetSearchHighlight();

  var element = getMatchingElement();
  if (element && element == gSearchText) {
    element = getMatchingElement();
  }
  if (!element) {
    return;
  }

  log(element);
  if (!element.style) element = element.parentElement;

  gMatchedElem = element;
  gMatchedElemBackground = element.style.background;

  element.style.background = "yellow";
  element.scrollIntoViewIfNeeded();
}

function resetSearchHighlight() {
  if (gMatchedElem) {
    gMatchedElem.style.background = gMatchedElemBackground;
  }
}
