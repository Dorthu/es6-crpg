import DialogBox from './dialog'

class DialogChoice extends DialogBox {
    constructor(prompt, left_img=null, right_img=null) {
        super(prompt['msg'], left_img, right_img);
        this.prompt = prompt;
        this.selected = 0;

        this.croot = document.createElement("div");
        this.croot.className="dialog-choice";

        this._render();

        this.parentNode.appendChild(this.croot);
    }

    _render() {
        let n = '';

        for(let i = 0; i < this.prompt.choices.length; i++) {
            n = n + "<span class='choice"+(i == this.selected ? " selected" : "")+
                "'>"+this.prompt.choices[i].title+"</span><br/>";
        }

        this.croot.innerHTML = n;
    }

    input(event) {
        if(event.keyCode == 38) {
            this.selected -= 1;
            if(this.selected < 0) { this.selected = 0; }
        } else if(event.keyCode == 40) {
            this.selected += 1;
            if(this.selected >= this.prompt.choices.length) {
                this.selected = this.prompt.choices.length -1;
            }
        }
        this._render();
    }

    remove() {
        super.remove();
        this.parentNode.removeChild(this.croot);
        return this.prompt.choices[this.selected]['effect'];
    }
}

export default DialogChoice;
