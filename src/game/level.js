import { store_get, store_set, store_set_prefix, store_set_global } from '../persistence_manager'

class Level {
    constructor(grid, data) {
        this.grid = grid;
        this._data = data;
        this._dialog = data['dialog'];

        this.player_start = data['player_start'];
        this.persisted_values = data['persisted'];

        store_set_global("clevel", data['level-uri']);
        store_set_prefix(data['level-uri']);
    }

    get_dialog(name) {
        if(this._dialog[name]) {
            return this._dialog[name];
        }
        return [];
    }

    get_value(key) {
        if(this.persisted_values[key] !== undefined) {
            return store_get(key, this.persisted_values[key]);
        }
        return null;
    }

    set_value(key, value) {
        if(this.persisted_values[key]) {
            return store_set(key, value);
        }
    }
}

export default Level;
