import { THREE } from './Three'

class TextParticle {
    constructor(overlay, text, color, pos) {
        this.lifetime = 0;
        this.startDelta = -1;

        this.overlay = overlay;

        /*
            You can't render text in Three.js, but the recommended
            workaround is to render the text in another, 2D canvas
            and use that canvas as a texture for a sprite.
        */
        this.ele = document.createElement('canvas');
        let context = this.ele.getContext('2d');
        context.font = "Bold 22px Ariel";
        context.fillStyle = "#FF0000";
        context.fillText(text, 0, 22);
        this.texture = new THREE.Texture(this.ele);
        this.texture.needsUpdate = true;
        this.mat = new THREE.SpriteMaterial({ map: this.texture });
        this.sprite = new THREE.Sprite(this.mat);
        this.sprite.scale.set(overlay.width, overlay.height, 1);
        this.sprite.position.set(0, 0, 1);

        this.overlay.scene.add(this.sprite);
    }

    destroy() {
        this.overlay.remove(this);
        this.overlay.scene.remove(this.sprite);
        this.mat.dispose();
        this.texture.dispose();
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
