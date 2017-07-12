/**
 * MNLine
 * User: liyifei
 * Date: 2017-07-06
 */
//line
var MNLine = function(score) {
    this.score = score;
    this.measures = new MNSet();
    //size
    var top = score.getLinesHeight() + LINE_INTERVAL;
    var width = score.bounds.width;
    var height = LINE_HEIGHT + LINE_INTERVAL;
    this.bounds = new MNBounds(0, top, width, height);
    //svg
    var data = "";
    for (var i = 0; i < 5; i++) {
        data += "M 0," + top + " L " + width + ", " + top + " ";
        top += 12; //line height
    }
    this.path = score.raphael.path(data);
}

//------------------------------
// method of line
//------------------------------
//add measure to line
MNLine.prototype.addMeasure = function () {
    //have enough space
    if (this.measures.getCount() >= option.lineMeasureCount) return;
    var newMeasure = new MNMeasure(this);
    this.measures.add(newMeasure);
    return newMeasure;
}

//get usable beat
MNLine.prototype.getUsableMeasure = function() {
    var measure = this.measures.getFirst();
    if (!measure) {
        measure = this.addMeasure();
    }
    return measure;
}

//get the summary of measues's width
MNLine.prototype.getMeasuresWidth = function() {
    return this.measures.getSummary("bounds", "width");
}

//get measure's count
MNLine.prototype.getMeasureCount = function() {
    return this.measures.getCount();
}