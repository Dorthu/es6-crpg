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
        this.lists = {};
    }

    subscribe(event_name, callback, obj) {
        if(obj) {
            this.listeners[obj] = e => callback(e);
            this.elm.addEventListener(event_name, this.listeners[obj]);
        } else { //you can't unsubsribe
            this.elm.addEventListener(event_name, e => callback(e));
        }
    }

    subscribe_list(list_name, callback, obj) {
        if(!this.lists[list_name]) {
            this.lists[list_name] = [];
        }
        this.lists[list_name].push({ obj: obj, callback: e => callback(e) });
    }

    unsubscribe(event_name, obj) {
        if(this.listeners[obj]) {
            this.elm.removeEventListener(event_name, this.listeners[obj]);
        }
    }

    unsubscribe_list(list_name, obj) {
        if(this.lists[list_name]) {
            let found = -1;
            for(let c of this.lists[list_name]) {
                if(c.obj === obj) {
                    found = this.lists[list_name].indexOf(c);
                    break;
                }
            }
            if(found > -1) {
                this.lists[list_name].splice(found, 1);
            }
        }
    }

    dispatchPlayerMoved(player) { 
        this.elm.dispatchEvent(new CustomEvent('player_moved', { detail: { loc: player.loc } }));
    }

    dispatchPassTurn() { 
        this.elm.dispatchEvent(new CustomEvent('pass_turn', {}));
    }

    dispatchTransitionLevel(to) {
        this.elm.dispatchEvent(new CustomEvent('transition_level', { detail: { data: to } }));
    }

    dispatchArbitrary(name, extra={}) {
        this.elm.dispatchEvent(new CustomEvent(name));
    }
}

export default EventManager;
