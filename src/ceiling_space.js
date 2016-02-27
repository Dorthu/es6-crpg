import THREE from './Three'
import assign from 'object-assign'
import Space from './space'

class CeilingSpace extends Space {
    constructor(grid, loc, mat, geo, cmat) { 
        super(grid, loc, mat, geo);

        let pos = {};
        assign(pos, this.loc);
        pos.y += .5;
        pos = this.grid.translate(pos);

        this.meshes[1] = new THREE.Mesh(geo, cmat);
        this.meshes[1].position.x = pos.x;
        this.meshes[1].position.y = pos.y;
        this.meshes[1].position.z = pos.z;
        this.meshes[1].rotation.x = Math.PI / 2;
        
        this.grid.scene.add(this.meshes[1]);
    }
}

export default CeilingSpace;
