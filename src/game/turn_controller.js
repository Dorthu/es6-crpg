import { promise as sleep } from 'es6-sleep'

class TurnController {
    constructor(grid) {
        this.grid = grid;
        this.event_manager = grid.event_manager;
        this.event_manager.subscribe("pass_turn", e => this.player_passed(e), this);
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

export default TurnController;
