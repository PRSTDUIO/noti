const express = require('express');
const router = express.Router();
const axios = require('axios')
var qs = require('qs');
var bodyParser = require('body-parser');
const { json } = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));
class telegram {

    async _send(messages,bot_token,chat_id) {
        var config = {
            method: 'post',
            url: `https://api.telegram.org/${bot_token}/sendMessage?parse_mode=html`,
            headers: { 
                'Content-Type': 'application/json'
        },
        data :JSON.stringify({
                "chat_id": chat_id,
                "text": messages
            })
        };

       await axios(config)
        .then(function (response) {
            return;
        })
        .catch(function (error) {
            return;
        });
    }
}

module.exports = new telegram;