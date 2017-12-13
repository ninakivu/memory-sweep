var $grid = $('#grid')
var $name = $('#name')
var $playerName = $('#player-name')
var $form = $('#form')
var $topRow = $('#top-row')
var winningSquares;
var $scoreBoard = $('#score-board')

var players = {
    player1: {name: '', score: 0},
    player2: {name: '', score: 0}
}

//generate 25 squares:
for (var i = 0; i < 25; i += 1) {
    $grid.append('<div class="square" id=' +i+ '></square>')
}

//appends start button
$topRow.append('<div class="row" id="start">Start!</div>')

var $squares = $('.square')
var $start = $('#start')

//generate a random number 0-24:
function randomInt(hi){
    return Math.floor(Math.random() * hi)
}

//generate an array with 7 unique random numbers:
function genWinningSquares() {
    var arr = [] 
    while (arr.length < 7 ) {
        var randomNum = randomInt(25)
        if (arr.indexOf(randomNum) > -1) continue;
        arr[arr.length] = randomNum;
    }
    return arr
}

var $score = $("#score")
var $clicks = $("#clicks")

$score.text(0)
$clicks.text(7)

$form.on('submit', function(evt){
    evt.preventDefault()
    $name.text($playerName.val())
    if (players.player1.name !== '') {
        players.player2.name = $playerName.val()
    } else {
        players.player1.name = $playerName.val()
    }
    $form.hide()
})
//turn 7 random squares blue on Start:
function initializeGame() {
    //show player name after he inputs his name:
    // $playerName.val('').focus()
    //Alert if no name is entered
    if ($playerName.val() === "") { 
        $('#instructions').text('Please submit your name!')
        $playerName.focus()
        $start.one('click', initializeGame)
        return
    } else {
        //Begin the game:
        $('#instructions').text('Memorize the highlighted tiles. Remember their positions when gone.')
        $start.addClass('gray')
        console.log("initializing game...")
        winningSquares = genWinningSquares()
        for(var i = 0; i < winningSquares.length; i += 1) {
            $squares.eq(winningSquares[i]).addClass('blue')
        }
        //change color to blue for 3 seconds:
        setTimeout(function(){
            for(var i = 0; i < winningSquares.length; i += 1) {
                $squares.eq(winningSquares[i]).addClass('white')
            }
            $('#instructions').text('Good Luck!')
            //adjust score and clicks accordingly
            $grid.on('click', '.square', function(){
                // only while there are still clicks left:
                if(clicksRemaining()) {
                    $clicks.text(Number($clicks.text()) - 1)
                    if ($(this).hasClass('blue')){
                        console.log("You got it")
                        $(this).removeClass('white')
                        $score.text(Number($score.text()) + 1)
                        if (players.player1.score !== 0) {
                            players.player2.score = players.player2.score + 1
                        } else {
                            players.player1.score = players.player1.score + 1
                        }
                    }
                    else {
                        console.log("Nope")
                        $(this).addClass('black')
                        $score.text(Number($score.text()) - 1)
                        players.player1.score = players.player1.score + 1
                    }
                //Game Over, Next Player:
                } else if (players.player2.score === 0){
                    $grid.off('click', '.square')
                    $('#instructions').html('Good job ' + $name.text() + '! Your score is ' + $score.text() + '. '+'<br />' + 'Next Player!')
                    $scoreBoard.append($name.text() + ': ' + $score.text() + '<br/>')
                    $form.show()
                    $('#player-name').val('').focus()
                    $('.square').removeClass('blue').removeClass('black').removeClass('white')
                    $score.text(0)
                    $clicks.text(7)
                    $start.removeClass('gray')
                    $start.one('click', initializeGame)
                }
                else {
                    $grid.off('click', '.square')
                    if (players.player1.score > players.player2.score) {
                        $('#instructions').html('Woohoo ' + players.player2.name + ' YOU WON!')
                    }
                    else if (players.player1.score === players.player2.score) {
                        $('#instructions').html('Woohoo ' + players.player2.name + ' & ' + players.player1.name + ' you are equally smart!')
                    }
                    else {
                        $('#instructions').html('Woohoo ' + players.player1.name + ' YOU WON!')
                    }
                }
            })
        }, 1500)
    }
}
$start.one('click', initializeGame)

function clicksRemaining() {
    return Boolean(Number($clicks.text()))
}

