import PriorityQueue from 'priorityqueuejs'

const dirs = [ {x:1, z:0}, {x:0, z: 1}, {x:-1, z:0}, {x:0, z:-1} ];

function _extract_path(start, goal, came_from) {
    /*
        This bit is based on TracePath from TrueCraft.  Check them out, they're
        cool poeple (and they recommended me the below blog entry):
        https://truecraft.io/
    */
    let result = [];
    let current = goal;
    while(current !== start) {
        current = came_from[current.x+';'+current.z];
        result.unshift(current);
    }
    result.push(goal);
    return result;
}

function path_to_point(graph, start, goal, neighbor_func) {
    /*
        This is an implementation of A* based on
        http://www.redblobgames.com/pathfinding/a-star/implementation.html
        Super special thanks to those guys!
    */
    let frontier = new PriorityQueue(function(a, b) { return a.priority - b.priority; });
    frontier.enq({ val: start, priority: 1 });
    let came_from = {};
    let cost_so_far = {};
    came_from[start.x+';'+start.z] = null;
    cost_so_far[start.x+';'+start.z] = 0;
    
    while(frontier.size()) {
        let cur = frontier.deq().val;

        if(cur.x == goal.x && cur.z == goal.z) {
            ///we got there!
            return _extract_path(start, goal, came_from);
        }

        for(let next of neighbor_func(cur.x, cur.z)) {
            let new_cost = cost_so_far[cur.x+';'+cur.z] ? cost_so_far[cur.x+';'+cur.z] + 1 : 1;
            if(!cost_so_far[next.x+';'+next.z] || new_cost < cost_so_far[next.x+';'+next.z]) {
                cost_so_far[next.x+';'+next.z] = new_cost;
                let priority = new_cost + ( Math.abs(goal.x - next.x) + Math.abs(goal.y - next.y) );
                frontier.enq({ val: next, priority: priority });
                came_from[next.x+';'+next.z] = cur;

            }
        }
    }

    return null; ///{ path: came_from, cost: cost_so_far };
}

class PathNode {
    constructor(x, z) {
        this.x = x;
        this.z = z;
        this.neighbors = [];
    }
}

class PathNetwork {
    constructor(grid) {
        this.grid = grid;
        this.network = null;
        this.first_movable_space = null;
//        this.rebuild_network();
    }

    rebuild_network(hard=false) {
        /////TODO - maybe do this, maybe not?
        /*
            Generates a new PathNetwork based on the grid.  Should be called
            to rebuild the network if more movable spaces open up that are important
            for the ai to know about.
        */
        this.network = null;
        if(hard || !this.first_moveable_space) {
            this.first_movable_space = null;
            ///find starting point and save it
            for(let x=0; x<this.grid.grid.length; x++) {
                for(let z=0; z<this.grid.grid[x].length; z++) {
                    if(this.grid.can_move_to(x, z)) {
                        this.first_movable_space = {x: x, z: z};
                        break;
                    }
                }
                if(this.first_movable_space) { break; }
            }
        }

        /// if there are no movable spaces on the grid, we're done and we're boned
        if(!this.first_movable_space) { return; }

        ///recursively walk the path and find all spaces we can reach
        
    }

    path_to_player(from_me) {
        return path_to_point(this.grid, from_me.loc, this.grid.player.loc, (x,z) => this._get_neighbors(x,z));
    }


    _get_neighbors(x, z) {
        let ret = [];
        for(let d of dirs) {
            if(this.grid.can_move_to({x: x+d.x, z: z+d.z}, true)) {
                ret.push({x: x+d.x, z: z+d.z});
            }
        }
        return ret;
    }
    
    step_to_point(point) {
        /*
            A convenience method, contains the next space to move to to reach a given
            point.  Same as: path_to_point(point)[0]

            Takes: point - { x: int, y: int }
            Returns: point (as above)
        */
    }
}

export default PathNetwork;
