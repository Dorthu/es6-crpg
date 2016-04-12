import SpriteObject from './sprite_object'
import assign from 'object-assign'

class TallSprite extends SpriteObject {
    constructor(grid, loc, mats, desc, extra) {
        super(grid, loc, mats, desc, extra);

        this.meshes[0].scale.set(6, 12, 1);
        let pos = {};
        assign(pos, this.loc);
        pos.y += .5;
        pos = this.grid.translate(pos);

        this.meshes[0].position.y = pos.y;

        if(extra) {
            if(extra['solid']) {
                this.solid = true;
            }
        }
    }
}

export default TallSprite;
