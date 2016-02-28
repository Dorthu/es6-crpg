import THREE from './Three'
import assign from 'object-assign'
import LogBox from './logbox'
import Inventory from './inventory'

const dirs = [ 'north', 'east', 'south', 'west' ];

class Player {
    constructor(grid, loc, facing=0) {
        this.grid = grid;
        this.loc = loc;
        this.facing = facing;
        this.inv_mode = false;

        this.camera = new THREE.PerspectiveCamera( 70, 600/500, 1, 1000);
        this.camera.position.x = loc.x;
        this.camera.position.y = loc.y;
        this.camera.position.z = loc.z;

        this.position_camera();
        document.addEventListener('keydown', ent => this.input(ent));

        this.logbox = new LogBox();
        this.inventory = new Inventory();

        /* testing */
        this.inventory.add_item({name: 'item1'});
        this.inventory.add_item({name: 'item2'});
        this.inventory.add_item({name: 'item3'});
        this.inventory.add_item({name: 'item4'});
    }

    move(back=false) {
        let nloc = {};
        assign(nloc, this.loc);
        let mult = 1;
        if(back) { mult = -1; }
        if(this.facing == 0) {
            nloc.z += 1 * mult;
        } else if(this.facing == 1) {
            nloc.x += 1 * mult;
        } else if(this.facing == 2) {
            nloc.z -= 1 * mult;
        } else if(this.facing == 3) {
            nloc.x -= 1 * mult;
        }
        if(this.grid.can_move_to(nloc)) {
            this.loc = nloc;
            if(back) {
                this.logbox.add_message('moves '+dirs[this.facing]);
            } else {
                let f = this.facing + 2;
                if(f > 3) { f -= 4; }
                this.logbox.add_message('moves '+dirs[f]);
            }
        }

        this.position_camera();
        this.grid.eventManager.dispatchPlayerMoved(this);
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

    look() {
        let target = {};
        assign(target, this.loc);

        this.facing == 0 ? target.z -= 1 :
        this.facing == 1 ? target.x -= 1 :
        this.facing == 2 ? target.z += 1 :
                           target.x += 1 ;

        let obj = this.grid.get(target.x, target.z);

        this.logbox.add_message('looks..');
        if(obj && obj.desc) {
            this.logbox.add_message(obj.desc);
        }
    }

    input(event) {
        if(this.inv_mode) {
            if(event.keyCode == 73) {
                this.inv_mode = false;
            } else {
                this.inventory.input(event);
            }
            return;
        }

        if(event.keyCode == 37) {
            this.facing += 1;
            if(this.facing > 3) { this.facing = 0; }
            this.logbox.add_message('faces '+dirs[this.facing]);
            this.position_camera();
        } else if(event.keyCode == 38) {
            this.move(true);
        } else if(event.keyCode == 39) {
            this.facing -= 1;
            if(this.facing < 0) { this.facing = 3; }
            this.logbox.add_message('faces '+dirs[this.facing]);
            this.position_camera();
        } else if(event.keyCode == 40) {
            this.move();
        } else if(event.keyCode == 76) {
            this.look();
        } else if(event.keyCode == 73) {
            this.inv_mode = true;
        }

        this.grid.eventManager.dispatchPassTurn();
    }

}

export default Player;
