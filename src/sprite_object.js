import { THREE } from './Three'
import assign from 'object-assign'
import GridObject from './grid_object'
import { get_material } from './texture_lookup'

class SpriteObject extends GridObject {
    constructor(grid, loc, mats, desc, extra) {
        super(grid, loc, mats, desc, extra);

        this.useable = false;

        this.meshes = [ new THREE.Sprite(get_material(mats[0])) ];
        this.meshes[0].scale.set(6, 6, 1);
        let pos = {y: .45};
        assign(pos, this.loc);
        pos.y -= .5;
        pos = this.grid.translate(pos);

        this.meshes[0].position.x = pos.x;
        this.meshes[0].position.y = pos.y;
        this.meshes[0].position.z = pos.z;

        this.grid.scene.add(this.meshes[0]);
    }

}

export default SpriteObject;
