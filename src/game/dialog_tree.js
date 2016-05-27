/*
A dialog tree looks like this:

[ 
    { speaker: 'player', emote: 'happy',  text: 'This is the speech' },
    { speaker: 'creator' emote: 'neutral', text: 'This is more speech' }
]
*/

class DialogTree {
    constructor(dialog) {
        this.dialog = this._parse_dialog(dialog);
    }

    _parse_dialog(json) {

    }
}
