//measure
var MNMeasure = function(line) {
    this.line = line;
    var score = line.score;
    var width = line.bounds.width / option.lineMeasureCount;
    var measureCount = line.getMeasureCount();
    this.bounds = new MNBounds(
        measureCount * width, line.bounds.top, width, LINE_HEIGHT);
    //left line of the first measure
    if (measureCount == 0) {
        this.leftline = score.raphael.rect(
            0, line.bounds.top, 1, LINE_HEIGHT);
    }
    //right line
    this.rightLine = score.raphael.rect(
        (measureCount + 1) * width - 1, line.bounds.top, 1, LINE_HEIGHT);

    //control rectangle
    this.rect = score.raphael.rect(
        line.getMeasureCount() * width, line.bounds.top, width, LINE_HEIGHT);
    MN.fill(this.rect, "black", "0");

    //choice control rectangle
    var $this = this;
    this.rect.click(function(e) {
        $this._selectMeasure($this, e);
    });

    //other init
    this.beats = new MNSet();
    this.clef = {
        sign:"G",
        line:2
    };
    this.key = {
        fifths:0,
        mode:"major"
    };
    this.time = {
        beats:4,
        beatType:4
    };
    this.noteIndex = 0;
    this.beatCapcity = 32 / this.time.beatType;
    this.capcity = this.time.beats * this.beatCapcity;
}

//when choice measure, show editor
MNMeasure.prototype._selectMeasure = function(measure, e) {
    var score = measure.line.score;
    var noteSet = this.getUsableNoteSet();
    score.editor.show(noteSet);
    score.selectedMeasure = measure;
}
/**
 * MNMeasure
 * User: liyifei
 * Date: 2017-07-06
 */
//get usable beat
MNMeasure.prototype.getUsableBeat = function() {
    var beat = this.beats.getFirst();
    if (!beat) {
        beat = this.addBeat();
    }
    return beat;
}

//get usable note set
MNMeasure.prototype.getUsableNoteSet = function() {
    var beat = this.getUsableBeat();
    var noteSet = beat.getUsableNoteSet();
    return noteSet;
}

//the method of measure
MNMeasure.prototype.addBeat = function() {
    var beat = new MNBeat(this);
    this.beats.add(beat);
    return beat;
}

//get beat count of the measure
MNMeasure.prototype.getBeatCount = function() {
    return this.beats.getCount();
}

//get the summary durations of all beats
MNMeasure.prototype.getBeatsCapcity = function() {
    return this.beats.getSummary("capcity");
}

//resize self and all beats
MNMeasure.prototype.resize = function() {
    var sumWidth = 0;
    for (var i in this.beats.items) {
        var beat = this.beats.items[i];
        if (beat.capcity == 0) {
            beat.bounds = this.bounds.clone();
            beat.bounds.left = this.bounds.left + sumWidth;
            beat.bounds.width = this.bounds.width - sumWidth;
        } else {
            beat.bounds.left = this.bounds.left + sumWidth;
            beat.bounds.width = beat.capcity / this.capcity * 
                                this.bounds.width;
            sumWidth += beat.capcity / this.capcity * this.bounds.width;
        }
    }
    this.beats.do("resize()");
}