import { THREE } from './Three'

export let mat_map = null;

function load_texture(file) {
    let t = new THREE.TextureLoader().load(file);
    t.magFilter = THREE.NearestFilter;
    return t;
}

export function init_textures() {
    /*
        TODO: make this work on a webpack meta-function that dumps the contents of
        resources/textures and resources/sprites into a dict for further processing
    */
    const texture = load_texture('resources/textures/debug.png');
    const walltex = load_texture('resources/textures/debug-2.png');
    const doortex = load_texture('resources/textures/debug-door.png');
    const itemtex = load_texture('resources/textures/itemsm.png');
    const solidobjtex = load_texture('resources/textures/solidobj.png');
    const treewalltex = load_texture('resources/textures/treewall.png');
    const dogtex = load_texture('resources/textures/dog.png');
    const dudetex = load_texture('resources/textures/dude.png');
    const revolvertex = load_texture('resources/textures/revolver.png');
    const talltex = load_texture('resources/textures/tall.png');
    const bricktex = load_texture('resources/textures/brickwall.png');
    const pavementtex = load_texture('resources/textures/pavement.png');
    const skytex = load_texture('resources/textures/sky.png');
    const sidewalktex = load_texture('resources/textures/sidewalk.png');
    const sidewalktex2 = load_texture('resources/textures/sidewalk-2.png');
    const planttex = load_texture('resources/textures/plant.png');

    mat_map = {
        mat1: new THREE.MeshLambertMaterial({color: 0xffff00, side: THREE.DoubleSide }),
        mat2: new THREE.MeshLambertMaterial({color: 0xff00ff, side: THREE.DoubleSide }),
        mat3: new THREE.MeshLambertMaterial({color: 0xff0000, side: THREE.DoubleSide }),
        floor_mat: new THREE.MeshLambertMaterial({map: texture, side: THREE.DoubleSide}),
        wall_mat: new THREE.MeshLambertMaterial({map: walltex, side: THREE.DoubleSide}),
        door_mat: new THREE.MeshLambertMaterial({map: doortex, side: THREE.DoubleSide}),
        sprite_mat: new THREE.SpriteMaterial({map: itemtex, side: THREE.DoubleSide}),
        tree_mat: new THREE.SpriteMaterial({map: solidobjtex, side:THREE.SingleSide}),
        treewall_mat: new THREE.MeshLambertMaterial({map: treewalltex, side: THREE.DoubleSide, transparent: true}),
        dog_mat: new THREE.SpriteMaterial({map: dogtex, side:THREE.SingleSide}),
        dude_mat: new THREE.SpriteMaterial({map: dudetex, side:THREE.SingleSide}),
        revolver: new THREE.SpriteMaterial({map: revolvertex, side:THREE.SingleSide}),
        tall_mat: new THREE.SpriteMaterial({map: talltex, side:THREE.SingleSide}),
        plant_mat: new THREE.SpriteMaterial({map: planttex, side:THREE.SingleSide}),
        brick_mat: new THREE.MeshLambertMaterial({map: bricktex, side: THREE.DoubleSide}),
        pavement_mat: new THREE.MeshLambertMaterial({map: pavementtex, side: THREE.DoubleSide}),
        sky_mat: new THREE.MeshBasicMaterial({map: skytex, side: THREE.BackSide}),
        sidewalk_mat: [
            new THREE.MeshLambertMaterial({map: sidewalktex, side: THREE.DoubleSide}),
            new THREE.MeshLambertMaterial({map: sidewalktex2, side: THREE.DoubleSide}),
        ]
    };
};

export function get_material(name, pos={x: 0, z: 0}) {
    let m = mat_map[name];
    if(Array.isArray(m)) {
        let i = pos.x + pos.z;
        console.log("pos is "+pos.x + ", "+pos.z);
        i = i % m.length;
        m = m[i];
        console.log("it was an array..returning index "+i);
    }
    return m;
};
