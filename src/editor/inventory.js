import Awesomplete from 'awesomplete'
import Inventory from '../inventory'
import { obj_map } from '../level_loader'
import { mat_map } from '../texture_lookup'

let editor_options = [];

for(let c of Object.keys(obj_map)) {
    editor_options.push({ label: "object::"+c, value: 'obj::'+c });
}

class EditorInventory extends Inventory {
    constructor() {
        super();

        for(let c of Object.keys(mat_map)) {
            editor_options.push({ label: "material::"+c, value: 'mat::'+c});
        }

        this.slot2 = false;
        this.searchbox = null;
        this.player = null;
        this.current = null;
        this.cmat1 = null;
        this.cmat2 = null;
    }

    update() {
        let serial = '';
        serial += '<p>Object: ' + (this.current ? this.current : 'None') + '</p>';
        serial += '<p>' + (this.slot2 ? '' : '>') + 'Mat1: ' + (this.cmat1 ? this.cmat1 : 'None') + '</p>';
        serial += '<p>' + (this.slot2 ? '>' : '') + 'Mat2: ' + (this.cmat2 ? this.cmat2 : 'None') + '</p>';

        this.equipe.innerHTML=serial;
    }

    toggle_slot() {
        this.slot2 = !this.slot2;
        this.update();
    }

    search_macro(player) {
        this.player = player;

        let i = document.createElement('input');
        i.id = 'searchbox';
        i.className = 'input-lg';
        i.type = 'text';
        i.placeholder = 'Search for Entites or Materials';
        i.onkeydown = ent => this.searchbox_keydown(ent);
        i.addEventListener('awesomplete-selectcomplete', ent => this.accept_search());
        console.log("doing the do");

        let s = document.createElement('span');
        s.className = 'editor-search';
        s.appendChild(i);
        document.body.appendChild(s);
        new Awesomplete(i, { list: editor_options, autoFirst: true });
        i.focus();

        this.searchbox = s;
    }

    hide_search() {
        document.body.removeChild(this.searchbox);
        this.searchbox = null;
        if(this.player) {
            this.player.inv_mode = false;
            this.player = null;
        }
    }

    accept_search() {
        let i = document.getElementById('searchbox');
        let res = i.value;

        console.log(res);
        if(res) {
            let parts = res.split("::");
            console.log(parts);
            if(parts && parts.length == 2) {
                if(parts[0] == 'obj') {
                    ///selected an object class
                    this.current = parts[1];
                } else if(parts[0] == 'mat') {
                    ///selected a material
                    if(this.slot2) {
                        this.cmat2 = parts[1];
                        this.slot2 = false;
                    } else {
                        this.cmat1 = parts[1];
                    }
                }
                this.update();
            }
        }

        ///nomatter what, they hit enter - we're done here
        this.hide_search();
    }

    searchbox_keydown(event) {
        ///don't need this?
    }
}

export default EditorInventory;
