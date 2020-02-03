import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

export class CommunityEmptyStateComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="CommunityEmptyStateComponent">
                <Card>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            What is Community?
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
            </div>
        );
    }
}

export default CommunityEmptyStateComponent;
