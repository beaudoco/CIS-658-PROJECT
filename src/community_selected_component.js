import React from 'react';
import './community_component.css';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ScrollableTabsButtonAuto from './community_selected_tabs_component';
import * as firebase from 'firebase';

var seasons = [];

export class CommunitySelectedComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index: -1,
            seasons: []
        };
    }

    triggerUpdateState(index, user) {
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
                seasons: seasons
            });
            this.render();
        });
    };

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