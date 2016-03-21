import { THREE } from './Three'
import { get_material } from './texture_lookup'

class AnimatedSprite {
    constructor(sprite_mat) {
        ////// TODO:
        ////// LOOKS LIKE THIS DON'T WORK FOR MATERIALS - NEEDS TO
        ////// LOAD THE TEXTURE RIGHT HERE UNFORTUNATELY 
        this.mat = get_material(sprite_mat);
        this.sprite = new THREE.Sprite(this.mat)
        console.log(this.sprite);
        console.log(sprite_mat);

        ///do some analysis
        this.tex = this.mat.map;
        console.log(this.tex);
        console.log(this.mat);
        this.frames = this.tex.width / 64;
        if(!this.tex.width % 64) {
            console.log("WARNING: Texture we are trying to animate is not an even number of frames somehow?"); 
        }
        this.tex.wrapS = this.tex.wrapT = THREE.RepeatWrapping;
        this.tex.repeat.set(this.frames, 1);


        console.log("I have "+this.frames+" frames");
        this.anim_rate = 3000;
    }

    tick(delta) {
       // console.log("ticking with a delta of "+delta);
       // console.log("my fame is "+ ((delta % this.anim_rate)));
        //this.tex.offset.x = 0;//(delta % this.anim_rate) * 64;
    }
}

export default AnimatedSprite;
