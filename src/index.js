#!/usr/bin/env node

const rp = require('request-promise')
const Parser = require('./Parser')
const fs = require('fs')
const geojson2osm = require('geojson2osm')

//const URL = 'http://www.abeancos.gal/node.json?type=elemento'
const data = require('../data/abeancos.json')

// rp(URL).then((a, b, c) => {
//   console.log(a,b, c)
// })

const json = Parser(data)
console.log(JSON.stringify(json))

fs.writeFileSync('/tmp/mierda.json', JSON.stringify(json))
const osm = geojson2osm.geojson2osm(json)

fs.writeFileSync('/tmp/mierda.osm', osm)
