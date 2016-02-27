import THREE from './Three'

class Grid {
    constructor() {
        this.grid = [];    
        this.scene = new THREE.Scene();
    }

    create(cls, loc, args) {
        let n = new cls(this, loc, ...args);
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
        return !loc.solid;
    }
}

export default Grid;
