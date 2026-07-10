const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const dom = new JSDOM(
    `<!DOCTYPE html><H1>Resound</H1><p>This will be a very nice homepage someday.</p><a href="/" >Home</a>`
);

module.exports = dom.window.document.body.innerHTML;
