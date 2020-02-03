import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { spacing } from '@material-ui/system';

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
                        {/* <CardActions>
                            <Button size="small" color="primary">
                            Share
                            </Button>
                            <Button size="small" color="primary">
                            Learn More
                            </Button>
                        </CardActions> */}
                    </Card>                 
                </div>
            );
        }
}

export default CommunityEmptyStateComponent;
