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
        this.health = { name: 'Health', value: health, max: 100, color: 'green' };
        this.stats = [
            this.health,
            { name: 'Mana', value: 16, max: 30, color: 'blue' }
        ];
    }

    update() {
        let html = '';
        for(let stat of this.stats) {
            html += this._get_status_bar(stat.name, 100*(stat.value/stat.max), stat.color);
        }
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
}

export default PlayerStatus;
