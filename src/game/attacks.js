function find_target_linear(grid, start, dir) {
    let c = start;
    while(true) {
        let o = grid.get(c.x, c.z);
        if(!o) { return; }
        if(o['object']) { return o.object; }
        if(o.solid || o['object'] && o.object.solid) { return; }
        c = { x: c.x - dir.x, z: c.z - dir.z };
    }
}

/// shooting attack hook - below helpers are not exported
export function shoot(player) {
    player.overlay.add('shoot-up', e => shoot_lower(player));
}

function shoot_lower(player) {
    ///do damage
    let pif = player._point_in_front();
    let hit = find_target_linear(player.grid, pif, { x: player.loc.x - pif.x, z: player.loc.z - pif.z });
    console.log(hit);
    if(hit) {
        hit.suffer_attack({ damage: 100 });
    }
    player.overlay.add('shoot-down', e => shoot_complete(player));
}

function shoot_complete(player) {
    player.logbox.add_message('shot');
}
