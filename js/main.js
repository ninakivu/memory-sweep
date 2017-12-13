var $grid = $('#grid')
var $name = $('#name')
var $playerName = $('#player-name')
var $form = $('#form')
var $topRow = $('#top-row')

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
var winningSquares = [] 
while (winningSquares.length < 7 ) {
    var randomNum = randomInt(25)
    if (winningSquares.indexOf(randomNum) > -1) continue;
    winningSquares[winningSquares.length] = randomNum;
}

var $score = $("#score")
var $clicks = $("#clicks")
var counter = 0

$score.text(0)
$clicks.text(7)

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
        $('#instructions').text('Good Luck!')

        //+/- score and clicks accordingly
        $grid.on('click', '.square', function(){
            // while ($clicks.text() >=== - 1) {
            // }
            if(clicksRemaining()) {
                $clicks.text(Number($clicks.text()) - 1)
                if ($(this).hasClass('blue')){
                    console.log("You got it")
                    $(this).removeClass('white')
                    $score.text(Number($score.text()) + 1)
                }
                else {
                    console.log("Nope")
                    $(this).css('backgroundColor', 'black')
                    $score.text(Number($score.text()) - 1)
                }
            } else {
                $('.square').off()
                $('#instructions').text('Good job ' + $name.text() + '! Your score is ' + $score.text() + '. \n Next Player!')
                $name.text($name.text() + ': ' + $score.text())
                $form.show().text('')
                $playerName.focus()
                $('.square').css('backgroundColor', 'white')
            }
        })
    }, 2500)
})

function clicksRemaining() {
    return Boolean(Number($clicks.text()))
}






