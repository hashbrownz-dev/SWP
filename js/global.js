/*
This file will house all of the class declarations and functions
that will be used throughout the entire website.
*/

class Letter{
    constructor(name, audio){
        this.name = name;
        this.audio = new Audio(audio);
    }
    get sound(){
        this.audio.play();
    }
}

class Word extends Letter{
    constructor(name,audio){
        super(name,audio);
    }
    get letters(){
        let l = [];
        for(let letter of [...this.name]){
            l.push(new Letter(letter, `audio/letters/${letter}.wav`));
        }
        return l;
    }
}

class List{
    constructor(name, words){
        this.name = name;   //A String
        this.words = words; //An array of word objects
    }
    add(word){      //add a word to the list
        this.words.push(word);
    }
    remove(word){   //remove a word from the list

    }
}

const _Alphabet = initAlpha();

const _HFW = [
    "and play back six go you see for she got the have him jump his no little one", //list 1
    "are of look to my black said put two saw come this here want what", //list 2
    "now best do drinks went last which must still next stop plant out by was good then who there them", //list 3
    "could once sing that these upon things because thinks from our head were their hurt when", //list 4
    "late over many under start face right far take give why let's close place find too how try", //list 5
    "after small call use five animals her brown large day house live long may off work year", //list 6
    "always so leave trees don't you need where found all people again goes clean read country hold draw sea high know each seem kind loads feet sleep lights show green three might night round they", //list 7
    "boy laugh car more city move farm or four above great earth hard every part girl away near change school turn", //list 8
    "about through around walk before another done books even does sound food buy some only soon pointed took wash", //list 9
    "better mother carry never learn talk very answer write any below blue fall eight father funny hear", //list 10
    "from walk keep friend give old were small going once when cut had open always kind gave around start these" //edgenuity
];

const _FirstGradeSW = initHFW(); //an array of list objects

function buildHFWlist(hfw){
    let list = [];
    for(let word of hfw.split(' ')){
        list.push(new Word(word, `audio/words/${word}.wav`));
    }
    return list;
}

function initHFW(){
    let lists = [];
    for(let list of _HFW){
        lists.push(new List(`First Grade Sight Words - List ${_HFW.indexOf(list) + 1}`, buildHFWlist(list)));
    }
    return lists;
}

function initAlpha(){
    let alpha = 'abcdefghijklmnopqrstuvwxyz';
    let alphabet = [];
    for(let letter of [...alpha]){
        alphabet.push(new Letter(letter, `audio/letters/${letter}.wav`));
    }
    return new List ('The Alphabet', alphabet);
}