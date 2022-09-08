const express = require('express')
const bodyParser = require('body-parser')
const punycode = require('punycode');
const app = express()
const telegram = require('./telegram.js');

app.set('port', (process.env.PORT || 80))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

function _fixedUrl(url) {
    return punycode.toUnicode(decodeURI(url.replace(/(^\w+:|^)\/\//, '')));
}

const formatDate = new Intl.DateTimeFormat("en", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
});
function _format(date) {
    try {
        var spl = "25/08/2021 4:52:13".split(' ');
        var date_d = spl[0].split('/');
        var sec = spl[1];
        var _format = `${date_d[1]}/${date_d[0]}/${date_d[2]} ${sec}`;
        return _format;
    } catch (error) {
        return date;
    }
}
function _dateDiff(create_date, modified_date) {
    try {
        var create = (new Date(formatDate.format(new Date(_format(create_date)))) / 1000);
        var modified = (new Date(formatDate.format(new Date(_format(modified_date)))) / 1000);
        return (modified - create) <= 5 ? true : false;
    } catch (error) {
        return false;
    }
}
//POST
app.post('/post/published', async (req, res) => {
    var { post_id, post_author, post_title, post_permalink, post_status, post_created, bot_token, chat_id } = req.body;
    var messages = `<b>[สร้างเรื่องใหม่]</b>\n<b>หัวข้อ</b> : ${post_title}\n<b>ID :</b> ${post_id}\n<b>โดย :</b> ${post_author}\n<b>สร้างเมื่อ :</b> ${post_created}\n<b>สถานะ :</b> ${post_status}\n<b>ลิงก์ :</b> ${_fixedUrl(post_permalink)}`;
    await telegram._send(messages, bot_token, chat_id);
})
app.post('/post/update', async (req, res) => {
    var { post_id, post_author, post_editor_author, post_title, post_permalink, post_status, post_created, post_modified, bot_token, chat_id } = req.body;
    // if (_dateDiff(post_created, post_modified)) {
        var messages = `<b>[อัปเดตเรื่อง]</b>\n<b>หัวข้อ</b> : ${post_title}\n<b>ID :</b> ${post_id}\n<b>สร้างโดย :</b> ${post_author}\n<b>สร้างเมื่อ :</b> ${post_created}\n<b>อัปเดตเมื่อ :</b> ${post_modified}\n<b>อัปเดตโดย :</b> ${post_editor_author}<b>\nสถานะ :</b> ${post_status}\n<b>ลิงก์ :</b> ${_fixedUrl(post_permalink)}`;
        await telegram._send(messages, bot_token, chat_id);
    // } else {
    //     return;
    // }
})
app.post('/post/draft', async (req, res) => {
    var { post_id, post_author, post_title, post_permalink, post_status, post_created, bot_token, chat_id } = req.body;
    var messages = `<b>[ฉบับร่าง เรื่องใหม่]</b>\n<b>หัวข้อ</b> : ${post_title}\n<b>ID :</b> ${post_id}\n<b>สร้างโดย :</b> ${post_author}\n<b>สร้างเมื่อ :</b> ${post_created}\n<b>สถานะ :</b> ${post_status}\n<b>ลิงก์ :</b> ${_fixedUrl(post_permalink)}`;
    await telegram._send(messages, bot_token, chat_id);
})
app.post('/post/trash', async (req, res) => {
    var { post_id, post_author, post_trash_author, post_title, post_permalink, post_status, post_modified, bot_token, chat_id } = req.body;
    var messages = `<b>[ลบเรื่อง]</b>\n<b>หัวข้อ</b> : ${post_title}\n<b>ID :</b> ${post_id}\n<b>สร้างโดย :</b> ${post_author}\n<b>ลบเมื่อ :</b> ${post_modified}\n<b>ลบโดย :</b> ${post_trash_author}\n<b>สถานะ :</b> ${post_status}\n<b>ลิงก์ :</b> ${_fixedUrl(post_permalink)}`;
    await telegram._send(messages, bot_token, chat_id);
})

//PAGE
app.post('/page/published', async (req, res) => {
    var { page_id, page_author, page_title, page_permalink, page_status, page_created, bot_token, chat_id } = req.body;
    var messages = `<b>[หน้าใหม่]</b>\n<b>หัวข้อ</b> : ${page_title}\n<b>ID :</b> ${page_id}\n<b>สร้างโดย :</b> ${page_author}\n<b>สร้างเมื่อ :</b> ${page_created}\n<b>สถานะ :</b> ${page_status}\n<b>ลิงก์ :</b> ${_fixedUrl(page_permalink)}`;
    await telegram._send(messages, bot_token, chat_id);
})
app.post('/page/update', async (req, res) => {
    var { page_id, page_author, page_editor_author, page_title, page_permalink, page_status, page_created, page_modified, bot_token, chat_id } = req.body;
    // if (_dateDiff(post_created, post_modified)) {
        var messages = `<b>[อัปเดตหน้า]</b>\n<b>หัวข้อ</b> : ${page_title}\n<b>ID :</b> ${page_id}\n<b>สร้างโดย :</b> ${page_author}\n<b>สร้างเมื่อ :</b> ${page_created}\n<b>อัปเดตเมื่อ :</b> ${page_modified}\n<b>อัปเดตโดย :</b> ${page_editor_author}\n<b>สถานะ :</b> ${page_status}\n<b>ลิงก์ :</b> ${_fixedUrl(page_permalink)}`;
        await telegram._send(messages, bot_token, chat_id);
    // } else {
    //     return;
    // }
})
app.post('/page/draft', async (req, res) => {
    var { page_id, page_author, page_title, page_permalink, page_status, page_created, bot_token, chat_id } = req.body;
    var messages = `<b>[ฉบับร่าง หน้าใหม่]</b>\n<b>หัวข้อ</b> : ${page_title}\n<b>ID :</b> ${page_id}\n<b>สร้างโดย :</b> ${page_author}\n<b>สร้างเมื่อ :</b> ${page_created}\n<b>สถานะ :</b> ${page_status}\n<b>ลิงก์ :</b> ${_fixedUrl(page_permalink)}`;
    await telegram._send(messages, bot_token, chat_id);
})
app.post('/page/trash', async (req, res) => {
    var { page_id, page_author, page_trash_author, page_title, page_permalink, page_status, page_modified, bot_token, chat_id } = req.body;
    var messages = `<b>[ลบหน้า]</b>\n<b>หัวข้อ</b> : ${page_title}\n<b>ID :</b> ${page_id}\n<b>สร้างโดย :</b> ${page_author}\n<b>ลบเมื่อ :</b> ${page_modified}\n<b>ลบโดย :</b> ${page_trash_author}\n<b>สถานะ :</b> ${page_status}\n<b>ลิงก์ :</b> ${_fixedUrl(page_permalink)}`;
    await telegram._send(messages, bot_token, chat_id);
})
app.listen(app.get('port'), function () {
    console.log("Server ready")
})
module.exports = app