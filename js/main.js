var $grid = $('#grid')
var $topRow = $('#top-row')
var $form = $('#form')
var $playerName = $('#player-name')
var $name = $('#name')

//generate 25 squares:
for (var i = 0; i < 25; i += 1) {
    $grid.append('<div class=square id=' +i+ '></square>')
}

//create $topRow: clicks/score
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

//show 7 randomly highlighted squares on Start:
$start.on('click', function(){
    for(var i = 0; i < winningSquares.length; i += 1) {
        $squares.eq(winningSquares[i]).addClass('blue')
    }
})

//hide the blue squares after 3sec:



//create an EL for the squares
$grid.on('click', '.square', function(){
    console.log("I'm clickable")
    
    //check if the id is in the winning squares

    //remember that the id of html element is string
})




