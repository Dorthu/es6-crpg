
class DialogBox {
    constructor(msg, left_img=null, right_img=null) {
        self.parentNode = document.getElementById("canvas_goes_here");
        self.root = document.createElement("div");
        self.root.className="dialog-box";
    
        if(left_img) {
            let i = document.createElement("img");
            i.src = "/resources/dialog/"+left_img+".png";
            self.root.appendChild(i);
        }

        let s = document.createElement("span");
        s.textContent = msg;
        self.root.appendChild(s);
    
        if(right_img) {
            let i = document.createElement("img");
            i.src = "/resources/dialog/"+right_img+".png";
            i.className="right";
            self.root.appendChild(i);
        }
        
        self.parentNode.appendChild(self.root);
    }

    static player_dialog(msg, emote) {
        return new DialogBox(msg, null, 'player/'+emote);
    }

    static character_dialog(msg, character, emote) {
        return new DialogBox(msg, character+'/'+emote);
    }

    remove() {
        self.parentNode.removeChild(self.root);
    }
}

export default DialogBox;
