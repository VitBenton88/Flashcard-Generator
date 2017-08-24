var fs = require("fs");

var ClozeCard = function(text, cloze) {
	this.cloze = cloze;
	this.partial = text.replace(cloze, '...');
	this.fullText = text;

	if (this.cloze === undefined){

		 console.log("Error: No cloze provided.");

	}	else {

			var newCard = {
	
			  cloze: this.cloze,
			  partial: this.partial,	
			  fullText : this.fullText,

		    }

		    console.log("New cloze card created! Review:\n" + newCard + "\n");

			fs.appendFile("cloze.txt", newCard);

			}

};

module.exports = ClozeCard;

