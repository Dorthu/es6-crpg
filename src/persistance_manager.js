class PersistanceManager {
    constructor(store_name) {
        this.store = localStorage;
        this.store_name = store_name;
        this.prefix = null;
    }

    set_prefix(prefix) {
        this.prefix = prefix;
    }

    _prefix() {
        if(!this.store_name || !this.prefix) throw "Accessing store without prefix!";
        return this.store_name + "::" + this.prefix;
    }

    set(key, value) {
        this.store.setItem(this._prefix()+"::"+key, value);
    }

    get(key, def=null) {
        let r = this.store.getItem(this._prefix()+"::"+key);
        if(!r) return def;
        return r;
    }
}

export default PersistanceManager;
