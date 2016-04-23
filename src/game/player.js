import Player from '../player'
import PlayerStatus from './status'

class GamePlayer extends Player {
    constructor(grid, loc, inventory, facing=0, stats, overlay) {
        super(grid, loc, inventory, facing=facing);

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

    shoot() {
        this.overlay.add('shoot-anim-loop', e => this.shoot_complete(e) );
    }

    shoot_complete() {
        this.logbox.add_message('shot');
    }

    input(event) {
        if(event.keyCode == 81) {
            this.stats.health.value -= 4;
            this.stats.update();
        } else if(event.keyCode == 32) {
            this.shoot();
        }
        super.input(event);
    }
}

export default GamePlayer;
