import SolidItem from '../solid_item'

class AI extends SolidItem {
    constructor(grid, loc, mats, desc, extra) {
        super(grid, loc, mats, desc, extra);

        this.grid.event_manager.subscribe('pass_turn', e => this.step(e));
    }

    step(event) {
        /*
            This is where AI behavior happens.
            In the base AI class, this will do nothing.
        */
    }
}

export default AI;
