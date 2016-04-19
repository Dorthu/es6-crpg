/*
    Editor TODOs:
    > "get" key to get the values of whatever is in front of you
    > "cancel command" key (backspace?) to clear entered command, take no action
*/
import Player from '../player'
import { obj_map } from '../level_loader'
import LevelSerializer from './level_serializer'
import SpriteObject from '../sprite_object'

const edirs = [ { x: 1, z: 0 }, { x: 0, z: 1 }, { x: -1, z: 0 }, { x: 0, z: -1 } ];
const command_keys = [ '1','2','3','4','5','6','7','8','9','0','F','W','R','X' ];
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
                case 'W':
                    this.wall_fill();
                    break;
                case 'R':
                    if(this.command.indexOf('X')!=-1) {
                        this.make_room();
                    }
                    break;
                default:
                    let amount = 1;
                    if(this.command.length) {
                        amount = Number.parseInt(this.command.join(''));
                    }
                    let lead = this._point_in_front();
                    let dir = { x: lead.x - this.loc.x, z: lead.z - this.loc.z };
                    for(let mag=1; mag<=amount; mag++) {
                       command({x: this.loc.x + dir.x * mag, y: 0, z: this.loc.z + dir.z * mag });
                    }
                    break;
            }
        }
        else {
            let target = this._point_in_front();
            command({ x: target.x, y: 0, z: target.z });
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

    wall_fill() {
        /*
            This runs as a flood fill, but fills all empty edge spaces.
        */
        let visited = [];
        let self = this;

        function outline(target, target_obj, target_mat) {
            if(visited.indexOf(target.x+";"+target.z) != -1) { return; }
            visited.push(target.x+";"+target.z);
            let o = self.grid.get(target.x, target.z);

            if(!o) {
                self.make(target);
                return;
            }

            if(o.constructor.name != target_obj || o._mats[0] != target_mat
                    || o._mats[0] == self.inventory.cmat1) {
                return;
            }

            for(let d of edirs) {
                outline({ x: target.x + d.x, z: target.z + d.z }, target_obj, target_mat);
            }
        }

        let target = this._point_in_front();
        let to = this.grid.get(target.x, target.z);

        if(to) {
            outline(target, to.constructor.name, to._mats[0]);
        }

    }

    make_room() {
        this.command = this.command.splice(1);
        let [len, wid] = this.command.join('').split('X');
        if(!len || !wid) {
            return;
        }
        len = Number.parseInt(len);
        wid = Number.parseInt(wid);
        //align with the player's facing
        if(this.facing % 2) { [ len, wid ] = [ wid, len ]; }

        let pos = this._point_in_front();

        if(this.facing == 0) {
            pos.x += Math.floor(wid/2);
            pos.z -= len - 1;
        }
        else if(this.facing == 1) {
            pos.x -= wid - 1;
            pos.z += Math.floor(wid/2);
        } else {
            pos.x += Math.floor(wid/2) * edirs[this.facing].x;
            pos.z += Math.floor(wid/2) * edirs[this.facing].z;
        }


        for(let c = pos.x; c<pos.x+wid; c++) {
            for(let d = pos.z; d<pos.z+len; d++) {
                this.make({x: c, z: d});
            }
        }
    }

    make(target) {
        let ci = this.inventory.current;
        if(!ci) { console.log('no tiles selected'); return; }
        let mats = [ this.inventory.cmat1, this.inventory.cmat2 ];
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

    toggle_bit(bit) {
        let target = this._point_in_front();
        let o = this.grid.get(target.x, target.z);
        if(o) {
            let obj = o["object"];
            if(obj) {
                if(obj[bit]) { obj[bit] = !obj[bit] }
                else { obj[bit] = true; }
            }
        }
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
        }else if(event.keyCode == 32) {
            this.do_command(e => this.make(e));
        } else if(event.keyCode == 68) {
            this.do_command(e => this.remove(e));
        } else if(event.keyCode == 90) {
            this.do_command(e => this.set_desc(e));
        } else if(event.keyCode == 84) {
            this.toggle_bit('solid');
        } else if(event.keyCode == 83) {
            new LevelSerializer(this.grid).serialize_level();
        } else if(event.keyCode == 81) {
            this.inventory.toggle_slot();
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
