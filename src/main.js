require('../sass/main.scss');
import { THREE } from './Three'
import assign from 'object-assign'

import Player from './player'
import EditorPlayer from './editor/player'
import LevelLoader from './level_loader'
import Grid from './grid'
import Inventory from './inventory'
import EditorInventory from './editor/inventory'
import { init_textures } from './texture_lookup'
import { init_serializer } from './editor/level_serializer'
import { obj_map } from './level_loader'

const width = 600;
const height = 500;

const canvas = document.createElement('canvas')
canvas.width = width;
canvas.height = height;

document.getElementById("canvas_goes_here").appendChild(canvas);

const renderer = new THREE.WebGLRenderer(assign({
    canvas: canvas
}))

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( width, height );

init_textures();

const levels = {
    entry_hall: [
        [ , { type: 'wall', mats: ['brick_mat'] } ],
        [ {type: 'wall', mats: ['brick_mat']},
            { type: 'enclosed', mats: ['mat3', 'mat2'], desc: 'The floor is a different color.',
                extra: { object: { type: 'pickup', desc: "There's something here..", mats: ['sprite_mat'],
                    extra: { name: 'potion' } } }  },
            { type: 'wall', mats: ['brick_mat'] } ],
        [ {type: 'wall', mats: ['brick_mat']}, { type: 'enclosed', mats: ['floor_mat', 'mat2']  },
            { type: 'wall', mats: ['brick_mat'] } ],
        [ {type: 'wall', mats: ['brick_mat']}, { type: 'enclosed', mats: ['floor_mat', 'mat2'] },
            { type: 'wall', mats: ['brick_mat'] }, { type: 'wall', mats: ['brick_mat'] },
            { type: 'wall', mats: ['brick_mat'] } ],
        [ {type: 'wall', mats: ['brick_mat']}, { type: 'enclosed', mats: ['floor_mat', 'mat2'] },
            { type: 'enclosed', mats: ['floor_mat', 'mat2'] }, { type: 'enclosed', mats: ['floor_mat', 'mat2'] },
            { type: 'enclosed', mats: ['floor_mat', 'mat2'] },
            { type: 'door', mats: ['door_mat'], desc: "It's a real door!  Woohoo!",
                extra: { to: 'forest',
                player_pos: { x: 1, z: 4 }, player_facing: 0 } } ],
        [ , { type: 'wall', mats: ['brick_mat'] }, { type: 'wall', mats: ['brick_mat'] },
            { type: 'wall', mats: ['brick_mat'] }, { type: 'wall', mats: ['brick_mat'] },
            { type: 'wall', mats: ['brick_mat'] } ]
    ],
    small_room: [
        [ {type: 'wall', mats: ['mat2'] },{type: 'wall', mats: ['mat2'] },
            {type: 'wall', mats: ['mat2'] },{type: 'wall', mats: ['mat2'] },
            {type: 'wall', mats: ['mat2'] },{type: 'wall', mats: ['mat2'] } ],
        [ {type: 'wall', mats: ['mat2'] },{type: 'enclosed', mats: ['floor_mat', 'mat3'] },
            {type: 'enclosed', mats: ['floor_mat', 'mat3']  },
            {type: 'enclosed', mats: ['floor_mat', 'mat3']  },
            {type: 'enclosed', mats: ['floor_mat', 'mat3'] },{type: 'wall', mats: ['mat2'] } ],
        [ {type: 'wall', mats: ['mat2'] },{type: 'enclosed', mats: ['floor_mat', 'mat3'] },
            {type: 'enclosed', mats: ['floor_mat', 'mat3'],
                extra: { object: { type: 'npc', desc: 'An old tree', mats: ['tree_mat'],
                    extra: { dialog: [ 'I am only a tree', 'Why are you talking to a tree?',
                        'I had a bird in my branches yesterday..', 'It was most impolite',
                        'It pecked at my bark all day long.', 'But I could not stop it because..' ] } } } },
            {type: 'enclosed', mats: ['floor_mat', 'mat3'], extra: { object: { type: 'tall', mats: ['tall_mat'] } } },
            {type: 'enclosed', mats: ['floor_mat', 'mat3']  },
            {type: 'wall', mats: ['mat2'] } ],
        [ {type: 'wall', mats: ['mat2'] },{type: 'enclosed', mats: ['floor_mat', 'mat3'] },
            {type: 'wall', mats: ['treewall_mat'] },{type: 'wall', mats: ['treewall_mat'] },
            {type: 'enclosed', mats: ['floor_mat', 'mat3'] },{type: 'wall', mats: ['mat2'] } ],
        [ {type: 'wall', mats: ['mat2'] },{type: 'enclosed', mats: ['floor_mat', 'mat3'] },
            {type: 'enclosed', mats: ['floor_mat', 'mat3']  },
            {type: 'enclosed', mats: ['floor_mat', 'mat3']  },
            {type: 'enclosed', mats: ['floor_mat', 'mat3'] },{type: 'wall', mats: ['mat2'] } ],
        [ {type: 'wall', mats: ['mat2'] },
            {type: 'door', mats: ['door_mat'], desc: "It's also a door!  Woo!", extra: { to: 'entry_hall',
                player_pos: { x: 4, z: 4 }, player_facing: 1 } },
            {type: 'wall', mats: ['mat2'] },{type: 'wall', mats: ['mat2'] },
            {type: 'wall', mats: ['mat2'] },{type: 'wall', mats: ['mat2'] } ],
    ],
    save_test: [
        [ { type: 'wall', mats: ['mat2'] }, {type: 'space', mats: ['floor_mat'] },
            {type: 'wall', mats: ['mat2'] } ],
        [ { type: 'wall', mats: ['mat3'] } ],
        [ , { type: 'wall', mats: ['mat1'] } ]
    ],
    forest: [
        [ {"type":"wall","mats":["mat2"] }, {"type":"wall","mats":["treewall_mat",null] },
            {"type":"wall","mats":["treewall_mat",null] },
            {"type":"wall","mats":["treewall_mat",null] },
            {"type":"wall","mats":["treewall_mat",null] }, {"type":"wall","mats":["mat2"] } ],
        [ {"type":"wall","mats":["treewall_mat",null] },
            {"type":"space","mats":["floor_mat","mat3"] },
            {"type":"space","mats":["floor_mat","mat3"] },
            {"type":"space","mats":["floor_mat","mat3"] },
            {"type":"space","mats":["floor_mat","mat3"] },
            {"type":"wall","mats":["treewall_mat",null] } ],
        [ {"type":"wall","mats":["treewall_mat",null] },
            {"type":"space","mats":["floor_mat","mat3"]},
            {"type":"space","mats":["floor_mat","mat3"], extra: { object: { type: 'tall', mats: ['tall_mat'] } } },
            {"type":"space","mats":["floor_mat","mat3"], extra: { object: { type: 'tall', mats: ['tall_mat'] } } },
            {"type":"space","mats":["floor_mat","mat3"] },
            {"type":"wall","mats":["treewall_mat",null] } ],
        [ {"type":"wall","mats":["treewall_mat",null] },
            {"type":"space","mats":["floor_mat","mat3"] },
            {"type":"space","mats":["floor_mat","mat3"], extra: { object: { type: 'tall', mats: ['tall_mat'] } }  },
            {"type":"space","mats":["floor_mat","mat3"], extra: { object: { type: 'tall', mats: ['tall_mat'] } }  },
            {"type":"space","mats":["floor_mat","mat3"] },
            {"type":"wall","mats":["treewall_mat",null] } ],
        [ {"type":"wall","mats":["treewall_mat",null] },
            {"type":"space","mats":["floor_mat","mat3"] },
            {"type":"space","mats":["floor_mat","mat3"] },
            {"type":"space","mats":["floor_mat","mat3"], extra: { object: {
                    type: 'ai', mats: ['dog_mat'] } } },
            {"type":"space","mats":["floor_mat","mat3"] },
            {"type":"wall","mats":["treewall_mat",null] } ],
        [ {"type":"wall","mats":["mat2"] }, {"type":"door","mats":["door_mat"],
                extra: { to: 'entry_hall', player_pos: { x: 4, z: 4 }, player_facing: 1 } },
            {"type":"wall","mats":["treewall_mat",null] },
            {"type":"wall","mats":["treewall_mat",null] },
            {"type":"wall","mats":["treewall_mat",null] }, {"type":"wall","mats":["mat2"] } ]
    ],
    entry_hall_update: [[null,{"type":"wall","mats":["brick_mat"]}],
        [{"type":"wall","mats":["brick_mat"]},{"type":"space","mats":["mat3","mat2"]},{"type":"wall","mats":["brick_mat"]}],
        [{"type":"wall","mats":["brick_mat"]},{"type":"space","mats":["sidewalk_mat","mat2"]},{"type":"wall","mats":["brick_mat"]}],
        [{"type":"wall","mats":["brick_mat"]},{"type":"space","mats":["sidewalk_mat","mat2"]},{"type":"wall","mats":["brick_mat"]},{"type":"wall","mats":["brick_mat"]},{"type":"wall","mats":["brick_mat"]},null,null,null,{"type":"wall","mats":["brick_mat","mat2"]},{"type":"wall","mats":["brick_mat","mat2"]},
                {"type":"door","mats":["door_mat","mat2"], 
                    extra: { to: 'save_test', player_pos: { x: 1, z: 0 }, player_facing: 0 }}],
        [{"type":"wall","mats":["brick_mat"]},{"type":"space","mats":["sidewalk_mat","mat2"]},{"type":"space","mats":["sidewalk_mat","mat2"]},{"type":"space","mats":["sidewalk_mat","mat2"]},{"type":"space","mats":["sidewalk_mat","mat2"]},
                {"type":"door","mats":["door_mat"], desc: "I wonder where this goes..",
                    extra: { to: 'small_room', player_pos: { x: 1, z: 4 }, player_facing: 0 } },
                null,{"type":"wall","mats":["brick_mat","mat2"]},{"type":"space","mats":["sidewalk_mat","mat2"]},{"type":"space","mats":["sidewalk_mat","mat2"]},{"type":"space","mats":["sidewalk_mat","mat2"]},{"type":"wall","mats":["brick_mat","mat2"]}],
        [null,{"type":"wall","mats":["brick_mat"]},{"type":"space","mats":["sidewalk_mat","mat2"]},{"type":"wall","mats":["brick_mat"]},{"type":"wall","mats":["brick_mat"]},{"type":"wall","mats":["brick_mat"]},{"type":"wall","mats":["brick_mat","mat2"]},{"type":"wall","mats":["brick_mat","mat2"]},{"type":"space","mats":["sidewalk_mat","mat2"]},{"type":"wall","mats":["brick_mat","mat2"]},{"type":"space","mats":["sidewalk_mat","mat2"]},{"type":"wall","mats":["brick_mat","mat2"]}],
        [null,{"type":"wall","mats":["brick_mat","mat2"]},{"type":"space","mats":["sidewalk_mat","mat2"]},{"type":"space","mats":["sidewalk_mat","mat2"]},{"type":"space","mats":["sidewalk_mat","mat2"]},{"type":"space","mats":["sidewalk_mat","mat2"]},{"type":"space","mats":["sidewalk_mat","mat2"]},{"type":"space","mats":["sidewalk_mat","mat2"]},{"type":"space","mats":["sidewalk_mat","mat2"]},{"type":"space","mats":["sidewalk_mat","mat2"]},{"type":"space","mats":["sidewalk_mat","mat2"]},{"type":"wall","mats":["brick_mat","mat2"]}],
        [null,null,{"type":"wall","mats":["brick_mat","mat2"]},{"type":"wall","mats":["brick_mat","mat2"]},{"type":"wall","mats":["brick_mat","mat2"]},{"type":"wall","mats":["brick_mat","mat2"]},{"type":"wall","mats":["brick_mat","mat2"]},{"type":"wall","mats":["brick_mat","mat2"]},{"type":"wall","mats":["brick_mat","mat2"]},{"type":"wall","mats":["brick_mat","mat2"]},
            {"type":"space","mats":["mat3","mat2"], extra: { object: { type: 'solid',
                mats: ['plant_mat'], desc: 'What a lovely plant!' } } },
            {"type":"wall","mats":["brick_mat","mat2"]}],
        [null,null,null,null,null,null,null,null,null,null,{"type":"wall","mats":["brick_mat","mat2"]}]
    ]
};

let grid= null;
let player = null;
let light = null;

let inventory = new Inventory();

let player_class = Player;
const editor_mode = window.location.href.indexOf('editor') > -1;
if(editor_mode) {
    inventory = new EditorInventory();
    init_serializer(obj_map);
    player_class = EditorPlayer;
}

///tmp for testing
const skygeo = new THREE.CubeGeometry(500, 500, 500);
const skymat = new THREE.MeshBasicMaterial({color: 0x9898ED, side: THREE.BackSide });
let skybox = null;

const switch_level = function(info) {
    if(player) player.destroy();
    player = null;
    if(grid) {
        grid.scene = null;
        grid = null;
    }
    light = null;
    skybox = null;

    grid = new LevelLoader().load_level(levels[info.to]);
    player = new player_class(grid, info.player_pos, inventory, info.player_facing);
    light = new THREE.AmbientLight( 0xA9BEA9 );
    grid.scene.add( light );
    skybox = new THREE.Mesh(skygeo, skymat);
    grid.scene.add(skybox);

    grid.set_scene_change_callback(switch_level);
};

switch_level({ to: 'entry_hall_update', player_pos: { x: 1, z: 2 }, player_facing: 2 });

function render() {
    requestAnimationFrame( render );
    renderer.render( grid.scene, player.camera );
}
render();
