import SpriteObject from './sprite_object'

class Pickup extends SpriteObject {
    constructor(grid, loc, mats, desc, extra) {
        super(grid, loc, mats, desc, extra);
        
        this.name = extra.name;
        this.useable = true;
    }

    use(player) {
        console.log('using');
        let o = this.grid.get(this.loc.x, this.loc.z);
        o.object = null;

        this.grid.scene.remove(this.meshes[0]);

        player.inventory.add_item({name: this.name});
    }
}

export default Pickup;
