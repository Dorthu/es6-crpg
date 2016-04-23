import GridObject from './grid_object'

class SolidObject extends GridObject {
    constructor(grid, loc, mats, desc, extra) {
        super(grid, loc, mats, desc, extra);
        this.solid = true;
    }

    destroy() {
        let o = this.grid.get(this.loc.x, this.loc.z);
        if(o) { o.object = null; } ///else wtf
        super.destory();
    }
}

export default SolidObject;
