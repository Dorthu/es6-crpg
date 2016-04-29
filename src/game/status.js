const color_map = {
    grey: 'default',
    blue: 'primary',
    green: 'success',
    red: 'danger',
    lightblue: 'info',
    yellow: 'warning'
};

class PlayerStatus {
    constructor(health) {
        this.section = document.getElementById('player_status');
        this.health = { name: 'Health', value: health, max: 100, color: 'green', type: 'bar' };
        this.chambers = { name: 'Chambers', value: 6, max: 6, type: 'chambers' };
        this.ammo = { name: 'Ammo', value: 0, max: 12, type: 'ammobar' };
        this.stats = [
            this.health,
        ];
    }

    update(show_anim=false) {
        let html = '';
        for(let stat of this.stats) {
            html += this._get_status_bar(stat.name, 100*(stat.value/stat.max), stat.color);
        }
        html += "<div>"+this._get_chambers(this.chambers.value, show_anim)+"</div>";

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
            return "<img src='/resources/inventory/chambers_"+rounds+"_rot.gif'/>";
        }
        return "<img src='/resources/inventory/chambers_"+rounds+".png' />";
    }
}

export default PlayerStatus;
