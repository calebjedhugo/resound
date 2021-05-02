"use strict";

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(require("./controller.js"));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
