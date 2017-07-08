#!/usr/bin/env node

const rp = require('request-promise')
const Parser = require('./Parser')
const fs = require('fs')
const geojson2osm = require('geojson2osm')

const Main = (url, cb) => {
  const options = {
    uri: url,
    json: true
  }
  rp(options).then((response) => {
    cb(Parser(response))
  })
}

module.exports = Main
// //const data = require('../data/abeancos.json')
// const URL = 'http://www.abeancos.gal/node.json?type=elemento'
//
// rp(URL).then((response) => {
//   console.log(response)
// })
//
// const json = Parser(data)
// console.log(JSON.stringify(json))
//
// fs.writeFileSync('/tmp/mierda.json', JSON.stringify(json))
// const osm = geojson2osm.geojson2osm(json)
//
// fs.writeFileSync('/tmp/mierda.osm', osm)
