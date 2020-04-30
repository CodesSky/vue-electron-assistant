var Entry = require('../models/Entry');

module.exports.controller = (app) => {
    // Read
    app.get('/entrylist', (req, res) => {
        Entry.find({}, 'websiteName websiteUrl visible editable', function(error, entries) {
            if (error) {
                console.log(error);
            }
            res.send({
                Code: 0,
                Data: entries,
                Message: '获取成功'
            });
        });
    });

    // Cteate
    app.post('/addEntry', (req, res) => {
        const entry = new Entry({
            websiteName: req.body.websiteName,
            websiteUrl: req.body.websiteUrl,
            visible: req.body.visible,
            editable: req.body.editable
        });

        console.log('entry!!!!!', entry);
        entry.save((error, entry) => {
            if (error) {
                console.log(error);
            } else {
                res.send({
                    Code: 0,
                    Data: entry,
                    Message: '添加成功'
                });
            }
        });
    });

    // Update
    app.post('/updateEntry', (req, res) => {
        const id = req.body.id;
        const websiteName = req.body.websiteName;
        const websiteUrl = req.body.websiteUrl;
        const visible = req.body.visible;
        const editable = req.body.editable;

        Entry.findByIdAndUpdate(id, {
            websiteName: websiteName,
            websiteUrl: websiteUrl,
            visible: visible,
            editable: editable
        }, function(error, entry) {
            if (error) {
                console.error(error);
                res.send({
                    Code: 10001,
                    Data: false,
                    Message: '更新失败'
                });
            } else {
                res.send({
                    Code: 0,
                    Data: true,
                    Message: '更新成功'
                });
            }
        });
    });
    // Delete
    app.post('/deleteEntry', (req, res) => {
        const id = req.body.id;

        Entry.remove({
            _id: id
        }, function(error, entry) {
            if (error) {console.error(error);} else {
                res.send({
                    Code: 0,
                    Data: true,
                    Message: '删除成功'
                });
            }
        });
    });
};
