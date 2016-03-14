import Player from '../player'

class GamePlayer extends Player {
    constructor(grid, loc, inventory, facing=0, health=100) {
        super(grid, loc, inventory, facing=facing);

        this.health = health;
    }
}

export default GamePlayer;
