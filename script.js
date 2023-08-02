$(document).ready(function(){
    var pieces = createPieces(true);
    $("#puzzleContainer").html(pieces);
    $("#btnStart").click(function(){
        var pieces = $("#puzzleContainer div");
        pieces.each(function(){
            var leftPosition = Math.floor(Math.random()*290) + "px";
            var topPosition = Math.floor(Math.random()*290) + "px";
            $(this).addClass("draggablePiece").css({
                position:"absolute",
                left:leftPosition,
                top:topPosition
            })
            $("#pieceContainer").append($(this))
        });
        var emptyString = createPieces(false);
        $("#puzzleContainer").html(emptyString);
        $(this).hide();
        $("#btnReset").show()
        implementLogic()
    });
    $("#btnReset").click(function(){
        var newPieces = createPieces(true);
        $("#puzzleContainer").html(newPieces);
        $(this).hide();
        $("#btnStart").show();
        $("#pieceContainer").empty();
    });
    function createPieces(withImage){
        var rows = 4, columns = 4;
        var pieces = "";
        for(var i=0,top=0,order=0;i<rows;i++,top-=100){
            for(var j=0,left=0;j<columns;j++,left-=100,order++){
                if(withImage){
                    pieces += "<div style='background-position:" + left +"px " + top + "px;' class='piece' data-order=" + order + "></div>";
                }
                else{
                    pieces += "<div style='background-image:none;' class='piece droppableSpace'></div>";
                }
            }
        }
        return pieces;
    }
    function checkIfPuzzleSolved(){
        if($("#puzzleContainer .droppedPiece").length != 16){
            return false;
        }
        for(var k=0;k<16;k++){
            var item = $("#puzzleContainer .droppedPiece:eq(" + k +")");
            var order = item.data("order");
            if(k != order){
                $("#pieceContainer").text("Try Again!");
                return false;
            }
        }
        $("#pieceContainer").text("WOW! You are a GENIUS!");
        return true;
    }
    function implementLogic(){
        $(".draggablePiece").draggable({
            revert:"invalid",
            start:function(){
                if($(this).hasClass("droppedPiece")){
                    $(this).removeClass("droppedPiece");
                    $(this).parent().removeClass("piecePresent");
                }
            }
        });
        $(".droppableSpace").droppable({
            hoverClass:"ui-state-highlight",
            accept:function(){
                return !$(this).hasClass("piecePresent")
            },
            drop:function(event,ui){
                var draggableElement = ui.draggable;
                var dropedOn = $(this);
                dropedOn.addClass("piecePresent");
                $(draggableElement).addClass("droppedPiece")
                .css({
                    top:0,
                    left:0,
                    position:"relative"
                }).appendTo(dropedOn);
                checkIfPuzzleSolved();
            }
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const scoreElement = document.getElementById("score");
    const timerElement = document.getElementById("timer");
    const finishButton = document.getElementById("finishButton");
    const btnStart = document.getElementById("btnStart");
    const btnReset = document.getElementById("btnReset");

    let secondsRemaining = 90;
    let timerInterval;

    function updateTimerDisplay() {
        const minutes = Math.floor(secondsRemaining / 90);
        const seconds = secondsRemaining % 90;
        timerElement.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;
    }

    function countdown() {
        if (secondsRemaining > 0) {
            secondsRemaining--;
            updateTimerDisplay();
        } else {
            clearInterval(timerInterval);
            timerElement.textContent = "Time's up!";
            finishButton.disabled = true;
            calculateScore();
        }
    }

    function calculateScore() {
        const displayedTime = timerElement.textContent.split(":");
        const minutes = parseInt(displayedTime[0]);
        const seconds = parseInt(displayedTime[1]);
        const totalTimeInSeconds = (minutes * 90) + seconds;
        const score = Math.floor(120 - totalTimeInSeconds);
        scoreElement.textContent = `Score: ${score}`;
    }

    function finishCountdown() {
        clearInterval(timerInterval);
        calculateScore();
        finishButton.disabled = true;
    }

    finishButton.addEventListener("click", finishCountdown);

    // timerInterval = setInterval(countdown, 1000);

    function resetCountdown() {
        clearInterval(timerInterval);
        secondsRemaining = 90;
        updateTimerDisplay();
        scoreElement.textContent = "Score: 0";
        finishButton.disabled = false;
    }

    btnStart.addEventListener("click", function () {
        timerInterval = setInterval(countdown, 1000);
    });

    btnReset.addEventListener("click", resetCountdown);

});

