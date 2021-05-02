const router = require("express").Router();

const testFunction = (input) => {
    let output = "test";
    //code goes here.
    return output;
};

router
    .route("/")
    .all((req, res, next) => {
        //put some validation logic or something here.
        res.resObj = {
            message: `You made a ${req.method.toUpperCase()} request!`,
        };
        next();
    })
    .get((req, res) => {
        let f = "input";
        res.resObj.message = testFunction(f);
        res.json(res.resObj);
    })
    .post((req, res) => {
        res.json(res.resObj);
    })
    .patch((req, res) => {
        res.json(res.resObj);
    })
    .delete((req, res) => {
        res.json(res.resObj);
    });

module.exports = router;
