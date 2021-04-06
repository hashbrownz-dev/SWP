/*
A modified version of our original Tiles.js library.
This method utilizes getBoundingClientRect and tracks the tiles
x and y coordinates relative to the viewport.
It also adds some functionality that is specific to our spelling
game.
*/

const tc = document.createElement('div'), //tile container - defines the boundary for our tile element
    word = document.createElement('div'), //contains the letter-container and a sound button
    lc = document.createElement('div'), //the letter container. contains the word the user needs to spell
    hand = document.createElement('div'), //contains our tiles
    content = document.querySelector('.content'); //the main content container for our page

    tc.className = 'tile-container';
    word.className = 'word';
    lc.className = 'letter-container';
    hand.className = 'hand';

let selected,   //the current active tile
    slots = [], //an array containing all active slot objects
    tiles = []; //an array containing all active tile objects

class Tile{
    constructor(letter){
        this.ox = 0;
        this.oy = 0;
        this.id = document.createElement('div');
        this.id.className = 'tile';
        this.id.innerHTML = letter.name;
        hand.appendChild(this.id);
        this.originX;
        this.originY;
        //add mouse events
        this.id.addEventListener('mousedown', e => {
            e.preventDefault();
            selected = this;
            let rect = this.id.getBoundingClientRect();
            this.ox = e.offsetX;
            this.oy = e.offsetY;
            this.originX = rect.x;
            this.originY = rect.y;
        });
        this.id.addEventListener('mouseup', e => {
            selected = undefined;
            this.ox = 0;
            this.oy = 0;
            //if aligned to a slot, snap to the slot.
            let col = this.checkCollision();
            if(col){
                //snap to slot
            }else{
                //snap to origin
                this.smooch();
            }
        });
    }
    checkCollision(){
        let rect = this.id.getBoundingClientRect();
        return false;
    }
    draw(ex,ey){
        let x = ex - this.originX - this.ox;
        let y = ey - this.originY - this.oy;
        //this.id.style.left = `${x}px`;
        //this.id.style.top = `${y}px`;
        this.id.style.transform = `translate(${x}px, ${y}px)`;
    }
    smooch(){
        //this.id.style.left = `0px`;
        //this.id.style.top = `0px`;
        const time = 125,
            trans = this.id.style.transform.match(/\d+/g),
            startX = Number(trans[0]),
            startY = Number(trans[1]),
            me = this;
        let start;
        function animate(timeStamp){
            if(start === undefined)start = timeStamp;
            const elapsed = Math.min(Math.floor(timeStamp - start), time);
            let x = elapsed * (startX/time);
            let y = elapsed * (startY/time);
            me.id.style.left = `${x}px`;
            me.id.style.top = `${y}px`;
            if(elapsed < time) requestAnimationFrame(animate);
        }
        requestAnimationFrame(animate);
    }
}

class Slot{
    constructor(){
        this.id = document.createElement('div');
        this.id.className = 'slot';
        lc.appendChild(this.id);
        let rect = this.id.getBoundingClientRect();
        this.x = rect.x;
        this.y = rect.y;
        this.width = rect.width;
        this.height = rect.height;
    }
}

window.addEventListener('mousemove', e => {
    if(selected){
        selected.draw(e.clientX, e.clientY);
    }
});