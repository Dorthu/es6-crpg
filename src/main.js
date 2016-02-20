import THREE from 'three'
import assign from 'object-assign'
import loop from 'raf-loop'

import Player from './player'

const width = 300;
const height = 500;

const canvas = document.createElement('canvas')
canvas.width = width;
canvas.height = height;

document.body.appendChild(canvas);

const renderer = new THREE.WebGLRenderer(assign({
    canvas: canvas
}))

const gl = renderer.getContext()

const scene = new THREE.Scene();
const player = new Player(null, null);

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( width, height );

const geo = new THREE.PlaneGeometry(6,6);
const mat = new THREE.MeshBasicMaterial({color: 0xffff00, side: THREE.DoubleSide });
const p = new THREE.Mesh(geo, mat);
p.position.x = 3;
p.rotation.y = Math.PI / 2;
scene.add(p);

const r = new THREE.Mesh(geo, mat);
r.position.x = -3;
r.rotation.y = Math.PI / 2;
scene.add(r);

console.log(p);
console.log(player.camera);

const mat2 = new THREE.MeshBasicMaterial({color: 0xff00ff, side: THREE.DoubleSide });
const floor = new THREE.Mesh(geo, mat2);
floor.rotation.x= Math.PI / 2;
floor.position.y = -3;
scene.add(floor);

const p2 = new THREE.Mesh(geo, mat);
p2.position.x = 6;
p2.position.z = 3;
scene.add(p2);

const r2 = new THREE.Mesh(geo, mat);
r2.position.x = 6;
r2.position.z = 9;
scene.add(r2);

console.log(p2);
console.log(player.camera);

const mat3 = new THREE.MeshBasicMaterial({color: 0xff0000, side: THREE.DoubleSide });
const floor2 = new THREE.Mesh(geo, mat3);
floor2.rotation.x= Math.PI / 2;
floor2.position.y = -3;
floor2.position.x = 6;
floor2.position.z = 6;
scene.add(floor2);


function render() {
    requestAnimationFrame( render );
    renderer.render( scene, player.camera );
}
render();

