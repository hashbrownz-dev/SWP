//This module controls the nav elements of our program.

//HAMBURGER
/*
Our navigation element must do the following:
1 - Clicking the hamburger icon must bring the hidden nav links into view.
2 - Our nav element is a fixed element that remains in view.
We need to make our navigation element scroll with the page.

When clicking the hamburger icon, the hidden nav links come into view.
We accomplish this by changing the 'right' style attribute.
Clicking the hamburger icon again will hide the navlinks.
Clicking outside of the the pink area will also hide the navlinks.
*/

class Game{
    constructor(name, link){
        this.name = name;
        this.link = link;
    }
}

let games = [
    new Game('Flashcards', 'flashcards.html'),
    new Game('Spelling Practice', 'spelling.html'),
    new Game('Word Identificiation', 'wordID.html')
];

function loadNav(){
    navlinks.style.display = 'block';

    //links.style.left = '20%';
    let time = 250, //time in milliseconds
        os = 0,     //opacity start (multiply by 0.01)
        oe = 50,    //opactiy end (multiply by 0.01)
        ls = navlinks.clientWidth,   //left start
        le = navlinks.clientWidth - links.clientWidth,    //left end
        start;

    console.log(ls);

    function animate(timeStamp){
        if(start === undefined) start = timeStamp;
        const elapsed = Math.floor(timeStamp - start);
        //opacity
        const opacity = (Math.min(elapsed/time, 1) * (oe-os));
        //left
        const left = (Math.min(elapsed/time, 1) * (le-ls) + ls);
        //update styles
        navlinks.style.backgroundColor = `rgba(116,209,255,${opacity*0.01})`;
        links.style.left = `${left}px`;
        if(elapsed < time) requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
}

function clearNav(){
    let navlinks = document.querySelector('.nav-links'),
        links = document.querySelector('.nav-links > div'),
        time = 250,
        os = 50,
        oe = 0,
        ls = navlinks.clientWidth - links.clientWidth,
        le = navlinks.clientWidth,
        start;

    function animate(timeStamp){
        if(start === undefined) start = timeStamp;
        const elapsed = Math.floor(timeStamp - start);
        const opacity = (Math.min(elapsed/time, 1) * (oe-os) + os);
        const left = (Math.min(elapsed/time, 1) * (le-ls) + ls);
        navlinks.style.backgroundColor = `rgba(116,209,255,${opacity*0.01})`;
        links.style.left = `${left}px`;
        if(elapsed < time){
            requestAnimationFrame(animate);
        }else{
            //once the animation is done, hide the element
            navlinks.style.display = 'none';
        }
    }
    requestAnimationFrame(animate);
}

function newLink(name, link){
    let a = document.createElement('a');
    a.innerHTML = name;
    a.href = link;
    return a;
}

//Generate all of our NAV elements in JS

let navigation = document.createElement('div'),
    sitename = document.createElement('a'),
    hamburger = document.createElement('button');

navigation.className = 'navigation';
sitename.className = 'site-name';
sitename.href = 'index.html';
sitename.innerHTML = 'Sight Word Practice';
hamburger.className = 'hamburger';
hamburger.type = 'button';
hamburger.innerHTML = '&#9776';

navigation.appendChild(sitename);
navigation.appendChild(hamburger);

document.querySelector('.wrapper').appendChild(navigation);

hamburger.addEventListener('click', () => {
    loadNav();
});

let navlinks = document.createElement('div'),
    links = document.createElement('div'),
    gamelinks = document.createElement('div'),
    teacherlinks = document.createElement('div');

navlinks.className = 'nav-links';
gamelinks.className = 'game links';
teacherlinks.className = 'teacher links';

//add links to the games
for(let game of games){
    gamelinks.appendChild(newLink(game.name, game.link));
}

//add teacher links
//teacherlinks.appendChild(newLink('NTP List', 'ntp.html'));
//teacherlinks.appendChild(newLink('Learning Metrics', 'metrics.html'));

links.appendChild(gamelinks);
//links.appendChild(teacherlinks);
navlinks.appendChild(links);
navigation.appendChild(navlinks);

navlinks.addEventListener('click', (m) => {
    if(m.clientX < navlinks.clientWidth - links.clientWidth){
        clearNav();
    }
});