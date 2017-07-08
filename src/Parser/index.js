
module.exports = (data) => {
  if(!data.list) {
    throw new Error('Seguro!!, os teus datos non parece que sexan os correctos')
  }

  const FIELDS = {
    // "field_cronoloxia",
    // "field_situacion",
    // "field_latitude",
    // "field_lonxitude",
    // "field_x",
    // "field_y",
    // "nid",
    // "vid",
    // "is_new",
    // "type",
    "title": "name",
    // "language",
    "url": "url",
    // "edit_url",
    // "status",
    // "promote",
    // "sticky",
    // "created",
    // "changed",
  }
  console.log(FIELDS)
  const OSMHeader = { "type": "FeatureCollection",
    "features": []
  }
  OSMHeader.features = data.list.map((element) => {
    let elementProps = {}
    for (let prop of Object.keys(element)) {
      if(FIELDS.hasOwnProperty(prop)) {
        elementProps[FIELDS[prop]] = element[prop]
      }
    }
    elementProps['source'] = 'abeancos.gal'
    return ({
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [parseFloat(element.field_localizacion.lat), parseFloat(element.field_localizacion.lon)]
      },
      "properties": elementProps
    })
  })

  //console.log('Parsed!!')
  return OSMHeader
}