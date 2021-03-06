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
        let result = null;
        if(this.cbox) {
            result = this.cbox.remove();
        }

        if(result) {
            if(result['type'] == 'goto') {
                this.overlay.remove_dialog();
                this.overlay.add_dialog(this.overlay.grid.level.get_dialog(result['target']));
                return;
            } else if(result['type'] == 'event') {
                this.overlay.grid.event_manager.dispatchArbitrary(result['target']);
            }
        }

        if(this.cur >= this.dialog.length) { this.overlay.remove_dialog(); return; }

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
