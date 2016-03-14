
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
        let serial = '';
        let sel = this.selected < this.items.length ? this.items[this.selected] : null;

        for(let item of this.items) {
            serial += this._get_item_html(item, sel === item);
        }

        this.inve.innerHTML = serial;

        ///equipped things
        serial = '';
        console.log(Object.keys(this.equipped));
        for(let slot of Object.keys(this.equipped)) {
            serial += this._get_equipped_html(slot);
        }

        this.equipe.innerHTML = serial;
    }

    _get_item_html(item, selected=false) {
        return '<div class="col-md-4 invitem '+(selected ? 'invselected' : '')+'">'+item.name+'</div>';
    }

    _get_equipped_html(slot) {
        return '<div class="col-md-4 equipitem"><strong>'+slot+'</strong><br/>'+
            (this.equipped[slot] ? this.equipped[slot].name : 'empty')
            +'</div>';
    }

    equip() {
        let i = this.items[this.selected];
        if(i['equips_to']) {
            let tmp = this.equipped[i.equips_to];
            console.log(tmp);
            this.equipped[i.equips_to] = i;
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
        else {
            console.log("Can't equip this");
        }
    }

    input(event) {
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
            this.equip();
        }

        this.update();
    }
}

export default Inventory;
