var invert = false;
var score = 0; var number1; var number2;
var sign; var result; var answer;

$("document").ready(function() {
var resultTxt = $("#result");
var resultBool = $("#resultBool");
var answerBox = $(".answer");
var answerForm = answerBox.parent();
var scoreText = $("#score");

answerBox.focus();  // focus on input, after page loads

function getRandomNumbers() {
  number1 = Math.floor(Math.random() * 12);
  number2 = Math.floor(Math.random() * 12);
}

function setRandomQuiz() {
  getRandomNumbers();
  // get a random number representing math sign
  var k = Math.floor(Math.random() * 4) + 1;
  
  switch(k) {
    
    case 1:
      sign = "+";
      result = number1 + number2;
      break;
    case 2:
      sign = "-";
      result = number1 - number2;
      break;
    case 3:
      sign = "/";
      result = Math.round(number1 / number2);
      invert = false;
      if (Math.max(number1, number2) === number2) {
        result = Math.round(number2 / number1);
        invert = true;
      }   // if dividing by zero
      if (result === "Infinity") {
        result = result.toLowerCase();
      }
      break;
    default:
      sign = "x";
      result = number1 * number2;
  }
  
  // invert number1 and number2 if needed, in the text
  if (invert) {
    resultTxt.text("How much is: " + number2 + " " + sign + ' ' + number1 + ' ?');
  } else {
    resultTxt.text("How much is: " + number1 + " " + sign + ' ' + number2 + ' ?');
  }
  invert = false;
  
  answerForm.unbind("submit").submit(    // On submiting answer "enter"
    function(){
      answer = parseFloat(answerBox.val());
      
      if (isNaN(answer)) {
        resultBool.text("Say again?");
        resultBool.css("color", "#fff");
      } else if (answer === result) {
        resultBool.text("That's correct!, it's " + answer);
        resultBool.css("color", "lightgreen");
        score += Math.round(Math.abs(result) / 2);
        scoreText.text("Score: " + score);
      } else {
        resultBool.text("Not " + answer + " it's " + result + " !");
        resultBool.css("color", "red");
      }
      resultBool.fadeIn().delay(1200).fadeOut();
      answerBox.val("");   // reset input
      setRandomQuiz();
      return false;        // to stop resultBool from resetting
    });
  
} // end setRandomQuiz  

setRandomQuiz();
});