require('../sass/main.scss');
import { THREE } from './Three'
import assign from 'object-assign'

import Player from './player'
import LevelLoader from './level_loader'
import Grid from './grid'
import Wall from './wall'
import Space from './space'
import CeilingSpace from './ceiling_space'

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

let grid = new LevelLoader().load_level([
    [ , { type: 'wall', mats: ['wall_mat'] } ],
    [ {type: 'wall', mats: ['wall_mat']}, { type: 'enclosed', mats: ['mat3', 'mat2'], desc: 'The floor is a different color.'  }, { type: 'wall', mats: ['wall_mat'] } ],
    [ {type: 'wall', mats: ['wall_mat']}, { type: 'enclosed', mats: ['floor_mat', 'mat2'] }, { type: 'wall', mats: ['wall_mat'] } ],
    [ {type: 'wall', mats: ['wall_mat']}, { type: 'enclosed', mats: ['floor_mat', 'mat2'] }, { type: 'wall', mats: ['wall_mat'] }, { type: 'wall', mats: ['wall_mat'] }, { type: 'wall', mats: ['wall_mat'] } ],
    [ {type: 'wall', mats: ['wall_mat']}, { type: 'enclosed', mats: ['floor_mat', 'mat2'] }, { type: 'enclosed', mats: ['floor_mat', 'mat2'] }, { type: 'enclosed', mats: ['floor_mat', 'mat2'] },{ type: 'enclosed', mats: ['floor_mat', 'mat2'] }, { type: 'door', mats: ['door_mat'], desc: "It's a real door!  Woohoo!", extra: { to: 'some_level' } } ],
    [ , { type: 'wall', mats: ['wall_mat'] }, { type: 'wall', mats: ['wall_mat'] }, { type: 'wall', mats: ['wall_mat'] }, { type: 'wall', mats: ['wall_mat'] }, { type: 'wall', mats: ['wall_mat'] } ]
]);

let player = new Player(grid, { x: 1, y: 0, z: 1 });
let light = new THREE.AmbientLight( 0xBBBBBB ); // soft white light
grid.scene.add( light );

const load_level_2 = function() {
    player.destroy();
    player = null;
    grid.scene = null;
    grid = null;
    light = null;

    grid = new LevelLoader().load_level([
        [ {type: 'wall', mats: ['mat2'] },{type: 'wall', mats: ['mat2'] },{type: 'wall', mats: ['mat2'] },{type: 'wall', mats: ['mat2'] } ],
        [ {type: 'wall', mats: ['mat2'] },{type: 'enclosed', mats: ['floor_mat', 'mat3'] },{type: 'enclosed', mats: ['floor_mat', 'mat3'] },{type: 'wall', mats: ['mat2'] } ],
        [ {type: 'wall', mats: ['mat2'] },{type: 'enclosed', mats: ['floor_mat', 'mat3'] },{type: 'enclosed', mats: ['floor_mat', 'mat3'] },{type: 'wall', mats: ['mat2'] } ],
        [ {type: 'wall', mats: ['mat2'] },{type: 'wall', mats: ['door_mat'], desc: "It's not a door this time.  Sorry." },{type: 'wall', mats: ['mat2'] },{type: 'wall', mats: ['mat2'] } ],
    ]);
    player = new Player(grid, { x: 1, y: 0, z: 2});
    light = new THREE.AmbientLight( 0xA9BEA9 );
    grid.scene.add( light );
};

grid.set_scene_change_callback(load_level_2);

function render() {
    requestAnimationFrame( render );
    renderer.render( grid.scene, player.camera );
}
render();
