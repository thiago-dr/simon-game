$(document).ready(function () {

    let gamePattern = []
    let userClickedPattern = []
    let level = 0
    let started = false

    //new color to sequence
    function nextSequence() {
        let randomNumber = Math.floor(Math.random() * 4)
        let randomColor
        userClickedPattern = []

        updateTitle(`Level ${++level}`)

        switch (randomNumber) {
            case 0:
                randomColor = 'red'
                break;
            case 1:
                randomColor = 'blue'
                break;
            case 2:
                randomColor = 'green'
                break;
            case 3:
                randomColor = 'yellow'
                break;

            default:
                console.log(randomNumber);
                break;
        }

        gamePattern.push(randomColor)


        playSequence()

    }
    //play sequence 
    function playSequence() {
        let delay = calcDelay()

        gamePattern.forEach((button, i) => {
            setTimeout(() => {
                $('#' + button).fadeIn(100).fadeOut(150).fadeIn(100)
                playSound(button)
            }, delay * i);
        })
    }

    function calcDelay() {
        if (level <= 5)
            return 500
        else if (level <= 9)
            return 400
        else if (level <= 13)
            return 350
        else
            return 300
    }
    //update title
    function updateTitle(title) {
        $('#level-title').text(title)
    }

    //compare user pattern with game pattern
    function checkAnswer(index) {
        if (userClickedPattern[index - 1] === gamePattern[index - 1]) {
            if (index === level)
                setTimeout(nextSequence, 750);

        } else
            gameOver()
    }

    //game over
    function gameOver() {
        updateTitle('Game Over')
        $('body').addClass("game-over")

        playSound('wrong')

        setTimeout(reset, 1000)
    }

    function reset() {
        updateTitle('Press Any Key to Start')
        $('body').removeClass("game-over")
        started = false
        level = 0
        gamePattern = []
    }

    //audio
    function playSound(name) {
        let audio = new Audio('sounds/' + name + '.mp3')
        audio.play()
    }

    //keyboard listener     
    $(document).keypress(function () {
        if (started === false) {
            nextSequence();
            started = true
        }
    })

    //mouse events
    $('.btn').click(function () {
        clickAnimation(this)

        let userChosenColor = $(this).attr('id')
        playSound(userChosenColor)

        if (started === true) {
            userClickedPattern.push(userChosenColor)

            checkAnswer(userClickedPattern.length)
        }
    });

    function clickAnimation(button) {
        $(button).addClass("pressed");
        setTimeout(function () {
            $(button).removeClass("pressed")
        }, 100)
    }


})

