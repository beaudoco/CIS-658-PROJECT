import React from 'react';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import './community_component.css';
import { Card, Typography, CardContent, CardActionArea } from '@material-ui/core';
import CommunityInfoComponent from './community_info_component';
import * as firebase from 'firebase';
import { APICallsService } from './community_api';

var list = [
    { index: 0, title: 'Home' },
];

var MenuItem = ({ text, selected }) => {
    return <div className={`menu-item ${selected ? '' : ''}`}>
        {text}
    </div>;
}

export var Menu = (list, selected) =>
    list.map(el => {
        const { title } = el;

        return <Card key={title} selected={selected}>
            <CardActionArea>
                <CardContent>
                    <Typography variant="h4" text={title}>{title}</Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    });

const Arrow = ({ text, className }) => {
    return (
        <div className={className}>{text}</div>
    );
};

const ArrowLeft = Arrow({ text: '<', className: 'arrow-prev' });
const ArrowRight = Arrow({ text: '>', className: 'arrow-next' });

const selected = '';

export class CommunityComponent extends React.Component {
    constructor(props) {
        super(props);
        this.apiCallsService = new APICallsService();
        this.state = {
            list: list,
            user: null
        };

        this.menuItems = Menu(this.state.list, selected);
    }

    state = {
        selected
    };

    onSelect = key => {
        this.setState({ selected: key });
        this._child.triggerUpdateState(this.state.list.find(x => x.title == key), this.state.user);
    }

    triggerUpdateState(user) {
        this.setState({
            user: user,
        });
    }

    componentDidMount() {
        const rootRef = firebase.firestore().collection('providers');
        this.apiCallsService.getProviders(rootRef).then((tmpList) => {
            for (var i = 0; i < tmpList.length; i++) {
                list.push(tmpList[i]);
            }

            this.menuItems = Menu(this.state.list, selected);
            this.setState({ list: list });
        });
    }

    render() {
        const { selected } = this.state;
        // Create menu from items
        var menu = this.menuItems;

        return (
            <div>
                <div className="CommunityComponent">
                    <ScrollMenu
                        data={menu}
                        arrowLeft={ArrowLeft}
                        arrowRight={ArrowRight}
                        selected={selected}
                        onSelect={this.onSelect}
                    ></ScrollMenu>
                </div>
                <br></br>
                <br></br>
                <CommunityInfoComponent ref={component => this._child = component} ></CommunityInfoComponent>
            </div>
        );
    }
}

export default CommunityComponent;