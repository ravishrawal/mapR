import ReactGoogleMapLoader from "react-google-maps-loader"
import GoogleMap from "react-google-map"
import React, {Component} from 'react'
import {connect} from 'react-redux'
import mapStyles from './mapStyles'
import { updateUser, getFBUserPlaces, getUser } from '../store'

export function Map(props){
    const {user, onLoad} = props;
    return (
      <div>
        {
          user.id &&
          <ReactGoogleMapLoader
              params={{
                  key: "AIzaSyCGWLnM4pjsU5K_-UNszrWfIQjoit582ZU",
                  libraries: "places,geometry",
              }}
              render={googleMaps =>
                  googleMaps && (
                    <div style={{height: "80vh", width:"80vw"}}>
                      <GoogleMap
                        googleMaps={googleMaps}
                        center={{lat: 30, lng: 0}}
                        zoom={2}
                        styles={mapStyles}
                        onLoaded= {(googleMaps, map) =>{onLoad(googleMaps, map,user)}}
                      />
                    </div>
                  )}
          />
        }
      </div>
    )
}

const mapState = (state) => {
  return {
    user: state.user
  }
}

const mapDispatch = (dispatch) => {
  return {
    onLoad: (googleMaps, map, user)=>{
      const newMap = map;
      setTimeout((googleMaps, newMap, marker)=>{
        getUser(user.id)
        .then(user=>{return user.places})
        .then(places => {
          places.forEach((place)=>{
            marker = new google.maps.Marker({
              position: new google.maps.LatLng( place.lat,place.long),
              map: map
            });
            marker.setIcon('http://maps.google.com/mapfiles/ms/icons/yellow-dot.png')
            var infowindow =  new google.maps.InfoWindow({
          		content: place.name,
          		map: map
          	});
            marker.addListener('mouseover', function() {
                infowindow.open(map, this);
            });
            marker.addListener('mouseout', function() {
                infowindow.close();
            });
            marker.setMap(map);
          })
        })
      }, 3000)
    }
  }
}

export default connect(mapState, mapDispatch)(Map);
