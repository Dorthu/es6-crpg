import { THREE } from './Three'
import { get_material } from './texture_lookup'
import AnimatedSprite from './animated_sprite'

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

    add(sprite_mat) {
        let sprite = new AnimatedSprite(sprite_mat);
        sprite.sprite.scale.set(this.width, this.height, 1);
        sprite.sprite.position.set(0, 0, 1);
        this.scene.add(sprite.sprite);
        this.objs.push(sprite);
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
