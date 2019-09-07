import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {connect} from 'react-redux'
import {verifyUser, signupUser, logoutCurrentUser, getFBUserPlaces} from '../store'

export class Login extends Component{
  constructor(props) {
    super(props);
    this.state = {
        email: '',
        password: ''
    };
    this.onChange = this.onChange.bind(this)
    this.onFBClick = this.onFBClick.bind(this)
    this.onLoginSubmit = this.onLoginSubmit.bind(this)
    this.onSignupSubmit = this.onSignupSubmit.bind(this)
    this.onLogoutSubmit = this.onLogoutSubmit.bind(this)
  }
  componentDidMount(){
    axios.get('/auth/me')
    .then(res => res.data.userId)
    .then(userId => {
      if(userId){
        axios.get(`/api/users/${userId}`)
          .then(res => res.data)
          .then(user=>this.props.loginUser({email: user.email, password:user.password}))
      }
    })
  }
  onFBClick(){
    var {loginUser, signupNewUser} = this.props;
    var {setState} = this
    FB.login(function(response) {
      signupNewUser({FBID:response.authResponse.userID})
      console.log(response);
    }, {scope: 'user_tagged_places'});
    setTimeout(()=>{
      getFBUserPlaces(this.props.user.id)
    }, 2000)
  }
  onChange(ev){
    ev.preventDefault();
    var {name, value} = ev.target;
    this.setState({[name]: value});
  }
  onLoginSubmit(ev){
    ev.preventDefault();
    this.props.loginUser(this.state)
    .then(user=>console.log(this.props.user))
  }
  onSignupSubmit(ev){
    ev.preventDefault();
    this.props.signupNewUser(this.state)
    .then(user=>console.log(this.props.user))
  }
  onLogoutSubmit(ev){
    ev.preventDefault();
    this.props.logoutUser()
    .then(()=>this.setState({email:'', password:''}))
  }
  render(){
    const {user} = this.props
    return (
      <div>
      {
        !user.id &&
        <div id='login'>
          <form className="manualLogin">
            <input placeholder='email' name='email' onChange={this.onChange}></input>
            <input placeholder='password' name='password' onChange={this.onChange}></input>
            <button onClick={this.onLoginSubmit}>Log In</button>
            <button onClick={this.onSignupSubmit}>Sign Up</button>
          </form>
            <button onClick={this.onFBClick}>FB</button>
        </div>
      }
      {
        user.id &&
        <div id='logout'>
          <button onClick={this.onLogoutSubmit}>Log Out</button>
        </div>
      }
      </div>
    )
  }
}
const mapState = (state)=>{
  return {
    user: state.user
  }
}
const mapDispatch = (dispatch) => {
  return {
    loginUser: (user)=>{
      return dispatch(verifyUser(user))
    },
    signupNewUser: (user)=>{
      return dispatch(signupUser(user))
    },
    logoutUser: (user)=>{
      return dispatch(logoutCurrentUser())
    }
  }
}

export default connect(mapState, mapDispatch)(Login);
