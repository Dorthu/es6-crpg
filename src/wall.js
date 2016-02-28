import { THREE, geo } from './Three'
import assign from 'object-assign'
import SolidObject from './solid'

class Wall extends SolidObject {
    constructor(grid, loc, mats, desc, extra) {
        super(grid, loc, mats, desc, extra);

        this.meshes = [
            new THREE.Mesh(geo, mats[0]),
            new THREE.Mesh(geo, mats[0]),
            new THREE.Mesh(geo, mats[0]),
            new THREE.Mesh(geo, mats[0])
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
