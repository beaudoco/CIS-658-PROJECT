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
      user = tmpUser;
      this._child.triggerUpdateState(user);
      this.setState({
        user: tmpUser
      });

    }
    const loggedInUser = user;
    
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
                  clientId="569471380445-d1t8q5o2afotehccphv8bur7qe520t2t.apps.googleusercontent.com"
                  buttonText={loggedInUser.givenName ? "Welcome " + loggedInUser.givenName : "Login"}
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  isSignedIn={true}
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
        <script src="/__/firebase/7.8.1/firebase-app.js"></script>
        <script src="/__/firebase/7.8.1/firebase-analytics.js"></script>
        <script src="/__/firebase/init.js"></script>        

        {/* <!-- update the version number as needed -->
        <script defer src="/__/firebase/7.8.1/firebase-app.js"></script>
        <!-- include only the Firebase features as you need -->
        <script defer src="/__/firebase/7.8.1/firebase-auth.js"></script>
        <script defer src="/__/firebase/7.8.1/firebase-database.js"></script>
        <script defer src="/__/firebase/7.8.1/firebase-messaging.js"></script>
        <script defer src="/__/firebase/7.8.1/firebase-storage.js"></script>
        <!-- initialize the SDK after all desired features are loaded -->
        <script defer src="/__/firebase/init.js"></script> */}
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
