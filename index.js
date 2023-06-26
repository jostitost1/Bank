var pin = "1001"
// make sure pasid is put into pasid
var pasid = Array[1];

var amountSubtract = 100;

console.log(pasid)

// get customers data from database
var sql = `SELECT saldo FROM dbob.klant WHERE pasid = '${pasid}'`;
var sqlPW = `SELECT * FROM dbob.klant WHERE pincode = '${pin}'`;
var sqlAM = `UPDATE dbob.klant SET saldo = '${amountSubtract}' WHERE pasid = ${pasid}'`;

connection.connect(function(err) {
  if (err) throw err;
  connection.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    if (result == pasid){
      console.log("Card in database");
      
    }
  });
});


const connection = mysql.createConnection({
host: '145.24.222.146',
user: 'bankje',
port: 8001,
password: '18IXPah8B@24FR',
database: 'dbob'
});



const apps = express();
const port = process.env.PORT || 8001;


apps.get('/api/persoon', (req, res) => {

connection.query('SELECT * FROM persoon', (err, results) => {
  if (err) throw err;

  res.json(results);
});
});

apps.get('/api/klant', (req, res) => {

connection.query('SELECT * FROM klant', (err, results) => {
  if (err) throw err;

  res.json(results);
});
});


apps.post('/api/post/persoon', bodyParser.json(), (req, res) => {
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

apps.post('/api/post/klant', bodyParser.json(), (req, res) => {
const id = req.body.id;
const saldo = req.body.saldo;

var sql = `UPDATE dbob.klant SET saldo = saldo - (?) WHERE id = ${id}`;
var values = [saldo];


connection.query(sql, [values], (err, results) => {
  
  if (err) console.log(err);
  
  else res.json(results);

});
});

apps.get('/api/pasid', bodyParser.json, (req, res) => {

const pasid = Array[1];
const query = `SELECT * FROM dbob.klant WHERE pasid = ${pasid}`;

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


app.get('/api/pasid', bodyParser.json(), (req, res) => {
  const pasid = req.body.pasid;
  const pincode = req.body.pincode;
  // const empty = [];
  var query = `SELECT pincode FROM dbob.klant WHERE pasid = (?) and pincode = ${pincode}`;
  var values = [pasid];

  connection.query(query, [values], (err, results) => {
      if (err) throw err;

      if (result[0].result == false) {
              res.send("kut man");
            }
      else {
              res.json(results);
}
  });
});






apps.listen(port, () => {
console.log(`Server is running on port ${port}`);

});
