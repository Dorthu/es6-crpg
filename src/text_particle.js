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
        let tval = this.ele.style.top;
        tval = tval.substring(0, tval.length-2);
        tval = parseInt(tval);
        this.ele.style.top = (tval + delta/500) + "px";

        if(this.lifetime > 50000 && Math.random() < .15) {
            this.destroy();
        }
    }
}

export default TextParticle;
