// alert("ayon");
var arr = ["red", "blue", "green", "yellow"];
var gamepattern = [];
var userClickedPattern=[];
var randomChosenColor;
var started=false;
var level=0;

function nextSequence() {
  level+=1;
  $("#level-title").text("Level "+level);
  var randomNumber = Math.floor(4 * Math.random());
  randomChosenColor = arr[randomNumber];
  gamepattern.push(randomChosenColor);
  //console.log("gamepattern="+gamepattern);
  playSound(randomChosenColor);
  animatePress(randomChosenColor);

}

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour){
  var btn=$("#"+currentColour);
  btn.addClass("pressed");
  setTimeout(function(){
        btn.removeClass("pressed");
    }, 100);

}

function checkAnswer(index){
  var flag=0;
  // //console.log("userClickedPattern size="+userClickedPattern.length);
  // //console.log("gamepattern size="+gamepattern.length);
  if(gamepattern[index]==userClickedPattern[index]){
    //console.log("success");
  }
  else{
    //console.log("fail");
    var audio=new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);

    $("#level-title").text("Game-Over,Press Any Key to Restart");
    return startOver();
  }
  if(gamepattern.length==userClickedPattern.length){
    setTimeout(function(){
          userClickedPattern=[];
          nextSequence();
      }, 1000);
  }
}

function startOver(){
  level=0;
  gamepattern=[];
  userClickedPattern=[];
  started=false;

}

$(".btn").click(function(e) {
  //console.log("strt="+started);
  if(started==true){
  var userChosenColor=e.target.id;
  userClickedPattern.push(userChosenColor);
  //console.log("userclickedpattern="+userClickedPattern)
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
}
});

$(document).keydown(function(e){
  //console.log(e.key);
  if(started==false){
    nextSequence();
    started=true;
  }
});
