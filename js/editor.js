/**
 * MNEditor
 * User: liyifei
 * Date: 2017-07-06
 */
//editor
var MNMeasureEditor = function(score) {
    this.score = score;
    //svg for editor
    this.rect = score.raphael.rect(
        0, 0, option.editorWidth, 2 * LINE_INTERVAL + LINE_HEIGHT);
    MN.fill(this.rect, "yellow", "0.2");
    this.rect.hide();
    // move note
    this.rect.mousemove(function (e) {
    });
    // click
    var $this = this;
    this.rect.click(function(e) {
        $this._click(e);
    });
}

//method of editor
//when editor be clicked
MNMeasureEditor.prototype._click = function(e) {
    var index = parseInt((e.offsetY - this.rect.getBBox().y + 3) / NOTE_STEP);
    this.noteSet.addNote(index);
}

//show editor
MNMeasureEditor.prototype.show = function(noteSet) {
    //hide first
    this.hide();

    this.noteSet = noteSet;
    MN.moveTo(this.rect, noteSet.bounds.left, noteSet.bounds.top - LINE_INTERVAL);
    this.rect.show();
    this.rect.toFront();
};

//hide editor
MNMeasureEditor.prototype.hide = function() {
    delete this.noteSet;
    this.rect.hide();
};

MNMeasureEditor.prototype.moveNext = function() {
    var noteSet = this.noteSet;
    var beat = this.noteSet.beat;
    var measure = beat.measure;
    var line = measure.line;
    var score = line.score;
    var durations = beat.getDurations();
    //need add notset to beat
    if (beat.capcity > durations) {
        if (beat.noteSets.getLast().durations != 0) {
            beat.addNoteSet();
            beat.resize();
        }
    }
    var nextNoteSet = beat.noteSets.getNextOf(noteSet);
    if (nextNoteSet) {
        score.editor.show(nextNoteSet);
        return;
    }
    //need add beat to measure
    var capcity = measure.getBeatsCapcity();
    if (measure.capcity > capcity) {
        if (measure.beats.getLast().capcity != 0) {
            measure.addBeat();
            measure.resize();
        }
    }
    var nextBeat = measure.beats.getNextOf(beat);
    if (nextBeat) {
        score.editor.show(nextBeat.getUsableNoteSet());
        return;
    }
    //get next usable measure
    var nextMeasure = line.measures.getNextOf(measure);
    if (nextMeasure) {
        score.editor.show(nextMeasure.getUsableNoteSet());
        return;
    }
    //get next usable line
    var nextLine = score.lines.getNextOf(line);
    if (nextLine) {
        score.editor.show(nextLine.getUsableMeasure().getUsableNoteSet());
        return;
    }
}


