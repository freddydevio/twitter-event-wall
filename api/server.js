const express = require("express");
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;
const app = express();
const cors = require("cors");
const Twit = require("twit");
const config = require("./../src/config");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

const twit = new Twit({
    consumer_key: config.twitterConsumerKey,
    consumer_secret: config.twitterConsumerSecret,
    access_token: config.twitterAccessToken,
    access_token_secret: config.twitterAccessSecret,
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

app.listen(port, () => console.log(`running on port ${port}`));
