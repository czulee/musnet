/**
 * MNNote
 * User: liyifei
 * Date: 2017-07-06
 */
var MNNote = function(noteSet, index, step, octave) {
    this.noteSet = noteSet;
    this.index = index;
    this.interval = 16;
    this.pitch = {
        step : step,
        octave : octave
    };

    //create note path
    var svgname = "note4";
    if (option.noteDurations == 32) {
        svgname = "note1"
    } else if (option.noteDurations == 16) {
        svgname = "note2"
    }
    
  	var score = this.noteSet.beat.measure.line.score;
    this.path = score.raphael.path(svgs[svgname]);
    MN.fill(this.path, "black");
    this.resize();

    //add svg path to set
    if (!noteSet.set) {
        this.set = score.raphael.set();
    }
    this.set.push(this.path);
}

MNNote.prototype.resize = function() {
    var bounds = this.noteSet.bounds;
    MN.moveTo(this.path, bounds.left + this.interval, 
    	bounds.top - LINE_INTERVAL + this.index * NOTE_STEP);
}
