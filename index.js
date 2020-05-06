//parameter
let lvlNumber = 0;
let start = false;
const buttonColours = [
  "green", "red", "yellow", "blue"
];

const setting = {
  green: "sounds/green.mp3",
  red: "sounds/red.mp3",
  yellow: "sounds/yellow.mp3",
  blue: "sounds/blue.mp3"
};

//Start the game when clicking in h1
$("h1").on("click", function () {
  if (!start) {
    lvlNumber++;
    $("h1").text("Level " + lvlNumber);
    start = true;

    //active the color button
    // $(".box").removeClass("off");
  }
});


// //DEPRECATED
// $("body").on("DOMSubtreeModified", "h1", function(){
//   //console.log("h1 changed");
//   if(start){
//     console.log("h1 changed");
//   }
// });

//// NOW
//select the target node
let target = $("h1")[0]; //or document.querySelect("h1")


//create an observer instance
let observer = new MutationObserver(function (mutation) {
  //console.log("h1 changed");



  //activate the sound button
  buttonSound();








});


//configuration of the observer
let config = {
  attributes: true,
  childList: true,
  characterData: true
};
//pass in the target node, aw well as the observer options
observer.observe(target, config);




//FUNCTIONS
function buttonSound() {

  let gamePattern = [];
  let userPattern = [];

  let win = false;

  do {
    //play random sound
    setTimeout(() => {
      gamePattern.push(playRandomSound());
    }, 200);


    $(".box").on("click", function (event) {
      const userChosenColour = event.target.id;
      // console.log(colorButton);


      //play audio
      const soundPath = setting[userChosenColour];
      (new Audio(soundPath)).play();

      //add pressed button style
      activeButtonEffect(event.target);


      // console.log("model: "+model);
      // console.log("answer: "+colorButton);
      // console.log(colorButton.localeCompare(model));

      //check the match color
      if (userChosenColour.localeCompare(gamePattern[gamePattern.length-1]) == 0) {
        console.log("Match");
        rightButton(userChosenColour);
        userPattern.push(userChosenColour);
        win = true;
      }
      else {
        console.log("No match");
        wrongButton(userChosenColour);
        win = false;
      }

      // console.log("voila");
      console.log(gamePattern);
      console.log(userPattern);


    })

    console.log("win: " + win);
  } while (win);


}


function activeButtonEffect(element) {
  //console.log(element);
  element.classList.add("pressed");

  setTimeout(() => {
    element.classList.remove("pressed");
  }, 100);
}


function playRandomSound() {
  const number = Math.floor(Math.random() * 4);
  const color = buttonColours[number];
  (new Audio(setting[color])).play();

  $(".box#" + color).addClass("pressed");
  setTimeout(() => {
    $(".box#" + color).removeClass("pressed");
  }, 100);

  return color;
}



function rightButton(color) {

  $(".box#" + color).addClass("right");

  setTimeout(() => {
    $(".box#" + color).removeClass("right");
  }, 100);

  return true;
}


function wrongButton(color) {
  $(".box#" + color).addClass("wrong");

  setTimeout(() => {
    $(".box#" + color).removeClass("wrong");
  }, 100);

  (new Audio("sounds/wrong.mp3")).play();

  return false;
}