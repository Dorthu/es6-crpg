import { THREE, geo } from './Three'
import assign from 'object-assign'
import SolidObject from './solid'
import { get_material } from './texture_lookup'

class Wall extends SolidObject {
    constructor(grid, loc, mats, desc, extra) {
        super(grid, loc, mats, desc, extra);

        let m = get_material(mats[0]);
        this.meshes = [
            new THREE.Mesh(geo, m),
            new THREE.Mesh(geo, m),
            new THREE.Mesh(geo, m),
            new THREE.Mesh(geo, m)
        ];

        for (let i=0; i<4; i++) {
            let m = this.meshes[i];
            let c = {};
            assign(c, this.loc);

            let mod = 1;
            if (i > 1) { mod = -1; }
            if (i%2) { c.x += .5 * mod; m.rotation.y = Math.PI / 2;}
            else { c.z += .5 * mod; }

            c = this.grid.translate(c);
            m.position.x = c.x;
            m.position.z = c.z;

            this.grid.scene.add(m);
        }
    }
}

export default Wall;
