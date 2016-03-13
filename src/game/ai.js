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
        this.ai_wander();
    }

    /*
        Below are generic behaviors that other AIs may use.  The intention is that
        an AI subclass with manage states and switch between these behaviors, possibly
        with a few of its own behaviors defined as well.
    */
    ai_wander() {
        /*
            This will cause the AI to wander around the area.
        */
        const dirs = [ { x: 0, z: 1 }, { x: 1, z: 0 }, { x: 0, z: -1 }, { x: -1, z: 0 } ];
        let options = [ { x: 0, z: 0 } ];
        for(let d of dirs) {
            if(this.grid.can_move_to({x: this.loc.x + d.x, z: this.loc.z + d.z })) {
                options.push(d);
            }
        }

        let choice = options[Math.floor(Math.random() * options.length)];
        if(choice.x || choice.z) {
            this.grid.object_move(this, { x: this.loc.x + choice.x, y: this.loc.y, z: this.loc.z + choice.z });
        }
    }
}

export default AI;
