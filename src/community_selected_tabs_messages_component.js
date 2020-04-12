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
import * as firebase from 'firebase';
import { APICallsService } from './community_api';

var list = [];

export var ListItemEl = (list) =>
    list.map(el => {
        return <div>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt={el.username} src={el.userImage} />
                </ListItemAvatar>
                <ListItemText
                    primary={el.username}
                    secondary={
                        <React.Fragment>
                            <Typography
                                component="span"
                                variant="body2"
                                className="list-inline"
                                color="textPrimary"
                            >
                                {el.username}
                            </Typography>
                            {" " + el.comment}
                        </React.Fragment>
                    }
                />
            </ListItem>
            <Divider variant="inset" component="li" />
        </div>
    });

export class AlignItemsList extends React.Component {
    constructor(props) {
        super(props);
        this.apiCallsService = new APICallsService;
        this.state = {
            isError: false,
            errorMessage: "",
            user: props.user,
            list: list,
            seasonID: props.season
        };
        this.listItems = ListItemEl(this.state.list);
    }

    saveComment() {
        var tmpErrMessage = "";
        var tmpIsErr = false;

        if (this.props.user == null) {
            tmpErrMessage = "Please Login With a User Account";
            tmpIsErr = true;
        } else if ((document.getElementById("outlined-comment-text").value == null) ||
            (document.getElementById("outlined-comment-text").value == '')) {
            tmpErrMessage = "Please Enter A Comment";
            tmpIsErr = true;
        } else {
            const rootRef = firebase.firestore().collection('comments');
            const tmpCommentObj = {
                comment: document.getElementById("outlined-comment-text").value,
                seasonID: this.state.seasonID,
                time: new Date(),
                userImage: this.props.user.imageUrl,
                username: this.props.user.name
            }

            this.apiCallsService.addComments(rootRef, tmpCommentObj).then(() => {
                document.getElementById("outlined-comment-text").value = "";
                this.componentDidMount();
            });
        }

        this.setState({
            isError: tmpIsErr,
            errorMessage: tmpErrMessage
        });
    }

    componentDidMount() {
        const rootRef = firebase.firestore().collection('comments');
        list.length = 0;

        this.apiCallsService.getComments(rootRef).then((tmpList) => {
            for (var i = 0; i < tmpList.length; i++) {
                if (tmpList[i].seasonID == this.state.seasonID) {
                    list.push(tmpList[i]);
                }
            }
            this.listItems = ListItemEl(this.state.list);
            this.setState({ list: list });

        });
    }

    render() {
        var list = this.listItems;
        return (
            <div>
                <List className="list-root">
                    {list}
                </List>
                <div style={{ marginBottom: 50 }}>
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
            </div>
        );
    }
}

export default AlignItemsList;