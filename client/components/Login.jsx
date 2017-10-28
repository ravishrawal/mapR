import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {verifyUser, signupUser} from '../store'

export class Login extends Component{
  constructor(props) {
    super(props);
    this.state = {
        email: '',
        password: ''
    };
    this.onChange = this.onChange.bind(this)
    this.onLoginSubmit = this.onLoginSubmit.bind(this)
    this.onSignupSubmit = this.onSignupSubmit.bind(this)
  }
  componentDidMount(){
    axios.get('/auth')
    .then(res => res.data.userId)
    .then(userId => {
      if(userId){
        axios.get(`/api/users/${userId}`)
          .then(res => res.data)
          .then(user=>this.props.loginUser({email: user.email, password:user.password}))
      }
    })
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
    this.props.signupUser(this.state)
    .then(user=>console.log(this.props.user))
  }
  render(){
    const {user} = this.props
    return (
      <div>
      {
        !user.id &&
        <div id='Login'>
          <form className="manualLogin">
            <input placeholder='email' name='email' onChange={this.onChange}></input>
            <input placeholder='password' name='password' onChange={this.onChange}></input>
            <button onClick={this.onLoginSubmit}>Log In</button>
            <button onClick={this.onSignupSubmit}>Sign Up</button>
          </form>
          <div className="fb-login-button"
              data-max-rows="1"
              data-size="large"
              data-button-type="continue_with"
              data-show-faces="false"
              data-auto-logout-link="true"
              data-use-continue-as="false">
          </div>
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
    signupUser: (user)=>{
      return dispatch(signupUser(user))
    }
  }
}

export default connect(mapState, mapDispatch)(Login);
