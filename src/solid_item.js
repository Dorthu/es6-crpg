import SpriteObject from './sprite_object'

class SolidItem extends SpriteObject {
    constructor(grid, loc, mats, desc, extra) {
        super(grid, loc, mats, desc, extra);
        
        this.solid = true;
    }
}

export default SolidItem;
