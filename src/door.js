import Wall from './wall'

class Door extends Wall { 
    constructor(grid, loc, mats, desc, extra) {
        super(grid, loc, mats, desc, extra);

        this.usable = true;
    }

    use() { 
        this.grid.event_manager.dispatchTransitionLevel(this.extra.to_level);        
    }
}

export default Door;
