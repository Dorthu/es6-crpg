require('../sass/main.scss');
import { THREE } from './Three'
import assign from 'object-assign'

import Player from './player'
import LevelLoader from './level_loader'
import Grid from './grid'
import Wall from './wall'
import Space from './space'
import CeilingSpace from './ceiling_space'
import { init_textures } from './texture_lookup'

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
        [ , { type: 'wall', mats: ['wall_mat'] } ],
        [ {type: 'wall', mats: ['wall_mat']},
            { type: 'enclosed', mats: ['mat3', 'mat2'], desc: 'The floor is a different color.',
                extra: { object: { desc: "There's something here..", mats: ['sprite_mat'] } }  },
            { type: 'wall', mats: ['wall_mat'] } ],
        [ {type: 'wall', mats: ['wall_mat']}, { type: 'enclosed', mats: ['floor_mat', 'mat2']  },
            { type: 'wall', mats: ['wall_mat'] } ],
        [ {type: 'wall', mats: ['wall_mat']}, { type: 'enclosed', mats: ['floor_mat', 'mat2'] },
            { type: 'wall', mats: ['wall_mat'] }, { type: 'wall', mats: ['wall_mat'] },
            { type: 'wall', mats: ['wall_mat'] } ],
        [ {type: 'wall', mats: ['wall_mat']}, { type: 'enclosed', mats: ['floor_mat', 'mat2'] },
            { type: 'enclosed', mats: ['floor_mat', 'mat2'] }, { type: 'enclosed', mats: ['floor_mat', 'mat2'] },
            { type: 'enclosed', mats: ['floor_mat', 'mat2'] },
            { type: 'door', mats: ['door_mat'], desc: "It's a real door!  Woohoo!", extra: { to: 'small_room',
                player_pos: { x: 1, z: 2 }, player_facing: 0 } } ],
        [ , { type: 'wall', mats: ['wall_mat'] }, { type: 'wall', mats: ['wall_mat'] },
            { type: 'wall', mats: ['wall_mat'] }, { type: 'wall', mats: ['wall_mat'] },
            { type: 'wall', mats: ['wall_mat'] } ]
    ],
    small_room: [
        [ {type: 'wall', mats: ['mat2'] },{type: 'wall', mats: ['mat2'] },
            {type: 'wall', mats: ['mat2'] },{type: 'wall', mats: ['mat2'] } ],
        [ {type: 'wall', mats: ['mat2'] },{type: 'enclosed', mats: ['floor_mat', 'mat3'] },
            {type: 'enclosed', mats: ['floor_mat', 'mat3'] },{type: 'wall', mats: ['mat2'] } ],
        [ {type: 'wall', mats: ['mat2'] },{type: 'enclosed', mats: ['floor_mat', 'mat3'] },
            {type: 'enclosed', mats: ['floor_mat', 'mat3'] },{type: 'wall', mats: ['mat2'] } ],
        [ {type: 'wall', mats: ['mat2'] },
            {type: 'door', mats: ['door_mat'], desc: "It's also a door!  Woo!", extra: { to: 'entry_hall',
                player_pos: { x: 4, z: 4 }, player_facing: 1 } },
            {type: 'wall', mats: ['mat2'] },{type: 'wall', mats: ['mat2'] } ],
    ]
};

let grid= null;
let player = null;
let light = null;

const switch_level = function(info) {
    if(player) player.destroy();
    player = null;
    if(grid) {
        grid.scene = null;
        grid = null;
    }
    light = null;

    grid = new LevelLoader().load_level(levels[info.to]);
    player = new Player(grid, info.player_pos, info.player_facing);
    light = new THREE.AmbientLight( 0xA9BEA9 );
    grid.scene.add( light );
    grid.set_scene_change_callback(switch_level);
};

switch_level({ to: 'entry_hall', player_pos: { x: 1, z: 2 }, player_facing: 2 });

function render() {
    requestAnimationFrame( render );
    renderer.render( grid.scene, player.camera );
}
render();
