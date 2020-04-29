var Entry = require('../models/Entry');

module.exports.controller = (app) => {
    //get all entry
    app.get('/entry', (req, res) => {
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

    // get single user
    app.get('/entry/:id', (req, res) => {
        Entry.findById(req.params.id, 'websiteName websiteUrl visible editable', function(error, entry) {
            if (error) {
                console.log(error);
            }
            // res.send(entry);
            res.send({
                Code: 0,
                Data: entry,
                Message: '获取成功'
            });
        });
    });

    // add a new user
    app.post('/entry', (req, res) => {
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
            }
            // res.send(entry);
            res.send({
                Code: 0,
                Data: entry,
                Message: '添加成功'
            });
        });
    });

    // update a user
    app.put('/entry/:id', (req, res) => {
        Entry.findById(req.params.id, 'websiteName websiteUrl visible editable', function(error, entry) {
            if (error) {
                console.error(error);
            }
            entry.websiteName = req.body.websiteName;
            entry.websiteUrl = req.body.websiteUrl;
            entry.visible = req.body.visible;
            entry.editable = req.body.editable;
            entry.save(function(error, entry) {
                if (error) {
                    console.log(error);
                }
                // res.send(entry);
                res.send({
                    Code: 0,
                    Data: entry,
                    Message: '更新成功'
                });
            });
        });
    });
};
