var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var index  = 0;
var started = false;

$(".start").touchstart(function(){
    nextSequence();
    started = true;
});

$(document).keypress(function(){
    if(!started){
        nextSequence();
        started = true;
    }
});

function nextSequence() {

    $("h1").text("Level "+level);
    level++;
   
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChoseColour = buttonColours[randomNumber];
    
    gamePattern.push(randomChoseColour);
    $("#"+randomChoseColour).fadeOut(100).fadeIn(100); 
  
    playSound(randomChoseColour);
    userClickedPattern = [];
    index = 0;
    
}   

$(".btn").click(function(event){

    
    var userChosenColour = event.target.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(event.target.id);
    checkAnswer(index);
    index++;
});


function playSound(name){
    
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).fadeOut(100).fadeIn(100); 
}


function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if(currentLevel === (gamePattern.length - 1) )
        {   
            setTimeout(nextSequence,1000);
        }
    }
    else{
        var failAudio = new Audio("sounds/wrong.mp3");
        failAudio.play();

        $("h1").text("Game Over, Press Any key to restart");

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        startOver();
    }

}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}

