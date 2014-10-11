function CommandInput(header) {
  this.header = header;
  this.boxElem = document.createElement("div");
  this.textElem = document.createElement("input");
  this.textElem.setAttribute("data-crevice", "ignore-for-insert");
  this.boxElem.appendChild(this.textElem);

  styleCommandDiv(this.boxElem);
  styleTextBox(this.textElem);
}

CommandInput.prototype.show = function() {
  this.boxElem.style.visibility = "visible";
  this.textElem.focus();
};

CommandInput.prototype.hide = function() {
  this.boxElem.style.visibility = "hidden";
};

CommandInput.prototype.reset = function(pattern) {
  this.textElem.value = this.header + pattern;
};

CommandInput.prototype.install = function(container) {
  container.appendChild(this.boxElem);
};

function styleCommandDiv(elem) {
  elem.style.width = "500px";
  elem.style.position = "fixed";
  elem.style.bottom = "0";
  elem.style.right = "0";
  elem.style.visibility = "hidden";

  elem.style.borderTop = "1px solid #aaa";
  elem.style.background = "#efefef";
}

function styleTextBox(elem) {
  elem.style.width = "100%";

  elem.style.color = "#066";
  elem.style.fontStyle = "italic";
  elem.style.fontSize = "smaller";

  elem.style.background = "#efefef";
  elem.style.borderWidth = "0";
  elem.style.padding = "5px";
}
