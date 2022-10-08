const router = require('express').Router();
const db = require("./db");

router.get('/verify', (req, res) => {
  db.queryAsync('SELECT * FROM responses WHERE session = ?', [req.session_id])
    .then((result) => {
      if(!result[0][0]){
        res.status(200).json({currentForm: 'F0'});
      } else if(result[0][0].completed) {
        res.sendStatus(409);
      } else if (result[0][0].paymentId !== null) {
        res.status(200).json({currentForm: 'F4'});
      } else if (result[0][0].addressId !== null) {
        res.status(200).json({currentForm: 'F3'});
      } else {
        res.status(200).json({currentForm: 'F2'})
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(404)
    })
});

router.post('/responses', (req, res) => {
  db.queryAsync('INSERT INTO responses (session, name, email, password) VALUES(?,?,?,?)', [req.session_id, req.body.name, req.body.email, req.body.password])
  .then((response) => {
    res.sendStatus(201);
  })
  .catch((err) => {
    //if err 1062, send a 'user already checked out'
    console.error(err);
    res.sendStatus(404);
  })
})
router.post('/addresses', (req, res) => {
  console.log(req.body);
  db.queryAsync('INSERT INTO addresses (line1, line2, city, state, zip, phone) VALUES(?,?,?,?,?,?)', [req.body.line1, req.body.line2, req.body.city, req.body.state, req.body.zip, req.body.phone])
  .then((response) => {
    return db.queryAsync('UPDATE responses SET addressId = ? WHERE session = ?', [response[0].insertId, req.session_id])
  })
  .then((response) => {
    res.sendStatus(201);
  })
  .catch((err) => {console.error(err); res.sendStatus(404)})
})
router.post('/payments', (req, res) => {
  console.log(req.body);
  db.queryAsync('INSERT INTO payments (number, expiration, cvv, zip) VALUES(?,?,?,?)', [req.body.number, req.body.expiration, req.body.cvv, req.body.zip])
  .then((response) => {
    return db.queryAsync('UPDATE responses SET paymentId = ? WHERE session = ?', [response[0].insertId, req.session_id])
  })
  .then((response) => {
    res.sendStatus(201);
  })
  .catch((err) => {console.error(err); res.sendStatus(404)})
})
//INNER JOIN addresses ON responses.addressId = addresses.id
router.get('/responses', (req, res) => {
  console.log(req.session_id);
  db.queryAsync('SELECT * FROM responses INNER JOIN addresses ON responses.addressId = addresses.id INNER JOIN payments ON responses.paymentId = payments.id WHERE responses.session = ?', [req.session_id])
  .then((response) => {
    res.json(response[0][0]);
  })
  .catch(err=>{console.error(err); res.sendStatus(404)})
})

router.put('/responses', (req, res) => {
  db.queryAsync('UPDATE responses SET completed = true WHERE session = ?', [req.session_id])
  .then((response) => {
    res.sendStatus(200);
  })
  .catch(err => {console.error(err); res.sendStatus(404)});
})

module.exports = router;