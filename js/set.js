/**
 * MNSet
 * User: liyifei
 * Date: 2017-07-07
 */
var MNSet = function() {
	this.items = [];
	this.itemIndex = -1;
}

//get current item of set
MNSet.prototype.getCurrent = function() {
    return this.getItem(this.itemIndex);
}

//get next item of set
MNSet.prototype.getNext = function() {
    return this.getItem(this.itemIndex + 1);
}

//get previous item of set
MNSet.prototype.getPrevious = function() {
    return this.getItem(this.itemIndex - 1);
}

//get first item of set
MNSet.prototype.getFirst = function() {
    return this.getItem(0);
}

//get last item of set
MNSet.prototype.getLast = function() {
    return this.getItem(this.items.length - 1);
}

//get next item of set
MNSet.prototype.getNextOf = function(item) {
	var index = this.items.indexOf(item);
	if (index >= 0) {
		return this.getItem(index + 1);	
	}
}

//get previous item of set
MNSet.prototype.getPreviousOf = function(item) {
    var index = this.items.indexOf(item);
	if (index >= 0) {
		return this.getItem(index - 1);	
	}
}

//get item by index
MNSet.prototype.getItem = function(index) {
    if (this.getCount() == 0) return;
    if (index < 0 || index >= this.getCount()) return;
    this.itemIndex = index;
    return this.items[index];
}

//add item to set
MNSet.prototype.add = function(item) {
	this.items.push(item);
}

//add item to set by specified index
MNSet.prototype.insert = function(index, item) {
	this.items[index] = item;
}

//remove item from set
MNSet.prototype.remove = function(index) {
	this.items.splice(index, 1);
}

//delete item from set, the value will be setted into undefined
MNSet.prototype.delete = function(index) {
	delete this.items[index];
}

//empty the set
MNSet.prototype.empty = function() {
	this.items = [];
}

//get item's count
MNSet.prototype.getCount = function() {
    return this.items.length;
}

//get the property summary of all items 
MNSet.prototype.getSummary = function(prop1, prop2) {
    var sum = 0;
    for(var i in this.items) {
    	var value = this.items[i][prop1];
    	if (prop2) value = value[prop2];
        sum += value;
    }
    return sum;
}

//call the method of all items
MNSet.prototype.do = function(method) {
	for(var i in this.items) {
		eval("this.items[i]." + method);
	}
}