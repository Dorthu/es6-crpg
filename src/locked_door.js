import Door from './door'
import { get_material } from './texture_lookup'

class LockedDoor extends Door {
    constructor(grid, loc, mats, desc, extra) {
        super(grid, loc, mats, desc, extra);

        this.key_name = extra['key'];
        this.locked = true;
        this.unlocked_mat = get_material(mats[1]);
    }

    use(player) {
        if(this.locked) {
            if(player.inventory.has(this.key_name)) {
                this.unlock();
                player.inventory.remove(this.key_name);
                player.logbox.add_message('unlocked!');
            }
            else {
                player.logbox.add_message('needs key');
            }
        } else {
            super.use(player);
        }
    }

    unlock() {
       this.locked=false;
       for(let m of this.meshes) {
            m.material = this.unlocked_mat;
       }
    }
}

export default LockedDoor;
