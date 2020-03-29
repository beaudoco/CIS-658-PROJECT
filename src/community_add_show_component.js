import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import './community_add_show_component.css';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import * as firebase from 'firebase';

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export class FullScreenDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
  }

  handleClickOpen() {
    this.setState({
      open: true
    });
  };

  handleClose() {
    this.setState({
      open: false
    });
  };

  handleSave() {
    const rootRef = firebase.firestore().collection('shows');
    rootRef.add({
      providerID: this.props.providerID,
      showDescription: document.getElementById('show-description').value,
      showID: Date.now() + Math.random(),
      showImage: document.getElementById('show-image').value,
      showTitle: document.getElementById('show-title').value
    });

    this.setState({
      open: false
    });
  };

  render() {
    return (
      <div>
        <Button className="addShow" color="primary" onClick={() => this.handleClickOpen()}>
          Add Series
        </Button>
        <Dialog fullScreen open={this.state.open} onClose={() => this.handleClose()} TransitionComponent={Transition}>
          <AppBar className="appBar">
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={() => this.handleClose()} aria-label="close">
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className="title">
                Add New Series
              </Typography>
              <Button autoFocus color="inherit" onClick={() => this.handleSave()}>
                save
              </Button>
            </Toolbar>
          </AppBar>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <div className="root">
            <Grid container spacing={2}>
              <Grid item xs>
                <Paper className="paper">
                  <TextField
                    id="show-title"
                    label="Show Title"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                  />
                </Paper>
              </Grid>
              <Grid item xs>
                <Paper className="paper">
                  <TextField
                    id="show-description"
                    label="Show Description"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                  />
                </Paper>
              </Grid>
              <Grid item xs>
                <Paper className="paper">
                  <TextField
                    id="show-image"
                    label="Show Image"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                  />
                </Paper>
              </Grid>
            </Grid>
          </div>
        </Dialog>
      </div>
    );
  }

}

export default FullScreenDialog;