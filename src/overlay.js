import { THREE } from './Three'
import { get_material } from './texture_lookup'
import AnimatedSprite from './animated_sprite'
import TextParticle from './text_particle'

class Overlay {
    constructor(width, height) {
        /*
            The overlay is an orthographic scene that is rendered on top of the normal, 3D scene.
            It contains only sprites (ideally, only sprites from resources/overlaly) and is controlled
            by the player class (mostly)
        */
        this.width = width;
        this.height = height;
        this.scene = new THREE.Scene();
        this.cam = new THREE.OrthographicCamera( - width / 2, width / 2, height / 2, - height / 2, 1, 10 );
        this.cam.position.z = 10;
        this.objs = [];
    }

    add(sprite_mat, callback=null, extra=null) {
        let sprite = new AnimatedSprite(sprite_mat, this, false, callback, extra);
        this.objs.push(sprite);
    }

    add_text_particle(msg, color) {
        this.objs.push(new TextParticle(this, msg, color, {x: 300, z: 300}));
    }

    remove(sprite) {
        let i = this.objs.indexOf(sprite);
        ~i && this.objs.splice(i, 1);
    }

    tick(delta) {
        for(let o of this.objs) {
            if(o.tick) {
                o.tick(delta);
            }
        }
    }
}

export default Overlay;
