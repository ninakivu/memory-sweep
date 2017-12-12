var $grid = $('#grid')
var $name = $('#name')
var $playerName = $('#player-name')
var $form = $('#form')
var $topRow = $('#top-row')

//generate 25 squares:
for (var i = 0; i < 25; i += 1) {
    $grid.append('<div class="square" id=' +i+ '></square>')
}

//create $topRow: clicks/score/start
$topRow.append('<div class="row" id="clicks">Clicks: </div>')
$topRow.append('<div class="row" id="score">Score: </div>')
$topRow.append('<div class="row" id="start">Start!</div>')

var $squares = $('.square')
var $start = $('#start')

//add player name line after he inputs his name:
$form.on('submit', function(evt){
    evt.preventDefault()
    $name.text($playerName.val())
    this.remove()
 })

//generate a random number 0-24:
function randomInt(hi){
    return Math.floor(Math.random() * hi)
}

//generate an array with 7 unique random numbers:
var winningSquares = [] 
while (winningSquares.length < 7 ) {
    var randomNum = randomInt(25)
    if (winningSquares.indexOf(randomNum) > -1) continue;
    winningSquares[winningSquares.length] = randomNum;
}

var $score = (".score")
var $clicks = (".clicks")

//show 7 randomly highlighted squares on Start:
$start.on('click', function(){
    for(var i = 0; i < winningSquares.length; i += 1) {
        $squares.eq(winningSquares[i]).addClass('blue')
    }
    //change color to blue for 3 seconds:
    setTimeout(function(){
        for(var i = 0; i < winningSquares.length; i += 1) {
            $squares.eq(winningSquares[i]).addClass('white')
        }
    }, 3000)
    //check if the player clicked on the right square
    $grid.on('click', '.square', function(){
        if ($(this).hasClass('blue')){
            console.log("You got it")
            $(this).removeClass('white')
            // var score = +1
            // $score.val("$score + 1")
            //increase score
        }
        else {
            //$(this).css("backgroundColor", "white")
            console.log("Nope")
            // $score.val("$score - 1")
            //decrease score
        }
    })
})








