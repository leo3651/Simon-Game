var gamePattern = []
var userClicked = []
var colors = ["red", "green", "blue", "yellow"]
var level = 0
start = false
var bug = false

$(document).keydown(function(){
    if (start === false)
    {
        bug = false
        nextSeq()
        start = true
    }
})

$(".btn").click(function handler(){
    if (start === true)
    {
        var clicked = this.id
        playSound(clicked)
        userClicked.push(clicked)
        animatePress(clicked)
        checkAnswer(userClicked.length - 1)
    }
})

function nextSeq()
{ 
    if (bug === false)
    {
        userClicked = []
        var randomNumber = Math.floor(Math.random() * 4)
        var randomColor = colors[randomNumber]
        gamePattern.push(randomColor)
        $("#" + randomColor).fadeOut(100).fadeIn(100);
        playSound(randomColor)
        level++
        $("h1").text("Level " + level)
    }
}

function playSound(key)
{
    new Audio("./sounds/" + key + ".mp3").play()
}

function animatePress(currentColor)
{
    $("#" + currentColor).addClass("pressed")
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed")
    },100)
}

function checkAnswer(currentPosition)
{
    if (userClicked[currentPosition] != gamePattern[currentPosition])
    {
        $("h1").text("Game over, press any key to restart")
        playSound("wrong")
        startOver()
        $("body").addClass("game-over")
        setTimeout(function(){
            $("body").removeClass("game-over")
        },200)
    }
    else
    {
        if (userClicked.length == gamePattern.length)
        {
        setTimeout(function(){
            nextSeq()
        },1000)
        }
    }   
}

function startOver()
{
    level = 0
    start = false
    bug = true
    gamePattern = []
}