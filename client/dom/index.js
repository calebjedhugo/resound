const { JSDOM } = require("jsdom");

const dom = new JSDOM("<!DOCTYPE html>");

module.exports = dom;
