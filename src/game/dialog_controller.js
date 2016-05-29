import DialogBox from './dialog'
import DialogChoice from './dialog_choice'

class DialogController {
    constructor(overlay, dialog) {
        this.overlay = overlay;
        this.dialog = dialog;

        this.cur = 0;
        this.cbox = null;

        this.show();
    }

    show() {
        if(this.cbox) {
            this.cbox.remove();
        }

        if(this.cur >= this.dialog.length) { this.overlay.remove_dialog(); }

        let c = this.dialog[this.cur++];
        if(c['prompt']) {
            let left = c['speaker'] != 'player';
            let img = c['speaker']+'/'+c['emote'];
            this.cbox = new DialogChoice(c['prompt'], left ? img : null, !left ? img : null);
        } else if(c.speaker == 'player') {
            this.cbox = DialogBox.player_dialog(c.msg, c.emote);
        } else {
            this.cbox = DialogBox.character_dialog(c.msg, c.speaker, c.emote);
        }
    }

    input(event) {
        if(event.keyCode == 32) {
            this.show();
        } else if(this.cbox) {
            this.cbox.input(event);
        }
    }
}

export default DialogController;
