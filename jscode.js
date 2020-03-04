$(document).ready(function() {

    $("#self").click(function() {
        window.open("https://github.com/das-jishu", "_blank");
    });

    $("#dialog-ins").dialog({
        autoOpen: false
    });

    $("#instruction").click(function() {
        $("#dialog-ins").dialog("open");
    });

    var playing = false;
    var timeRem = 60;
    var score = 0;
    var lives = 3;
    var action;
    var action2;
    var message;
    $("#box").hide();
    
    $("#startgame").click(function() {

        if(playing == true)
        {
            location.reload();
        }
        else
        {
            playing = true;
            timeRem = 60;
            lives = 3;
            score = 0;
            $("#startgame").html("Reset Game");
            $("#showTime").html(60);
            $("#score").html("<p>Score: 0</p>");
            $("#score").show();
            $("#timeremaining").show();
            $("#gameover").hide();
            showHearts();
            startCounting();
            generateBoxes();
        }
    });

    function startCounting() {
        action = setInterval(function() {
            timeRem--;
            $("#showTime").html(timeRem);
            if (timeRem == 0)
            {
                $("#box").hide();
                clearInterval(action);
                clearInterval(action2); 
                $("#timeremaining").hide();
                $("#showscore").html(score);
                if (score > 65)
                {
                    message = "Fantastic! Looks like 007 is in town";
                }
                else if (score > 55)
                {
                    message = "Excellent! You are a true assassin";
                }
                else if (score > 28)
                {
                    message = "Well done! Try for a better score now";
                }
                else if (score > 18)
                {
                    message = "Can do better!";
                }
                else
                {
                    message = "Absolute disaster! Try again for a better score";
                }
                $("#gamemessage").html(message);
                $("#gameover").show();
                $("#score").hide();
                playing = false;
                $("#startgame").html("Start Game");
            }
        }, 1000);
    }

    function stopCounting() {
        clearInterval(action);
    }

    function showHearts() {
        var i = 1;
        for (i = 1; i <= lives; i++)
        {
            $('#life'+i).show();
        }
    }

    

    function generateBoxes() {
        var selector = Math.floor(Math.random() * 6) + 1;
        $("#box").show();
        $("#box").empty();
        $("#box").append('<img src="images/people'+selector+'.jpg">');
        selector = Math.round(Math.random() * 460);
        $("#box").css({left: selector, top: -55});

        var randomStep = Math.round(Math.random() * 10) + 1;
        action2 = setInterval(function() {
            $("#box").css('top', $("#box").position().top + randomStep);

            if($("#box").position().top >= 340)
            {
                
                $('#life'+lives).hide();
                lives--;
                if(lives == 0)
                {
                    $("#box").hide();
                    playing = false;
                    clearInterval(action2);
                    
                    stopCounting();
                    $("#timeremaining").hide();
                    $("#showscore").html(score);
                    if (score > 70)
                    {
                        message = "Fantastic! Looks like 007 is in town";
                    }
                    else if (score > 55)
                    {
                        message = "Excellent! You are a true assassin";
                    }
                    else if (score > 28)
                    {
                        message = "Well done! Try for a better score now";
                    }
                    else if (score > 18)
                    {
                        message = "Can do better!";
                    }
                    else
                    {
                        message = "Absolute disaster! Try again";
                    }
                    $("#gamemessage").html(message);
                    $("#gameover").show();
                    $("#score").hide();
                    $("#startgame").html("Start Game");
                }
                else
                {
                    selector = Math.floor(Math.random() * 6) + 1;
                    $("#box").show();
                    $("#box").empty();
                    $("#box").append('<img src="images/people'+selector+'.jpg">');
                    selector = Math.round(Math.random() * 460);
                    $("#box").css({left: selector, top: -55});

                    randomStep = Math.round(Math.random() * 10) + 1;
                }
                
            }
        },20);
    }

    $("#box").mouseover(function() {
        score++;
        $("#score").html("<p>Score: "+score+"</p>");
        document.getElementById("playsound").play();
        $("#box").hide("explode", 200);
        clearInterval(action2);
        setTimeout(generateBoxes, 300);
    });

});