require('../sass/main.scss');
import { THREE } from './Three'
import assign from 'object-assign'

import Player from './player'
import EditorPlayer from './editor/player'
import LevelLoader from './level_loader'
import Grid from './grid'
import Inventory from './game/inventory'
import EditorInventory from './editor/inventory'
import Overlay from './overlay'
import { init_textures, get_material } from './texture_lookup'
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
renderer.autoClear=false;

init_textures();

const levels = {
    entry_hall: [
        [ , { type: 'wall', mats: ['wallpaper'] } ],
        [ {type: 'wall', mats: ['wallpaper']},
            { type: 'enclosed', mats: ['woodfloor_rug','pavement'], desc: 'The floor is a different color.',
                extra: { object: { type: 'pickup', desc: "There's something here..", mats: ['key'],
                    extra: { name: 'Key' } } }  },
            { type: 'wall', mats: ['wallpaper'] } ],
        [ {type: 'wall', mats: ['wallpaper']}, { type: 'enclosed', mats: ['woodfloor','pavement', 'debug-2']  },
            { type: 'wall', mats: ['wallpaper'] } ],
        [ {type: 'wall', mats: ['wallpaper']}, { type: 'enclosed', mats: ['woodfloor','pavement', 'debug-2'] },
            { type: 'wall', mats: ['wallpaper'] }, { type: 'wall', mats: ['wallpaper'] },
            { type: 'wall', mats: ['wallpaper'] } ],
        [ {type: 'wall', mats: ['wallpaper']}, { type: 'enclosed', mats: ['woodfloor','pavement', 'debug-2'] },
            { type: 'enclosed', mats: ['woodfloor','pavement', 'debug-2'] }, { type: 'enclosed', mats: ['woodfloor','pavement', 'debug-2'] },
            { type: 'enclosed', mats: ['woodfloor','pavement', 'debug-2'] },
            { type: 'locked', mats: ['wallpaper_door', 'wallpaper_door'], desc: "It's a locked door..",
                extra: { to: 'forest',
                player_pos: { x: 1, z: 4 }, player_facing: 0, key: 'Key' } } ],
        [ , { type: 'wall', mats: ['wallpaper'] }, { type: 'wall', mats: ['wallpaper'] },
            { type: 'wall', mats: ['wallpaper'] }, { type: 'wall', mats: ['wallpaper'] },
            { type: 'wall', mats: ['wallpaper'] } ]
    ],
    small_room: [
        [ {type: 'wall', mats: ['debug-2'] },{type: 'wall', mats: ['debug-2'] },
            {type: 'wall', mats: ['debug-2'] },{type: 'wall', mats: ['debug-2'] },
            {type: 'wall', mats: ['debug-2'] },{type: 'wall', mats: ['debug-2'] } ],
        [ {type: 'wall', mats: ['debug-2'] },{type: 'enclosed', mats: ['debug', 'debug-2'] },
            {type: 'enclosed', mats: ['debug', 'debug-2']  },
            {type: 'enclosed', mats: ['debug', 'debug-2']  },
            {type: 'enclosed', mats: ['debug', 'debug-2'] },{type: 'wall', mats: ['debug-2'] } ],
        [ {type: 'wall', mats: ['debug-2'] },{type: 'enclosed', mats: ['debug', 'debug-2'] },
            {type: 'enclosed', mats: ['debug', 'debug-2'],
                extra: { object: { type: 'npc', desc: 'An old tree', mats: ['solidobj'],
                    extra: { dialog: [ 'I am only a tree', 'Why are you talking to a tree?',
                        'I had a bird in my branches yesterday..', 'It was most impolite',
                        'It pecked at my bark all day long.', 'But I could not stop it because..' ] } } } },
            {type: 'enclosed', mats: ['debug', 'debug-2'], extra: { object: { type: 'tall', mats: ['tall'] } } },
            {type: 'enclosed', mats: ['debug', 'debug-2']  },
            {type: 'wall', mats: ['debug-2'] } ],
        [ {type: 'wall', mats: ['debug-2'] },{type: 'enclosed', mats: ['debug', 'debug-2'] },
            {type: 'wall', mats: ['treewall'] },{type: 'wall', mats: ['treewall'] },
            {type: 'enclosed', mats: ['debug', 'debug-2'] },{type: 'wall', mats: ['debug-2'] } ],
        [ {type: 'wall', mats: ['debug-2'] },{type: 'enclosed', mats: ['debug', 'debug-2'] },
            {type: 'enclosed', mats: ['debug', 'debug-2']  },
            {type: 'enclosed', mats: ['debug', 'debug-2']  },
            {type: 'enclosed', mats: ['debug', 'debug-2'] },{type: 'wall', mats: ['debug-2'] } ],
        [ {type: 'wall', mats: ['debug-2'] },
            {type: 'door', mats: ['debug-door'], desc: "It's also a door!  Woo!", extra: { to: 'entry_hall',
                player_pos: { x: 4, z: 4 }, player_facing: 1 } },
            {type: 'wall', mats: ['debug-2'] },{type: 'wall', mats: ['debug-2'] },
            {type: 'wall', mats: ['debug-2'] },{type: 'wall', mats: ['debug-2'] } ],
    ],
    save_test: [
        [ { type: 'wall', mats: ['debug-2'] }, {type: 'space', mats: ['debug'] },
            {type: 'wall', mats: ['debug-2'] } ],
        [ { type: 'wall', mats: ['debug-2'] } ],
        [ , { type: 'wall', mats: ['debug-2'] } ]
    ],
    forest: [
        [ {"type":"wall","mats":["debug-2"] }, {"type":"wall","mats":["treewall",null] },
            {"type":"wall","mats":["treewall",null] },
            {"type":"wall","mats":["treewall",null] },
            {"type":"wall","mats":["treewall",null] }, {"type":"wall","mats":["debug-2"] } ],
        [ {"type":"wall","mats":["treewall",null] },
            {"type":"space","mats":["grass","debug-2"] },
            {"type":"space","mats":["grass","debug-2"] },
            {"type":"space","mats":["grass","debug-2"] },
            {"type":"space","mats":["grass","debug-2"] },
            {"type":"wall","mats":["treewall",null] } ],
        [ {"type":"wall","mats":["treewall",null] },
            {"type":"space","mats":["grass","debug-2"]},
            {"type":"space","mats":["grass","debug-2"], extra: { object: { type: 'tall', mats: ['tall'],
                    extra: { solid: true } } } },
            {"type":"space","mats":["grass","debug-2"], extra: { object: { type: 'tall', mats: ['tall'],
                    extra: { solid: true }} } },
            {"type":"space","mats":["grass","debug-2"] },
            {"type":"wall","mats":["treewall",null] } ],
        [ {"type":"wall","mats":["treewall",null] },
            {"type":"space","mats":["grass","debug-2"] },
            {"type":"space","mats":["grass","debug-2"], extra: { object: { type: 'tall', mats: ['tall'],
                    extra: { solid: true } } }  },
            {"type":"space","mats":["grass","debug-2"], extra: { object: { type: 'tall', mats: ['tall'],
                    extra: { solid: true } } }  },
            {"type":"space","mats":["grass","debug-2"] },
            {"type":"wall","mats":["treewall",null] } ],
        [ {"type":"wall","mats":["treewall",null] },
            {"type":"space","mats":["grass","debug-2"] },
            {"type":"space","mats":["grass","debug-2"] },
            {"type":"space","mats":["grass","debug-2"], extra: { object: {
                    type: 'ai', mats: ['baddie'] } } },
            {"type":"space","mats":["grass","debug-2"] },
            {"type":"wall","mats":["treewall",null] } ],
        [ {"type":"wall","mats":["debug-2"] }, {"type":"door","mats":["debug-door"],
                extra: { to: 'entry_hall', player_pos: { x: 4, z: 4 }, player_facing: 1 } },
            {"type":"wall","mats":["treewall",null] },
            {"type":"wall","mats":["treewall",null] },
            {"type":"wall","mats":["treewall",null] }, {"type":"wall","mats":["debug-2"] } ]
    ],
    entry_hall_update: [[null,{"type":"wall","mats":["brick"]}],
        [{"type":"wall","mats":["brick"]},{"type":"space","mats":["debug-2","debug-2"]},{"type":"wall","mats":["brick"]}],
        [{"type":"wall","mats":["brick"]},{"type":"space","mats":["sidewalk","debug-2"]},{"type":"wall","mats":["brick"]}],
        [{"type":"wall","mats":["brick"]},{"type":"space","mats":["sidewalk","debug-2"]},{"type":"wall","mats":["brick"]},{"type":"wall","mats":["brick"]},{"type":"wall","mats":["brick"]},null,null,null,{"type":"wall","mats":["brick","debug-2"]},{"type":"wall","mats":["brick","debug-2"]},
                {"type":"door","mats":["debug-door","debug-2"], 
                    extra: { to: 'save_test', player_pos: { x: 1, z: 0 }, player_facing: 0 }}],
        [{"type":"wall","mats":["brick"]},{"type":"space","mats":["sidewalk","debug-2"]},{"type":"space","mats":["sidewalk","debug-2"]},{"type":"space","mats":["sidewalk","debug-2"]},{"type":"space","mats":["sidewalk","debug-2"]},
                {"type":"door","mats":["debug-door"], desc: "I wonder where this goes..",
                    extra: { to: 'small_room', player_pos: { x: 1, z: 4 }, player_facing: 0 } },
                null,{"type":"wall","mats":["brick","debug-2"]},{"type":"space","mats":["sidewalk","debug-2"]},{"type":"space","mats":["sidewalk","debug-2"]},{"type":"space","mats":["sidewalk","debug-2"]},{"type":"wall","mats":["brick","debug-2"]}],
        [null,{"type":"wall","mats":["brick"]},{"type":"space","mats":["sidewalk","debug-2"]},{"type":"wall","mats":["brick"]},{"type":"wall","mats":["brick"]},{"type":"wall","mats":["brick"]},{"type":"wall","mats":["brick","debug-2"]},{"type":"wall","mats":["brick","debug-2"]},{"type":"space","mats":["sidewalk","debug-2"]},{"type":"wall","mats":["brick","debug-2"]},{"type":"space","mats":["sidewalk","debug-2"]},{"type":"wall","mats":["brick","debug-2"]}],
        [null,{"type":"wall","mats":["brick","debug-2"]},{"type":"space","mats":["sidewalk","debug-2"]},{"type":"space","mats":["sidewalk","debug-2"]},{"type":"space","mats":["sidewalk","debug-2"]},{"type":"space","mats":["sidewalk","debug-2"]},{"type":"space","mats":["sidewalk","debug-2"]},{"type":"space","mats":["sidewalk","debug-2"]},{"type":"space","mats":["sidewalk","debug-2"]},{"type":"space","mats":["sidewalk","debug-2"]},{"type":"space","mats":["sidewalk","debug-2"]},{"type":"wall","mats":["brick","debug-2"]}],
        [null,null,{"type":"wall","mats":["brick","debug-2"]},{"type":"wall","mats":["brick","debug-2"]},{"type":"wall","mats":["brick","debug-2"]},{"type":"wall","mats":["brick","debug-2"]},{"type":"wall","mats":["brick","debug-2"]},{"type":"wall","mats":["brick","debug-2"]},{"type":"wall","mats":["brick","debug-2"]},{"type":"wall","mats":["brick","debug-2"]},
            {"type":"space","mats":["debug-2","debug-2"], extra: { object: { type: 'solid',
                mats: ['plant'], desc: 'What a lovely plant!' } } },
            {"type":"wall","mats":["brick","debug-2"]}],
        [null,null,null,null,null,null,null,null,null,null,{"type":"wall","mats":["brick","debug-2"]}]
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
const skymat = get_material('sky');
let skybox = null;

///overlay business is given to the player, and persisted
const overlay = new Overlay(width, height);
//overlay.add("shoot-anim-loop");

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
    skybox.position.y = 200;
    grid.scene.add(skybox);

    grid.set_scene_change_callback(switch_level);
};

switch_level({ to: 'entry_hall_update', player_pos: { x: 1, z: 2 }, player_facing: 2 });

const startTime = new Date().getTime();
function render() {
    overlay.tick(new Date().getTime() - startTime);
    requestAnimationFrame( render );
    renderer.clear();
    renderer.render( grid.scene, player.camera );
    renderer.clearDepth();
    renderer.render(overlay.scene, overlay.cam);
}
render();
