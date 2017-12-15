var $grid = $('#grid')
var $name = $('#name')
var $playerName = $('#player-name')
var $form = $('#form')
var winningSquares;
var $playerOne = $('#player-one')
var $playerTwo = $('#player-two')

var gridSize = 5
var $start = $('#start')

var players = {
    player1: {name: '', score: 0},
    player2: {name: '', score: 0}
}
var game = {
    currentPlayer: players.player1,
    gameOver: false
}
var level = 1

function setGrid() {
    //remove old squares:
    $('.square').remove()
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
    game.currentPlayer.name = $playerName.val()
    $name.text(game.currentPlayer.name)
    $form.hide()
})

//turn 7 random squares blue on Start:
function initializeGame() {
    setGrid()
    //Alert if no name is entered
    if ((players.player1.name === '') || ((players.player1.score !== 0) && (players.player2.name === ''))){ 
        $('#instructions').text('Please submit your name!')
        $playerName.focus()
        $start.one('click', initializeGame)
        return
    } else {
        //Begin the game:
        $name.html(game.currentPlayer.name)
        $('#instructions').text('Memorize the highlighted tiles. Remember their positions when gone.')
        $start.css('backgroundColor', '#999999')
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
                    $grid.off('click', '.square')
                    $('#instructions').html('Good job ' + game.currentPlayer.name + '! Your score is ' + game.currentPlayer.score + '. '+'<br />' + 'Next Player!')
                    $playerOne.html(players.player1.name + ': ' + players.player1.score)
                    if (players.player2.name === '') {
                        $form.show()
                        $('#player-name').val('').focus()
                    }
                    $('.square').removeClass('blue').removeClass('black').removeClass('white')
                    $score.text(0)
                    $clicks.text(7)
                    $start.css('backgroundColor', '#60b0f4')
                    game.currentPlayer = players.player2
                    $start.one('click', initializeGame)
                }
                //GAME OVER - next level:
                else {
                    $playerTwo.html(players.player2.name + ': ' + players.player2.score)
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
                    game.currentPlayer = players.player1
                    $('#grid').show()
                    $('.square').removeClass('blue').removeClass('black').removeClass('white')
                    $score.text(0)
                    $clicks.text(7)
                    level = level + 1
                    $start.css('backgroundColor', '#60b0f4' ).text('Level '+ (level))
                    gridSize = gridSize + 1
                    setGrid()
                    $start.one('click', initializeGame)
                }
            })
        }, 1500)
    }
}
$start.one('click', initializeGame)

function clicksRemaining() {
    return Boolean(Number($clicks.text()))
}

