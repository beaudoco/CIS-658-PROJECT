import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CommunityComponent from './community_component.js';
import { GoogleLogin } from 'react-google-login';
import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyD0Im2AMYf1QPIzwi3T-4c8R40cqcsCc6s",
  authDomain: "cis-658-1580957541230.firebaseapp.com",
  databaseURL: "https://cis-658-1580957541230.firebaseio.com",
  projectId: "cis-658-1580957541230",
  storageBucket: "cis-658-1580957541230.appspot.com",
  messagingSenderId: "569471380445",
  appId: "1:569471380445:web:50eb6bc779461575efa434",
  measurementId: "G-QNL6JT988X"
};

firebase.initializeApp(firebaseConfig);
var user = {
  googleId: null,
  imageUrl: null,
  email: null,
  name: null,
  givenName: null,
  familyName: null
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: user,
    };
  }

  render() {
    const responseGoogle = (response) => {
      var tmpUser = response.profileObj;
      this._child.triggerUpdateState(tmpUser);
      this.setState({
        user: tmpUser
      });
    }

    return (
      <div>
        <h1>
          <div>
            <AppBar position="static">
              <Toolbar>
                {/* <Typography variant="h6" className={flexGrow: 1}> */}
                <Typography variant="h6" className="flex-grow">
                  CIS 658
              </Typography>
                <GoogleLogin
                  clientId="569471380445-m97no7296bifg4kvqoditavfsaobjbbi.apps.googleusercontent.com"
                  buttonText={this.state.user ? this.state.user.givenName !== null ? "Welcome " + this.state.user.givenName : "Login" : "Login"}
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  isSignedIn={true}
                  disabled={false}
                  cookiePolicy={'single_host_origin'}
                />
              </Toolbar>
            </AppBar>
          </div>
        </h1>
        <h2 className="center">Welcome To Community</h2>
        <CommunityComponent ref={component => this._child = component}></CommunityComponent>
        <script src="https://www.gstatic.com/firebasejs/7.8.1/firebase-app.js"></script>
        <script src="https://www.gstatic.com/firebasejs/7.8.1/firebase-analytics.js"></script>
        {/* <script src="/__/firebase/7.8.1/firebase-app.js"></script>
        <script src="/__/firebase/7.8.1/firebase-analytics.js"></script>
        <script src="/__/firebase/init.js"></script> */}
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
