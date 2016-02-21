import THREE from 'three'

class Space {
    constructor(grid, loc, mat, geo) {
        this.grid = grid;
        this.loc = loc;

        this.meshes = [ new THREE.Mesh(geo, mat) ];

        this.meshes[0].position.x = loc.x;
        this.meshes[0].position.y -= 3;
        this.meshes[0].position.z = loc.z;
        this.meshes[0].rotation.x = Math.PI / 2;
        
        this.grid.scene.add(this.meshes[0]);
    }
}

export default Space;
