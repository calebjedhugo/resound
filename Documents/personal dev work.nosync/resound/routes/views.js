const router = require("express").Router();

router.route("/").get((req, res) => {
    res.send(require("../client/views"));
});
