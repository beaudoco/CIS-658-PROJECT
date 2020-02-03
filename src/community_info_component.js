import React from 'react';
import './community_component.css';
import { CommunityEmptyStateComponent } from './community_display_states/community_empty_state';
import { CommunitySelectedComponent } from './community_selected_component';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { AutoRotatingCarousel } from 'material-auto-rotating-carousel';
import { Slide } from 'material-auto-rotating-carousel';

var index = 0;

export class CommunityInfoComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isEmptyState: true };
        }
        
        triggerUpdateState(selectedItem) {
            this.setState({
                isEmptyState: false,
                selectedItem: selectedItem
            });
        };

        onStart() {
            this.setState({ open: false });
            this._child.triggerUpdateState(index);
        }

        onChange(index) {
        }

        render() {
            const { red, blue, green } = require('@material-ui/core/colors');
            const Button = require('@material-ui/core/Button').default;

            return (
                <div className="CommunityInfoComponent">
                    <a>{this.state.isEmptyState ? <CommunityEmptyStateComponent></CommunityEmptyStateComponent> :
                    <div>
                        <Card>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {this.state.selectedItem}
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
                                <p>
                                    <Button onClick={() => this.setState({ open: true })} >Open carousel</Button>
                                </p>
                            </CardContent>
                        </Card>
                        <br></br>
                        <br></br>      
                        <CommunitySelectedComponent ref={component => this._child = component} ></CommunitySelectedComponent>  
                        <div style={{ position: 'relative', width: '100%', height: 500 }}>                        
                            <AutoRotatingCarousel
                                label='Get started'
                                open={this.state.open}
                                onClose={() => this.setState({ open: false })}
                                onChange={() => this.onChange(++index)}
                                onStart={() => this.onStart() }
                                style={{ position: 'absolute' }}
                            >
                                <Slide
                                media={<img src='http://www.icons101.com/icon_png/size_256/id_79394/youtube.png' />}
                                title='This is a very cool feature'
                                subtitle='Just using this will blow your mind.'
                                />
                                <Slide
                                media={<img src='http://www.icons101.com/icon_png/size_256/id_79394/youtube.png' />}
                                mediaBackgroundStyle={{ backgroundColor: red[400] }}
                                style={{ backgroundColor: red[600] }}
                                title='This is a very cool feature'
                                subtitle='Just using this will blow your mind.'
                                />
                                <Slide
                                media={<img src='http://www.icons101.com/icon_png/size_256/id_80975/GoogleInbox.png' />}
                                mediaBackgroundStyle={{ backgroundColor: blue[400] }}
                                style={{ backgroundColor: blue[600] }}
                                title='Ever wanted to be popular?'
                                subtitle='Well just mix two colors and your are good to go!'
                                />
                                <Slide
                                media={<img src='http://www.icons101.com/icon_png/size_256/id_76704/Google_Settings.png' />}
                                mediaBackgroundStyle={{ backgroundColor: green[400] }}
                                style={{ backgroundColor: green[600] }}
                                title='May the force be with you'
                                subtitle='The Force is a metaphysical and ubiquitous power in the Star Wars fictional universe.'
                                />
                            </AutoRotatingCarousel>
                        </div>                        
                    </div>   
                         }</a>                 
                </div>
            );
        }
}

export default CommunityInfoComponent;