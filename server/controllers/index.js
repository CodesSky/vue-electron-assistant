module.exports.controller = (app) => {
    app.get('/', (re, res) => {
        res.render('index', { title: 'Express' });
    });
};
