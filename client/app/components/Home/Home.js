import React, { Component } from 'react';
import 'whatwg-fetch';

import {
  getFromStorage,
  setInStorage,
} from '../../utils/storage';


class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      token: '',

      signInError: '',
      signInEmail: '',
      signInPassword: '',


      //Test

      signInClearance: '',

    };

    this.onTextboxChangeSignInEmail = this.onTextboxChangeSignInEmail.bind(this);
    this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(this);

    this.onTextboxChangeSignInClearance = this.onTextboxChangeSignInClearance.bind(this);

    this.onSignIn = this.onSignIn.bind(this);

    this.logout = this.logout.bind(this);
   }

  componentDidMount() {
    const obj = getFromStorage('the_main_app');
    if (obj && obj.token) {
      const { token } = obj;
        // Verify token
        fetch('/api/account/verify?token=' + token)
          .then(res => res.json())
          .then(json => {
            if (json.success) {
              this.setState ({
                token,
                isLoading: false,
              });
            } else {
              this.setState ({
                isLoading: false,
              });
            }
          });
    } else {
      this.setState({
        isLoading: false,
      });
    }
  }

  onTextboxChangeSignInEmail(event) {
    this.setState ({
       signInEmail: event.target.value,
    });
  }

  onTextboxChangeSignInPassword(event) {
    this.setState ({
       signInPassword: event.target.value,
    });
  }



  onTextboxChangeSignInClearance(event) {
    this.setState ({
       signInClearance: event.target.value,
    });
  }



  onSignIn() {
    const {
      signInEmail,
      signInPassword,
      signInClearance,
    } = this.state;

    this.setState({
      isLoading: true,
    });

    // Post request to backend
    fetch('/api/account/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword,
        clearance: signInClearance,
      }),
    }).then(res => res.json())
      .then(json => {
          console.log('json', json);
          if (json.success) {
            setInStorage('the_main_app', { token: json.token });
            this.setState({
              signInError: json.message,
              isLoading: false,
              signInPassword: '',
              signInEmail: '',
              signInClearance: '',
              token: json.token,
            });
          } else {
            this.setState({
              signInError: json.message,
              isLoading: false,
            });
          }
      });
  }

  logout() {
    this.setState({
      isLoading: true,
    });
    const obj = getFromStorage('the_main_app');
    if (obj && obj.token) {
      const { token } = obj;
        // Verify token
        fetch('/api/account/logout?token=' + token)
          .then(res => res.json())
          .then(json => {
            if (json.success) {
              this.setState ({
                token: '',
                isLoading: false,
              });
            } else {
              this.setState ({
                isLoading: false,
              });
            }
          });
    } else {
      this.setState({
        isLoading: false,
      });
    }
  }

  render() {
    const {
      isLoading,
      token,
      signInError,
      signInEmail,
      signInPassword,

      signInClearance,

    } = this.state;

    if (isLoading) {
      return (<div><p>Loading...</p></div>);
    }

    if (!token) {
      return (
        <div>
          <div>
            {
              (signInError) ? (
                <p>{signInError}</p>
              ) : (null)
            }
            <p>Sign In</p>
            <input
              type="email"
              placeholder="Email"
              value={signInEmail}
              onChange={this.onTextboxChangeSignInEmail}
            />
            <br />
            <input
              type="password"
              placeholder="Password"
              value={signInPassword}
              onChange={this.onTextboxChangeSignInPassword}
            />
            <br />

            {/*SignIn*/}
            <div>
            <select
            type="clearance"
            id="Clearance"
            value={signInClearance}
            onChange={this.onTextboxChangeSignInClearance}
            >
              <option value="Select">Select</option>
              <option value="Patient">Patient</option>
              <option value="Doctor">Doctor</option>
              <option value="Admin">Admin</option>
            </select>
            </div><br />

            <button onClick={this.onSignIn}>Sign In</button>
          </div>

          <br />
          <br />
          <div>

          </div>


        </div>
      );
    }

    return (
      <div>
        <p>Account</p>
        <button onClick={this.logout}>Logout</button>
      </div>
    );
  }
}

export default Home;
