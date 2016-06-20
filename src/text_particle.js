import { THREE } from './Three'
import { get_material } from './texture_lookup'

class TextParticle {
    constructor(grid, text, color, pos, momentum={x:0,y:0,z:0}) {
        this.lifetime = 0;
        this.startDelta = -1;

        this.grid = grid;
        this.momentum = momentum;

        /*
            You can't render text in Three.js, but the recommended
            workaround is to render the text in another, 2D canvas
            and use that canvas as a texture for a sprite.
        */
        this.ele = document.createElement('canvas');
        this.ele.width = 64;
        this.ele.height = 64;

        let context = this.ele.getContext('2d');
        context.font = "Bold 32px Ariel";
        context.fillStyle = "#FF0000";
        context.textAlign="center";
        context.fillText(text, 32, 32);

        this.texture = new THREE.Texture(this.ele);
        this.texture.needsUpdate = true;

        this.mat = new THREE.SpriteMaterial({ map: this.texture });

        this.sprite = new THREE.Sprite(this.mat);
        this.sprite.scale.set(1,1, 1);
        this.sprite.position.set(pos.x, pos['y'] ? pos.y : 0, pos.z);

        this.grid.scene.add(this.sprite);
        this.grid.tickers.push(this);
    }

    destroy() {
        let i = this.grid.tickers.indexOf(this);
        ~i && this.grid.tickers.splice(i, 1);
        this.grid.scene.remove(this.sprite);
        this.mat.dispose();
        this.texture.dispose();
    }

    tick(delta) {
        if(this.startDelta==-1) { this.startDelta = delta; } 
        else { delta = delta - this.startDelta; }

        this.lifetime += delta;
        this.sprite.position.set(this.sprite.position.x + this.momentum.x / (.2 * delta),
                this.sprite.position.y + this.momentum.y / (.2 * delta),
                this.sprite.position.z + this.momentum.z / (.2 * delta));

        if(this.lifetime > 50000 && Math.random() < .15) {
            this.destroy();
        }
    }
}

export default TextParticle;
