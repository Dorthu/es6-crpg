import SpriteObject from './sprite_object'

class Pickup extends SpriteObject {
    constructor(grid, loc, mats, desc, extra) {
        super(grid, loc, mats, desc, extra);
        
        this.name = extra.name;
        this.useable = true;
    }

    use(player) {
        let o = this.grid.get(this.loc.x, this.loc.z);
        o.object = null;

        this.grid.scene.remove(this.meshes[0]);

        let inv_item = {
            name: this.name,
            icon: this._mats[0]
        };
        if(this.extra['equips_to']) {
            inv_item['equips_to'] = this.extra.equips_to;
        }

        player.inventory.add_item(inv_item);
    }
}

export default Pickup;
