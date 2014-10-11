function Marks() {
  this.marks = {};
}

Marks.prototype.add = function(id) {
  log("adding mark " + id);
  this.marks[id] = {x: window.pageXOffset, y: window.pageYOffset};
};

Marks.prototype.goto = function(id) {
  log("goto mark " + id);
  if (this.marks[id]) {
    window.scrollTo(this.marks[id].x, this.marks[id].y);
  }
};
