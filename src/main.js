import THREE from 'three'
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

const floors = [
    new Space(grid, { x: 0, y: 0, z: 0 }, mat2, geo),
    new Space(grid, { x: 0, y: 0, z: 1 }, mat2, geo),
    new Space(grid, { x: 0, y: 0, z: 2 }, mat2, geo),
    new Space(grid, { x: 1, y: 0, z: 2 }, mat2, geo),
    new Space(grid, { x: 2, y: 0, z: 2 }, mat2, geo),
    new Space(grid, { x: 0, y: 0, z: -1 }, mat3, geo),
];

const walls = [
    new Wall(grid, { x: 1, y: 0, z: 0 }, mat, geo),
    new Wall(grid, { x: -1, y: 0, z: 0 }, mat, geo),
    new Wall(grid, { x: 1, y: 0, z: 1 }, mat, geo),
    new Wall(grid, { x: -1, y: 0, z: 1 }, mat, geo),
    new Wall(grid, { x: -1, y: 0, z: 2 }, mat, geo),
    new Wall(grid, { x: 0, y: 0, z: 3 }, mat, geo),
    new Wall(grid, { x: 1, y: 0, z: 3 }, mat, geo),
    new Wall(grid, { x: 2, y: 0, z: 3 }, mat, geo),
    new Wall(grid, { x: 2, y: 0, z: 1 }, mat, geo),
];

for ( let w of walls ) { console.log(w); console.log(w.meshes[0]); }


function render() {
    requestAnimationFrame( render );
    renderer.render( grid.scene, player.camera );
}
render();

