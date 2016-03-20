import { THREE } from './Three'

export let mat_map = null;

function load_texture(file) {
    let t = new THREE.TextureLoader().load(file);
    t.magFilter = THREE.NearestFilter;
    return t;
}

function make_material(texture, type) {
    if(type == 'sprites') {
        return new THREE.SpriteMaterial({map: texture, side: THREE.SingleSide});
    } else if(type == 'doublesided') {
        return  new THREE.MeshLambertMaterial({map: texture, side: THREE.DoubleSide, transparent: true});
    } else if(type == 'skybox') {
        return new THREE.MeshBasicMaterial({map: texture, side: THREE.BackSide});
    } else {
        return new THREE.MeshLambertMaterial({map: texture, side: THREE.SingleSide});
    }
}

const resources = require('./loaders/directory_loader!./empty');

export function init_textures() {
    console.log(resources);
    mat_map={};
    for(let cdir of Object.keys(resources)) {
        console.log("looking at "+cdir);
        console.log(resources[cdir]);
        for(let cimg of resources[cdir]) {
            let ikey = cimg.substring(0, cimg.length-4); //lop off extension
            let tex = load_texture('resources/'+cdir+'/'+cimg);
            mat_map[ikey] = make_material(tex, cdir);
        }
    }
    console.log(mat_map);
}

export function init_textures_old() {
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
    const grasstex = load_texture('resources/textures/grass.png');
    const pavementtex = load_texture('resources/textures/pavement.png');
    const skytex = load_texture('resources/textures/sky.png');
    const sidewalktex = load_texture('resources/textures/sidewalk.png');
    const sidewalktex2 = load_texture('resources/textures/sidewalk-2.png');
    const planttex = load_texture('resources/textures/plant.png');

    mat_map = {
        mat1: new THREE.MeshLambertMaterial({color: 0xffff00, side: THREE.SingleSide }),
        mat2: new THREE.MeshLambertMaterial({color: 0xff00ff, side: THREE.SingleSide }),
        mat3: new THREE.MeshLambertMaterial({color: 0xff0000, side: THREE.SingleSide }),
        floor_mat: new THREE.MeshLambertMaterial({map: texture, side: THREE.SingleSide}),
        wall_mat: new THREE.MeshLambertMaterial({map: walltex, side: THREE.SingleSide}),
        door_mat: new THREE.MeshLambertMaterial({map: doortex, side: THREE.SingleSide}),
        sprite_mat: new THREE.SpriteMaterial({map: itemtex, side: THREE.SingleSide}),
        tree_mat: new THREE.SpriteMaterial({map: solidobjtex, side:THREE.SingleSide}),
        treewall_mat: new THREE.MeshLambertMaterial({map: treewalltex, side: THREE.DoubleSide, transparent: true}),
        dog_mat: new THREE.SpriteMaterial({map: dogtex, side:THREE.SingleSide}),
        dude_mat: new THREE.SpriteMaterial({map: dudetex, side:THREE.SingleSide}),
        revolver: new THREE.SpriteMaterial({map: revolvertex, side:THREE.SingleSide}),
        tall_mat: new THREE.SpriteMaterial({map: talltex, side:THREE.SingleSide}),
        plant_mat: new THREE.SpriteMaterial({map: planttex, side:THREE.SingleSide}),
        brick_mat: new THREE.MeshLambertMaterial({map: bricktex, side: THREE.SingleSide}),
        grass_mat: new THREE.MeshLambertMaterial({map: grasstex, side: THREE.SingleSide}),
        pavement_mat: new THREE.MeshLambertMaterial({map: pavementtex, side: THREE.SingleSide}),
        sky_mat: new THREE.MeshBasicMaterial({map: skytex, side: THREE.BackSide}),
        sidewalk_mat: [
            new THREE.MeshLambertMaterial({map: sidewalktex, side: THREE.SingleSide}),
            new THREE.MeshLambertMaterial({map: sidewalktex2, side: THREE.SingleSide}),
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
