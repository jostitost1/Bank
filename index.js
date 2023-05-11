const bodyParser = require('body-parser');
const express = require('express');
const mysql = require('mysql');

// Maak een MySQL-verbinding
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

// Definieer een GET-endpoint
app.get('/api/persoon', (req, res) => {
    // Voer een SQL-query uit
    connection.query('SELECT * FROM persoon', (err, results) => {
        if (err) throw err;
        // Retourneer de resultaten als JSON
        res.json(results);
    });
});

app.get('/api/klant', (req, res) => {
    // Voer een SQL-query uit
    connection.query('SELECT * FROM klant', (err, results) => {
        if (err) throw err;
        // Retourneer de resultaten als JSON
        res.json(results);
    });
});

// Definieer een POST-endpoint
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
        // Retourneer de resultaten als JSON
        //res.json(results);
        //res.send("oke en nu");
      
    });
});


// Start de server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
   
});








