import THREE from 'three'

class Wall {
    constructor(grid, loc, mat, geo) { 
        this.grid = grid;
        this.loc = loc;

        this.meshes = [ 
            new THREE.Mesh(geo, mat),
            new THREE.Mesh(geo, mat),
            new THREE.Mesh(geo, mat),
            new THREE.Mesh(geo, mat)
        ];

        for (let i=0; i<4; i++) {
            let m = this.meshes[i];

            m.position.x = loc.x;
            m.position.z = loc.z;
            let mod = 1;
            if (i > 1) { mod = -1; }
            if (i%2) { m.position.x += 3 * mod; m.rotation.y = Math.PI / 2;}
            else { m.position.z += 3 * mod; }

            this.grid.scene.add(m);
        }
    }
}

export default Wall;
