import React from 'react';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import './community_component.css';
import { Card, Typography, CardContent, CardActionArea } from '@material-ui/core';
import CommunityInfoComponent from './community_info_component';
import * as firebase from 'firebase';
import { APICallsService } from './community_api';
import CommunityFooterComponent from './community_footer_component';

var list = [
    {
        index: 0,
        title: 'Home',
        image: 'https://cdn0.iconfinder.com/data/icons/google-material-design-3-0/48/ic_home_48px-512.png',
        height: 50,
        width: 50
    },
];

var MenuItem = ({ text, selected }) => {
    return (<div className={`menu-item ${selected ? '' : ''}`}>
        {text}
    </div>)
}

export var Menu = (list, selected) =>
    list.map(el => {
        const { title } = el;

        return (<Card key={title} selected={selected}>
            <CardActionArea>
                <CardContent>
                    <img src={el.image} height={el.height} width={el.width} alt={title.title}></img>
                </CardContent>
            </CardActionArea>
        </Card>)
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

            this.menuItems = Menu(this.state.list, this.state.selected);
            this.setState({ list: list });
        });
    }

    render() {
        const { selected } = this.state;
        // Create menu from items
        var menu = this.menuItems;

        return (
            <div>
                <div className="margin-bottom">
                    <ScrollMenu
                        data={menu}
                        arrowLeft={ArrowLeft}
                        arrowRight={ArrowRight}
                        selected={selected}
                        onSelect={this.onSelect}
                    ></ScrollMenu>
                </div>
                <CommunityInfoComponent ref={component => this._child = component} ></CommunityInfoComponent>
                <CommunityFooterComponent></CommunityFooterComponent>
            </div>
        );
    }
}

export default CommunityComponent;