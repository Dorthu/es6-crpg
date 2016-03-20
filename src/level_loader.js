import { THREE, geo } from './Three'

import Grid from './grid'
import Wall from './wall'
import Space from './space'
import CeilingSpace from './ceiling_space'
import Door from './door'
import Pickup from './pickup'
import SolidItem from './solid_item'
import NPC from './npc'
import AI from './game/ai'
import TallSprite from './tall_sprite'
import LockedDoor from './locked_door'

export const obj_map = {
    'space':    Space,
    'wall':     Wall,
    'enclosed': CeilingSpace,
    'door': Door,
    'pickup': Pickup,
    'solid': SolidItem,
    'npc': NPC,
    'ai': AI,
    'tall': TallSprite,
    'locked': LockedDoor
}

///why is this a class?
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
