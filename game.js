var started="True";
var level=0;
var gamePattern=[];
var userClickedPattern=[];
var buttonColours=["red", "blue", "green", "yellow"];



$(".btn").click(function(){
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    $(this).fadeOut(100).fadeIn(100);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});


function playSound(name){
    var audio = new Audio('sounds/'+name+'.mp3');
    audio.play();
}


function nextSequence(){
    userClickedPattern=[];
    level++;
    $("h1").html("level "+level);
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    animatePress(randomChosenColour);
    playSound(randomChosenColour);
}

$(document).keypress(function(){
    if(started=='True'){
        $("h1").html("level "+level);
        nextSequence();
        started='False';
    }     
});

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
     setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
}

function checkAnswer(currentLevel)
{
    if(gamePattern[currentLevel]=== userClickedPattern[currentLevel])
    {   
        if(gamePattern.length===userClickedPattern.length)
        {
            setTimeout(function()
            {
              nextSequence();
            },1000);
        } 
    }
    else
    {
        playSound('wrong');
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("h1").html("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver(){
   level=0;
   gamePattern=[];
   started="True";
}


