import Inventory from '../inventory'

class GameInventory extends Inventory {
    constructor() {
        super();

        this.equipped = {
            head: null,
            body: null,
            left_hand: null,
            right_hand: null,
            feet: null,
            accessory: null
        };
    }
}

export default GameInventory;
