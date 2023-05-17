const bodyParser = require('body-parser');
const express = require('express');
const mysql = require('mysql');


const connection = mysql.createConnection({
    host: '145.24.222.146',
    user: 'bankje',
    port: 8001,
    password: '18IXPah8B@24FR',
    database: 'dbob'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('connect');
});

const app = express();
const port = process.env.PORT || 8001;


app.get('/api/persoon', (req, res) => {

    connection.query('SELECT * FROM persoon', (err, results) => {
        if (err) throw err;

        res.json(results);
    });
});

app.get('/api/klant', (req, res) => {

    connection.query('SELECT * FROM klant', (err, results) => {
        if (err) throw err;

        res.json(results);
    });
});


app.post('/api/post/persoon', bodyParser.json(), (req, res) => {
    const id = req.body.id;
    const naam = req.body.naam;
    const email = req.body.email;
    const telefoonnummer = req.body.telefoonnummer;
    const geboortejaar = req.body.geboortejaar;
    const klantid = req.body.klantid;

    var sql = "INSERT INTO dbob.persoon (id, naam, email, telefoonnummer, geboortejaar, klantid) VALUES (?)";
    var values = [id, naam, email, telefoonnummer, geboortejaar, klantid];
    
    connection.query(sql, [values], (err, results) => {
        
        
        if (err) console.log(err);
        
        else res.send("goeie");

      
    });
});

app.post('/api/post/klant', bodyParser.json(), (req, res) => {
    const id = req.body.id;
    const saldo = req.body.saldo;
    
    var sql = `UPDATE dbob.klant SET saldo = saldo - (?) WHERE id = ${id}`;
    var values = [saldo];


    connection.query(sql, [values], (err, results) => {
        
        if (err) console.log(err);
        
        else res.json(results);

    });
});

app.get('/api/pasid', (req, res) => {

    const pasid = req.params.pasid;
    const query = 'SELECT * FROM dbob.klant WHERE pasid = "${pasid}";';
    
    connection.query(query, (err, results) => {
        if (err) {
            throw err ;
            return;
        }

        if (results.length == 0) {
            res.send("staat er niet in");
        }
        else {
            const result = result[0].result;

            res.send("gevonden in database: ${result}")
        }


        //res.json(results);
    });
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
   
});








