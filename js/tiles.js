class Tile{
    constructor(letter, parent){
        this.ox = 0;
        this.oy = 0;
        this.id = document.createElement('div');
        this.id.className = 'tile';
        parent.appendChild(this.id);
        this.id.innerHTML = letter.name;
        let rect = this.id.getBoundingClientRect();
        this.x = rect.x;
        this.y = rect.y;
        this.width = rect.width;
        this.height = rect.height;
        this.id.addEventListener('mousedown', e => {
            e.preventDefault();
            //letter.sound;
            selected = this;
            this.ox = e.offsetX;
            this.oy = e.offsetY;
        });
        this.id.addEventListener('mouseup', e => {
            selected = undefined;
            this.ox = 0;
            this.oy = 0;
            let col = this.checkCollision();
            if(col){
                this.smooch(col);
            }
        });
        parent.appendChild(this.id);
    }
    checkCollision(){
        //check for boundaries
        let rect = this.id.getBoundingClientRect();
        if(this.x < 0)this.x = 0;
        if(this.y < 0)this.y = 0;
        if(this.x + this.width > rect.width) this.x = rect.width - this.width;
        if(this.y + this.height > rect.height) this.y = rect.height - this.height;
        //check for slots
        let tx = this.x,
            tw = this.x + this.width,
            ty = this.y,
            th = this.y + this.height;
        for(let slot of slots){
            let sx = slot.x,
                sw = slot.x + slot.width,
                sy = slot.y,
                sh = slot.y + slot.height;
            if(((tx >= sx) && (tx <= sw)) || ((tw >= sx) && (tw <= sw))){
                if(((ty >= sy) && (ty <= sh)) || ((th >= sy) && (th <= sh))){
                    return slot;
                }
            }
        }
        return false;
    }
    draw(mx = this.x, my = this.y){
        this.x = mx - this.ox;
        this.y = my - this.oy;
        //this.checkCollision();
        this.id.style.left = `${this.x}px`;
        this.id.style.top = `${this.y}px`;
    }
    smooch(o){
        //o is the other object
        const time = 125,
            sx = this.x,
            sy = this.y,
            dx = o.x - sx,
            dy = o.y - sy,
            me = this;
        let start;
        function animate(timeStamp){
            if(start === undefined)start = timeStamp;
            const elapsed = Math.min(Math.floor(timeStamp - start), time);
            me.x = sx + (elapsed * (dx/time));
            me.y = sy + (elapsed * (dy/time));
            me.draw();
            if(elapsed < time) requestAnimationFrame(animate);
        }
        requestAnimationFrame(animate);
    }
}

class Slot{
    constructor(parent){
        this.id = document.createElement('div');
        this.id.className = 'slot';
        parent.appendChild(this.id);
        let rect = this.id.getBoundingClientRect();
        this.x = rect.x;
        this.y = rect.y;
        this.width = rect.width;
        this.height = rect.height;
    }
}

let selected;

window.addEventListener('mousemove', e => {
    if(tc){
        console.log('work');
        let rect = tc.getBoundingClientRect();
        if(e.clientX < rect.x || e.clientY < rect.y || e.clientX > rect.x + rect.width || e.clientY > rect.y + rect.height){
            selected = undefined;
        }
        if(selected){
            selected.draw(e.clientX - rect.x, e.clientY - rect.y);
        }
    }
});