function HistoryBox() {
  this.boxElem = document.createElement("div");
  HistoryBox.styleBox(this.boxElem);
  this.hide();
};

HistoryBox.prototype.install = function(container) {
  container.appendChild(this.boxElem);
};

HistoryBox.prototype.show = function(history, selected) {
  if (!history) return;
  this.boxElem.style.visibility = "visible";
  var innerHTML = [];
  for (var i = 0; i < history.length; ++i) {
    var color = i == selected ? "#4387fd" : "";
    innerHTML.push("<span style=\"color:" + color + "\"><b>" + history[i].title
        + "</b> [<em>" + history[i].url + "</em>]</span>");
  }
  this.boxElem.innerHTML = innerHTML.join("<br>");
};

HistoryBox.prototype.hide = function() {
  this.boxElem.style.visibility = "hidden";
};

HistoryBox.styleBox = function(elem) {
  elem.style.width = "1000px";
  elem.style.position = "fixed";
  elem.style.bottom = "30px";
  elem.style.right = "0";
  elem.style.zIndex = "99999";

  elem.style.whiteSpace = "nowrap";
  elem.style.background = "#eee";
  elem.style.borderRadius = "2px";
  elem.style.padding = "0 5px";
};
