function HistoryBox() {
  this.boxElem = document.createElement("div");
  HistoryBox.styleBox(this.boxElem);
  this.hide();
};

HistoryBox.prototype.install = function(container) {
  container.appendChild(this.boxElem);
};

HistoryBox.prototype.show = function(history, match, selected) {
  if (!history) return;
  this.boxElem.style.visibility = "visible";
  var innerHTML = [];
  for (var i = 0; i < history.length; ++i) {
    var color = i == selected ? "#4387fd" : "";
    var span = [];
    span.push("<span style=\"color:" + color + "\">");
    span.push("<b>");
    HistoryBox.partsByMatch(history[i].title, match).forEach(function(part) {
      if (part.match) {
        span.push("<span style=\"color:#080\">" + part.text + "</span>");
      } else {
        span.push(part.text);
      }
    });
    span.push("</b>");
    span.push(" ");
    span.push("[<em>");
    HistoryBox.partsByMatch(history[i].url, match).forEach(function(part) {
      if (part.match) {
        span.push("<span style=\"color:#080\">" + part.text + "</span>");
      } else {
        span.push(part.text);
      }
    });
    span.push("</em>]");
    span.push("</span>");
    innerHTML.push(span.join(""));
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

  elem.style.boxSizing = "border-box";
  elem.style.lineHeight = "1.85em";
  elem.style.fontSize = "11px";
  elem.style.textAlign = "left";
  elem.style.whiteSpace = "nowrap";
  elem.style.color = "#777";
  elem.style.background = "#eee";
  elem.style.border = "1px solid #e0e0e0";
  elem.style.borderRadius = "2px";
  elem.style.padding = "0 5px";
};

HistoryBox.partsByMatch = function(text, match) {
  if (!match) {
    return [{text: text, match: false}];
  }

  var parts = [];
  while (text) {
    var start = text.toLowerCase().indexOf(match.toLowerCase());
    if (start >= 0) {
      parts.push({text: text.substr(0, start), match: false});
      parts.push({text: text.substr(start, match.length), match: true});
      text = text.substr(start + match.length);
    } else {
      parts.push({text: text, match: false});
      break;
    }
  }
  return parts;
};
