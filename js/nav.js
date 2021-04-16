//This module controls the nav elements of our program.

const games = [
    {name: 'Flashcards', link: 'flashcards.html'},
    {name: 'Spelling Practice', link: 'spelling.html'},
    {name: 'Word ID', link: 'wordID.html'}
];

const navigation = document.createElement('div'),
    sitename = document.createElement('a'),
    arrow = document.createElement('button'),
    navlinks = document.createElement('ul'),
    foot = document.createElement('footer');

navigation.className = 'navigation';
sitename.className = 'site-name';
sitename.href = 'index.html';
sitename.innerHTML = 'Sight Word Practice';
navlinks.className = 'nav-links';
arrow.className = 'arrow';
arrow.type = 'button';
arrow.innerHTML = '<img src = "images/arrow-01.png">';
arrow.style.transform = 'rotate(0.5turn)';
foot.innerHTML = 'Site by <a href = "https://hashbrownz-dev.github.io/portfolio/">Roosevelt B</a> &copy 2021';

navigation.appendChild(sitename);
navigation.appendChild(navlinks);
navigation.appendChild(arrow);
document.body.appendChild(foot);

//add links to the games

for(let game of games){
    let li = document.createElement('li'),
        a = document.createElement('a');
    a.innerHTML = game.name;
    a.href = game.link;
    li.appendChild(a);
    navlinks.appendChild(li);
}

//append the nav element to the body
document.body.appendChild(navigation);

//add functionality
let linkvisible = false;
let _cwidth = document.body.clientWidth;
arrow.addEventListener('click', ()=>{
    if(linkvisible){ //HIDE LINKS
        arrow.style.transform = 'rotate(0.5turn)';
        if(_cwidth < 640){
            navlinks.style.left = '100%';
        }
        if(_cwidth > 640 && _cwidth < 960){
            navigation.style.left = '0';
        }
        linkvisible = false;
    }else{ //REVEAL LINKS
        arrow.style.transform = 'rotate(0)';
        if(_cwidth < 640){
            navlinks.style.left = '30%';
        }
        if(_cwidth > 640 && _cwidth < 960){
            navigation.style.left = '-100%';
        }
        linkvisible = true;
    }
});

document.addEventListener('scroll', ()=>{
    if(linkvisible){
        arrow.style.transform = 'rotate(0.5turn)';
        if(_cwidth < 640){
            navlinks.style.left = '100%';
        }
        if(_cwidth > 640 && _cwidth < 960){
            navigation.style.left = '0';
        }
        linkvisible = false;
    }
});

window.addEventListener('resize', ()=>{
    _cwidth = document.body.clientWidth;
    console.log(_cwidth);
});