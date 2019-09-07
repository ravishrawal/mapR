import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {Route, NavLink, withRouter} from 'react-router-dom'
import {store} from '../store'
import Map from './Map.jsx';
import Login from './Login.jsx';
import Navbar from './Navbar.jsx';
import ColourPicker from './ColourPicker.jsx';

console.log(Map);

export default class Main extends Component {
  render(){
    return (
      <div>
        <Route path='/' component={Login} />
        <Map />
        <Navbar />
        <ColourPicker />
      </div>
    )

  }
}
