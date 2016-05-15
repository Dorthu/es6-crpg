class TextParticle {
    constructor(overlay, text, color, pos) {
        this.lifetime = 0;
        this.startDelta = -1;

        this.overlay = overlay;
        this.ele = document.createElement('span');
        this.ele.className='text-particle';
        this.ele.style.color = color;
        this.ele.textContent = text;
        this.parentNode = document.getElementById('canvas_goes_here');
        ///obvious TODO
        this.ele.style.top = pos.z;
        this.ele.style.left = pos.x;

        this.parentNode.appendChild(this.ele);
    }

    destroy() {
        this.overlay.remove(this);
        this.parentNode.removeChild(this.ele);
    }

    tick(delta) {

        if(this.startDelta==-1) { this.startDelta = delta; } 
        else { delta = delta - this.startDelta; }

        this.lifetime += delta;
        this.ele.style.top = this.ele.style.top + 5*delta;

        if(this.lifetime > 5000 && Math.random() < .15) {
            this.destroy();
        }
    }
}

export default TextParticle;
