/**
 * Created by Kewen on 12/15/15.
 */


/**
 * Created by Kewen on 12/15/15.
 */





var dragSrcEl = null;

function handleDragStart(e) {
	// Target (this) element is the source node.
	this.style.opacity = '0.4';

	dragSrcEl = this;

	e.dataTransfer.effectAllowed = 'move';
	e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragOver(e) {
	if (e.preventDefault) {
		e.preventDefault(); // Necessary. Allows us to drop.
	}

	e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.

	return false;
}

function handleDragEnter(e) {
	// this / e.target is the current hover target.
	this.classList.add('over');
}

function handleDragLeave(e) {
	this.classList.remove('over');  // this / e.target is previous target element.
}

function handleDrop(e) {
	console.log("Drop Here!")
	// this/e.target is current target element.

	if (e.stopPropagation) {
		e.stopPropagation(); // Stops some browsers from redirecting.
	}

	// Don't do anything if dropping the same column we're dragging.
	if (dragSrcEl != this) {
		// Set the source column's HTML to the HTML of the column we dropped on.
		var noteList = document.getElementById("main-part");
		var notes = document.querySelectorAll('#main-part .note');
		var i = 0;
		[].forEach.call(notes, function(note) {
			if(note === dragSrcEl){
				noteList.removeChild(note);
			}
			if (note === this) {
				nodeList.insertBefore(note);
			}
		});
		//dragSrcEl.innerHTML = this.innerHTML;
		//this.innerHTML = e.dataTransfer.getData('text/html');
	}

	return false;
}

function handleDragEnd(e) {
	// this/e.target is the source node.

	[].forEach.call(cols, function (col) {
		col.classList.remove('over');
	});
}



var cols = document.querySelectorAll('#main-part .note');
console.log(cols);
[].forEach.call(cols, function(col) {
	console.log("Listening...");
	col.addEventListener('dragstart', handleDragStart, false);
	col.addEventListener('dragenter', handleDragEnter, false);
	col.addEventListener('dragover', handleDragOver, false);
	col.addEventListener('dragleave', handleDragLeave, false);
	col.addEventListener('drop', handleDrop, false);
	col.addEventListener('dragend', handleDragEnd, false);
});

