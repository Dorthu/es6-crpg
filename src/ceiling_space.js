import { THREE, geo } from './Three'
import assign from 'object-assign'
import Space from './space'
import { get_material } from './texture_lookup'

class CeilingSpace extends Space {
    constructor(grid, loc, mats, desc, extra) {
        super(grid, loc, mats, desc, extra);

        let pos = {y: 0};
        assign(pos, this.loc);
        pos.y += .5;
        pos = this.grid.translate(pos);

        this.meshes[1] = new THREE.Mesh(geo, get_material(mats[1]));
        this.meshes[1].position.x = pos.x;
        this.meshes[1].position.y = pos.y;
        this.meshes[1].position.z = pos.z;
        this.meshes[1].rotation.x = Math.PI / 2;

        this.grid.scene.add(this.meshes[1]);
    }
}

export default CeilingSpace;
