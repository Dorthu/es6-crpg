
class LogBox {
    constructor() {
        console.log("this is the log box speaking");
        this.ele = document.getElementById("textbox");
    }

    add_message(msg) { 
        let nel = document.createElement('p');
        nel.innerHTML = msg;
        this.ele.appendChild(nel);
        this.ele.scrollTo(0, this.ele.scrollHeight);
    }
}

export default LogBox;
