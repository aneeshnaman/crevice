function CommandLine(header) {
  this.header = header;
  this.boxElem = document.createElement("div");
  this.textElem = document.createTextNode("");
  this.boxElem.appendChild(this.textElem);
  styleCommandDiv(this.boxElem);
}

CommandLine.prototype.show = function() {
  this.boxElem.style.visibility = "visible";
};

CommandLine.prototype.hide = function() {
  this.boxElem.style.visibility = "hidden";
};

CommandLine.prototype.reset = function(pattern) {
  this.textElem.textContent = this.header + pattern;
};

CommandLine.prototype.install = function(container) {
  container.appendChild(this.boxElem);
};

function styleCommandDiv(elem) {
  elem.style.width = "100%";
  elem.style.padding = "0 5px";

  elem.style.background = "#efefef";
  elem.style.position = "fixed";
  elem.style.borderTop = "1px solid #aaa";

  elem.style.bottom = "0";
  elem.style.visibility = "hidden";
}
