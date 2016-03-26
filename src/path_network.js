const dirs = [ {x:1, z:0}, {x:0, z: 1}, {x:-1, z:0}, {x:0, z:-1} ];

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
        this.rebuild_network();
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
                for(let z=0; z<this.grid.grid[x].length, z++) {
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

    path_to_point(graph, start, goal) {
        /*
            This is an implementation of A* based on
            http://www.redblobgames.com/pathfinding/a-star/implementation.html
            Super special thanks to those guys!

            Takes: point - { x: int, y: int }
            Returns: an array of points (as above), null if point is unreachable
        */
/*        if(!this.network) {
            console.log("WARNING: PathNetwork was never built (or no movable spaces in grid)!");
            return null;
        }
*/
        let frontier = [];
        frontier.push(start);
        came_from = {};
        cost_so_far = {};
        came_from[start.x+';'+start.z] = null;
        cost_so_far[start.x+';'+start.z = 0;
        
        while(frontier.length) {
            let cur = frontier.shift();
        }
    }

    _get_neighbors(x, z) {
        let ret = [];
        for(let d of dirs) {
            if(this.grid.can_move_to(x+d.x, z+d.z)) {
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
