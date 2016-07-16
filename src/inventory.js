import { store_get_global, store_set_global } from './persistence_manager'
import InventoryItem from './inventory_item'

class Inventory {
    constructor() {
        this.equipe = document.getElementById("equipped");
        this.inve = document.getElementById("inventory");
        this.items = [];
        this.selected = -1;
        this.equipped = { };
    }

    add_item(item) {
        this.items.push(item);
        if(this.selected === -1) { this.selected = 0; }
        this.update();
    }

    update() {
        this.serialize();
        let serial = '';
        let sel = this.selected < this.items.length ? this.items[this.selected] : null;

        for(let item of this.items) {
            serial += this._get_item_html(item, sel === item);
        }

        this.inve.innerHTML = serial;

        ///equipped things
        serial = '';
        for(let slot of Object.keys(this.equipped)) {
            serial += this._get_equipped_html(slot);
        }

        this.equipe.innerHTML = serial;
    }

    has(name) {
        for(let c of this.items) {
            if(c['name'] && c.name == name) {
                return true;
            }
        }
        return false;
    }

    remove(name) {
        if(name instanceof Object) {
            if(name['name'])
                name = name['name'];
            else
                return;
        }
        if(this.items.length === 1) {
            if(this.items[0]['name'] && this.items[0].name == name) {
                this.items = [];
                this.selected = -1;
            }
            this.update();
            return;
        }
        for(let c=0; c<this.items.length; c++) {
            if(this.items[c]['name'] && this.items[c].name == name) {
                this.items.splice(c, 1);
                if(this.selected >= this.items.length) {
                    this.selected = this.items.length-1;
                }
                break;
            }
        }
        this.update();
    }

    _get_item_html(item, selected=false) {
        return '<div class="col-md-4 invitem '+(selected ? 'invselected' : '')+'">'
                    +this._get_icon_for_item(item)
                    +item.name
                +'</div>';
    }

    _get_icon_for_item(item) {
        if(item['icon']) {
            return '<img src="/resources/inventory/'+item.icon+'.png"/>';
        }
        return '<img src="/resources/inventory/_not_found.png"/>';
    }

    _get_equipped_html(slot) {
        return '<div class="col-md-4 equipitem"><strong>'+slot+'</strong><br/>'+
            (this.equipped[slot] ? this.equipped[slot].name : 'empty')
            +'</div>';
    }

    use(player) {
        if(this.items[this.selected]) {
            this.items[this.selected].use(player);
        }
    }

    input(event, player) {
        if(!this.items) { return; }

        if(event.keyCode == 37) {
            let nsel = this.selected - 1;
            if(nsel < 0) { nsel = this.items.length -1; }
            this.selected = nsel;
        } else if(event.keyCode == 38) {
            ///up one
            let nsel = this.selected - 3;
            if(nsel > -1) {
                this.selected = nsel;
            }
        } else if(event.keyCode == 39) {
            let nsel = this.selected + 1;
            if(nsel >= this.items.length) { nsel = 0; }
            this.selected = nsel;
        } else if(event.keyCode == 40) {
            ///down one
            let nsel = this.selected + 3;
            if(nsel < this.items.length) {
                this.selected = nsel;
            }
        } else if(event.keyCode == 69) {
            this.use(player);
            this.update();
        }

        this.update();
    }

    serialize() {
        store_set_global("inventory", JSON.stringify(this.items));
    }

    deserialize() {
        this.items = JSON.parse(store_get_global("inventory", '[]'));

        let t = [];
        for(let c of this.items) {
            t.push(new InventoryItem(c['name'], c['icon'], c['effects']));
        }
        this.items = t;

        this.selected = 0;
    }
}

export default Inventory;
