const dom = require("../dom");
const { document } = dom.window;

// Builds an anchor node that links to the passed in string.
class Link {
    constructor({ link, text }) {
        this.elem = document.createElement("a");
        this.elem.href = link;
        this.elem.textContent = text;
    }
}

module.exports = Link;
