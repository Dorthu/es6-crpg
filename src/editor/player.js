import Player from '../player'
import { obj_map } from '../level_loader'
import LevelSerializer from './level_serializer'
import SpriteObject from '../sprite_object'

class EditorPlayer extends Player {

    make() {
        let target = this._point_in_front();
        let ci = this.inventory.current;
        if(!ci) { console.log('no tiles selected'); return; }
        let mats = [ this.inventory.cmat1, null ];
        console.log(obj_map[ci]);
        console.log(typeof(obj_map[ci]));
        console.log(obj_map[ci] instanceof SpriteObject);
        if(obj_map[ci] && obj_map[ci].occupies()) {
            console.log("making object");
            let c = this.grid.get(target.x, target.z);
            console.log(c);
            if(c) {
                console.log("and here w are");
                c.object = c.make_object(ci, mats, null, null);
            }
        } else {
            let o = this.grid.create(obj_map[ci],
               target, mats, 'editor created this');
        }
    }

    remove() {
        let target = this._point_in_front();
        this.grid.remove(target.x, target.z);
    }

    input(event) {
        if(this.inv_mode) {
            if(event.keyCode == 27) {
                this.inv_mode = false;
                this.inventory.hide_search();
            }
            return;
        }
        if(event.keyCode == 85) {
            this.make();
        } else if(event.keyCode == 68) {
            this.remove();
        } else if(event.keyCode == 83) {
            new LevelSerializer(this.grid).serialize_level();
        } else if(event.keyCode == 69) {
            event.preventDefault();
            this.inv_mode = true;
            this.inventory.search_macro(this);
        } else {
            super.input(event);
        }
    }
}

export default EditorPlayer;
