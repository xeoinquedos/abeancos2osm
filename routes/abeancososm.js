const express = require('express');
const router = express.Router();
const Main = require('../src/')

/**
 * GET: json from Abeancos API
 * url {String}: URL de la API
 * nid {Int}: Identificador de la geometria --optional
 */

router.get('/abeancos2osm', function(req, res) {
  let url = req.query.url
  let nid = req.query.nid

  if (!url) {
    const message = "Non se atopa a URL"
    res.status(500).send({
      error: {
        "code": 500,
        "message": message
      }
    })
    console.error(message)
    return false
  }

  const URL = `${url}${(nid) ? `&nid=${nid}` : `` }`
  Main(URL,(response) => {
    res.set({
      'Content-type': 'application/json'
    })
    res.send(response)
  })
});

module.exports = router;
