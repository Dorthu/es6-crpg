import Space from '../space'

class EventSpace extends Space {
    constructor(grid, loc, mats, desc, extra) {
        super(grid, loc, mats, desc, extra);
        
        this.event = extra['event'];
        this.event_data = extra['event_data'];
        this.once = this.extra['once'];
        this.key = this.extra['key'];

        if(this.once) {
            if(this.grid.level.get_value(this.key) !== true) {
                this.skip = true;
            }
        }

        if(!this.skip)
            this.grid.event_manager.subscribe('player_moved', e => this.trigger(e), this);
    }

    trigger(event) {
        if(!this.skip && event.detail.loc.x == this.loc.x && event.detail.loc.z == this.loc.z) {
            this.grid.event_manager.dispatchArbitrary(this.event, this.event_data);
            
            if(this.once) {
                this.grid.level.set_value(this.key, false);
                this.skip = true;
                this.grid.event_manager.unsubscribe(this.event, this);
            }
        }
    }
}

export default EventSpace;
