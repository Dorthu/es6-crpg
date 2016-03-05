import SolidItem from './solid_item'

class NPC extends SolidItem {
    constructor(grid, loc, mats, desc, extra) {
        super(grid, loc, mats, desc, extra);

        this.sayings = extra.dialog;
        this.cur_saying = 0;
        this.useable = true;
    }

    use(player) { 
        if(this.cur_saying >= this.sayings.length) { 
            this.cur_saying = 0;
        }
        player.logbox.add_message(this.sayings[this.cur_saying]);
        this.cur_saying++;
    }
}

export default NPC;
