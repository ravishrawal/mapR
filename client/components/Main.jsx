import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {Route, NavLink, withRouter} from 'react-router-dom'
import {store} from '../store'
import Map from './Map.jsx';
import Login from './Login.jsx';
import Navbar from './Navbar.jsx';
import ColourPicker from './ColourPicker.jsx';

export default class Main extends Component {
  componentDidMount(){
    axios.get('/auth')
    .then(res => {const {userId} = res.data})
  }
  render(){
    return (
      <div>
        <Map />
        <Route path='/' component={Login} />
        <Navbar />
        <ColourPicker />
      </div>
    )

  }
}
