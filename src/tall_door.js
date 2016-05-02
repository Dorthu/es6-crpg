import Door from './door'
import assign from 'object-assign'

class TallDoor extends Door {
    constructor(grid, loc, mats, desc, extra) {
        super(grid, loc, mats, desc, extra);

        for (let i=0; i<4; i++) {
            let m = this.meshes[i];
            m.scale.set(1, 2, 1);
            let pos = {};
            assign(pos, this.loc);
            pos.y += .5;
            pos = this.grid.translate(pos);

            m.position.y = pos.y;
        }
    }
}

export default TallDoor;
