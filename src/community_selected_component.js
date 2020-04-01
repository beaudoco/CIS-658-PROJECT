import React from 'react';
import './community_component.css';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import ScrollableTabsButtonAuto from './community_selected_tabs_component';
import * as firebase from 'firebase';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';

var seasons = [];

export class CommunitySelectedComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index: -1,
            seasons: [],
            shows: []
        };
    }

    triggerUpdateState(index, user, shows) {
        const rootRef = firebase.firestore().collection('seasons');
        seasons.length = 0;
        rootRef.get().then((snapshot) => {
            snapshot.docs.forEach(doc => {
                seasons.push(doc.data());
            });
            seasons.sort(function (a, b) {
                return a.seasonID - b.seasonID;
            });
            this.setState({
                index: index,
                user: user,
                seasons: seasons,
                shows: shows
            });
            this.render();
        });
    };

    handleDelete() {
        console.log("Hello");
    }

    render() {
        return (
            <div className="CommunitySelectedComponent">
                <Card>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {this.state.index == -1 ? "Please Select Show" : this.state.index.showTitle}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Community is an opportunity for fans of all sorts of TV shows to connect with
                            eachother on one common platform. Community offers the unique opportunity for
                            users to share their opinions and theories of their favorite shows. It also
                            allows for users to connect and learn more about similar TV shows.
                            <br></br>
                            <br></br>
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Users can link shows that they find similar. Feel free to search our continuously
                            growing catalog of TV shows for your favorites! Users are also welcome to add new
                            shows as they like.
                        </Typography>
                        <br></br>
                        {this.state.index == -1 ? "" :
                            this.state.index.relatedShows != undefined ?
                                this.state.index.relatedShows.map(el => {
                                    return <div>
                                        <div class="outter">
                                            <Button color="primary" className="inner-right" style={{ marginTop: 10 }} onClick={() => console.log("hello")} >Add Show</Button>
                                            <Autocomplete
                                                id="similar-show"
                                                className="inner"
                                                options={this.state.shows}
                                                getOptionLabel={(option) => option.showTitle}
                                                style={{ width: 300 }}
                                                renderInput={(params) => <TextField {...params} label="Add Similar Show" variant="outlined" />} />
                                        </div>
                                        <br></br>
                                        <br></br>
                                        <div class="outter pad">
                                            <Chip label={el} className="inner" onDelete={() => this.handleDelete()} color="primary" />
                                        </div>
                                    </div>
                                }) : ""
                        }
                    </CardContent>
                </Card>
                <br></br>
                <br></br>
                {this.state.index == -1 ? <div></div> :
                    <Card>
                        <CardContent>
                            <div>
                                <ScrollableTabsButtonAuto user={this.state.user} seasons={this.state.seasons} ></ScrollableTabsButtonAuto>
                            </div>
                        </CardContent>
                    </Card>
                }
            </div>
        );
    }
}

export default CommunitySelectedComponent;