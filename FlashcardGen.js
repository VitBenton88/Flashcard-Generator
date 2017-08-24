var inquirer = require("inquirer");
var fs = require("fs");
var BasicCard = require("./BasicCard");
var ClozeCard = require("./ClozeCard");


function start() {
  inquirer
    .prompt({
      name: "createOrStudy",
      type: "rawlist",
      message: "Would you like to [CREATE] a card or [STUDY] existing cards?",
      choices: ["CREATE", "STUDY"]
    })
    .then(function(answer) {
      
      if (answer.createOrStudy.toUpperCase() === "CREATE") {
        creationType();
      }
      else {
        studyChoice();
      }
    });
}

function creationType() {

  inquirer
    .prompt({
      name: "basicOrCloze",
      type: "rawlist",
      message: "Would you like to create a [BASIC] card or a [CLOZE] card?",
      choices: ["BASIC", "CLOZE"]
    })
    .then(function(answer) {
      
      if (answer.basicOrCloze.toUpperCase() === "BASIC") {
        basicCreation();
      }
      else {
        clozeCreation();
      }
    });

}

function basicCreation() {

  inquirer.prompt([
    {
      name: "front",
      message: "What question will appear on the front of your card?"
      
    },
    {
      name: "back",
      message: "What answer will appear on the back of your card?"
    }
    ]).then(function(answer) {
     
    	var card = new BasicCard(answer.front, answer.back);
    	start();

    });

}

function clozeCreation() {

  inquirer
    .prompt(
    {
      type: "input",
      message: "What is the full statement to be memorized?\n e.g. 'George Washington was the first president of the United States.'\n",
      name: "text"
    },
    {
      type: "input",
      message: "What text should be removed from your statement? (cloze)",
      name: "cloze"
    }
    )
    .then(function(answer) {
     
    	var newCard = ClozeCard(answer.text, answer.cloze);
    	start();

    });

}

function studyChoice() {
  inquirer
    .prompt({
      name: "ClozeOrBasic",
      type: "rawlist",
      message: "Would you like to study [BASIC] or [CLOZE] cards?",
      choices: ["BASIC", "CLOZE"]
    })
    .then(function(answer) {
      
      if (answer.ClozeOrBasic.toUpperCase() === "BASIC") {
        basicStudy();
      }
      else {
        clozeStudy();
      }
    });
}

function basicStudy() {

  var basicCardsArray = '';
  var count = 0;

	fs.readFile("basic.txt", 'utf8', function(error, data){

	  	if (error){

		  return console.log(error);

		}

	    else {

		  basicCardsArray = data.split(";");

		  beginStudy(basicCardsArray[count], basicCardsArray[count + 1], count, basicCardsArray.length);

  	  	}

	})

	var beginStudy = function(question, answer, count, limit) {
		    
		    inquirer
		        .prompt(
		        {
		          type: "input",
		          message: question,
		          name: "currentQuestion"
		        }
		        )
		        .then(function(result) {
		         
		          if (result.currentQuestion === answer){
		            console.log('Correct!');
		            count += 2;

					if (count < limit) {
		            	beginStudy(basicCardsArray[count], basicCardsArray[count + 1], count, basicCardsArray.length);
		            } else {
		            	start();
		            };
		          }

		          else {
		            console.log('WRONG!');
		            beginStudy(basicCardsArray[count], basicCardsArray[count + 1], count, basicCardsArray.length);
		          }

		        });
		    
		  }
	};



start();