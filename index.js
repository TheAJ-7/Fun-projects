var gamePattern = [];
var userClickedPattern = [];
var level = 0
var started = false
const buttonColors = ["red", "green", "yellow", "blue"];

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("h1").text("level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);

}

$(document).keypress(function () {
    if (!started) {
        nextSequence();
        started = true;
    }

});

$(".btn").click(function () {
    var userChosenColor = $(this).attr("id");

    userClickedPattern.push(userChosenColor);
    checkAnswer(userClickedPattern.length - 1)
    playSound(userChosenColor);
    animatePress(userChosenColor);

});

function playSound(name) {
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("correct");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
                userClickedPattern = [];
            }, 1000)
        }
    }
    else {
        $("body").addClass("game-over");
        var audio = new Audio("./sounds/wrong.mp3");
        audio.play();
        setTimeout(function () {
            $("body").removeClass("game-over");
            startOver();
        }, 500)
    }
}
function startOver() {
    level = 0;
    $("h1").text("Press a key to start");
    gamePattern = []
    started = false;
}