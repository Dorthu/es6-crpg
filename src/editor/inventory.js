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
            this.add_item({ name: c, equips_to: 'tile'});
        }
        for(let c of Object.keys(mat_map)) {
           this.add_item({ name: c, equips_to: 'mat_1', icon: c });
        }
    }

    _mat_2_equip() {
        let i = this.items[this.selected];
        if (i['equips_to'] && i.equips_to === 'mat_1') {
            let tmp = this.equipped['mat_2'];
            this.equipped['mat_2'] = i;
            if(tmp) {
                this.items[this.selected] = tmp;
            } else {
                this.items.splice(this.selected, 1);
                this.selected--;
                if(this.selected == -1 && this.items.length) {
                    this.selected = 0;
                }
            }
            console.log("Equipped");
        }
        this.update();
    }

    _get_icon_for_item(item) {
        if(item['icon']) {
            return '<img src="/resources/textures/'+item.icon+'.png"/>';
        }
        return '<img src="/resources/inventory/_not_found.png"/>';
    }

    input(event) {
        if(event.keyCode == 82) {
            this._mat_2_equip();
        } else {
            super.input(event);
        }
    }
}

export default EditorInventory;
