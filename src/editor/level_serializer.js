
let rev_map = {};

export function init_serializer(map) { 
    for(let e of map) {
        rev_map[map[e]] = e;
    }
}

class LevelSerializer {
    constructor(grid) {
        this.grid = grid;
    }

    serialize(obj) {
        return { type: 'enclosed', mats: ['mat2', 'mat3'] };
    }

    serialize_level() {
        let serial = [];
        for(let e of this.grid.grid) {
            let row = [];
            for(let c of e) {
                if(!c) { row.push(null); }
                row.push(this.serialize(c));
            }
            serial.push(row);
        }

        let e = document.createElement("div");
        e.innerHTML = "<pre>JSON GOES HERE</pre>";
        document.body.appendChild(e);
    }
}

export default LevelSerializer;
