import SolidItem from '../solid_item'

class NPC extends SolidItem {
    constructor(grid, loc, mats, desc, extra) {
        super(grid, loc, mats, desc, extra);
        this.useable = true;

        if(extra['dialog']) {
            this.dialog = extra.dialog;
        }
    }

    use(player) { 
        player.overlay.add_dialog(player.grid.level.get_dialog(this.dialog));
    }
}

export default NPC;
