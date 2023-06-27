app.post('/api/post/saldo', bodyParser.json(), (req, res) => {
    const pasid = req.body.pasid;
    const bedrag = req.body.bedrag;
    let saldo = '';

    const sql = 'UPDATE dbob.klant SET klant.saldo = klant.saldo - ? WHERE pasid = ?;';
    const values = [bedrag, pasid];

    connection.query(sql, values, (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'Er is een fout opgetreden bij het uitvoeren van de query.' });
        } else {
            const newsql = 'SELECT saldo FROM dbob.klant where pasid = ?;';
            const value = [pasid];
            connection.query(newsql, values, (err, results) => {

            if (results.length > 0) {
                const saldo = parseFloat(results[0].saldo);
                res.json({ saldo: saldo });
            } else {
                res.json({ error: 'dom' });
            }
        })
        }
    });
});




















app.post('/api/post/saldo', bodyParser.json(), (req, res) => {
    const pasid = req.body.pasid;
    const bedrag = req.body.bedrag;
    let saldo = '';

    const sql = 'UPDATE dbob.klant SET klant.saldo = klant.saldo - ? WHERE pasid = ?;';
    const values = [bedrag, pasid];

    connection.query(sql, values, (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'Er is een fout opgetreden bij het uitvoeren van de query.' });
        } else {
            if (results.length > 0) {
                const saldo = parseFloat(results[0].saldo);
                res.json({ saldo: saldo });
            } else {
                res.json({ error: 'dom' });
            }
        }
    });
});














