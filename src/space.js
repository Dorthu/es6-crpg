import THREE from './Three'
import assign from 'object-assign'
import GridObject from './grid_object'

class Space extends GridObject {
    constructor(grid, loc, mat, geo, desc) {
        super();
        this.grid = grid;
        this.loc = loc;
        this.desc = desc;

        this.meshes = [ new THREE.Mesh(geo, mat) ];

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
