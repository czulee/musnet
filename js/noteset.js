/**
 * MNNoteSet
 * User: liyifei
 * Date: 2017-07-06
 */
var MNNoteSet = function(beat) {
	this.beat = beat;
	this.notes = new MNSet();
	this.bounds = beat.bounds.clone();
}

//methods of note set
MNNoteSet.prototype.addNote = function(index) {
	if (this.notes[index]) return;

	if (option.noteDurations > this.beat.measure.capcity) return;

	var measure = this.beat.measure;
	if (this.beat.capcity == 0 && 
		option.noteDurations + measure.getBeatsCapcity() > measure.capcity) {
		return;
	}

	if (this.notes.getCount() > 0) {
		if (this.durations != option.noteDurations) return;	
	} else {
		this.durations = option.noteDurations;
		this.beat.resetCapcity();
	}
	
	//object
    var newNote = new MNNote(this, index);

    //add note to notes
    this.notes.insert(index, newNote);

    //arrange note
    this._resizeNote();
    this.resize();

    measure.line.score.editor.moveNext();
    return newNote;
}

//resize note 
MNNoteSet.prototype._resizeNote = function() {
	var atRight = true;
	for (var i in this.notes.items) {
		var note = this.notes.items[i];
		if (this.notes.items[parseInt(i) - 1] || 
			this.notes.items[parseInt(i) + 1]) {
			note.interval = atRight ? 16 : 2;
			atRight = !atRight;
		} else {
			atRight = true;
		}
	}
}

MNNoteSet.prototype.resize = function() {
    this.notes.do("resize()");
}
