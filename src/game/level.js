class Level {
    constructor(data) {
        this._data = data;
        this._dialog = data['dialog'];

        this.player_start = data['player_start'];
    }

    get_dialog(name) {
        if(this._dialog[name]) {
            return this._dialog[name];
        }
        return [];
    }
}

export default Level;
