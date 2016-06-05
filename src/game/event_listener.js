class EventListener {
    constructor(grid, triggers) {
        this.grid = grid;
        this.triggers = triggers;
        for(let _ of Object.keys(triggers)) {
            this.grid.event_manager.subscribe(_, e => this.handle(e), this);
        }
    }

    handle(event) {
        let cur = this.triggers[event.type];
        if(cur) {
            if(cur['type'] == 'dialog') {
                this.grid.player.overlay.add_dialog(this.grid.level.get_dialog(cur['dialog']));
            }
        } else {
            console.log("Event Listener got unexpected callback for event!");
            console.log(event);
        }
    }
}

export default EventListener;
