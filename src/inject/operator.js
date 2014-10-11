function Operator() {
  this.currentOp = null;
  this.marks = new Marks();
}

Operator.prototype.start = function(id) {
  log("operator start " + id);
  if (id == "m" || id == "'") {
    this.currentOp = id;
  }
};

Operator.prototype.handle = function(id) {
  if (this.currentOp == "m") {
    this.marks.add(id);
  } else if (this.currentOp == "'") {
    this.marks.goto(id);
  }
};

Operator.prototype.cancel = function() {
  this.currentOp = null;
};
