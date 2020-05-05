//parameter
let lvlNumber = 0;
let start = false;

const setting = {
  green: "sounds/green.mp3",
  red: "sounds/red.mp3",
  yellow: "sounds/yellow.mp3",
  blue: "sounds/blue.mp3"
};

//Start the game when clicking in h1
$("h1").on("click", function(){
  if(!start){
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
let observer = new MutationObserver(function(mutation){
  //console.log("h1 changed");

    const model = [];
    const answer = [];

    //play random sound
    setTimeout(()=>{
      model.push(playRandomSound());
    }, 200);

  //activate the sound button
  buttonSound(model);

    
    


  


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
function buttonSound(model){
  
  $(".box").on("click", function(event){
    const colorButton = event.target.classList[1];
    // console.log(colorButton);


    //play audio
    const soundPath = setting[colorButton];
    (new Audio(soundPath)).play();

    //add pressed button style
    activeButtonEffect(event.target);


    console.log("model: "+model);
    console.log("answer: "+colorButton);
    console.log(colorButton.localeCompare(model));

    //check the match color
    if(colorButton.localeCompare(model) == 0){
      console.log("Match")
    }
    else{
      console.log("No match")
    }

  })
}


function activeButtonEffect(element){
  //console.log(element);
  element.classList.add("pressed");

  setTimeout(()=>{
    element.classList.remove("pressed");
  }, 100);
}


function playRandomSound(){
  const number = Math.floor(Math.random()*4)+1;
  const color = Object.keys(setting)[number];
  (new Audio(setting[color])).play();

  $(".box."+color).addClass("pressed");
  setTimeout(()=>{
    $(".box."+color).removeClass("pressed");
  }, 100);

  return color;
}