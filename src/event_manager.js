/*
A nice interface for events between objects.  Why not use javascript's native event thing?
..like really, tell me why I shouldn't do that, I have no idea.
*/
class EventManager {
    constructor() { 
        this.elm = document.createElement('div');
        this.elm.style.visibility = 'hidden';
        document.body.appendChild(this.elm);
    }

    subscribe(event_name, callback) {
        this.elm.addEventListener(event_name, function(e) { callback(e); } );
    }

    unsubsribe(event_name, callback) {
        ///this doesn't work, I assume because this creates a new function - store
        ///functions seperately?
        this.elm.removeEventListener(event_name, function(e) { callback(e); } );
    }

    dispatchPlayerMoved(player) { 
        this.elm.dispatchEvent(new CustomEvent('player_moved', { loc: player.loc }));
    }

    dispatchPassTurn() { 
        this.elm.dispatchEvent(new CustomEvent('pass_turn', {}));
    }

    dispatchTransitionLevel(to) {
        this.elm.dispatchEvent(new CustomEvent('transition_level', { detail: { data: to } }));
    }
}

export default EventManager;
