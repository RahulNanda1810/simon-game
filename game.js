var buttonColours=["red","blue","green","yellow"];

var gamePattern=[];

var level=0;

var gamestarted=false;

var userclickedpattern=[];

function nextsequence(){
    userclickedpattern=[];
    var randomNumber=Math.floor(Math.random()*4);

    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playsound(randomChosenColour);
    level++;
    $("h1").text("Level "+level);
    
}

$(".btn").click(function(event){
    var userchosencolour=$(this).attr("id");
    userclickedpattern.push(userchosencolour);
    console.log(userclickedpattern);
    playsound(userchosencolour);
    animatePress(userchosencolour);
    checkAnswer(userclickedpattern.length-1);
});
function playsound(name){
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
};  
function animatePress(currentColor){
   $("#"+currentColor).addClass("pressed");
   setTimeout(function(){
    $("#"+currentColor).removeClass("pressed");
   },100);
}

$(document).keydown(function(){
    if(gamestarted===false){
        nextsequence();
        gamestarted=true;    
};
}); 
function checkAnswer(currentlevel){
    if(userclickedpattern[currentlevel]===gamePattern[currentlevel]){
        console.log("success");

        if(userclickedpattern.length===gamePattern.length){
            setTimeout(function(){
                nextsequence();
            },1000);
        }
    }
    else{
        console.log("wrong");
        playsound("wrong");

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over")
        },200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startover();
    };

};      

function startover(){
    level=0;
    gamePattern=[];
    gamestarted=false;
}