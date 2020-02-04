import React from 'react';
import './community_component.css';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ScrollableTabsButtonAuto from './community_selected_tabs_component';

export class CommunitySelectedComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {index:-1};
        }
        
        triggerUpdateState(index) {
            console.log(index);
            this.setState({
                index: index
            });
            this.render();
        };

        render() {
            return (
                <div className="CommunitySelectedComponent">
                    <Card>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {this.state.index == -1 ? "Please Select Show" : this.state.index }
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
                                    <ScrollableTabsButtonAuto></ScrollableTabsButtonAuto>  
                                </div>
                            </CardContent>
                        </Card>
                    }                            
                </div>
            );
        }
}

export default CommunitySelectedComponent;