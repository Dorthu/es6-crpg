import { THREE, geo } from './Three'

import Grid from './grid'
import Wall from './wall'
import Space from './space'
import CeilingSpace from './ceiling_space'
import Door from './door'

const obj_map = {
    'space':    Space,
    'wall':     Wall,
    'enclosed': CeilingSpace,
    'door': Door
}


class LevelLoader {
    constructor() {
        //pass
    }

    load_level(data) {
        let grid = new Grid();

        for(let i=0; i<data.length; i++) {
            let curr = data[i];
            for(let j=0; j<curr.length; j++) {
                let cur = curr[j];
                if(cur) {
                    grid.create(obj_map[cur.type], { x: j, z: i }, cur.mats, cur.desc, cur.extra);
                }
            }
        }

        return grid;
    }
}

export default LevelLoader;
