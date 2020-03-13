import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import './community_selected_tabs_messages_component.css';
import FormControl from '@material-ui/core/FormControl';

export class AlignItemsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isError: false,
            errorMessage: ""
        };
    }

    saveComment() {
        console.log(this.state.user);
        console.log(document.getElementById("outlined-comment-text").value);
        this.setState({
            isError: true,
            errorMessage: "fuck"
        });
        document.getElementById("outlined-comment-text").error = true;
        //this._child.triggerUpdateState(true);
    }

    render() {
        return (
            <div>
                <List className="list-root">
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                        </ListItemAvatar>
                        <ListItemText
                            primary="Brunch this weekend?"
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        className="list-inline"
                                        color="textPrimary"
                                    >
                                        Ali Connors
                            </Typography>
                                    {" — I'll be in your neighborhood doing errands this…"}
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                        </ListItemAvatar>
                        <ListItemText
                            primary="Summer BBQ"
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        className="list-inline"
                                        color="textPrimary"
                                    >
                                        to Scott, Alex, Jennifer
                            </Typography>
                                    {" — Wish I could come, but I'm out of town this…"}
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                        </ListItemAvatar>
                        <ListItemText
                            primary="Oui Oui"
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        className="list-inline"
                                        color="textPrimary"
                                    >
                                        Sandra Adams
                            </Typography>
                                    {' — Do you have Paris recommendations? Have you ever…'}
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                </List>
                <div>
                    <FormControl fullWidth variant="outlined">
                        <TextField
                            error={this.state.isError}
                            id="outlined-comment-text"
                            label="Add Comment"
                            helperText={this.state.errorMessage}
                            variant="outlined"
                        />
                    </FormControl>
                    <Button type="submit" className="addBtn" onClick={() => this.saveComment()} >Comment</Button>
                </div>
                <br></br>
                <br></br>
            </div>
        );
    }
}

export default AlignItemsList;