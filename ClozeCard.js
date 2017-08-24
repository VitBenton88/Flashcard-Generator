var fs = require("fs");

var ClozeCard = function(text, cloze) {
	this.cloze = cloze;
	this.partial = text.replace(cloze, '...');
	this.fullText = text;

	if (this.cloze === undefined){

		 console.log("Error: No cloze provided.");

	}	else {

			var newCard = ";" + this.cloze + ";" + this.partial + ";" + this.fullText;

		    console.log("New cloze card created! Review:\nThe full text: " + this.fullText + "\nThe cloze statement: " + this.cloze + "\nYour partial text: " + this.partial);

			fs.appendFile("cloze.txt", newCard, (error) => { console.log(error);});

			}

};

module.exports = ClozeCard;

