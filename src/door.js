import Wall from './wall'

class Door extends Wall {
    constructor(grid, loc, mats, desc, extra) {
        super(grid, loc, mats, desc, extra);

        this.usable = true;
    }

    use(player) {
        this.grid.event_manager.dispatchTransitionLevel(this.extra);
    }
}

export default Door;
