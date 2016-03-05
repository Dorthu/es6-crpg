import { THREE } from './Three'
import EventManager from './event_manager'

class Grid {
    constructor() {
        this.grid = [];
        this.scene = new THREE.Scene();
        this.event_manager = new EventManager();
        this.event_manager.subscribe('transition_level', ent => this.transition(ent));
        this.scene_change_callback = null;
    }

    create(cls, loc, mats, desc, extra) {
        let n = new cls(this, loc, mats, desc, extra);
        this.put(loc.x, loc.z, n);
        return n;
    }

    translate(loc) {
        return { x: loc.x * 6, y: loc.y * 6, z: loc.z * 6 }
    }

    put(x, y, thing) {
        if(this.grid[x] == null) { this.grid[x] = []; }
        this.grid[x][y] = thing;
    }

    get(x, y) {
        if(this.grid.length <= x) { return null; }
        return this.grid[x][y];
    }

    remove(x, y) {
        this.put(x, y, null);
    }

    can_move_to(pos) {
        let loc = this.get(pos.x, pos.z);
        if(!loc) { return false; }
        if(loc['object'])
            return !loc.solid && !loc.object.solid;
        return !loc.solid;
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
