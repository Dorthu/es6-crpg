import { generator as sleep } from 'es6-sleep'

class TurnController {
    constructor(grid) {
        this.grid = grid;
        this.event_manager = grid.event_manager;
        this.event_manager.subscribe("pass_turn", e => this.player_passed(e), this);
    }

    player_passed(event) {
        console.log("player_passed");
        if(this.event_manager.lists['ai_turn']) {
    //        yield sleep(100);
            for(let c of this.event_manager.lists['ai_turn']) {
                c.callback(event);
            }
        }
        /// do things
        let _this = this;
        window.setTimeout(function() {
            _this.grid.player.has_turn = true;
            }, 250);
    }
}

export default TurnController;
