var $grid = $('#grid')
var $name = $('#name')
var $playerName = $('#player-name')
var $form = $('#form')
var $topRow = $('#top-row')
var winningSquares;
var $scoreBoard = $('#score-board')
var gridSize = 5

var players = {
    player1: {name: '', score: 0},
    player2: {name: '', score: 0}
}

var game = {
    currentPlayer: players.player1,
    gameOver: false
}

function setGrid () {
    //remove old squares:
    ('.square').remove
    //create grid:
    $grid.css({
        width: (gridSize * 100) + (2 * gridSize),
        height: (gridSize * 100) + (2 * gridSize),
    })
    
    //generate n*n squares:
    for (var i = 0; i < Math.pow(gridSize, 2); i += 1) {
        $grid.append('<div class="square" id=' +i+ '></square>')
    }
}

//appends start button
$topRow.append('<div class="row" id="start">Start!</div>')

var $start = $('#start')

//generate a random number:
function randomInt(hi){
    return Math.floor(Math.random() * hi)
}

//generate an array with unique random numbers:
function genWinningSquares() {
    var arr = [] 
    while (arr.length < 7 ) {
        var randomNum = randomInt(Math.pow(gridSize, 2))
        if (arr.indexOf(randomNum) > -1) continue;
        arr[arr.length] = randomNum;
    }
    return arr
}

var $score = $("#score")
var $clicks = $("#clicks")

$score.text(0)
$clicks.text(7)

//show player name after he inputs his name
$playerName.focus()
$form.on('submit', function(evt){
    evt.preventDefault()
    $name.text($playerName.val())
    game.currentPlayer.name = $playerName.val()
    $form.hide()
})

setGrid()
//turn 7 random squares blue on Start:
function initializeGame() {
    //Alert if no name is entered
    if ((players.player1.name === '') || ((players.player1.score !== 0) && (players.player2.name === ''))){ 
        $('#instructions').text('Please submit your name!')
        $playerName.focus()
        $start.one('click', initializeGame)
        return
    } else {
        //Begin the game:
        $('#instructions').text('Memorize the highlighted tiles. Remember their positions when gone.')
        $start.css('backgroundColor', '#999999')
        console.log("initializing game...")
        winningSquares = genWinningSquares()
        for(var i = 0; i < winningSquares.length; i += 1) {
            $('.square').eq(winningSquares[i]).addClass('blue')
        }
        //change color to blue for 3 seconds:
        setTimeout(function(){
            for(var i = 0; i < winningSquares.length; i += 1) {
                $('.square').eq(winningSquares[i]).addClass('white')
            }
            $('#instructions').text('Good Luck!')
            //adjust score and clicks accordingly
            $grid.on('click', '.square', function(){
                // only while there are still clicks left:
                if(clicksRemaining()) {
                    $clicks.text(Number($clicks.text()) - 1)
                    if ($(this).hasClass('blue')){
                        $(this).removeClass('white')
                        $score.text(Number($score.text()) + 1)
                        game.currentPlayer.score++
                    }
                    else {
                        $(this).addClass('black')
                        $score.text(Number($score.text()) - 1)
                        game.currentPlayer.score--
                    }
                //Next Player:
                } else if (game.currentPlayer !== players.player2){
                    game.currentPlayer = players.player2
                    $grid.off('click', '.square')
                    $('#instructions').html('Good job ' + $name.text() + '! Your score is ' + $score.text() + '. '+'<br />' + 'Next Player!')
                    $scoreBoard.append($name.text() + ': ' + $score.text() + '<br/>')
                    $form.show()
                    $('#player-name').val('').focus()
                    $('.square').removeClass('blue').removeClass('black').removeClass('white')
                    $score.text(0)
                    $clicks.text(7)
                    $start.css('backgroundColor', '#60b0f4')
                    $start.one('click', initializeGame)
                }
                //GAME OVER - next level:
                else {
                    $scoreBoard.append($name.text() + ': ' + $score.text() + '<br/>')
                    $name.hide()
                    $grid.off('click', '.square')
                    $('#instructions').html('')
                    $('#grid').hide()
                    if (game.currentPlayer.score > players.player1.score) {
                        $name.show().html('Woohoo ' + game.currentPlayer.name + ', You are smarter!')
                    }
                    else if (players.player1.score === game.currentPlayer.score) {
                        $name.show().html('Woohoo ' + game.currentPlayer.name + ' & ' + players.player1.name + ' you are equally smart!')
                    }
                    else {
                        $name.show().html('Woohoo ' + players.player1.name + ', You are smarter!')
                    }
                    $('#grid').show()
                    $('.square').removeClass('blue').removeClass('black').removeClass('white')
                    $score.text(0)
                    $clicks.text(7)
                    $start.css('backgroundColor', '#60b0f4' ).text('level 2')
                    gridSize = gridSize + 1
                    setGrid()
                }
            })
        }, 1500)
    }
}
$start.one('click', initializeGame)

function clicksRemaining() {
    return Boolean(Number($clicks.text()))
}

