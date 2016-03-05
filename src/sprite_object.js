import { THREE } from './Three'
import assign from 'object-assign'
import GridObject from './grid_object'
import { get_material } from './texture_lookup'

class SpriteObject extends GridObject {
    constructor(grid, loc, mats, desc, extra) {
        super(grid, loc, mats, desc, extra);

        ///this isn't being called - TODO
        console.log("made a sprite object");
        console.log(loc);
        console.log(mats);
        this.meshes = [ new THREE.Sprite(get_material(mats[0])) ];
        this.meshes[0].scale.set(2, 2, 1);
        let pos = {y: .16};
        assign(pos, this.loc);
        pos.y -= .5;
        pos = this.grid.translate(pos);

        this.meshes[0].position.x = pos.x;
        this.meshes[0].position.y = pos.y;
        this.meshes[0].position.z = pos.z;
        console.log(this.meshes[0]);
        this.grid.scene.add(this.meshes[0]);
    }

}

export default SpriteObject;
