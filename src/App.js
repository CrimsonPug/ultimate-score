import React, { Component } from 'react';
import {Link} from 'react-router';
import axios from 'axios';
import './App.css';

class Login extends Component {
  constructor(){
    super();
    this.state = {username:null,password:null,warning:'no-warning'};

    this.formSubmit = this.formSubmit.bind(this);
    this.txtFieldChange = this.txtFieldChange.bind(this);
  }

  formSubmit(e){
    let self = this;
    e.preventDefault();
    axios
      .post('http://localhost:3005/login',this.state)
      .then((res) => {
        console.log(res);
        /*
          TASK 2: If the login request is successful, store the authToken from the server in localStorage
            Once token is stored, redirect user to the private page
            If the login request was unsuccessful, do not redirect user and show a warning message.
        */
           if(res.status === 200){
            localStorage.authToken = res.data.token;
            location.href ="http://localhost:3000/private";
            console.log('token saved');
          }else{
              self.setState({
            warning:''
          })
          console.log('You shall not pass');
          }
      })
      .catch((err)=>{
          self.setState({
            warning:''
          })
          console.log('You shall not pass');
      })
  }

  txtFieldChange(e){
    if(e.target.name === "username"){this.state.username = e.target.value}
    else if(e.target.name === "password"){this.state.password = e.target.value}

    this.setState({
      username:this.state.username,
      password:this.state.password
    });
  }

  render() {

    return (
      <div id="auth">
        <h3>Login Form</h3>
        <p className={"alert alert-danger "+ this.state.warning}>Incorrect username or password</p>
        <img className={this.state.warning} src="https://m.popkey.co/5829be/VWKka.gif"/>
        <form onSubmit={this.formSubmit}>
          <div className="form-group">
            <input 
              onChange={this.txtFieldChange}
              className="form-control"
              type="text" 
              placeholder="Username" 
              name="username" />
          </div>
          <div className="form-group">
            <input 
              onChange={this.txtFieldChange}
              className="form-control"
              type="password" 
              placeholder="Password" 
              name="password" />
          </div>
          <div className="form-group">
            <button className="btn btn-primary">Login</button>
          </div>
        </form>
      </div>
    );
  }
}

class PrivatePage extends Component{
  constructor(){
    super();
    this.state = {data:null,loading:true, auth:false}
  }
  componentDidMount(){
    /* 
      TASK 3: When accessing this page/component, make sure that there is an authToken in your local storage.
        If there is no authToken, redirect to the login page.
        If there is an authToken, send a request to the '/privatedata' endpoint with the authToken included in the headers.*/
 const self = this;
    //token check
    if(localStorage.authToken !== undefined && localStorage.authToken !== null){
        axios
        .get('http://localhost:3005/login/privatedata', {headers:{'authorization':localStorage.authToken}})
        .then( (res) => {
            //token is valid show page and data
            if(res.status === 200){
                self.setState({
                loading:false,
                auth:true,
                data:res.data
                });
                 console.log('access granted');
            }
        });
       
    }
    else{
        console.log('accest denied');
        location.href = 'http://localhost:3000';
    }
  
     /* TASK 7: The response should include the username, display "Hello, [USERNAME]" on this page.
    */
  }
  render(){
    if (this.state.loading) {
      return <div>loading ...</div>;
    }
    else {
      return (
        <div>
          <h1>Enjoy this {this.state.data}</h1>
          <img id="sensitive" src="http://wallpapercave.com/wp/jHWGRA7.jpg" />
        </div>
        );
    }
  }
}
class Register extends Component {
  constructor(){
    super();
    this.state = {username:null,password:null};

    this.formSubmit = this.formSubmit.bind(this);
    this.txtFieldChange = this.txtFieldChange.bind(this);
  }

  formSubmit(e){
    e.preventDefault();
    axios
      .post('http://localhost:3005/login/encrypt',this.state)
      .then( (res) =>{
        console.log(res);
      })
  }

  txtFieldChange(e){
    if(e.target.name === "username"){
        this.state.username = e.target.value;
    }
    else if(e.target.name === "password"){
        this.state.password = e.target.value;
    }
    this.setState({
      username:this.state.username,
      password:this.state.password
    });
  }

  render() {
    return (
      <div id="auth">
        <h3>Registration Form</h3>
        <form onSubmit={this.formSubmit}>
          <div className="form-group">
            <input 
              onChange={this.txtFieldChange}
              className="form-control"
              type="text" 
              placeholder="Username" 
              name="username" />
          </div>
          <div className="form-group">
            <input 
              onChange={this.txtFieldChange}
              className="form-control"
              type="password" 
              placeholder="Password" 
              name="password" />
          </div>
          <div className="form-group">
            <button className="btn btn-primary">Register</button>
          </div>
        </form>
      </div>
    );
  }
}

class Nav extends Component {
   render() {
        return (
            <div>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/register">Register</Link></li>
            
                </ul>
                {this.props.children}               
            </div>
        )
    }
}

export {Nav,Register,Login,PrivatePage};