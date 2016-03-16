import { THREE, geo } from './Three'
import assign from 'object-assign'
import GridObject from './grid_object'
import SpriteObject from './sprite_object'
import { get_material } from './texture_lookup'
import Pickup from './pickup'
import { obj_map } from './level_loader'

class Space extends GridObject {
    constructor(grid, loc, mats, desc, extra) {
        super(grid, loc, mats, desc, extra);

        this.meshes = [ new THREE.Mesh(geo, get_material(mats[0], pos=this.loc)) ];
        this.object = null;

        if(extra && extra['object']) { 
            this.object = new obj_map[this.extra.object.type](this.grid, this.loc,
                extra.object['mats'], extra.object['desc'], 
                extra.object['extra']);
        }

        let pos = {y: 0};
        assign(pos, this.loc);
        pos.y -= .5;
        pos = this.grid.translate(pos);

        this.meshes[0].position.x = pos.x;
        this.meshes[0].position.y = pos.y;
        this.meshes[0].position.z = pos.z;
        this.meshes[0].rotation.x = Math.PI / -2;

        this.grid.scene.add(this.meshes[0]);
    }

    destroy() {
        if(this.object) { this.object.destroy(); }
        super.destroy();
    }
}

export default Space;
