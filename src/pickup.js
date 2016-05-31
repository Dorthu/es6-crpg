import SpriteObject from './sprite_object'
import InventoryItem from './inventory_item'

class Pickup extends SpriteObject {
    constructor(grid, loc, mats, desc, extra) {
        super(grid, loc, mats, desc, extra);
        
        this.name = extra.name;
        this.useable = true;
    }

    use(player) {
        this.remove();

        let inv_item = new InventoryItem(this.name, this._mats[0], this.extra['effects']);
        player.inventory.add_item(inv_item);
    }

    remove() {
        let o = this.grid.get(this.loc.x, this.loc.z);
        o.object = null;

        this.grid.scene.remove(this.meshes[0]);
    }
}

export default Pickup;
