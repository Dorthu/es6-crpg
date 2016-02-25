import THREE from './Three'
import assign from 'object-assign'

import Player from './player'
import Grid from './grid'
import Wall from './wall'
import Space from './space'

const width = 600;
const height = 500;

const canvas = document.createElement('canvas')
canvas.width = width;
canvas.height = height;

document.body.appendChild(canvas);

const renderer = new THREE.WebGLRenderer(assign({
    canvas: canvas
}))

const grid = new Grid();
const player = new Player(grid, { x: 0, y: 0, z: 0 });

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( width, height );

const geo = new THREE.PlaneGeometry(6,6);
const mat = new THREE.MeshBasicMaterial({color: 0xffff00, side: THREE.DoubleSide });
const mat2 = new THREE.MeshBasicMaterial({color: 0xff00ff, side: THREE.DoubleSide });
const mat3 = new THREE.MeshBasicMaterial({color: 0xff0000, side: THREE.DoubleSide });

const floor_params = [mat2, geo];
const floors = [
    grid.create(Space, { x: 0, y: 0, z: 0 }, floor_params),
    grid.create(Space, { x: 0, y: 0, z: 1 }, floor_params),
    grid.create(Space, { x: 0, y: 0, z: 2 }, floor_params),
    grid.create(Space, { x: 1, y: 0, z: 2 }, floor_params),
    grid.create(Space, { x: 2, y: 0, z: 2 }, floor_params),
    grid.create(Space, { x: 0, y: 0, z: -1 }, [mat3, geo]),
];

const wall_params = [mat, geo];
const walls = [
    grid.create(Wall, { x: 1, y: 0, z: 0 }, wall_params),
    grid.create(Wall, { x: -1, y: 0, z: 0 }, wall_params),
    grid.create(Wall, { x: 1, y: 0, z: 1 }, wall_params),
    grid.create(Wall, { x: -1, y: 0, z: 1 }, wall_params),
    grid.create(Wall, { x: -1, y: 0, z: 2 }, wall_params),
    grid.create(Wall, { x: 0, y: 0, z: 3 }, wall_params),
    grid.create(Wall, { x: 1, y: 0, z: 3 }, wall_params),
    grid.create(Wall, { x: 2, y: 0, z: 3 }, wall_params),
    grid.create(Wall, { x: 2, y: 0, z: 1 }, wall_params),
    grid.create(Wall, {x: 0, z: -2}, wall_params),
];

function render() {
    requestAnimationFrame( render );
    renderer.render( grid.scene, player.camera );
}
render();

