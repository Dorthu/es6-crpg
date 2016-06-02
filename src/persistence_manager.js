const store = localStorage;

let store_name = null;
let prefix = null;

export function store_init(name) {
    store_name = name;
}

export function store_set_prefix(pref) {
    prefix = pref;
    console.log("setting prefix to "+prefix);
}

export function store_get_prefix() {
    return prefix;
}

function get_key(key) {
    if(!store_name || !prefix) throw "Accessing store without prefix!";
    return store_name + "::" + prefix + "::" + key;
}

export function store_set(key, value) {
    store.setItem(get_key(key), value);
}

export function store_get(key, def=null) {
    let r = store.getItem(get_key(key));
    if(!r) return def;
    return r;
}
