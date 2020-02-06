import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CommunityComponent from './community_component.js';

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
        <script src="https://apis.google.com/js/platform.js" async defer></script>
        <meta name="google-signin-client_id" content="YOUR_CLIENT_ID.apps.googleusercontent.com"></meta>
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
            <div className="g-signin2" data-onsuccess="onSignIn"></div>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
  
  class Game extends React.Component {
    constructor(props) {
      super(props);
    } 
    render() {  
      return (          
        <div>
            <h1>
                <ButtonAppBar></ButtonAppBar>          
            </h1>
            <h2 className="center">Welcome To Community</h2>
            <CommunityComponent></CommunityComponent>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(<Game />, document.getElementById("root"));
  