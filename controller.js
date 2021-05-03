const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const root = path.dirname(require.main.filename);

//log all hits to the api.
router.use((req, res, next) => {
    console.log(req.originalUrl);
    next();
});

//Send all requests through all middleware.
router.use(require("./middleware"));

router.use("/", (req, res) => {
    res.send(require("./client"));
});

//Handle api requests
router.use("/api/v1", require("./routes"));

//If they made it this far, it's time for that 404.
router.use((req, res, next) => {
    res.status(404).json(`Unable to find resource, '${req.originalUrl}'.`);
});

module.exports = router;
