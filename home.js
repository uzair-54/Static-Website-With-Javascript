// challenge 1 age in days 

function ageInDays  () {
    var birthYear = prompt("in which year were you born ?");

    var d = new Date();
    var currentYear = d.getFullYear();
    var ageIndayz = (currentYear - birthYear) * 365;
    
    var h1 = document.createElement('h1');
    var textAnswer = document.createTextNode('You are ' + ageIndayz + ' days old')

    h1.setAttribute('id','ageInDays');
    h1.appendChild(textAnswer);
    document.getElementById('flex-box-result').appendChild(h1);
}

function reset () {
    document.getElementById('ageInDays').remove();
}
// challenge 2 cats 

function genCat() {

   var image = document.createElement("img");
   var div = document.getElementById("flex-cat");
   image.src = "https://i.pinimg.com/originals/c3/2b/fa/c32bfa16bcf864e478d3ddfe32440268.gif";
   div.appendChild(image);
}

// rockPaperScissors

function rpsGame(yourChoice) {

    console.log(yourChoice);

    var humanChoice,botChoice;
    humanChoice = yourChoice.id;
    botChoice = numberToChoice(randToRpsInt());
    results = decideWinner(humanChoice,botChoice);
    message = finalMessage(results);
    console.log(message);
    rpsFrontEnd(yourChoice.id,botChoice,message);
}

function randToRpsInt() {
    return Math.floor(Math.random() * 3);
}

function numberToChoice(number) {
    return ['rock','paper','scissors'] [number]
}

function decideWinner(yourChoice,computerChoice) {
    var rpsDatabase = {
        'rock': {'scissors': 1,'rock': 0.5,'paper': 0},
        'paper': {'scissors': 0,'rock': 1,'paper': 0.5},
        'scissors': {'scissors': 0.5,'rock': 0,'paper': 1}
    }
    var yourScore = rpsDatabase [yourChoice][computerChoice];
    var computerScore = rpsDatabase [computerChoice][yourChoice];

    return [yourScore,computerScore];
}

function finalMessage([yourScore]) {

    if (yourScore === 0) {
        return {'Message': 'You lost!','color':'red'};
    }
    else if (yourScore === 0.5) {
        return {'Message': 'You tied!','color':'yellow' };
    }
    else {
        return {'Message': 'You won!','color':'green' };
    }
}

function rpsFrontEnd (humanImageChoice,botImageChoice,finalMessage) {
    var imagesDatabase = {
        'rock':document.getElementById('rock').src,
        'paper':document.getElementById('paper').src,
        'scissors':document.getElementById('scissors').src,
    }
    document.getElementById('rock').remove();
    document.getElementById('scissors').remove();
    document.getElementById('paper').remove();

    var humanDiv = document.createElement('div');
    var botDiv = document.createElement('div');
    var messageDiv = document.createElement('div');

    humanDiv.innerHTML = "<img src ='" + imagesDatabase[humanImageChoice] + "' height=150 width=150 >"
    messageDiv.innerHTML = "<h1 style = 'color: " + finalMessage['color'] +"; font-size: 60px; padding: 30px;'>"+finalMessage['Message'] + "</h1>"
    botDiv.innerHTML = "<img src ='" + imagesDatabase[botImageChoice] + "' height=150 width=150>"
    
    document.getElementById('flex-box-rps-div').appendChild(humanDiv);
    document.getElementById('flex-box-rps-div').appendChild(messageDiv);
    document.getElementById('flex-box-rps-div').appendChild(botDiv);
}
// color change  
var allButtons = document.getElementsByTagName('button');
var copyAllButton = [];
for (let i = 0; i < allButtons.length; i++) {
    copyAllButton.push(allButtons[i].classList[1]);
}
function buttonColorChange(buttonThingy) {
    if (buttonThingy.value === 'Red') {
        buttonRed();
    }
    else if (buttonThingy.value === 'Green') {
        buttonGreen();
    }
    else if (buttonThingy.value === 'Reset') {
        buttonReset();
    }
    else if (buttonThingy.value === 'Random') {
        randomColors();
    }   
}
function buttonRed () {
    for (let i = 0; i < allButtons.length; i++){
        allButtons [i].classList.remove(allButtons[i].classList[1]);
        allButtons [i].classList.add('btn-danger');
    }
}

function buttonGreen() {
    for (let i = 0; i < allButtons.length; i++){
        allButtons [i].classList.remove(allButtons[i].classList[1]);
        allButtons [i].classList.add('btn-success');
    }
}

function buttonReset() {
    for (let i = 0; i < allButtons.length; i++) {
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add(copyAllButton[i]);
    }  
}

function randomColors() {
    var choices = ['btn-danger','btn-success','btn-primary','btn-warning'];
    
    for (let i = 0; i < allButtons.length; i++) {

        var randChoice = Math.floor(Math.random() * 4);
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons [i].classList.add(choices[randChoice]);
    }
}
// blackjack

let blackjackGame = {
    'you': {'scoreSpan':'#your-blackjack-result','div': '#your-box', 'score':0},
    'dealer': {'scoreSpan':'#dealer-blackjack-result','div': '#dealer-box', 'score':0},
    'cards': ['2','3','4','5','6','7','8','9','10','K','J','Q','A'],
    'cardsMap': {'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'K':10,'j':10,'Q':10,'A': [1,11]},
    'wins':0,
    'losses':0,
    'draws':0,
    'isStand':false,
    'turnsOver':false,
}

const YOU = blackjackGame ['you']
const DEALER = blackjackGame ['dealer']
const HITSOUND = new Audio('sounds/swish.m4a');
const WINSOUND = new Audio('sounds/cash.mp3');
const LOSSOUND = new Audio('sounds/aww.mp3');

document.querySelector('#blackjack-hit-button').addEventListener('click',blackjackHit);
document.querySelector('#blackjack-stand-button').addEventListener('click',dealerLogic);
document.querySelector('#blackjack-deal-button').addEventListener('click',blackjackDeal);

function blackjackHit () {
    if (blackjackGame['isStand'] === false) {
        let card = randomCard();
        showCard(card,YOU);
        updateScore(card,YOU);
        showScore(YOU);
    }
}

function showCard (card,activePlayer) {
    if (activePlayer['score'] <= 21) {
        let cardImage = document.createElement('img');
        cardImage.src = `images/${card}.png`;
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        HITSOUND.play();
    }
}

function blackjackDeal () {
    if (blackjackGame['turnsOver'] === true) {

        blackjackGame['isStand'] = false;

        let yourImages = document.querySelector('#your-box').querySelectorAll('img');
        let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');

        for (i = 0; i < yourImages.length; i++) {
            yourImages[i].remove();
        }   
        for (i = 0; i < dealerImages.length; i++) {
            dealerImages[i].remove();
        }
        YOU['score'] = 0;
        DEALER['score'] = 0;

        
        document.querySelector('#your-blackjack-result').textContent = 0;
        document.querySelector('#dealer-blackjack-result').textContent = 0;
        document.querySelector('#your-blackjack-result').style.color = 'white';
        document.querySelector('#dealer-blackjack-result').style.color = 'white';
        document.querySelector('#blackjack-result').textContent = 'Lets play!';
        document.querySelector('#blackjack-result').style.color = 'black';

        blackjackGame['turnsOver'] = false;
    }
}

function randomCard() {
    let randomIndex = Math.floor(Math.random() * 13);
    return blackjackGame['cards'][randomIndex];
}

function updateScore(card,activePlayer){
    if (card === 'A') {
        if (activePlayer['score'] + blackjackGame['cardsMap'][card][1] <=21) {
            activePlayer['score'] += blackjackGame['cardsMap'][card][1];                   
        }
        else {
            activePlayer['score'] += blackjackGame['cardsMap'][card][0];
        }
    }
    else {
        activePlayer['score'] += blackjackGame['cardsMap'][card];
    }
}

function showScore (activePlayer) {
    if (activePlayer['score'] > 21) {
        document.querySelector(activePlayer['scoreSpan']).textContent = "BUST!";
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
    }
    else {
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }
}

function sleep (ms) {
    return new Promise( resolve => setTimeout(resolve,ms));
}

async function dealerLogic() {
    blackjackGame['isStand'] = true;

    while (DEALER['score'] < 16 && blackjackGame['isStand'] === true) {
        let card = randomCard();
        showCard(card,DEALER);
        updateScore(card,DEALER);
        showScore(DEALER);
        await sleep(750);
    }
    blackjackGame['turnsOver'] = true;
    let winner = computeWinner();
    showResult(winner); 

}

function computeWinner() {
    let winner;

    if(YOU['score'] <= 21){
    
        if (YOU['score'] > DEALER['score'] || (DEALER['score'] > 21)) {
            blackjackGame['wins']++;
            winner = YOU;
        }
        else if ((YOU['score'] < DEALER['score'])) {
            blackjackGame['losses']++;
            winner = DEALER;
        }
        else if (YOU['score'] === DEALER['score']) {
            blackjackGame['draws']++;
        }
    }
    else if (YOU['score'] > 21 && DEALER['score'] <= 21){
        blackjackGame['losses']++;
        winner = DEALER;
    }
    else if (YOU['score'] > 21 && DEALER['score'] > 21) {
        blackjackGame['draws']++;
    }
    return winner;
}

function showResult(winner){
    let message, messageColor;

    if (blackjackGame['turnsOver'] === true) {
        if (winner === YOU) {
            message = 'YOU WON!';
            messageColor = 'green';
            WINSOUND.play();
            document.querySelector('#wins').textContent = blackjackGame['wins'];
        }
        else if (winner === DEALER) {
            message = 'YOU LOST!';
            messageColor = 'red';
            LOSSOUND.play();
            document.querySelector('#losses').textContent = blackjackGame['losses'];
        }
        else {
            message = 'YOU DREW!';
            messageColor = 'black';
            document.querySelector('#draws').textContent = blackjackGame['draws'];
        }

        document.querySelector('#blackjack-result').textContent = message;
        document.querySelector('#blackjack-result').style.color = messageColor;
    }
}

