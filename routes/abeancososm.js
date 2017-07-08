const express = require('express');
const router = express.Router();
const Main = require('../src/')
const geojson2osm = require('geojson2osm')

/**
 * GET: json from Abeancos API
 * url {String}: URL de la API
 * nid {Int}: Identificador de la geometria --optional
 */

router.get('/abeancos2osm', function(req, res) {
  let url = req.query.url
  let nid = req.query.nid
  let format = req.query.format

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
  if (format && !['osm', 'json'].includes(format)) {
    const message = "Formato non recoñecido"
    res.status(500).send({
      error: {
        "code": 500,
        "message": message
      }
    })
    console.error(message)
    return false
  }
  Main(URL,(json) => {
    if (format === 'json' || !format) {
      res.set({
        'Content-type': 'application/json'
      })
      res.send(json)
    } else if(format === 'osm') {
      res.set({
        'Content-type': 'application/xml'
      })
      res.send(geojson2osm.geojson2osm(json))
    }
  })
});

module.exports = router;
