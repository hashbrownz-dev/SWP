/*
GAME FLOW:
1)  Options: Teacher selects the word list and words to practice
2)  Game Begins: The flashcards are shuffled.  The first card is drawn
3)  drawCard(); transition();
*/
//splash menu
/*our title menu will have a simple form that allows the user to pick
the list they want to practice and select which words they want to use*/

//Start Game
/*To start the game, we'll remove the menu element and replace it with our game
element.  This game is simple.  We'll take our list and shuffle it, then we'll
have each word display one at a time in 'cards'  each card will display the word.
below each card there will be a timer (perhaps a horizontal bar) and two
buttons.  One for correct and one for incorrect.*/

const displaytime = 5000; //how long flashcards are displayed SHOULD BE 2000
const _sndYes = new Audio('audio/correct.wav');
const _sndNo = new Audio('audio/incorrect.wav');

function startGame(){
    //Clear Options
    form.remove();
    //Let's set the stage:
    const gamediv = document.createElement('div'),
        cardContainer = document.createElement('div'),
        timer = document.createElement('div'),
        controls = document.createElement('div'),
        correct = document.createElement('button'),
        incorrect = document.createElement('button'),
        listname = document.createElement('h2'),
        yesimg = document.createElement('img'),
        noimg = document.createElement('img');

    container.appendChild(gamediv);
    cardContainer.className = 'card-container';
    timer.className = 'timer';
    controls.className = 'controls';
    correct.className = 'btnFlash correct';
    //correct.innerHTML = "Yes";
    incorrect.className = 'btnFlash incorrect';
    //incorrect.innerHTML = "No";
    listname.innerHTML = deck.name;
    yesimg.src = 'images/ynbtn_yes.png';
    noimg.src = 'images/ynbtn_no.png';

    gamediv.id='game';
    gamediv.appendChild(listname);
    gamediv.appendChild(cardContainer);
    gamediv.appendChild(timer);
    gamediv.appendChild(controls);

    correct.appendChild(yesimg);
    incorrect.appendChild(noimg);
    controls.appendChild(incorrect);
    controls.appendChild(correct);

    correct.addEventListener('click', () => {
        transition(true);
    });
    incorrect.addEventListener('click', () => {
        transition(false);
    });

    //draw the first flashcard
    drawCard(deck.words[current]);
}

function transition(Correct){ //handles the transition between slides
    //if correct add the word to the correct list
    if(Correct){
        _sndYes.currentTime = 0;
        _sndYes.play();
        correct.push(deck.words[current]);
    }else{
        _sndNo.currentTime = 0;
        _sndNo.play();
        incorrect.push(deck.words[current]);
    }
    current++;
    cancelAnimationFrame(ct);
    let timer = document.querySelector('.timer');
    while(timer.firstChild){
        timer.removeChild(timer.firstChild);
    }
    let cc = document.querySelector('.card-container');
    while(cc.firstChild){
        cc.removeChild(cc.firstChild);
    }
    //check to see if the game is over
    if(current < deck.words.length){
        drawCard(deck.words[current]);
    }else{
        gameOver();
    }
}

function drawCard(word){
    //draw the card. then call timer.
    //card = <div class = "card-container"><p class = "flashcard">word.name</p></div>
    let container = document.querySelector('.card-container'),
        card = document.createElement('p');
    card.innerHTML = word.name;
    card.className = 'flashcard';
    container.appendChild(card);
    //card transition function would go here
    timer();
}

function timer(){
    //timer contains our animation scripts.
    //if time runs out, call transition(false)
    let start,
        timer = document.querySelector('.timer'),
        t = document.createElement('div');
    t.style.height = '100%';
    t.style.width = '100%';
    t.style.backgroundColor = 'var(--hfw-pink)';
    timer.appendChild(t);

    function animate(timeStamp){
        if(start===undefined) start = timeStamp;
        const elapsed = Math.floor(timeStamp - start);
        const width = (Math.min(elapsed/displaytime, 1) * 100);
        t.style.width = `${100 - width}%`;
        if(elapsed < displaytime){
            ct = requestAnimationFrame(animate);
        }else{
            transition(false);
        }
    }
    ct = requestAnimationFrame(animate);
}