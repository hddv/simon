let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];

//nextSequence();


//Detect click of button
$(".box").on("click", function () {

  let userChosenColour = $(this).attr("id");
  //Add to user Pattern
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);

  animatePress(userChosenColour);

});


//Detect click of H1

//$("h1").on("click", )






////////////////////////////
//FUNCTIONS
///////////////////////////


function nextSequence() {
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


function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(()=>{ $("#"+currentColour).removeClass("pressed"); }, 100);
}