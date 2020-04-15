import React from 'react';
import './community_footer_component.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TemporaryDrawer from './community_footer_about_component';

export class CommunityFooterComponent extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className="community-footer">
                <Router>
                    <div>
                        <nav>
                            <ul>
                                <li>
                                    <Link to="/">Home</Link>
                                </li>
                                <li>
                                    <Link to="/about">About</Link>
                                </li>
                            </ul>
                        </nav>
                        <Switch>
                            <Route exact path="/about" component={About}>
                                <TemporaryDrawer open={true}></TemporaryDrawer>
                            </Route>
                            <Route path="/">
                                <Home></Home>
                            </Route>
                        </Switch>
                    </div>
                </Router>
            </div>
        );
    }
}

function Home() {
    return '';
}

function About() {
    return (
        <Card>
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    What is Community?
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    Community is an opportunity for fans of all sorts of TV shows to connect with
                    each other on one common platform. Community offers the unique opportunity for
                    users to share their opinions and theories of their favorite shows. It also
                    allows for users to connect and learn more about similar TV shows.
                </Typography>
            </CardContent>
        </Card>

    );
}

export default CommunityFooterComponent;