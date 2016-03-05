import { THREE, geo } from './Three'
import assign from 'object-assign'
import GridObject from './grid_object'
import SpriteObject from './sprite_object'
import { get_material } from './texture_lookup'

class Space extends GridObject {
    constructor(grid, loc, mats, desc, extra) {
        super(grid, loc, mats, desc, extra);

        this.meshes = [ new THREE.Mesh(geo, get_material(mats[0])) ];
        this.object = null;

        if(extra && extra['object']) { 
            this.object = new SpriteObject(this.grid, this.loc, extra.object['mats'], extra.object['desc']);
            console.log(this.object);
        }

        let pos = {y: 0};
        assign(pos, this.loc);
        pos.y -= .5;
        pos = this.grid.translate(pos);

        this.meshes[0].position.x = pos.x;
        this.meshes[0].position.y = pos.y;
        this.meshes[0].position.z = pos.z;
        this.meshes[0].rotation.x = Math.PI / 2;

        this.grid.scene.add(this.meshes[0]);
    }
}

export default Space;
