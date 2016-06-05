import { THREE, geo } from './Three'
import assign from 'object-assign'
import GridObject from './grid_object'
import SpriteObject from './sprite_object'
import { get_material } from './texture_lookup'
import Pickup from './pickup'

class Space extends GridObject {
    constructor(grid, loc, mats, desc, extra) {
        super(grid, loc, mats, desc, extra);

        this.meshes = [ new THREE.Mesh(geo, get_material(mats[0], pos=this.loc)) ];

        let pos = {y: 0};
        assign(pos, this.loc);
        pos.y -= .5;
        pos = this.grid.translate(pos);

        this.meshes[0].position.x = pos.x;
        this.meshes[0].position.y = pos.y;
        this.meshes[0].position.z = pos.z;
        this.meshes[0].rotation.x = Math.PI / -2;

        this.grid.scene.add(this.meshes[0]);

        if(mats.length > 0 && mats[1]) {
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

    destroy() {
        super.destroy();
    }
}

export default Space;
