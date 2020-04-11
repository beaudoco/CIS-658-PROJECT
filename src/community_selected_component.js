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
import { APICallsService } from './community_api';

var seasons = [];

export class CommunitySelectedComponent extends React.Component {
    constructor(props) {
        super(props);
        this.apiCallsService = new APICallsService();
        this.state = {
            index: -1,
            seasons: [],
            shows: [],
            isErr: false,
            errMessage: ''
        };
    }

    triggerUpdateState(index, user, shows, filteredShows) {
        const rootRef = firebase.firestore().collection('seasons');
        seasons.length = 0;

        this.apiCallsService.getSeasons(rootRef).then((tmpSeasons) => {
            for (var i = 0; i < tmpSeasons.length; i++) {
                if (tmpSeasons[i].showID == index.doc.showID) {
                    seasons.push(tmpSeasons[i]);
                }
            }

            var tmpShows = [];
            var tmpdocObj = [];
            var tmpFilteredShows = [];
            shows.forEach(show => {
                tmpShows.push(show.doc);
                const tmpObj = {
                    showID: show.doc.showID,
                    docID: show.id
                };
                tmpdocObj.push(tmpObj);
            });
            filteredShows.forEach(show => {
                tmpFilteredShows.push(show.doc);
            });
            this.setState({
                index: index.doc,
                user: user,
                seasons: seasons,
                shows: tmpShows,
                filteredShows: tmpFilteredShows,
                docObj: tmpdocObj
            });
            //this.render();
        });
    };

    handleDelete(el) {
        const tmpDocID = this.state.docObj.find(x => x.showID == this.state.index.showID);
        const rootRef = firebase.firestore().collection('shows');
        const tmpRelatedShows = firebase.firestore.FieldValue.arrayRemove(el);

        this.apiCallsService.updateRelatedShows(rootRef, tmpDocID.docID, tmpRelatedShows).then(() => {
            const tmpShows = this.state.index.relatedShows;
            var showsList = [];
            tmpShows.forEach((show) => {
                if (show !== el) {
                    showsList.push(show);
                }
            });
            var tmpShowList = this.state.filteredShows;
            for (var i = 0; i < this.state.shows.length; i++) {
                if (this.state.shows[i].showTitle == el) {
                    tmpShowList.push(this.state.shows[i]);
                }
            }

            const tmpIdx = this.state.index;
            this.setState({
                filteredShows: tmpShowList,
                index: {
                    showID: tmpIdx.showID,
                    showTitle: tmpIdx.showTitle,
                    relatedShows: showsList,
                    showDescription: tmpIdx.showDescription,
                    showImage: tmpIdx.showImage,
                    providerID: tmpIdx.providerID
                }
            });
        });
    }

    handleSave() {
        if (document.getElementById("similar-show").value == '') {
            this.setState({
                errMessage: "Please Select a Show",
                isErr: true
            });
        } else {
            const tmpDocID = this.state.docObj.find(x => x.showID == this.state.index.showID);
            const rootRef = firebase.firestore().collection('shows');
            const tmpRelatedShows = firebase.firestore.FieldValue.arrayUnion(document.getElementById("similar-show").value);

            if (this.state.index.relatedShows.length > 0) {
                for (var idx = 0; idx < this.state.index.relatedShows.length; idx++) {
                    if (this.state.index.relatedShows[idx] == document.getElementById("similar-show").value) {
                        this.setState({
                            errMessage: "Please Select a Show That Isn't Used",
                            isErr: true
                        });
                        return;
                    }
                }
            }

            this.apiCallsService.updateRelatedShows(rootRef, tmpDocID.docID, tmpRelatedShows).then(() => {
                var tmpShows = this.state.index.relatedShows;
                tmpShows.push(document.getElementById("similar-show").value);
                const tmpIdx = this.state.index;

                var tmpShowList = [];
                for (var i = 0; i < this.state.shows.length; i++) {
                    var dontAdd = false;
                    if (this.state.shows[i].showTitle.toLowerCase() != document.getElementById("similar-show").value.toLowerCase()
                        && this.state.shows[i].showTitle.toLowerCase() != this.state.index.showTitle.toLowerCase()) {
                        for (var j = 0; j < tmpShows.length; j++) {
                            if (tmpShows[j].toLowerCase() == this.state.shows[i].showTitle.toLowerCase()) {
                                dontAdd = true;
                                break;
                            }
                        }
                        if (!dontAdd) {
                            tmpShowList.push(this.state.shows[i]);
                        }
                    }
                }

                document.getElementById("similar-show").value = "";
                this.setState({
                    errMessage: "",
                    isErr: false,
                    filteredShows: tmpShowList,
                    index: {
                        showID: tmpIdx.showID,
                        showTitle: tmpIdx.showTitle,
                        relatedShows: tmpShows,
                        showDescription: tmpIdx.showDescription,
                        showImage: tmpIdx.showImage,
                        providerID: tmpIdx.providerID
                    }
                });
            });

        }
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
                                            <Chip label={el} className="inner" onDelete={() => this.handleDelete(el)} color="primary" />
                                        </div>

                                    </div>
                                }) : ""
                        }
                        {this.state.index == -1 ? "" :
                            <div style={{ marginTop: 50, marginBottom: 40 }} class="outter pad">
                                <Button color="primary" className="inner-right" style={{ marginTop: 10 }} onClick={() => this.handleSave()} >Add Show</Button>
                                <Autocomplete
                                    id="similar-show"
                                    className="inner"
                                    options={this.state.filteredShows}
                                    getOptionLabel={(option) => option.showTitle}
                                    style={{ width: 300 }}
                                    renderInput={(params) => <TextField {...params} helperText={this.state.errMessage} error={this.state.isErr} label="Add Similar Show" variant="outlined" />} />
                            </div>
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