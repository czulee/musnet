/**
 * MNBounds
 * User: liyifei
 * Date: 2017-07-10
 */
//bounds
var MNBounds = function(left, top, width, height) {
    this.left = left;
    this.top = top;
    this.width = width;
    this.height = height;
}

//method of bounds
MNBounds.prototype.clone = function() {
    return new MNBounds(this.left, this.top, this.width, this.height);
}