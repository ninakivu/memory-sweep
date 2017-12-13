var $grid = $('#grid')
var $name = $('#name')
var $playerName = $('#player-name')
var $form = $('#form')
var $topRow = $('#top-row')
var winningSquares;

//generate 25 squares:
for (var i = 0; i < 25; i += 1) {
    $grid.append('<div class="square" id=' +i+ '></square>')
}

//appends start button
$topRow.append('<div class="row" id="start">Start!</div>')

var $squares = $('.square')
var $start = $('#start')

//add player name line after he inputs his name:
$playerName.focus()
$form.on('submit', function(evt){
    evt.preventDefault()
    $name.text($playerName.val())
    $form.hide()
 })

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

//show 7 randomly highlighted squares on Start:
function initializeGame() {
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
        //+/- score and clicks accordingly
        $grid.on('click', '.square', function(){
            // only while there are still clicks left:
            if(clicksRemaining()) {
                $clicks.text(Number($clicks.text()) - 1)
                if ($(this).hasClass('blue')){
                    console.log("You got it")
                    $(this).removeClass('white')
                    $score.text(Number($score.text()) + 1)
                }
                else {
                    console.log("Nope")
                    $(this).addClass('black')
                    $score.text(Number($score.text()) - 1)
                }
            //Game Over, Next Player:
            } else {
                $('.square').off()
                $('#instructions').text('Good job ' + $name.text() + '! Your score is ' + $score.text() + '. \n Next Player!')
                $('#score-board').append($name.text() + ': ' + $score.text() + ' ')
                $form.show()
                $('#player-name').val('').focus()
                $('.square').removeClass('blue').removeClass('black')
                $start.one('click', initializeGame)
                $score.text(0)
                $clicks.text(7)
            }
        })
    }, 1500)
}

$start.one('click', initializeGame)

function clicksRemaining() {
    return Boolean(Number($clicks.text()))
}

