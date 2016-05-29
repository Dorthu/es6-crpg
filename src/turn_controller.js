
class TurnController {
    constructor(grid) {
        this.grid = grid;

        this.input_listener = ent => this.input(ent);
        document.addEventListener('keydown', this.input_listener);
    }

    destroy() {
        document.removeEventListener('keydown', this.input_listener);
    }

    input(event) {
        if(this.grid.player) {
            this.grid.player.input(event);
        }
    }
}

export default TurnController;
