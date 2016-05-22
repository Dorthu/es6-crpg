import { THREE } from './Three'
import { get_material } from './texture_lookup'
import AnimatedSprite from './animated_sprite'
import TextParticle from './text_particle'
import DialogController from './game/dialog_controller'

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
        this.dialog_controller = null;
    }

    blocking() {
        if(this.dialog_controller) {
            return this.dialog_controller;
        }
        return false;
    }

    add(sprite_mat, callback=null, extra=null) {
        let sprite = new AnimatedSprite(sprite_mat, this, false, callback, extra);
        this.objs.push(sprite);
    }

    add_text_particle(msg, color) {
        this.objs.push(new TextParticle(this, msg, color, {x: 300, z: 300}));
    }

    add_dialog(dialog) {
        if(this.dialog_controller) return false;
        this.dialog_controller = new DialogController(this, dialog);
        return true;
    }

    remove(sprite) {
        let i = this.objs.indexOf(sprite);
        ~i && this.objs.splice(i, 1);
    }

    remove_dialog() {
        this.dialog_controller = null;
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
