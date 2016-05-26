import Player from '../player'
import PlayerStatus from './status'
import { shoot, push } from './attacks'

class GamePlayer extends Player {
    constructor(grid, loc, inventory, facing=0, stats, overlay) {
        super(grid, loc, inventory, facing=facing);

        this.has_turn = true;
        this.stats = stats;
        this.stats.update();
        this.overlay = overlay;
    }

    check_status() {
        this.stats.update();
        if(this.stats.health.value < 1) {
            this.logbox.add_message('it hurts');
        }
    }

    suffer_attack(attack) {
        if(attack['damage']) {
            this.stats.health.value -= attack.damage;
        }
        this.check_status();
    }

    reload() {
        if(this.stats.ammo.value > 0 && this.stats.chambers.value < this.stats.chambers.max) {
            this.stats.chambers.value++;
            this.stats.ammo.value--;
            this.stats.update();
        }
    }

    input(event) {
        console.log("got input");
        if(!this.has_turn) { return; }
        this.has_turn = false;

        if(event.keyCode == 32) {
            shoot(this);
        } else if(event.keyCode == 80) {
            push(this);
        } else if(event.keyCode == 82) {
            this.reload();
        } else if(event.keyCode == 84) {
            this.overlay.add_dialog([
                { 'speaker': 'player', 'emote': 'happy', 'msg': "So far, so good, huh?" },
                { 'speaker': 'player', 'emote': 'bored', 'msg': "..." },
                { 'speaker': 'player', 'emote': 'sad', 'msg': "I should stop talking to myself.." }
            ]);
        }
        super.input(event);
    }
}

export default GamePlayer;
