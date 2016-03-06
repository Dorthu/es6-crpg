import Player from '../player'
import { obj_map } from '../level_loader'

class EditorPlayer extends Player {

    make() {
        let target = this._point_in_front();
        let ci = this.inventory.items[this.inventory.selected];
        let o = this.grid.create(obj_map[ci.name], 
           target, ci.mats, 'editor created this');
    }

    remove() { 
        let target = this._point_in_front();
        this.grid.remove(target.x, target.z);
    }

    input(event) {
        if(event.keyCode == 85) {
            this.make();
        } else if(event.keyCode == 68) {
            this.remove();
        }
        else {
            super.input(event);
        }
    }
}

export default EditorPlayer;
