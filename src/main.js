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
    [ , { type: 'wall', mat: 'wall_mat' } ],
    [ {type: 'wall', mat: 'wall_mat'}, { type: 'space', mat: 'mat2', desc: 'The floor is a different color.'  }, { type: 'wall', mat: 'wall_mat' } ],
    [ {type: 'wall', mat: 'wall_mat'}, { type: 'space', mat: 'floor_mat' }, { type: 'wall', mat: 'wall_mat' } ],
    [ {type: 'wall', mat: 'wall_mat'}, { type: 'space', mat: 'floor_mat' }, { type: 'wall', mat: 'wall_mat' }, { type: 'wall', mat: 'wall_mat' }, { type: 'wall', mat: 'wall_mat' } ],
    [ {type: 'wall', mat: 'wall_mat'}, { type: 'space', mat: 'floor_mat' }, { type: 'space', mat: 'floor_mat' }, { type: 'space', mat: 'floor_mat' },{ type: 'space', mat: 'floor_mat' }, { type: 'wall', mat: 'door_mat', desc: "It's not a door, it's painted on the wall.." } ],
    [ , { type: 'wall', mat: 'wall_mat' }, { type: 'wall', mat: 'wall_mat' }, { type: 'wall', mat: 'wall_mat' }, { type: 'wall', mat: 'wall_mat' }, { type: 'wall', mat: 'wall_mat' } ]
]);

const player = new Player(grid, { x: 1, y: 0, z: 1 });
const light = new THREE.AmbientLight( 0xBBBBBB ); // soft white light
grid.scene.add( light );

//const floor_params = [texture_mat, geo, '', mat2];
//const floors = [
//    grid.create(CeilingSpace, { x: 0, y: 0, z: 0 }, floor_params),
//    grid.create(CeilingSpace, { x: 0, y: 0, z: 1 }, floor_params),
//    grid.create(CeilingSpace, { x: 0, y: 0, z: 2 }, floor_params),
//    grid.create(CeilingSpace, { x: 1, y: 0, z: 2 }, floor_params),
//    grid.create(CeilingSpace, { x: 2, y: 0, z: 2 }, floor_params),
//    grid.create(CeilingSpace, { x: 0, y: 0, z: -1 }, [mat3, geo, 'The floor is a weird color.', mat2]),
//];
//
//const wall_params = [wall_mat, geo];
//const door_params = [door_mat, geo];
//const walls = [
//    grid.create(Wall, { x: 1, z: 0 }, wall_params),
//    grid.create(Wall, { x: -1, z: 0 }, wall_params),
//    grid.create(Wall, { x: 1, z: 1 }, wall_params),
//    grid.create(Wall, { x: -1, z: 1 }, wall_params),
//    grid.create(Wall, { x: -1, z: 2 }, wall_params),
//    grid.create(Wall, { x: 0, z: 3 }, wall_params),
//    grid.create(Wall, { x: 1, z: 3 }, wall_params),
//    grid.create(Wall, { x: 2, z: 3 }, wall_params),
//    grid.create(Wall, { x: 2, z: 1 }, wall_params),
//    grid.create(Wall, {x: 0, z: -2}, wall_params),
//    grid.create(Wall, {x: 3, z: 2}, door_params.concat("It isn't a real door, it's just painted on the wall")),
//    grid.create(Wall, {x: 1, z: -1}, wall_params),
//    grid.create(Wall, {x: -1, z: -1}, wall_params),
//];

function render() {
    requestAnimationFrame( render );
    renderer.render( grid.scene, player.camera );
}
render();
