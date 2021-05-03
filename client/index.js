const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const dom = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`);
const test = dom.window.document.createElement("div");
dom.window.document.body.appendChild(test);
test.textContent = "Testing jsdom.";

module.exports = dom.window.document.body.innerHTML;
