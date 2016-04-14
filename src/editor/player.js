import Player from '../player'
import { obj_map } from '../level_loader'
import LevelSerializer from './level_serializer'
import SpriteObject from '../sprite_object'

const edirs = [ { x: 1, z: 0 }, { x: 0, z: 1 }, { x: -1, z: 0 }, { x: 0, z: -1 } ];
const command_keys = [ '1','2','3','4','5','6','7','8','9','0', 'F' ];
let command_keycodes = [];
for(let k of command_keys) {
    command_keycodes.push(k.charCodeAt(0));
}

class EditorPlayer extends Player {

    constructor(grid, loc, inventory, facing=0) {
        super(grid, loc, inventory, facing);

        this.command = [];
    }

    do_command(command) {
        if(this.command.length) {
            switch(this.command[0]){
                case 'F':
                    let node = this._point_in_front();
                    let o = this.grid.get(node.x, node.z);
                    if(o) {
                        this.flood_fill(node, o.constructor.name, o._mats[0]);
                    }
                    break;
            }
        }


        let amount = 1;
        if(this.command.length) {
            amount = Number.parseInt(this.command.join(''));
        }
        let lead = this._point_in_front();
        let dir = { x: lead.x - this.loc.x, z: lead.z - this.loc.z };
        for(let mag=1; mag<=amount; mag++) {
           command({x: this.loc.x + dir.x * mag, y: 0, z: this.loc.z + dir.z * mag });
        }
        this.command = [];
    }

    flood_fill(node, target_obj, target_color) {
        let o = this.grid.get(node.x, node.z);
        if(!o || o.constructor.name != target_obj
            || o._mats[0] == this.inventory.cmat1
            || o._mats[0] != target_color) {
                return;
        }

        this.make(node);
        for(let d of edirs) {
            this.flood_fill({ x: node.x + d.x, z: node.z + d.z }, target_obj, target_color);
        }
    }

    make(target) {
        let ci = this.inventory.current;
        if(!ci) { console.log('no tiles selected'); return; }
        let mats = [ this.inventory.cmat1, null ];
        if(obj_map[ci] && obj_map[ci].occupies()) {
            let c = this.grid.get(target.x, target.z);
            if(c) {
                c.object = c.make_object(ci, mats, null, null);
            }
        } else {
            let o = this.grid.create(obj_map[ci],
               target, mats, 'editor created this');
        }
    }

    remove(target) {
        this.grid.remove(target.x, target.z);
    }

    set_desc(target) {
        let i = window.prompt("Enter description");
        this.grid.get(target.x, target.z).desc = i;
    }

    input(event) {
        if(this.inv_mode) {
            if(event.keyCode == 27) {
                this.inv_mode = false;
                this.inventory.hide_search();
            }
            return;
        }
        if(command_keycodes.includes(event.keyCode)) {
            this.command.push(String.fromCharCode(event.keyCode));
        }else if(event.keyCode == 85) {
            this.do_command(e => this.make(e));
        } else if(event.keyCode == 68) {
            this.do_command(e => this.remove(e));
        } else if(event.keyCode == 84) {
            this.do_command(e => this.set_desc(e));
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
