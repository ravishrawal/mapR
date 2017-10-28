import React, {Component} from 'react'
import {connect} from 'react-redux'

export default function Map(){
  return (
    <div id='map'>
      <div id="regions_div" style={{width: "900px", height: "500px"}}></div>
    </div>
  )
}
