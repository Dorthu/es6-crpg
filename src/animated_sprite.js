import { THREE } from './Three'
import { get_material } from './texture_lookup'

class AnimatedSprite {
    constructor(sprite_name, manager, loop=false, complete_callback=null) {
        ///TODO: look at texture.clone to avoid having to load the image again?
        let file = 'resources/'+ 'overlay' + '/' + sprite_name + '.png';
        this.loaded = false;
        this.manager = manager;
        this.idelta = -1;
        this.loop = loop;
        this.on_complete_callback = complete_callback;
        let _this = this;
        this.tex = new THREE.TextureLoader().load(file, function() {
            _this.tex.magFilter = THREE.NearestFilter;
            _this.tex.offset.x = 0;
            _this.mat = new THREE.SpriteMaterial({map: _this.tex});
            _this.sprite = new THREE.Sprite(_this.mat)

            ///do some analysis
            _this.frames = _this.tex.image.width / 64;
            if(!_this.tex.image.width % 64) {
                console.log("WARNING: Texture we are trying to animate is not an even number of frames somehow?");
            }
            _this.tex.wrapS = _this.tex.wrapT = THREE.RepeatWrapping;
            _this.tex.repeat.set(1/_this.frames, 1);

            _this.anim_rate = 60; //is a more sane value, but 400 really shows off the below issue

            _this.sprite.scale.set(manager.width, manager.height, 1);
            _this.sprite.position.set(0, 0, 1);
            manager.scene.add(_this.sprite);

            _this.loaded = true;
        });
    }

    tick(delta) {
        if(this.loaded) {
            ///initial update delta/fix delta
            if(this.idelta == -1) { this.idelta = delta; delta=0; }
            else { delta = delta - this.idelta; }
            /// TODO:
            ///as textures offsets become less precise, the texture gets blurrier.
            ///this is an issue with floating point numbers I think, and that texture
            ///offsets are from 0.0-1.0.  Not sure how to fix now, but come back to it later.
            ///UPDATE:
            ///with more thinking on this, the solution might just be to make sure that
            ///the number of frames rounds out to a nice offset (4 frames is .25 per frame, etc)
            ///UPDATE:
            ///making it 5 frames didn't appear to slove the problem..lame
            let new_offset = Math.floor(delta/this.anim_rate) / this.frames;
            if(new_offset >= 1) { ///animation completed
                new_offset = 0;
                if(!this.loop) {
                    if(this.on_complete_callback) {
                        this.on_complete_callback();
                    }
                    this.manager.scene.remove(this.sprite);
                    this.manager.remove(this);
                }
            }
            this.tex.offset.x = new_offset;
        }
    }
}

export default AnimatedSprite;
