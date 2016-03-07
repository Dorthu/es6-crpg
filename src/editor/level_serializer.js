
let rev_map = {};

export function init_serializer(map) {
    for(let e of Object.keys(map)) {
        rev_map[map[e].name] = e;
    }
    console.log(rev_map);
}

class LevelSerializer {
    constructor(grid) {
        this.grid = grid;
    }

    serialize(obj) {
        console.log(obj);
        return { type: rev_map[obj.constructor.name], mats: obj._mats };
    }

    serialize_level() {
        let serial = [];
        for(let e of this.grid.grid) {
            let row = [];
            for(let c of e) {
                if(c) {
                    row.push(this.serialize(c));
                } else {
                    row.push(null);
                }
            }
            serial.push(row.reverse());
        }

        let e = document.createElement("div");
        e.innerHTML = "<pre>" +JSON.stringify(serial)+"</pre>";
        document.body.appendChild(e);
    }
}

export default LevelSerializer;
