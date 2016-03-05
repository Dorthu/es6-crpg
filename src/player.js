import { THREE } from './Three'
import assign from 'object-assign'
import LogBox from './logbox'

const dirs = [ 'north', 'east', 'south', 'west' ];

class Player {
    constructor(grid, loc, inventory, facing=0) {
        this.grid = grid;
        this.loc = loc;
        this.loc.y = 0;
        this.facing = facing;
        this.inv_mode = false;
        this.inventory = inventory;

        this.camera = new THREE.PerspectiveCamera( 70, 600/500, 1, 1000);
        this.camera.position.x = this.loc.x;
        this.camera.position.y = this.loc.y;
        this.camera.position.z = this.loc.z;

        this.position_camera();
        this.input_listener = ent => this.input(ent);
        document.addEventListener('keydown', this.input_listener);

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
            if(!back) {
                this.logbox.add_message('moves '+dirs[this.facing]);
            } else {
                let f = this.facing + 2;
                if(f > 3) { f -= 4; }
                this.logbox.add_message('moves '+dirs[f]);
            }
        } else if(!back) {
            ///attempt to use
            let o = this.grid.get(nloc.x, nloc.z);
            if(o.usable) {
                this.logbox.add_message('uses');
                o.use();
            }
        }

        this.position_camera();
        this.grid.event_manager.dispatchPlayerMoved(this);
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

    _point_in_front() {
        let target = {};
        assign(target, this.loc);

        this.facing == 0 ? target.z -= 1 :
        this.facing == 1 ? target.x -= 1 :
        this.facing == 2 ? target.z += 1 :
                           target.x += 1 ;

        return target;
    }

    look() {
        let target = this._point_in_front();
        let obj = this.grid.get(target.x, target.z);

        this.logbox.add_message('looks..');
        if(obj && obj.object && obj.object.desc) { 
            this.logbox.add_message(obj.object.desc);
        }
        else if(obj && obj.desc) {
            this.logbox.add_message(obj.desc);
        }
    }

    use() {
        let target = {};
        assign(target, this.loc);

        this.facing == 0 ? target.z -= 1 :
        this.facing == 1 ? target.x -= 1 :
        this.facing == 2 ? target.z += 1 :
                           target.x += 1 ;

        let obj = this.grid.get(target.x, target.z);

        this.logbox.add_message('uses..');
        if(obj && obj.object && obj.object.useable) { 
            obj.object.use(this);
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
            this.move();
        } else if(event.keyCode == 39) {
            this.facing -= 1;
            if(this.facing < 0) { this.facing = 3; }
            this.logbox.add_message('faces '+dirs[this.facing]);
            this.position_camera();
        } else if(event.keyCode == 40) {
            this.move(true);
        } else if(event.keyCode == 76) {
            this.look();
        } else if(event.keyCode == 73) {
            this.inv_mode = true;
        } else if(event.keyCode == 85) {
            this.use();
        }

        this.grid.event_manager.dispatchPassTurn();
    }

    destroy() {
        document.removeEventListener('keydown', this.input_listener);
    }
}

export default Player;
