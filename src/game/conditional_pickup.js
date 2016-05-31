import Pickup from '../pickup'

class ConditionalPickup extends Pickup {
    constructor(grid, loc, mats, desc, extra) {
        super(grid, loc, mats, desc, extra);

        this.condition = extra['if'];
        this.unset_on_use = extra['once'];
        
        if(this.grid.level.get_value(this.condition) !== true) {
            this.grid.post_load_actions.push(() => this.remove());
        }
    }

    use(player) {
        super.use(player);
        if(this.unset_on_use) {
            this.grid.level.set_value(this.condition, false);
        }
    }
}

export default ConditionalPickup;
