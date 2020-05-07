let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let start = false;
let level = 0;

//nextSequence();


//Detect click of button
$(".box").on("click", function () {

  let userChosenColour = $(this).attr("id");

  //Add to user Pattern
  if(level > 0) userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);

  animatePress(userChosenColour);


  // checkAnswer(level);
  if(level > 0){
    checkAnswer(userClickedPattern.length-1);
  }


});


//Detect click of H1 to star game
if (!start) {
  start = true;
  $("#first-title").on("click", nextSequence);


}







////////////////////////////
//FUNCTIONS
///////////////////////////


function nextSequence() {
  userClickedPattern = [];

  //change h1 level
  $(this).hide();
  level++;
  $("#start-title").show().text("Level " + level);

  //generate randomNumber between 0 and 3
  let randomNumber = Math.floor(Math.random() * 4);
  //Chose the color of the random number
  let randomChosenColour = buttonColours[randomNumber];
  //Add to game pattern
  gamePattern.push(randomChosenColour);

  playSound(randomChosenColour);

  animatePress(randomChosenColour);

}


function playSound(name) {
  //Animate the random button
  $("#" + name).fadeIn(100).fadeOut(100).fadeIn(100);
  //Play the random audio
  (new Audio("sounds/" + name + ".mp3")).play();
}


function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(() => { $("#" + currentColour).removeClass("pressed"); }, 100);
}


function animateWrong(currentColour) {
  $("#" + currentColour).addClass("wrong");
  //setTimeout(() => { $("#" + currentColour).removeClass("wrong"); }, 200);
  (new Audio("sounds/wrong.mp3")).play();
}


function checkAnswer(currentLevel) {

    console.log("current level: " + currentLevel);
    console.log("userPattern: " + userClickedPattern);
    console.log("gamePattern: " + gamePattern);

    // for(let i = 0; i < currentLevel; i++){

    //   if (userClickedPattern[i].localeCompare(gamePattern[i]) == 0) {
    //     console.log("match");
    //     match = true;
    //   }
    //   else {
    //     console.log("no match");
    //     match = false;
    //     return false;
    //   }

    // }

    // if(match){

    // }
    
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
      console.log("match");

      if(userClickedPattern.length === gamePattern.length){
        setTimeout(nextSequence, 1000);
      }


    }
    else {
      console.log("no match");
      animateWrong(userClickedPattern[currentLevel]);
      
    }
    
}