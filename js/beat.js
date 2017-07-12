/**
 * MNBeat
 * User: liyifei
 * Date: 2017-07-06
 */
//beat
var MNBeat = function(measure) {
    this.measure = measure;
    this.capcity = 0;
    this.noteSets = new MNSet();
    this.bounds = measure.bounds.clone();
    this.resize();
}

//get usable beatset from beat
MNBeat.prototype.getUsableNoteSet = function() {
	var noteSet = this.noteSets.getFirst();
	if (!noteSet) {
		noteSet = this.addNoteSet();
	}
	return noteSet;
};

//add note set to beat
MNBeat.prototype.addNoteSet = function() {
	var noteSet = new MNNoteSet(this);
    this.noteSets.add(noteSet);
    return noteSet;
}

//get the summary of beat set durations
MNBeat.prototype.getDurations = function() {
	return this.noteSets.getSummary("durations");
}

//set durations
MNBeat.prototype.resetCapcity = function() {
	var durations = this.getDurations();
	if (this.capcity == 0) {
		//set beat capcity
		if (durations > this.measure.beatCapcity) {
			this.capcity = durations;
		} else {
			this.capcity = this.measure.beatCapcity;
		}
		this.resize();
	}
}

//resize all beat set
MNBeat.prototype.resize = function() {
	for (var i in this.noteSets.items) {
		var noteSet = this.noteSets.items[i];
		var width = this.bounds.width / this.noteSets.getCount();
		var left = this.bounds.left + i * width;
		noteSet.bounds.width = width;
		noteSet.bounds.left = left;
	}
    this.noteSets.do("resize()");
}
