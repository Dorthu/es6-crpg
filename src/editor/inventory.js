import Inventory from '../inventory'
import { obj_map } from '../level_loader'
import { mat_map } from '../texture_lookup'

class EditorInventory extends Inventory {
    constructor() {
        super();

        this.equipped = {
            tile: null,
            mat_1: null,
            mat_2: null,
            object: null

        };

        for(let c of Object.keys(obj_map)) {
            this.add_item({ name: c, equips_to: 'tile' });
        }
        for(let c of Object.keys(mat_map)) {
            this.add_item({ name: c, equips_to: 'mat_1'});
        }
    }
}

export default EditorInventory;
