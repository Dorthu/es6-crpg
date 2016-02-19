import THREE from 'three'
import assign from 'object-assign'
import loop from 'raf-loop'

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
const camera = new THREE.PerspectiveCamera( 70, width / height, 1, 1000);
camera.position.z = 6;
camera.position.y = 0;
camera.position.x = 0;

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
console.log(camera);

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
console.log(camera);

const mat3 = new THREE.MeshBasicMaterial({color: 0xff0000, side: THREE.DoubleSide });
const floor2 = new THREE.Mesh(geo, mat3);
floor2.rotation.x= Math.PI / 2;
floor2.position.y = -3;
floor2.position.x = 6;
floor2.position.z = 6;
scene.add(floor2);


function render() {
    requestAnimationFrame( render );
    renderer.render( scene, camera );
}
render();

let facing = 0;

function moveCamera(back=false) { 
    let mult = 1;
    if(back) { mult = -1; }
    if(facing == 0) {
        camera.position.z -= 6 * mult;
    } else if(facing == 1) {
        camera.position.x -= 6 * mult;
    } else if(facing == 2) { 
        camera.position.z += 6* mult;
    } else if (facing == 3) {
        camera.position.x += 6 * mult;
    }
}

document.addEventListener('keydown', function(event) { 
    if(event.keyCode == 37) {
        camera.rotation.y += Math.PI / 2;
        facing += 1; 
        if(facing > 3) { facing = 0; }
    } else if(event.keyCode == 38) {
        moveCamera();
    } else if(event.keyCode == 39) {
        camera.rotation.y -= Math.PI / 2;
        facing -= 1;
        if(facing < 0) { facing = 3; }
    } else if(event.keyCode == 40) {
        moveCamera(true);
    }
});
