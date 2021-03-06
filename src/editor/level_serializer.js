let rev_map = {};

export function init_serializer(map) {
    for(let e of Object.keys(map)) {
        rev_map[map[e].name] = e;
    }
}

class LevelSerializer {
    constructor(grid) {
        this.grid = grid;
    }

    serialize(obj) {
        let serial = {
            type: rev_map[obj.constructor.name],
            mats: obj._mats,
            desc: obj.desc
        };
        if(obj['object']) {
            serial['extra'] = {
                object: {
                    type: rev_map[obj.object.constructor.name],
                    mats: obj.object._mats,
                    desc: obj.object.desc
                }
            };
        }

        return serial;
    }

    serialize_level() {
        let serial = [];
        for(let x = 0; x < this.grid.grid.length; x++ ) {
            for(let z = 0; z < this.grid.grid[x].length; z++) {
                if(!this.grid.grid[x][z]) { continue; }
                if(!serial[z]) { serial[z] = []; }
                serial[z][x] = this.serialize(this.grid.grid[x][z]);
            }
        }

        let e = document.createElement("div");
        e.innerHTML = "<pre>" +JSON.stringify(serial)+"</pre>";
        document.body.appendChild(e);
    }
}

export default LevelSerializer;
