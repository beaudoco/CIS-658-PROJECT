import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import './community_footer_about_component.css';
import { Divider, Typography } from '@material-ui/core';

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});

export default function TemporaryDrawer(props) {
    const classes = useStyles();
    const [state, setState] = React.useState({
        bottom: false,
    });

    const toggleDrawer = (anchor, open, section) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        let list;
        if (section == "get") {
            list = [
                { primary: "getProviders", secondary: "To access providers use firebase.firestore().collection('providers').get(). " +
                    "Subscribe to this call using the .then() statement, this will access all providers in the system." },
                { primary: "getShows", secondary: "To access shows use firebase.firestore().collection('shows').get(). " +
                    "Subscribe to this call using the .then() statement, this will access all shows in the system."},
                { primary: "getSeasons", secondary: "To access seasons use firebase.firestore().collection('seasons').get(). " +
                    "Subscribe to this call using the .then() statement, this will access all seasons in the system." },
                { primary: "getComments", secondary: "To access comments use firebase.firestore().collection('comments').get(). " +
                    "Subscribe to this call using the .then() statement, this will access all comments in the system." },];
        } else if (section == "set") {
            list = [
                { primary: "addShows", secondary: "To add shows use firebase.firestore().collection('shows').add({showObj}). " +
                "Be sure to match {showObj} to the show table that is included below." },
                { primary: "addSeasons", secondary: "To add shows use firebase.firestore().collection('seasons').add({seasonsObj}). " +
                "Be sure to match {seasonsObj} to the show table that is included below." },
                { primary: "updateRelatedShows", secondary: "To add shows use firebase.firestore().collection('shows').doc({docID}).update(({showObj}). " +
                "Be sure to match {showObj} to the show table that is included below. Also be sure that {docID} matches the correct document in firebase." },
                { primary: "addComments", secondary: "To add shows use firebase.firestore().collection('comments').add({commentObj}). " +
                "Be sure to match {commentObj} to the show table that is included below." },];
        } else if (section == "providers") {
            list = [
                { primary: "description", secondary: "This is the description of the provider." },
                { primary: "height", secondary: "This is the height of the provider's image." },
                { primary: "image", secondary: "This is the provider's logo." },
                { primary: "index", secondary: "This is the provider's unique identifier to the system." },
                { primary: "title", secondary: "This is the provider's company name." },
                { primary: "width", secondary: "This is the width of the provider's image." },
            ];
        } else if (section == "shows")  {
            list = [
                { primary: "providerID", secondary: "This is used to match a given show with the proper provider of the show." },
                { primary: "relatedShows", secondary: "This is where shows that are related to the current show get saved." },
                { primary: "showDescription", secondary: "This is a quick summary of any given show." },
                { primary: "showID", secondary: "This is the unique identifier of a show." },
                { primary: "showImage", secondary: "This is the show's given title image." },
                { primary: "showTitle", secondary: "This is the title of the show." },
            ];
        } else if (section == "relatedShows" ) {
            list = [
                { primary: "relatedShows", secondary: "This is currently just the tile of the related show." },
            ];
        } else if (section == "seasons") {
            list = [
                { primary: "season", secondary: "This is the name of the season." },
                { primary: "seasonID", secondary: "This is the unique identifier of a season." },
                { primary: "showID", secondary: "This is the show that the season is related to." },
            ]
        } else if (section == "comments") {
            list = [
                { primary: "comment", secondary: "This is the comment a user has left." },
                { primary: "seasonID", secondary: "This is the season identifier that the user was commenting on." },
                { primary: "time", secondary: "This is the time the comment was made at." },
                { primary: "userImage", secondary: "This is the logged in user's image." },
                { primary: "username", secondary: "This is the name of the user who made the comment." },
            ];
        }
        else {
            list = [
                { primary: "add", secondary: "add" },
                { primary: "get", secondary: "get" },
                { primary: "set", secondary: "set" },];
        }

        setState({ ...state, [anchor]: open, section, list });
    };

    const list = (anchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                {state.list ? state.list.map((text, index) => {
                    return (<div>
                        <ListItem key={text}>
                            <ListItemText primary={text.primary} secondary={text.secondary}>
                            </ListItemText>
                        </ListItem>
                        {state.list.length == index + 1 ? '' : <Divider></Divider>}
                    </div>)
                }) : ''}
            </List>
        </div>
    );

    return (
        <div>
            <React.Fragment key="bottom">
                <ul>
                    <li>
                        <Button onClick={toggleDrawer("bottom", true, "get")}>Get Calls</Button>
                    </li>
                    <li>
                        <Button onClick={toggleDrawer("bottom", true, "set")}>Set Calls</Button>
                    </li>
                    <li>
                        <Button onClick={toggleDrawer("bottom", true, "providers")}>Providers Document</Button>
                    </li>
                    <li>
                        <Button onClick={toggleDrawer("bottom", true, "shows")}>Shows Document</Button>
                    </li>
                    <li>
                        <Button onClick={toggleDrawer("bottom", true, "relatedShows")}>Related Shows Array</Button>
                    </li>
                    <li>
                        <Button onClick={toggleDrawer("bottom", true, "seasons")}>Seasons Document</Button>
                    </li>
                    <li>
                        <Button onClick={toggleDrawer("bottom", true, "comments")}>Comments Document</Button>
                    </li>
                </ul>

                <Drawer anchor="bottom" open={state["bottom"]} onClose={toggleDrawer("bottom", false)}>
                    {list("bottom")}
                </Drawer>
            </React.Fragment>
        </div>
    );
}