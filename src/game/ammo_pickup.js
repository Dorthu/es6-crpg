import Pickup from '../pickup'

class AmmoPickup extends Pickup {
    constructor(grid, loc, mats, desc, extra) {
        super(grid, loc, mats, desc, extra);

        this.ammo_type = extra['ammo_type'] ? extra.ammo_type : 'ammo';
        this.amount = extra['amount'] ? extra.amount : 6;
    }

    use(player) {
        this.destroy();

        player.stats[this.ammo_type].value += this.amount;
        if(player.stats[this.ammo_type].value > player.stats[this.ammo_type].max) {
            player.stats[this.ammo_type].value = player.stats[this.ammo_type].max;
        }
        player.stats.update();
    }
}

export default AmmoPickup;
