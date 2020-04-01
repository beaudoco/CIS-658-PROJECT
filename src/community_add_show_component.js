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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export class FullScreenDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      provider: props.provider,
      printer: props.printer,
      showDescriptionErr: false,
      showImageErr: false,
      showTitleErr: false
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
    var tmpShowDescErr = (document.getElementById('show-description').value == '');
    var tmpShowImageErr = (document.getElementById('show-image').value == '');
    var tmpShowTitleErr = (document.getElementById('show-title').value == '');
    
    if (!(tmpShowDescErr || tmpShowImageErr || tmpShowTitleErr)) {
      const rootRef = firebase.firestore().collection('shows');
      rootRef.add({
        providerID: this.state.provider.index,
        showDescription: document.getElementById('show-description').value,
        showID: Date.now() + Math.random(),
        showImage: document.getElementById('show-image').value,
        showTitle: document.getElementById('show-title').value
      }).then(() => {
        this.state.printer();
      });
  
      this.setState({
        open: false
      });
    } else {
      this.setState({
        showDescriptionErr: tmpShowDescErr,
        showImageErr: tmpShowImageErr,
        showTitleErr: tmpShowTitleErr
      });
    }
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
                    error={this.state.showTitleErr}
                    helperText={this.state.showTitleErr ? "Please enter a show title" : ""}
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
                    error={this.state.showDescriptionErr}
                    helperText={this.state.showDescriptionErr ? "Please enter a show description" : ""}
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
                    error={this.state.showImageErr}
                    helperText={this.state.showImageErr ? "Please enter a show image" : ""}
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