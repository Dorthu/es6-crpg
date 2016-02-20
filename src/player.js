import THREE from 'three'

class Player {
    constructor(grid, loc, facing=0) {
        this.grid = grid;
        this.loc = loc;
        this.facing = facing;

        this.camera = new THREE.PerspectiveCamera( 70, 300/500, 1, 1000);
        this.camera.position.z = 6;
        this.camera.position.y = 0;
        this.camera.position.x = 0;

        document.addEventListener('keydown', ent => this.input(ent));
    }

    move(back=false) { 
        let mult = 1;
        if(back) { mult = -1; }
        if(this.facing == 0) {
            this.camera.position.z -= 6 * mult;
        } else if(this.facing == 1) {
            this.camera.position.x -= 6 * mult;
        } else if(this.facing == 2) { 
            this.camera.position.z += 6* mult;
        } else if(this.facing == 3) {
            this.camera.position.x += 6 * mult;
        }
    }

    input(event) {
        if(event.keyCode == 37) {
            this.camera.rotation.y += Math.PI / 2;
            this.facing += 1; 
            if(this.facing > 3) { this.facing = 0; }
        } else if(event.keyCode == 38) {
            this.move();
        } else if(event.keyCode == 39) {
            this.camera.rotation.y -= Math.PI / 2;
            this.facing -= 1;
            if(this.facing < 0) { this.facing = 3; }
        } else if(event.keyCode == 40) {
            this.move(true);
        }
    }

}

export default Player;
