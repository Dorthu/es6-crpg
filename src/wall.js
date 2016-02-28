import THREE from './Three'
import assign from 'object-assign'
import SolidObject from './solid'

class Wall extends SolidObject {
    constructor(grid, loc, mat, geo, desc) {
        super();

        this.grid = grid;
        this.loc = loc;
        this.desc = desc;

        this.meshes = [
            new THREE.Mesh(geo, mat),
            new THREE.Mesh(geo, mat),
            new THREE.Mesh(geo, mat),
            new THREE.Mesh(geo, mat)
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

            this.grid.eventManager.subscribe('player_moved', function(e) {
                console.log("got player moved!");
                console.log(e);
            });
        }
    }
}

export default Wall;
