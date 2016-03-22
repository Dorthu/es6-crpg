import { THREE } from './Three'
import { get_material } from './texture_lookup'

class AnimatedSprite {
    constructor(sprite_name, manager) {
        ///TODO: look at texture.clone to avoid having to load the image again?
        let file = 'resources/'+ 'overlay' + '/' + sprite_name + '.png';
        this.loaded = false;
        console.log("loading file.."+file);
        let _this = this;
        this.tex = new THREE.TextureLoader().load(file, function() {
            console.log(_this.tex);
            _this.tex.magFilter = THREE.NearestFilter;
            _this.mat = new THREE.SpriteMaterial({map: _this.tex});
            _this.sprite = new THREE.Sprite(_this.mat)
            console.log(_this.sprite);

            ///do some analysis
            console.log(_this.tex);
            console.log(_this.tex.image);
            console.log(_this.tex.image.width);
            _this.frames = _this.tex.image.width / 64;
            if(!_this.tex.image.width % 64) {
                console.log("WARNING: Texture we are trying to animate is not an even number of frames somehow?"); 
            }
            _this.tex.wrapS = _this.tex.wrapT = THREE.RepeatWrapping;
            _this.tex.repeat.set(1/_this.frames, 1);

            console.log("I have "+_this.frames+" frames");
            _this.anim_rate = 300;

            _this.sprite.scale.set(manager.width, manager.height, 1);
            _this.sprite.position.set(0, 0, 1);
            manager.scene.add(_this.sprite);

            _this.loaded = true;
        });
    }

    tick(delta) {
        if(this.loaded) {
            this.tex.offset.x = Math.floor(delta/this.anim_rate) / this.frames;
            console.log("This is "+Math.floor(delta/this.anim_rate)+" and "+this.tex.offset.x);
        }
    }
}

export default AnimatedSprite;
