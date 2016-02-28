import THREE from './Three'

import Grid from './grid'
import Wall from './wall'
import Space from './space'
import CeilingSpace from './ceiling_space'

const obj_map = {
    'space':    Space,
    'wall':     Wall,
    'enclosed': CeilingSpace
}

const geo = new THREE.PlaneGeometry(6,6);
const texture = new THREE.ImageUtils.loadTexture('resources/textures/debug.png');
const walltex = new THREE.TextureLoader().load('resources/textures/debug-2.png');
const doortex = new THREE.TextureLoader().load('resources/textures/debug-door.png');

const mat_map = {

    mat1: new THREE.MeshLambertMaterial({color: 0xffff00, side: THREE.DoubleSide }),
    mat2: new THREE.MeshLambertMaterial({color: 0xff00ff, side: THREE.DoubleSide }),
    mat3: new THREE.MeshLambertMaterial({color: 0xff0000, side: THREE.DoubleSide }),
    floor_mat: new THREE.MeshLambertMaterial({map: texture, side: THREE.DoubleSide}),
    wall_mat: new THREE.MeshLambertMaterial({map: walltex, side: THREE.DoubleSide}),
    door_mat: new THREE.MeshLambertMaterial({map: doortex, side: THREE.DoubleSide})
}

class LevelLoader {
    constructor() {
        //pass
    }

    load_level(data) {
        let grid = new Grid();

        for(let i=0; i<data.length; i++) {
            let curr = data[i];
            for(let j=0; j<curr.length; j++) {
                let cur = curr[j];
                if(cur) {
                    grid.create(obj_map[cur.type], { x: j, z: i }, [ mat_map[cur.mat], geo ]);
                }
            }
        }

        return grid;
    }
}

export default LevelLoader;
