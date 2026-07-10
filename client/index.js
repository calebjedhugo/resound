const router = require("express").Router();
const path = require("path");

router.route("/").get((req, res) => {
    res.sendfile(path.join(__dirname, "index.html"));
});

module.exports = router;
