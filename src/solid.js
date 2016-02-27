import GridObject from './grid_object'

class SolidObject extends GridObject {
    constructor() {
        super();
        this.solid = true;
    }
}

export default SolidObject;
