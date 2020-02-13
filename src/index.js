import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MenuIcon from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
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

// const db = firebase.database();
// const dbRef = db.ref.child('provider');

// dbRef.on('value', snapshot => {
//   console.log(snapshot.val());
// }); 

const responseGoogle = (response) => {
  console.log(response);
}
const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    }));
  
  function ButtonAppBar() {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
  
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton  edge="start" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} className={classes.menuButton} color="secondary" aria-label="menu">
            <MenuIcon
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                onBlur={handleClose}
            >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
            </MenuIcon>
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              CIS 658
            </Typography>
            <GoogleLogin
              clientId="569471380445-d1t8q5o2afotehccphv8bur7qe520t2t.apps.googleusercontent.com"
              buttonText="Login"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={'single_host_origin'}
            />
          </Toolbar>
        </AppBar>
      </div>
    );
  }
  
  class Game extends React.Component {
    constructor(props) {
      super(props);
    }

    componentDidMount() {
      const rootRef = firebase.firestore().collection('providers');
      rootRef.get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
          console.log(doc.data());
        });
      });
      // providerRef.on('value', snap => {
      //   console.log(snap.val());
      //   console.log("hellow");
      // });
    }

    render() {  
      return (          
        <div>
            <h1>
                <ButtonAppBar></ButtonAppBar>          
            </h1>
            <h2 className="center">Welcome To Community</h2>
            <CommunityComponent></CommunityComponent>
            <script src="https://www.gstatic.com/firebasejs/7.8.1/firebase-app.js"></script>
            <script src="https://www.gstatic.com/firebasejs/7.8.1/firebase-analytics.js"></script>
            <script src="/__/firebase/7.8.1/firebase-app.js"></script>
            <script src="/__/firebase/7.8.1/firebase-analytics.js"></script>
            <script src="/__/firebase/init.js"></script>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(<Game />, document.getElementById("root"));
  