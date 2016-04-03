import Player from '../player'
import PlayerStatus from './status'

class GamePlayer extends Player {
    constructor(grid, loc, inventory, facing=0, health=100) {
        super(grid, loc, inventory, facing=facing);

        this.stats = [
            { name: 'Health', value: health, max: 100, color: 'green' },
            { name: 'Mana', value: 16, max: 30, color: 'blue' }
        ];

        this.status_ui = new PlayerStatus(this);
        this.status_ui.update();
    }

    suffer_attack() {
        this.stats[0].value -= 7;
        this.status_ui.update();
    }

    input(event) {
        if(event.keyCode == 81) {
            this.stats[0].value -= 4;
            this.status_ui.update();
        }
        super.input(event);
    }
}

export default GamePlayer;
