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
import DialogBox from './dialog'

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

    grid = level_loader.load_level(info.to);
    console.log("Player class:" );
    console.log(player_class);
    player = new player_class(grid, info.player_pos, inventory, info.player_facing, stats, overlay);
    light = new THREE.AmbientLight( 0xA9BEA9 );
    grid.scene.add( light );
    skybox = new THREE.Mesh(skygeo, skymat);
    skybox.position.y = 200;
    grid.scene.add(skybox);

    grid.set_scene_change_callback(switch_level);

    let chance = Math.random();
    let d = null;
    if(chance < .3) {
        d = new DialogBox("You are the worst at this game.", 'creator');
    } else if(chance < .6) {
        d = new DialogBox("I believe in you!  You can do it!", null, 'player');
    }

    if(d) {
        window.setTimeout(function() {
            d.remove();
        }, 1000);
    }
};

switch_level({ to: '/levels/test/entry_hall_update', player_pos: { x: 1, z: 2 }, player_facing: 2 });


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
