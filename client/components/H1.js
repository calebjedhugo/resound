const dom = require("../dom");
const { document } = dom.window;

// Builds an H1 node with the text content that is passed in.
class H1 {
    constructor({ text }) {
        this.elem = document.createElement("H1");
        this.elem.textContent = text;
    }
}

module.exports = H1;
