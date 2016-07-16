import { store_set_global, store_get_global } from '../persistence_manager'

const color_map = {
    grey: 'default',
    blue: 'primary',
    green: 'success',
    red: 'danger',
    lightblue: 'info',
    yellow: 'warning'
};

class PlayerStatus {
    constructor(health, load=true) {
        this.section = document.getElementById('player_status');
        this.health = { name: 'Health', value: health, max: 100, color: 'green', type: 'bar' };
        this.chambers = { name: 'Chambers', value: 6, max: 6, type: 'chambers' };
        this.ammo = { name: 'Ammo', value: 4, max: 12, type: 'ammobar' };
        this.stats = [
            this.health,
        ];
        if(load) { this.load(); }
    }

    update(show_anim=false) {
        this.save();
        let html = '';
        for(let stat of this.stats) {
            html += this._get_status_bar(stat.name, 100*(stat.value/stat.max), stat.color);
        }
        html += "<div>"+this._get_chambers(this.chambers.value, show_anim);
        html += this._get_ammo(this.ammo.value)+"</div>";

        this.section.innerHTML = html;
    }

    _get_status_bar(title, percent, color='green') {
        return title
            + '<div class="progress">'
            + '<div class="progress-bar progress-bar-'+color_map[color]+'" role="progressbar"'
            + 'aria-valuenow="'+percent+'" aria-valuemin="0" aria-valuemax="100"'
            + 'style="width: '+percent+'%;" id="player_health">'
            + '<span class="sr-only">'+percent+'</span>'
            + '</div>'
            + '</div>';
    }

    _get_chambers(rounds, animate) {
        if(animate) {
            return "<img src='/resources/inventory/chambers_"+rounds+"_rot.gif?r="+Math.random()+"'/>";
        }
        return "<img src='/resources/inventory/chambers_"+rounds+".png' />";
    }

    _get_ammo(ammo) {
        let ret = "<span class='ammobar'>";
        for(let i=0; i<ammo; i++) {
            ret += "<img src='/resources/inventory/spare_bullet.png'/>";
        }
        ret += "</span>";
        return ret;
    }

    save() {
        store_set_global("player-health", this.health.value);
        store_set_global("player-chambers", this.chambers.value);
        store_set_global("player-ammo", this.ammo.value);
    }

    load() {
        if(store_get_global("player-health")) {
            this.health.value = store_get_global("player-health");
            this.chambers.value = store_get_global("player-chambers");
            this.ammo.value = store_get_global("player-ammo");
        }
    }
}

export default PlayerStatus;
