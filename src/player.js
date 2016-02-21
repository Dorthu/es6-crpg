import THREE from 'three'

class Player {
    constructor(grid, loc, facing=0) {
        this.grid = grid;
        this.loc = loc;
        this.facing = facing;

        this.camera = new THREE.PerspectiveCamera( 70, 600/500, 1, 1000);
        this.camera.position.x = loc.x;
        this.camera.position.y = loc.y;
        this.camera.position.z = loc.z;

        document.addEventListener('keydown', ent => this.input(ent));
    }

    move(back=false) {
        let mult = 1;
        if(back) { mult = -1; }
        if(this.facing == 0) {
            this.loc.z -= 6 * mult;
        } else if(this.facing == 1) {
            this.loc.x -= 6 * mult;
        } else if(this.facing == 2) {
            this.loc.z += 6* mult;
        } else if(this.facing == 3) {
            this.loc.x += 6 * mult;
        }
        this.position_camera();
    }

    position_camera() {
        this.camera.position.x = this.loc.x;
        this.camera.position.y = this.loc.y;
        this.camera.position.z = this.loc.z;
        this.camera.rotation.y = this.facing * (Math.PI / 2);

        if(this.facing == 0) {
            this.camera.position.z += 1.5;
        } else if(this.facing == 1) {
            this.camera.position.x += 1.5;
        } else if(this.facing == 2) {
            this.camera.position.z -= 1.5;
        } else if(this.facing == 3) {
            this.camera.position.x -= 1.5;
        }
    }

    input(event) {
        if(event.keyCode == 37) {
            this.facing += 1;
            if(this.facing > 3) { this.facing = 0; }
            this.position_camera();
        } else if(event.keyCode == 38) {
            this.move();
        } else if(event.keyCode == 39) {
            this.facing -= 1;
            if(this.facing < 0) { this.facing = 3; }
            this.position_camera();
        } else if(event.keyCode == 40) {
            this.move(true);
        }
    }

}

export default Player;
