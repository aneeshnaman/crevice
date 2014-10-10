function CommandLine(header) {
  this.header = header;
  this.boxElem = document.createElement("div");
  this.textElem = document.createTextNode("");
  this.boxElem.appendChild(this.textElem);
  styleSearchBox(this.boxElem);
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
