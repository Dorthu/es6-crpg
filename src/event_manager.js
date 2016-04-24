/*
A nice interface for events between objects.  Why not use javascript's native event thing?
..like really, tell me why I shouldn't do that, I have no idea.
*/
let uid = 0;

class EventManager {
    constructor() { 
        this.elm = document.createElement('div');
        this.elm.style.visibility = 'hidden';
        document.body.appendChild(this.elm);
        this.listeners = {};
    }

    subscribe(event_name, callback, obj) {
        if(obj) {
            this.listeners[obj] = e => callback(e);
            console.log(this.listeners);
            this.elm.addEventListener(event_name, this.listeners[obj]);
        } else { //you can't unsubsribe
            this.elm.addEventListener(event_name, e => callback(e));
        }
    }

    unsubsribe(event_name, obj) {
        if(this.listeners[obj]) {
            console.log("removed a thing");
            this.elm.removeEventListener(event_name, this.listeners[obj]);
        }
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
