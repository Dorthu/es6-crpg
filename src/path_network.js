
class PathNetwork {
    constructor(grid) {
        this.grid = grid;
        this.network = null;
        this.first_movable_space = null;
        this.rebuild_network();
    }

    rebuild_network(hard=false) {
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

    path_to_point(point) {
        /*
            Use the generated network to find the best route to a given point.

            Takes: point - { x: int, y: int }
            Returns: an array of points (as above), null if point is unreachable
        */
        if(!this.network) {
            console.log("WARNING: PathNetwork was never built (or no movable spaces in grid)!");
            return null;
        }
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
