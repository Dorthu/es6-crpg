import GridObject from './grid_object'

class SolidObject extends GridObject {
    constructor(grid, loc, mats, desc, extra) {
        super(grid, loc, mats, desc, extra);
        this.solid = true;
    }
}

export default SolidObject;
