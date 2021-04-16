//Start The Game!!!
/*
1 - startGame() will take the deck, shuffled or not, and begin
drawing 'cards'.  In this particular game, a card draw consists of:
taking the audio from the word object and attaching it to a sound button
which will be displayed prominently in the center of the screen.
The 'card' will look like the cards in the other modules except the 
text will be replaced by the giant blue or pink sound button.
the name of the current card will be added to an array along with
3 other words from the same deck.  we will shuffle this array,
and then build four buttons from the words contained within.
each button will have a 'value' attached to it... basically a custom
variable that contains the 'name' of the word object associated with it.
we'll use this variable to check if the word chosen is correct.
There will also be a 'CHECK' or 'DONE' button that will appear once
a button is 'selected'.
*/
const _sndYes = new Audio('audio/correct.wav');
const _sndNo = new Audio('audio/incorrect.wav');
const _sndSelect = new Audio('audio/select.wav');

let randomWords = [];
for(let list of _FirstGradeSW){
    for(let word of list.words){
        randomWords.push(word);
    }
}

function startGame(){
    //Clear Options
    form.remove();
    //Build UI elements.
    const gamediv = document.createElement('div'),
        htwo = document.createElement('h2'),
        soundbutton = document.createElement('button'),
        wordcontainer = document.createElement('div'),
        checkbutton = document.createElement('button'),
        soundimg = document.createElement('img');

    soundbutton.addEventListener('click', () => {
        //Play the current words audio
        console.log(deck.words[current].name);
        deck.words[current].sound;
    });
    checkbutton.addEventListener('click', () => {
        //check
        if(selection){
            if(selection.card.name == deck.words[current].name){
                //You're Right!
                //Display Correct Message
                _sndYes.currentTime = 0;
                _sndYes.play();
                if(guesses == 0){
                    correct.push(deck.words[current]);
                }else{
                    incorrect.push(deck.words[current]);
                }
                guesses = 0;
                transition();
            }else{
                //You're Wrong!
                //play a sad sound
                _sndNo.currentTime = 0;
                _sndNo.play();
                //disable the button that was wrong
                selection.btn.className = 'word incorrect';
                selection.btn.disabled = true;
                selection = undefined;
                checkbutton.className = 'resetbtn hidden';
                guesses++;
            }
        }
    });
    soundbutton.className = 'soundbutton';
    soundbutton.appendChild(soundimg);
    soundimg.src = 'images/001_Sound Icon.png';
    wordcontainer.className = 'word-container';
    checkbutton.className = 'resetbtn hidden';
    checkbutton.innerHTML = 'check';
    gamediv.id = 'game';
    htwo.innerHTML = deck.name;
    gamediv.appendChild(htwo);
    gamediv.appendChild(soundbutton);
    gamediv.appendChild(wordcontainer);
    gamediv.appendChild(checkbutton);
    container.appendChild(gamediv);

    drawCard();
    //update the h2
    //document.querySelector('h2').innerHTML = deck.name;
}

function transition(){
    current++;
    selection = undefined;
    if(current < deck.words.length){
        drawCard();
    }else{
        gameOver();
    }
}

function drawCard(){
    let wordcontainer = document.querySelector('.word-container');
    while(wordcontainer.firstChild){
        wordcontainer.removeChild(wordcontainer.firstChild);
    }
    hand = [];
    hand.push(deck.words[current]);
    while(hand.length < 4){
        //We get a random number between 0 and 1 less than the length of deck.words
        let i = Math.floor(Math.random() * randomWords.length);
        if(!hand.includes(randomWords[i])){
            hand.push(randomWords[i]);
        }
    }
    hand = mix(hand); //mix up our cards
    //build our buttons and add them
    for(let card of hand){
        let button = document.createElement('button');
        button.type = 'button';
        button.className = 'word';
        button.innerHTML = card.name;
        button.addEventListener('click', () => {
            _sndSelect.currentTime = 0;
            _sndSelect.play();
            selection = {card:card , btn:button};
            //deselect all of the other cards
            let old = document.querySelector('.selected');
            if(old)old.className = 'word';
            //select this card
            button.className += ' selected';
            document.querySelector('.resetbtn').className = 'resetbtn';
        });
        wordcontainer.appendChild(button);
    }
    //hide check button
    document.querySelector('.resetbtn').className = 'resetbtn hidden';
}

function mix(hand){
    let o = hand; //old array
    let n = []; //new array
    while(o.length){
        let r = Math.floor(Math.random() * o.length);
        n.push(o[r]);
        o.splice(r,1);
    }
    return n;
}