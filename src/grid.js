import { THREE } from './Three'
import EventManager from './event_manager'
import PathNetwork from './path_network'

class Grid {
    constructor(persistence) {
        this.grid = [];
        this.scene = new THREE.Scene();
        this.event_manager = new EventManager();
        this.event_manager.subscribe('transition_level', ent => this.transition(ent));
        this.scene_change_callback = null;
        this.player = null;
        this.path_network = new PathNetwork(this);
        this.persistence = persistence;
        this.post_load_actions = [];
    }

    create(cls, loc, mats, desc, extra) {
        if(loc.x<0 || loc.z<0) { console.log("Creating a thing to at a negative index!"); return; }
        let n = new cls(this, loc, mats, desc, extra);
        this.put(loc.x, loc.z, n);
        return n;
    }

    translate(loc) {
        return { x: loc.x * 6, y: loc.y * 6, z: loc.z * 6 }
    }

    put(x, y, thing) {
        if(x<0 || y<0) { console.log("Adding a thing to a negative index!"); return; }
        if(this.grid[x] == null) { this.grid[x] = []; }
        if(this.get(x, y)) { this.get(x,y).destroy(); }
        this.grid[x][y] = thing;
    }

    get(x, y) {
        if(this.grid.length <= x) { return null; }
        return this.grid[x][y];
    }

    remove(x, y) {
        this.put(x, y, null);
    }

    can_move_to(pos, ignore_player=false) {
        let loc = this.get(pos.x, pos.z);
        if(!loc) { return false; }
        if(!ignore_player && this.player
                && this.player.loc.x == pos.x
                && this.player.loc.z == pos.z)
            return false;
        if(loc['object']) {
            return !loc.solid && !loc.object.solid;
        }
        return !loc.solid;
    }

    object_move(thing, pos) {
        /*
            This is for moving objects within spaces - do not remove thing
            from the grid when using this operation.
        */
        let o = this.get(thing.loc.x, thing.loc.z);
        o.object = null;
        let dest = this.get(pos.x, pos.z);
        dest.object = thing;
        thing.loc = pos;
        thing.update_meshes();
    }

    transition(event) {
        if(this.scene_change_callback) {
            this.scene_change_callback(event.detail.data);
        }
    }

    set_scene_change_callback(func) {
        this.scene_change_callback = func;
    }
}

export default Grid;
