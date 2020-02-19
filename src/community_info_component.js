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

var index = 0;
var list = [];

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
            const rootRef = firebase.firestore().collection('shows');
            rootRef.get().then((snapshot) => {
              snapshot.docs.forEach(doc => {
                list.push(doc.data());          
              });
              //console.log(list);
              this.setState({list: list});
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
            if(list[0] != undefined) {
                //if(this.list.length != 0){
                    console.log(list[0]);
                //}
            }

            return (
                <div className="CommunityInfoComponent">
                    <a>{this.state.isEmptyState || (this.state.selectedItem.index == 0) ? <CommunityEmptyStateComponent></CommunityEmptyStateComponent> :
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