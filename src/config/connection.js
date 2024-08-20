const connection = (app, port) => {
    app.listen(port, () => {
        console.log('Running on server ' + port);
    });
};

module.exports = connection;