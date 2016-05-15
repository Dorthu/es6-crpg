import SolidItem from '../solid_item'

class AI extends SolidItem {
    constructor(grid, loc, mats, desc, extra) {
        super(grid, loc, mats, desc, extra);
        this.path = null;
        this.path_step = 0;
        this.act_on = 2;
        this.turns = 0;
        this.health = extra && extra['health'] ? extra.health : 10; /// TODO - arbitrary default

        this.grid.event_manager.subscribe_list('ai_turn', e => this.step(e), this);
    }

    suffer_attack(attack) {
        if(attack['damage']) {
            this.health -= attack.damage;
            if(this.health < 1) {
                this.destroy();
            }
        }
    }

    destroy() {
        ///after this happens I am still on the grid and behaving
        this.grid.event_manager.unsubscribe_list('ai_turn', this);
        super.destroy();
    }

    step(event) {
        /*
            This is where AI behavior happens.
            In the base AI class, this will do nothing.
        */
        console.log(this.turns % this.act_on);
        if(!(this.turns++ % this.act_on)) {
            if(!this.ai_follow_player()) {
    //            this.ai_wander();
                    console.log("at player or can't see them");
                if(this.is_beside_player()) {
                    this.ai_attack();
                    return true;
                }
            } else {
                return true;
            }
        }

        return false;
    }

    /*
        These methods are generic helpers for common AI concerns
    */
    has_los_to_player() {
        /*
            Returns true if this AI has Line of Sight to the player
            TODO: right now, this won't let AIs see you in a 4x4 room if you're
            on a diagnal
        */
        console.log("has los?");
        let los_dir = {x: 0, z: 0};
        let mag = 0;
        if(this.loc.x == this.grid.player.loc.x) {
            los_dir.z = -1 *  Math.sign(this.loc.z - this.grid.player.loc.z);
            mag  = Math.abs(this.loc.z - this.grid.player.loc.z);
        } else if(this.loc.z == this.grid.player.loc.z) {
            los_dir.x = -1 * Math.sign(this.loc.x - this.grid.player.loc.x);
            mag  = Math.abs(this.loc.x - this.grid.player.loc.x);
        }

        console.log('los_dir is x: '+los_dir.x+' z: '+los_dir.z);
        console.log('mag is: '+mag);
        if(!(los_dir.x || los_dir.z)) {
            return false;
        }

        for(let c = 0; c < mag; c++) {
            let o = this.grid.get(this.loc.x + los_dir.x * c, this.loc.z + los_dir.z * c);
            console.log(o);
            if(o && o.solid && !o.transparent) {
                console.log("no los to player: blocked by:");
                console.log(o);
                return false;
            }
        }
        console.log("has los to player: true");
        return true;
    }

    update_path_to_player() {
        this.path = this.grid.path_network.path_to_player(this);
        this.path_step = 1;
    }

    is_beside_player() {
        return Math.abs(this.loc.x - this.grid.player.loc.x) + Math.abs(this.loc.z - this.grid.player.loc.z)
                === 1;
    }

    /*
        Below are generic behaviors that other AIs may use.  The intention is that
        an AI subclass with manage states and switch between these behaviors, possibly
        with a few of its own behaviors defined as well.
    */
    ai_wander() {
        /*
            This will cause the AI to wander around the area.
        */
        const dirs = [ { x: 0, z: 1 }, { x: 1, z: 0 }, { x: 0, z: -1 }, { x: -1, z: 0 } ];
        let options = [ { x: 0, z: 0 } ];
        for(let d of dirs) {
            if(this.grid.can_move_to({x: this.loc.x + d.x, z: this.loc.z + d.z })) {
                options.push(d);
            }
        }

        let choice = options[Math.floor(Math.random() * options.length)];
        if(choice.x || choice.z) {
            this.grid.object_move(this, { x: this.loc.x + choice.x, y: this.loc.y, z: this.loc.z + choice.z });
            return true;
        }
        return false; //no action
    }

    ai_follow_path() {
        /*
            This behavior follows the path the AI has already gotten.
        */
        console.log("following path..");
        if(!this.path || this.path_step >= this.path.length) {
            console.log(this.path);
            console.log("not enough path "+ this.path_step);
            return false;
        }

        let next = this.path[this.path_step++];
        console.log("moving to next place from index "+(this.path_step-1));
        console.log(next);
        if(this.grid.can_move_to({x: next.x, y: this.loc.y, z: next.z})) {
            console.log("moving!");
            this.grid.object_move(this, { x: next.x, y: this.loc.y, z: next.z });
            return true;
        }
        console.log("could not move to point");
        this.path_step--;
        return false;
    }

    ai_follow_player() {
        console.log("Following player..");
        if(this.has_los_to_player()) {
            this.update_path_to_player();
            console.log("path updated!");
        }

        if(this.path) {
            console.log("attempting to move..");
            console.log(this.path);
            if(this.ai_follow_path()) {
                console.log("moved toward player");
                return true;
            }
        }
        console.log("no action");

        ///no aciton was taken
        return false;
    }

    ai_attack() {
        if(this.grid.player['suffer_attack']) {
            this.grid.player.suffer_attack({damage: 5});
        }
    }
}

export default AI;
