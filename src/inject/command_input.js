function CommandInput(header) {
  this.header = header;
  this.boxElem = document.createElement("div");
  this.textElem = document.createTextNode("");
  this.boxElem.appendChild(this.textElem);
  styleCommandDiv(this.boxElem);
}

CommandInput.prototype.show = function() {
  this.boxElem.style.visibility = "visible";
};

CommandInput.prototype.hide = function() {
  this.boxElem.style.visibility = "hidden";
};

CommandInput.prototype.reset = function(pattern) {
  this.textElem.textContent = this.header + pattern;
};

CommandInput.prototype.install = function(container) {
  container.appendChild(this.boxElem);
};

function styleCommandDiv(elem) {
  elem.style.width = "500px";
  elem.style.padding = "0 5px";

  elem.style.color = "#066";
  elem.style.fontStyle = "italic";
  elem.style.fontSize = "smaller";

  elem.style.background = "#efefef";
  elem.style.position = "fixed";
  elem.style.borderTop = "1px solid #aaa";

  elem.style.bottom = "0";
  elem.style.right = "0";
  elem.style.visibility = "hidden";
}

