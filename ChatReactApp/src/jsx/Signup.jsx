import  React, {Component} from 'react';
import "../style/style.css";

import {Link} from 'react-router-dom';
import {database,firebaseApp} from '../config/firebase.js';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: ''
    }
    console.log('SignUp props',props);
  }
  signUp() {
    console.log('signup()',this.state.email,this.state.password);
    const {email,password} = this.state;
    //fetch('/signup',{
      //method: 'post',
      //headers: {
        //'Accept': 'application/json, text/plain, */*',
        //'Content-Type': 'application/json'
      //},
      //body: JSON.stringify({email:email, password:password})
    //})
    //.then(response => response.text())
    //.then(text => this.setState({msg:text}))
    //.catch(error => this.setState({msg:error}));

    firebaseApp.auth().createUserWithEmailAndPassword(email,password)
    .then(()=> {
      const userRef=database.ref('user');
      userRef.push(email)
      .catch(error=> {
        this.setState({error: error})
      });
    })
    .catch(error=> {
      this.setState({error: error})
    });
  }

  render() {
    return (
      <div style={{textAlign: "center"}}>
        {console.log('Signup')}
        <h3>SignUp</h3><br/>
          <form className="form-inline">
            <input type="email" placeholder="Enter Email" className="form-control"
              onChange={event => this.setState({email: event.target.value})
            }/>
            <input type="password" placeholder="Enter Password" className="form-control"
              onChange={event => this.setState({password: event.target.value})
            }/>
            <button type="button" className="btb btn-success form-control"
              onClick={() => this.signUp()}>SignUp</button>
          </form>
          {
            <Link to={'/signin'}>SignIn Instead</Link>
          }
          <div>{this.state.error.message}</div>
      </div>
    );
  }
}

export default SignUp;
