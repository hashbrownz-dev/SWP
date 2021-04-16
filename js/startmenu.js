const _sndFanfare = new Audio('audio/fanfare.wav');

const container = document.querySelector('.content'),
    form = document.createElement('form'),
    listcontainer = document.createElement('div'),
    labellist = document.createElement('label'),
    selectlist = document.createElement('select'),
    fieldset = document.createElement('fieldset'),
    legend = document.createElement('legend'),
    start = document.createElement('button'),
    shuff = document.createElement('input'),
    shuffl = document.createElement('label');

let deck,           //the list our game will use
    current = 0,    //the current 'card' in the deck
    hand = [],      //For wordID and Spelling.  The choices available to player
    correct = [],   //An Array containing the correct choices as word objects
    incorrect = [], //An Array containing the incorrect choices as word objects
    ct,             //For Flashcards.  Used to control the timer
    selection,      //For wordID and Spelling.  The selected answer
    guesses = 0,    //For wordID and Spelling.  The number of incorrect guesses.
    reps = 0;       //Repeat the current activity n times.

form.className = 'options';
legend.innerHTML = 'Words';
labellist.htmlFor = 'lists';
labellist.innerHTML = 'Lists: ';
selectlist.id = 'lists';
selectlist.name = 'list';
shuff.type = 'checkbox';
shuff.id = 'shuff';
shuffl.innerHTML = 'Shuffle?';
shuffl.htmlFor = 'shuff';
start.type = 'button';
start.innerHTML = 'Start';
start.className = 'formbtn';

container.appendChild(form);
listcontainer.appendChild(labellist);
listcontainer.appendChild(selectlist);
form.appendChild(listcontainer);
form.appendChild(fieldset);
fieldset.appendChild(legend);
form.appendChild(shuffl);
shuffl.appendChild(shuff);
form.appendChild(buildRepInp(8));
form.appendChild(start);

start.addEventListener('click', () => {
    deck = buildGL();
    if(shuff.checked == true)shuffle(deck.words);
    startGame();
});

//populate our select list
const o1 = document.createElement('option');
o1.innerHTML = "Select a List";
o1.value = '';
//o1.disabled = true;
selectlist.appendChild(o1);

for(let list of _FirstGradeSW){
    let o = document.createElement('option');
    o.innerHTML = list.name;
    o.value = list.name;
    selectlist.appendChild(o);
}
selectlist.addEventListener('click', () => {
    o1.disabled = true;
});
selectlist.addEventListener('input', () => {
    populateWB();
});

//populate wordlist
function populateWB(){
    while(fieldset.firstChild){
        fieldset.removeChild(fieldset.firstChild);
    }
    if(selectlist.value){
        let legend = document.createElement('legend');
        legend.innerHTML = "Words";
        fieldset.appendChild(legend);
        fieldset.appendChild(selectAll());
        fieldset.appendChild(selectNone());
        let l = _FirstGradeSW.find(list => list.name === selectlist.value);
        for(let word of l.words){
            let d = document.createElement('div'),
                w = document.createElement('label'),
                c = document.createElement('input');
            c.type = 'checkbox';
            c.name = `${word.name}`;
            c.id = `${word.name}`;
            c.value = `${word.name}`;
            c.defaultChecked = 'true';
            w.htmlFor = `${word.name}`;
            w.innerHTML = `${word.name}`;
            d.appendChild(w);
            d.appendChild(c);
            fieldset.appendChild(d);
        }
    }
}

//selectAll button
function selectAll(){
    let button = document.createElement('button');
    button.type = 'button';
    button.innerHTML = 'Select All';
    button.className = 'formbtn';
    button.addEventListener('click', () => {
        let words = document.querySelectorAll('fieldset > div > input[type="checkbox"]');
        for(let word of words){
            word.checked = true;
        }
    });
    return button;
}
//selectNone button
function selectNone(){
    let button = document.createElement('button');
    button.type = 'button';
    button.innerHTML = 'Select None';
    button.className = 'formbtn';
    button.addEventListener('click', () => {
        let words = document.querySelectorAll('fieldset > div > input[type="checkbox"]');
        for(let word of words){
            word.checked = false;
        }
    });
    return button;
}
//Repeat
function buildRepInp(cap){
    const rep = document.createElement('select'),
        lbl = document.createElement('label');
    rep.id = 'reps';
    rep.name = 'reps';
    lbl.innerHTML = 'Repeat: ';
    for(let i = 1; i <= cap; i++){
        let opt = document.createElement('option');
        opt.innerHTML = `${i}x`;
        opt.value = i;
        rep.appendChild(opt);
    }
    lbl.appendChild(rep);
    return lbl;
}

//build game list
function buildGL(){
    let w = [];
    let name = _FirstGradeSW.find(list => list.name === selectlist.value);
    let checked = document.querySelectorAll('fieldset > div > input[type="checkbox"]:checked');
    reps = document.getElementById('reps').value;
    for(let i = reps; i > 0; i--){
        for(let c of checked){
            w.push(new Word(c.value, `audio/words/${c.value}.wav`));
        }
    }
    return new List(name.name, w)
}

//shuffle the deck
function shuffle(deck){
    for(let i = deck.length - 1; i >= 0; i--){
        let k = Math.floor(Math.random()*i);
        let temp = deck[k];
        deck[k] = deck[i];
        deck[i] = temp;
    }
    return deck;
}

//CORRECT / INCORRECT LISTS

function evalResults(){
    let eval = [];
    for(let i = correct.length-1; i >= 0; i--){
        let check = correct.pop();
        let corr = eval.find(element => element.word.name == check.name);
        corr ? corr.correct++ : eval.push({word:check, correct: 1});
    }
    for(let i = incorrect.length - 1; i >= 0; i--){
        let check = incorrect.pop();
        if(!eval.find(element => element.word.name == check.name))eval.push({word:check, correct:0});
    }
    //EVALUATE AND REPOPULATE CORRECT AND INCORRECT
    for(let i = eval.length - 1; i >= 0; i--){
        let check = eval[i];
        (check.correct/reps) > 0.6 ? correct.push(check.word) : incorrect.push(check.word);
    }
}

function gameOver(){
    //how to end the game
    let game = document.getElementById('game');
    container.removeChild(game);
    let results = document.createElement('div'),
        h = document.createElement('h2'),
        t = document.createElement('table'),
        tr = document.createElement('tr'),
        trh = document.createElement('tr'),
        thc = document.createElement('th'),
        thi = document.createElement('th'),
        tdc = document.createElement('td'),
        tdi = document.createElement('td'),
        ulc = document.createElement('ul'),
        uli = document.createElement('ul');
    h.innerHTML = 'Results';
    t.className = 'results';
    thc.innerHTML = 'Correct';
    thc.className = 'results-head';
    thi.innerHTML = 'Incorrect';
    thi.className = 'results-head';
    ulc.className = 'results-list';
    uli.className = 'results-list';
    container.appendChild(results);
    results.appendChild(h);
    results.appendChild(t);
    t.appendChild(trh);
    trh.appendChild(thc);
    trh.appendChild(thi);
    t.appendChild(tr);
    tr.appendChild(tdc);
    tdc.appendChild(ulc);
    tr.appendChild(tdi);
    tdi.appendChild(uli);

    evalResults();
    //correct.words
    for(let w of correct){
        let li = document.createElement('li');
        li.innerHTML = w.name;
        ulc.appendChild(li);
    }
    //incorrect.words
    for(let w of incorrect){
        let li = document.createElement('li');
        li.innerHTML = w.name;
        uli.appendChild(li);
    }
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

    //SPECIAL FOCUS BUTTON || TRY AGAIN ONLY FOCUSING ON WORDS FROM INCORRECT LIST
    const specialbtn = document.createElement('button');
    specialbtn.type = 'button';
    specialbtn.innerHTML = 'Special Focus';
    specialbtn.className = 'resetbtn';
    if(!incorrect.length)specialbtn.disabled = 'true';
    specialbtn.addEventListener('click', () => {
        //update the deck
        let sfname = `${deck.name} ***SPECIAL FOCUS***`;
        let sflist = [];
        for(let i = reps; i > 0; i--){
            sflist = sflist.concat(incorrect);
        }
        deck = new List(sfname, sflist);
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
    results.appendChild(specialbtn);
    _sndFanfare.play();
}