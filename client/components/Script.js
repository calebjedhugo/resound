const dom = require("../dom");
const { document } = dom.window;

// Builds a node that runs the script passed in as a string.
class Script {
    constructor({ scriptString }) {
        this.elem = document.createElement("script");
        this.elem.src = scriptString;
    }
}
