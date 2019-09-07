const Sequelize = require('sequelize')
const db = require('../db')

const Place = db.define('place', {
  name: Sequelize.STRING,
  lat: Sequelize.FLOAT,
  long: Sequelize.FLOAT
})

Place.setMarkers = function(userId, googleMaps, map, marker) {
  Place.findAll({
    where: {userId}
  })
    .then((places)=>{
      places.forEach((place)=>{
        var marker = new google.maps.Marker({
                      position: new google.maps.LatLng( place.lat,place.long),
                      map: map,
                      title: place.name
                  });
        marker.setMap(map);
      })
    })
}

module.exports = Place
