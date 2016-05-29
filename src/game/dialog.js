
class DialogBox {
    constructor(msg, left_img=null, right_img=null) {
        this.parentNode = document.getElementById("canvas_goes_here");
        this.root = document.createElement("div");
        this.root.className="dialog-box";
    
        if(left_img) {
            let i = document.createElement("img");
            i.src = "/resources/dialog/"+left_img+".png";
            this.root.appendChild(i);
        }

        let s = document.createElement("span");
        s.textContent = msg;
        this.root.appendChild(s);
    
        if(right_img) {
            let i = document.createElement("img");
            i.src = "/resources/dialog/"+right_img+".png";
            i.className="right";
            this.root.appendChild(i);
        }
        
        this.parentNode.appendChild(this.root);
    }

    static player_dialog(msg, emote) {
        return new DialogBox(msg, null, 'player/'+emote);
    }

    static character_dialog(msg, character, emote) {
        return new DialogBox(msg, character+'/'+emote);
    }

    remove() {
        this.parentNode.removeChild(this.root);
    }
}

export default DialogBox;
