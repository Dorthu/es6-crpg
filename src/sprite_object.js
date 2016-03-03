import { THREE, geo } from './Three'
import assign from 'object-assign'
import GridObject from './grid_object'

class SpriteObject extends GridObject {
    constructor(grid, loc, mats, desc, extra) {
        super(grid, loc, mats, desc, extra);

        ///this isn't being called - TODO
        console.log("made a sprite object");
        console.log(loc);
        console.log(mats);
        this.meshes[0] = new THREE.Sprite(mats[0]);
        let pos = {y: 0};
        assign(pos, this.loc);
        pos.y -= .5;
        pos = this.grid.translate(pos);

        this.meshes[0].position.x = pos.x;
        this.meshes[0].position.y = pos.y;
        this.meshes[0].position.z = pos.z;
        this.grid.scene.add(this.meshes[0]);
    }

}

export default GridObject;
