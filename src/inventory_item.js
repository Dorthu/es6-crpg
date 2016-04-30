function equip(i, effect, inventory) {
    let tmp = inventory.equipped[effect.target];
    inventory.equipped[effect.target] = i;
    if(tmp) {
        inventory.items[inventory.selected] = tmp;
    } else {
        inventory.items.splice(inventory.selected, 1);
        inventory.selected--;
        if(inventory.selected == -1 && inventory.items.length) {
            inventory.selected = 0;
        }
    }
    console.log("Equipped");
}

function heal(i, effect, player, inventory) {
    player.stats.health.value += effect.amount;
    player.stats.update();
    remove_item(i, effect, inventory);
}

function remove_item(i, effect, inventory) {
    inventory.remove(i);
}

class InventoryItem {
    constructor(name, icon, effects=null) {
        this.name = name;
        this.icon = icon;
        this.effects = effects;
    }

    use(player) {
        ///handle effects
        for(let e of this.effects) {
            switch(e['type']) {
                case 'equip':
                    equip(this, e, player.inventory);
                    break;
                case 'heal':
                    heal(this, e, player, player.inventory);
                    break;
                case null:
                    break;
                default:
                    console.log("Unhandled effect "+e['effect']);
            }
        }
    }
}

export default InventoryItem;
