import { THREE } from './Three'

let mat_map = null;

function load_texture(file) {
    let t = new THREE.TextureLoader().load(file);
    t.magFilter = THREE.NearestFilter;
    return t;
}

export function init_textures() {
    const texture = load_texture('resources/textures/debug.png');
    const walltex = load_texture('resources/textures/debug-2.png');
    const doortex = load_texture('resources/textures/debug-door.png');
    const itemtex = load_texture('resources/textures/itemsm.png');
    const solidobjtex = load_texture('resources/textures/solidobj.png');
    texture.magFilter = THREE.NearestFilter;
    doortex.magFilter = THREE.NearestFilter;
    itemtex.magFilter = THREE.NearestFilter;
    solidobjtex.magFilter = THREE.NearestFilter;
    walltex.magFilter = THREE.NearestFilter;

    mat_map = {
        mat1: new THREE.MeshLambertMaterial({color: 0xffff00, side: THREE.DoubleSide }),
        mat2: new THREE.MeshLambertMaterial({color: 0xff00ff, side: THREE.DoubleSide }),
        mat3: new THREE.MeshLambertMaterial({color: 0xff0000, side: THREE.DoubleSide }),
        floor_mat: new THREE.MeshLambertMaterial({map: texture, side: THREE.DoubleSide}),
        wall_mat: new THREE.MeshLambertMaterial({map: walltex, side: THREE.DoubleSide}),
        door_mat: new THREE.MeshLambertMaterial({map: doortex, side: THREE.DoubleSide}),
        sprite_mat: new THREE.SpriteMaterial({map: itemtex, side: THREE.DoubleSide}),
        tree_mat: new THREE.SpriteMaterial({map: solidobjtex, side:THREE.SingleSide})
    };
};

export function get_material(name) {
    return mat_map[name];
};

