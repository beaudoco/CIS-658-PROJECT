import React from 'react';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import './community_component.css';
import { Card, Typography, CardContent, CardActionArea } from '@material-ui/core';
import CommunityInfoComponent from './community_info_component';

const list = [
    {name: 'Netflix'},
    {name: 'Hulu'},
    {name: 'NBC'},
    {name: 'CBS'},
    {name: 'Disney'},
    {name: 'AMC'},
    {name: 'PBS'},
    {name: 'ABC'},
    {name: 'Add +'},
];

const MenuItem = ({text, selected}) => {
    return <div className={`menu-item ${selected ? '' : ''}`}>
        {text}
    </div>;
}

export const Menu = (list, selected) =>
    list.map(el => {
        const {name} = el;

        return <Card key={name} selected={selected}>
            <CardActionArea>
                <CardContent>
                    <Typography variant="h4" text={name}>{name}</Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    });

const Arrow = ({text, className}) => {
    return(
    <div className={className}>{text}</div>
    );
};

const ArrowLeft = Arrow({text: '<', className: 'arrow-prev'});
const ArrowRight = Arrow({text: '>', className: 'arrow-next'});

const selected = '';

export class CommunityComponent extends React.Component {
    constructor(props) {
        super(props);
        this.menuItems = Menu(list, selected);
        }

        state = {
            selected
        };

        onSelect = key => {
            this.setState({selected: key});
            this._child.triggerUpdateState(key);
        }

        render() {
            const { selected } = this.state;
            // Create menu from items
            const menu = this.menuItems;
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
                    <CommunityInfoComponent ref={component => this._child = component} ></CommunityInfoComponent>
                </div>        

            );
        }
}

export default CommunityComponent;