import React from 'react';
import './community_component.css';
import { CommunityEmptyStateComponent } from './community_display_states/community_empty_state';
import { CommunitySelectedComponent } from './community_selected_component';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { AutoRotatingCarousel } from 'material-auto-rotating-carousel';
import { Slide } from 'material-auto-rotating-carousel';
import * as firebase from 'firebase';
import FullScreenDialog from './community_add_show_component';

var index = 0;
var list = [];
var newLoad = true;

export class CommunityInfoComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            isEmptyState: true,
            previousIndex: -1
         };
    }

    triggerUpdateState(selectedItem, user) {
        this.setState({
            isEmptyState: false,
            selectedItem: selectedItem,
            user: user
        });

        const rootRef = firebase.firestore().collection('shows');
        list.length = 0;
        rootRef.get().then((snapshot) => {
            snapshot.docs.forEach(doc => {
                list.push(doc.data());
            });
            this.setState({ list: list });
        });
    };

    onStart() {
        this.setState({ open: false });
        this._child.triggerUpdateState(list[index], this.state.user);
    }

    render() {
        const { red, blue, green } = require('@material-ui/core/colors');
        const Button = require('@material-ui/core/Button').default;

        if (!this.state.isEmptyState) {
            if (this.state.previousIndex != this.state.selectedItem.index) {
                newLoad = true;
                this.setState({previousIndex: this.state.selectedItem.index});
            } else {
                newLoad = false;
            }
        }

        return (
            <div className="CommunityInfoComponent">
                <a>{this.state.isEmptyState || (this.state.selectedItem.index == 0 || newLoad) ? <CommunityEmptyStateComponent></CommunityEmptyStateComponent> :
                    <div>
                        <Card>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {this.state.selectedItem.title}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {this.state.selectedItem.description}
                                    <br></br>
                                    <br></br>
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {this.list}
                                </Typography>
                                <p>
                                    <div className="outer">
                                        <FullScreenDialog className="inner"></FullScreenDialog>
                                        <Button color="primary" className="inner" onClick={() => this.setState({ open: true })} >View Series</Button>
                                    </div>
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
                                onChange={() => ++index}
                                onStart={() => this.onStart()}
                                style={{ position: 'absolute' }}
                            >
                                {list[0] == undefined ? '' :
                                    list.map(el =>
                                        <Slide
                                            media={<img src={el.showImage} />}
                                            mediaBackgroundStyle={{ backgroundColor: green[400] }}
                                            style={{ backgroundColor: green[600] }}
                                            title={el.showTitle}
                                            subtitle={el.showDescription}
                                        />)
                                }
                            </AutoRotatingCarousel>
                        </div>
                    </div>
                }</a>
            </div>
        );
    }
}

export default CommunityInfoComponent;