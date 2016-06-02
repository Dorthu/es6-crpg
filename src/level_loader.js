import { THREE, geo } from './Three'

import Grid from './grid'
import Wall from './wall'
import Space from './space'
import CeilingSpace from './ceiling_space'
import Door from './door'
import Pickup from './pickup'
import SolidItem from './solid_item'
import NPC from './game/npc'
import AI from './game/ai'
import TallSprite from './tall_sprite'
import LockedDoor from './locked_door'
import FlatObject from './fobj'
import TallWall from './tall_wall'
import AmmoPickup from './game/ammo_pickup'
import TallDoor from './tall_door'
import Level from './game/level'
import ConditionalPickup from './game/conditional_pickup'
import ConditionalLockedDoor from './game/conditional_locked_door'

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
    'locked': LockedDoor,
    'fobj': FlatObject,
    'twall': TallWall,
    'ammo': AmmoPickup,
    'tdoor': TallDoor,
    'cpickup': ConditionalPickup,
    'clocked': ConditionalLockedDoor,
}

///why is this a class?
class LevelLoader {
    constructor() {
        this.level_json = {};
    }

    _get_level(uri) {
        console.log("requesting "+uri);
        console.log(this.level_json);
        if(!this.level_json[uri]) {
            console.log('never seen it');
            let req = new XMLHttpRequest();
            req.open('GET', uri+'.json', false); ///run this synchronously
            req.send(null);

            if(!req.status == 200) { return {}; } ///bad things
            this.level_json[uri] = JSON.parse(req.responseText);
            console.log('set it');
        }
        return this.level_json[uri];
    }

    load_level(uri) {
        let all_data = this._get_level(uri);

        let data = all_data;
        console.log("level is this:");
        console.log(data);
        if(data.constructor != Array && all_data['level']) {
            console.log("it was a complex level");
            data['level-uri'] = uri;
            data = all_data.level;
        }

        let grid = new Grid();
        /// we need this while loading up objects to check
        /// conditionals
        if(all_data !== data) {
            grid.level = new Level(grid, all_data);
        }

        for(let i=0; i<data.length; i++) {
            let curr = data[i];
            for(let j=0; j<curr.length; j++) {
                let cur = curr[j];
                if(cur) {
                    grid.create(obj_map[cur.type], { x: j, y: 0, z: i }, cur.mats, cur.desc, cur.extra);
                }
            }
        }

        for(let a of grid.post_load_actions) {
            a();
        }

        return grid;
    }
}

export default LevelLoader;
