
class Inventory {
    constructor() {
        this.elm = document.getElementById("inventory");
        this.items = [];
        this.selected = -1;
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

        this.elm.innerHTML = serial;
    }

    _get_item_html(item, selected=false) {
        return '<div class="col-md-4 invitem '+(selected ? 'invselected' : '')+'">'+item.name+'</div>';
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
        }

        this.update();
    }
}

export default Inventory;
