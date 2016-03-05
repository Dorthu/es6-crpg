
class GridObject {
    constructor(grid, loc, mats, desc, extra) {
        this.grid = grid;
        this.loc = loc;
        this.desc = desc;
        this.extra = extra;
        this.solid = false;
        this.usable = false;
        this.meshes = [];
    }

    destroy() {
        for(let m of this.meshes) {
            this.grid.scene.remove(m);
        }
    }
}

export default GridObject;
