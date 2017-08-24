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

  inquirer.prompt([
    {
      name: "text",
      message: "What is the full statement to be memorized?\n e.g. 'George Washington was the first president of the United States.'\n"
    },
    {
      name: "cloze",
      message: "What text should be removed from your statement? (cloze)"
    }
    ])
    .then(function(answer) {
     
    	var card = new ClozeCard(answer.text, answer.cloze);
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

      if (count < limit) {
		    
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
                beginStudy(basicCardsArray[count], basicCardsArray[count + 1], count, basicCardsArray.length);
		          }

		          else {
		            console.log('WRONG!');
		            beginStudy(basicCardsArray[count], basicCardsArray[count + 1], count, basicCardsArray.length);
		          }

		        });

      } else {
          console.log("You have gotten through all of your basic cards!");
          start();

        }
	};

}

function clozeStudy() {

  var clozeCardsArray = '';
  var count = 0;

  fs.readFile("cloze.txt", 'utf8', function(error, data){

      if (error){

      return console.log(error);

    }

      else {

      clozeCardsArray = data.split(";");

      beginStudy(clozeCardsArray[count], clozeCardsArray[count+1], clozeCardsArray[count+2], count, clozeCardsArray.length);

        }

  })

  var beginStudy = function(answer, question, fullText, count, limit) {

      if (count < limit) {
        
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
                console.log(fullText);
                count += 3;
                beginStudy(clozeCardsArray[count], clozeCardsArray[count+1], clozeCardsArray[count+2], count, clozeCardsArray.length);
              }

              else {
                console.log('WRONG!');
                beginStudy(clozeCardsArray[count], clozeCardsArray[count+1], clozeCardsArray[count+2], count, clozeCardsArray.length);
              }

            });

      } else {
          console.log("You have gotten through all of your cloze cards!");
          start();

        }
  };

}

start()