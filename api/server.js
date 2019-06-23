const express = require("express");
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;
const app = express();
const cors = require("cors");
const Twit = require("twit");
const serveStatic = require('serve-static');

require('dotenv').config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(serveStatic(__dirname + "/../dist"));

const twit = new Twit({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_SECRET,
    timeout_ms: 60 * 1000,
    strictSSL: true
});

app.use("/api/user/timeline", (req, res, next) => {
    let user = req.query.user,
        limit = req.query.limit ? req.query.limit : 20;

    twit
        .get("statuses/user_timeline", {
            screen_name: user,
            tweet_mode: "extended",
            include_entities: true,
            count: limit
        })
        .then(result => {
            res.json(result);
        })
        .catch(error => res.json(error));
});

app.use("/api/search", (req, res, next) => {
    let limit = req.query.limit ? req.query.limit : 20;

    twit
        .get("search/tweets", {
            q: req.query.query,
            count: limit,
            tweet_mode: "extended",
            include_entities: true,
        })
        .then(result => {
            res.json(result);
        })
        .catch(error => res.json(error));
});

app.listen(port, () => {
    console.log('Listening on port ' + port)
});