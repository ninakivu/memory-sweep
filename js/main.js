var $grid = $('#grid')
var $squares = $('.square')
var $topRow = $('#top-row')
var $playerName = $('#player-name')
var $name = $('#name')

//generate 25 squares:
for (var i = 0; i < 25; i += 1) {
    $grid.append('<div class = square></square>')
}

//make buttons clickable:
$grid.on('click', '.square', function(){
    console.log("I'm clickable")
})

//add player name line after input:
$playerName.on('submit', function(evt){
   evt.preventDefault()
   $name.text($playerName.val())
})

//create $topRow: clicks/score
$topRow.append('<div class=row id=clicks>Clicks: </div>')
$topRow.append('<div class=row id=score>Score: </div>')

//generate a random number 0-24:

