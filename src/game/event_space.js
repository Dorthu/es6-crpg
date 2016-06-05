import Space from '../space'

class EventSpace extends Space {
    constructor(grid, loc, mats, desc, extra) {
        super(grid, loc, mats, desc, extra);
        
        this.event = extra['event'];
        this.event_data = extra['event_data'];
        this.once = this.extra['once'];
        this.key = this.extra['key'];

        if(this.once) {
            if(this.grid.level.get_value(this.key)) {
                this.skip = True;
            }
        }

        if(!this.skip)
            this.grid.event_manager.add_event_listener('player_moved', e => this.trigger(e), this);
    }

    trigger(event) {
        if(!this.skip && event.data.loc.x == this.loc.x && event.data.loc.y == this.loc.y) {
            this.grid.event_manager.dispatchArbitrary(this.event, this.event_data);
            
            if(this.once) {
                this.grid.level.set_value(this.key);
                this.skip = true;
                this.grid.event_manager.unsubscribe(this.event, this);
            }
        }
    }
}

export default EventSpace;
