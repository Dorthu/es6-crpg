import GridObject from './grid_object'

class Switch extends GridObject {
    constructor(grid, loc, mats, desc, extra) {
        super(grid, loc, mats, desc, extra);

        this.event = extra['event'];

        this.useable = true;
    }

    use(player) {
        this.grid.event_manager.dispatchArbitrary(this.event);
    }
}

export default Switch;
