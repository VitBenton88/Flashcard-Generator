var fs = require("fs");

var BasicCard = function(front, back) {
    this.front = front;
    this.back = back;

    var newCard = this.front + "," + this.back + ",";	


    console.log("New basic card created! Review:\n" + newCard + "\n");

	fs.appendFile("basic.txt", newCard, (error) => { console.log(error);});

  };

module.exports = BasicCard;
