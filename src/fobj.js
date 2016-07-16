import { THREE, geo } from './Three'
import assign from 'object-assign'
import SolidObject from './solid'
import { get_material } from './texture_lookup'

class FlatObject extends SolidObject {
    constructor(grid, loc, mats, desc, extra) {
        super(grid, loc, mats, desc, extra);
    
        let m = get_material(mats[0]);
        this.grid.scene.add(m);
        this.meshes = [
            new THREE.Mesh(geo, m)
        ];

        let c = {};
        assign(c, this.loc);
        c = this.grid.translate(c);
        this.meshes[0].position.x = c.x;
        this.meshes[0].position.z = c.z;

        if(this.extra && this.extra.zways) {
            this.meshes[0].rotation.y = Math.PI / 2;
        }

        this.grid.scene.add(this.meshes[0]);
    }

    static occupies() { return true; }
}

export default FlatObject;
