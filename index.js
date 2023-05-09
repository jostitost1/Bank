const express = require('express');
const mysql = require('mysql');

// Maak een MySQL-verbinding
const connection = mysql.createConnection({
    host: '145.24.222.146',
    user: 'bankje',
    port: 8001,
    password: '18IXPah8B@24FR',
    database: 'dbob bank database'
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

// Start de server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
   
});





