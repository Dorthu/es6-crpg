import { promise as sleep } from 'es6-sleep'
import TurnController from '../turn_controller'

class GameTurnController extends TurnController {
    constructor(grid) {
        super(grid);
        this.event_manager = grid.event_manager;
        this.event_manager.subscribe("pass_turn", e => this.player_passed(e), this);
    }

    input(event) {
        let p = this.grid.player.overlay.blocking();
        if(p) {
            p.input(event);
        } else if(this.grid.player.has_turn) {
            this.grid.player.input(event);
        }

        event.preventDefault();
    }

    async player_passed(event) {
        await sleep(250);

        if(this.event_manager.lists['ai_turn']) {
            for(let c of this.event_manager.lists['ai_turn']) {
                if(c.callback(event)) {
                    await sleep(250);
                }
            }
        }
        this.grid.player.has_turn = true;
    }
}

export default GameTurnController;
