/*
Spelling Practice
Now that I've been able to actually do a little testing with Violet, I now have a better
idea of what direction we should push this project in.  This only further promotes the idea
that you should always try to get your product in front of an audience as soon as possible.
Anyway, initially we wanted SP to be a point of mastery.  But now, we want to use it to
help reinforce letter and word recognition.  It isn't about testing the student, but rather
helping them to familiarize themselves with the word, the letters it contains, and the
order in which they appear.  So, like we practiced writing words on the white board
and did rainbow words etc.. we'll do the same thing with rainbow words.  It's more of
an excercise than a test.
So, with SP we'll need the obligatory gamediv, which will contain the following:
a card div which will contain a sound button, a p element called 'word', a div
called 'letter-container'  which will contain smaller 'letter' divs.
Beneath this will have another div called 'hand' which will contain our 'letterbtn' buttons.
With SP, when we call the function drawCard()...
we add a sound button and attach an event listener that'll play the words sound.
we add a p element with word.name in the innerHTML
we use word.letter to create letter divs and attach them to our letter-container.
we'll also use word.letter to create the player's hand.  we'll add random letters as
needed.
The flow of each card is simple.  We'll have a variable called currentltr which keeps
track of which letter in the word we are currently on.  The current letter will be
stylized visually, having a bold blue outline and also an icon/cursor (preferably a
carrot) underneath.  at this point, any button presses will be compared to the intended
letter that goes into the highlighted slot.  This will continue until the word is completed,
and we'll do a little thing where we play audio queues for each letter and then the
word itself.  After this, we'll go to the next slide.  This will continue until the
deck is exhausted.
*/

let currentltr = 0; //the current letter
let lettersarray = []; //an array containing every letter of the current word.
const _sndNo = new Audio('audio/incorrect.wav');

function startGame(){
    //Clear Options
    form.remove();
    //Build UI elements.
    const gamediv = document.createElement('div'),
        htwo = document.createElement('h2'),
        card = document.createElement('div'),
        soundbutton = document.createElement('button'),
        soundimg = document.createElement('img'),
        word = document.createElement('p'),
        lettercontainer = document.createElement('div'),
        hand = document.createElement('div');

    soundbutton.addEventListener('click', () => {
        console.log(deck.words[current].name);
        deck.words[current].sound;
    });

    soundbutton.className = 'soundbutton';
    soundbutton.appendChild(soundimg);
    soundimg.src = 'images/001_Sound Icon.png';
    card.className = 'card';
    word.className = 'word';
    lettercontainer.className = 'letter-container';
    hand.className = 'hand';
    htwo.innerHTML = deck.name;
    gamediv.id = 'game';
    card.appendChild(soundbutton);
    card.appendChild(word);
    card.appendChild(lettercontainer);
    gamediv.appendChild(htwo);
    gamediv.appendChild(card);
    gamediv.appendChild(hand);
    container.appendChild(gamediv);
    //Begin The Game
    drawCard();
}

function drawCard(){
    //clear any previous elements
    let lettercontainer = document.querySelector('.letter-container'),
        handdiv = document.querySelector('.hand');
    while(lettercontainer.firstChild){
        lettercontainer.removeChild(lettercontainer.firstChild);
    }
    while(handdiv.firstChild){
        handdiv.removeChild(handdiv.firstChild);
    }
    currentltr = 0;
    lettersarray = [];
    hand = [];
    //Take our word and populate the upper ui
    //display the word
    let word = document.querySelector('.word');
    word.innerHTML = deck.words[current].name;
    deck.words[current].sound;
    //segment the word into letter divs and buttons.
    let letters = deck.words[current].letters;
    for(let letter of letters){
        //build letter div
        let letterdiv = document.createElement('div');
        letterdiv.className = 'letter';
        letterdiv.innerHTML = letter.name;
        document.querySelector('.letter-container').appendChild(letterdiv);
        hand.push(letter);
        lettersarray.push({letter:letter.name, element:letterdiv});
    }
    lettersarray[0].element.className = 'letter selected';
    //populate the players hand.
    //first create tiles based on the letters in the word.
    while(hand.length < 8){
        hand.push(getRandomLetter());
    }
    hand = mix(hand); //shuffle up that hand
    for(let letter of hand){
        //build letter button
        let letterbtn = document.createElement('button');
        letterbtn.type = 'button';
        letterbtn.className = 'letter-button';
        letterbtn.innerHTML = letter.name;
        document.querySelector('.hand').appendChild(letterbtn);
        letterbtn.addEventListener('click', () => {
            if(letter.name == lettersarray[currentltr].letter){
                lettersarray[currentltr].element.className = 'letter complete';
                letterbtn.disabled=true;
                //play some confirmation sound
                letter.sound;
                currentltr++;
                if(currentltr < lettersarray.length){
                    lettersarray[currentltr].element.className = 'letter selected';
                }else{
                    let c = current;
                    setTimeout(()=>deck.words[c].sound, 1000);
                    current++;
                    //check for gameover.
                    setTimeout(() => {
                        if(current >= deck.words.length){
                            endGame();
                        }else{
                            drawCard();
                        }
                    }, 3000);
                }
            }else{
                //play some negative sound
                _sndNo.currentTime = 0;
                _sndNo.play();
            }
        });
    }
}

function getRandomLetter(){
    const min = 97;
    const max = 122;
    let l = String.fromCharCode(Math.floor(Math.random() * (max - min + 1) + min));
    return new Letter(l,`audio/letters/${l}.wav`);
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

function endGame(){
    let game = document.getElementById('game');
    container.removeChild(game);
    let results = document.createElement('div');
    let congrats = document.createElement('p');
    congrats.className = 'congrats';
    congrats.innerHTML = 'Great Job!';//maybe throw in a randomizer?
    results.appendChild(congrats);

    //ADD A RESET BUTTON || RETURN TO MAIN MENU
    const resetbtn = document.createElement('button');
    resetbtn.type = 'button';
    resetbtn.innerHTML = 'Reset';
    resetbtn.className = 'resetbtn';
    resetbtn.addEventListener('click', () => {
        location.reload();
    });
    results.appendChild(resetbtn);

    //ADD A TRY AGAIN? BUTTON  || TRY THE ENTIRE LIST AGAIN
    const tryagainbtn = document.createElement('button');
    tryagainbtn.type = 'button';
    tryagainbtn.innerHTML = 'Try Again?';
    tryagainbtn.className = 'resetbtn';
    tryagainbtn.addEventListener('click', () => {
        //reset global variables
        current = 0;
        hand = [];
        correct = [];
        incorrect = [];
        ct = undefined;
        selection = undefined;
        guesses = 0;
        //clear results
        container.removeChild(results);
        //restart the game
        startGame();
    });
    results.appendChild(tryagainbtn);
    container.appendChild(results);
    _sndFanfare.play();
}