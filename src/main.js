require('../sass/main.scss');
import { THREE } from './Three'
import assign from 'object-assign'

import Player from './player'
import EditorPlayer from './editor/player'
import GamePlayer from './game/player'
import LevelLoader from './level_loader'
import Grid from './grid'
import Inventory from './game/inventory'
import EditorInventory from './editor/inventory'
import PlayerStatus from './game/status'
import Overlay from './overlay'
import { init_textures, get_material } from './texture_lookup'
import { init_serializer } from './editor/level_serializer'
import { obj_map } from './level_loader'
import TurnController from './turn_controller'
import GameTurnController from './game/turn_controller'
import DialogChoice from './game/dialog_choice'
import { store_init, store_get_global, clear_store } from './persistence_manager'

const width = 600;
const height = 500;

const canvas = document.createElement('canvas')
canvas.width = width;
canvas.height = height;

document.getElementById("canvas_goes_here").appendChild(canvas);

const but = document.createElement("a");
but.className="dropdown-item";
but.innerHTML="Delete Save";
but.href="#";
but.onclick=function() {
    console.log('deleting save..');
    clear_store("game");
    location.reload();
}
const bli = document.createElement("li");
bli.appendChild(but);
document.getElementById("menu").appendChild(bli);

const renderer = new THREE.WebGLRenderer(assign({
    canvas: canvas
}))

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( width, height );
renderer.autoClear=false;

init_textures();
const level_loader = new LevelLoader();

let grid= null;
let player = null;
let light = null;

let inventory = new Inventory();

let player_class = GamePlayer;
const editor_mode = window.location.href.indexOf('editor') > -1;
if(editor_mode) {
    inventory = new EditorInventory();
    init_serializer(obj_map);
    player_class = EditorPlayer;
}
const stats = new PlayerStatus(100);
store_init(editor_mode ? "editor" : "game");
inventory.deserialize();

///tmp for testing
const skygeo = new THREE.CubeGeometry(500, 500, 500);
const skymat = get_material('sky');
let skybox = null;

///overlay business is given to the player, and persisted
const overlay = new Overlay(width, height);
//overlay.add("shoot-anim-loop");
let tc = null;

const switch_level = function(info) {
    if(player) player.destroy();
    player = null;
    if(grid) {
        grid.scene = null;
        overlay.grid = null;
        grid = null;
    }
    light = null;
    skybox = null;

    console.log("Switching leve to "+info.to);
    grid = level_loader.load_level(info.to);
    console.log("Player class:" );
    console.log(player_class);
    overlay.grid = grid;

    /// keep compatibility with simple level format (for now)
    if(info.constructor != Array && info['initial']) {
        info.player_pos = grid.level.player_start.pos;
        info.player_facing = grid.level.player_start.facing;
    }

    player = new player_class(grid, info.player_pos, inventory, info.player_facing, stats, overlay);
    light = new THREE.AmbientLight( 0xA9BEA9 );
    grid.scene.add( light );
    skybox = new THREE.Mesh(skygeo, skymat);
    skybox.position.y = 200;
    grid.scene.add(skybox);

    grid.set_scene_change_callback(switch_level);

    if(tc) tc.destroy();
    tc = null;
    if(editor_mode) {
        tc = new TurnController(grid);
    } else {
        tc = new GameTurnController(grid);
    }
};

let toLevel = store_get_global("clevel", 'levels/test2/simple');
let initial = true;
let player_pos = { x: 1, z: 1 };
let player_facing = 2;
if(store_get_global('player_x')) {
    initial = false;
    player_pos = {
        x: Number.parseInt(store_get_global('player_x')),
        z: Number.parseInt(store_get_global('player_z'))
    };
    player_facing = Number.parseInt(store_get_global('player_facing'));
}
switch_level({ to: toLevel, player_pos: player_pos, player_facing: player_facing, initial: initial });

const startTime = new Date().getTime();
function render() {
    grid.tick(new Date().getTime() - startTime);
    overlay.tick(new Date().getTime() - startTime);
    requestAnimationFrame( render );
    renderer.clear();
    renderer.render( grid.scene, player.camera );
    renderer.clearDepth();
    renderer.render(overlay.scene, overlay.cam);
}
render();
