module.exports = ClozeCard;

var ClozeCard = function(text, cloze) {
	this.cloze = cloze;
	this.partial = text.replace(cloze, '...');
	this.fullText = text;

	if (this.cloze === undefined){

		 console.log("Error: No cloze provided.");

	}	else {

			console.log(this.partial);

	}

};

