import THREE from './Three'
import assign from 'object-assign'
import LogBox from './logbox'

const dirs = [ 'north', 'east', 'south', 'west' ];

class Player {
    constructor(grid, loc, facing=0) {
        this.grid = grid;
        this.loc = loc;
        this.facing = facing;

        this.camera = new THREE.PerspectiveCamera( 70, 600/500, 1, 1000);
        this.camera.position.x = loc.x;
        this.camera.position.y = loc.y;
        this.camera.position.z = loc.z;

        this.position_camera();
        document.addEventListener('keydown', ent => this.input(ent));

        this.logbox = new LogBox();
    }

    move(back=false) {
        let nloc = {};
        assign(nloc, this.loc);
        let mult = 1;
        if(back) { mult = -1; }
        if(this.facing == 0) {
            nloc.z -= 1 * mult;
        } else if(this.facing == 1) {
            nloc.x -= 1 * mult;
        } else if(this.facing == 2) {
            nloc.z += 1 * mult;
        } else if(this.facing == 3) {
            nloc.x += 1 * mult;
        }
        if(this.grid.can_move_to(nloc)) {
            this.loc = nloc;
            this.logbox.add_message('moves '+dirs[this.facing]);
        }

        this.position_camera();
    }

    position_camera() {
        let c = this.grid.translate(this.loc);
        this.camera.position.x = c.x;
        this.camera.position.y = c.y;
        this.camera.position.z = c.z;
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
            this.logbox.add_message('faces '+dirs[this.facing]);
            this.position_camera();
        } else if(event.keyCode == 38) {
            this.move();
        } else if(event.keyCode == 39) {
            this.facing -= 1;
            if(this.facing < 0) { this.facing = 3; }
            this.logbox.add_message('faces '+dirs[this.facing]);
            this.position_camera();
        } else if(event.keyCode == 40) {
            this.move(true);
        }
    }

}

export default Player;
