import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import AlignItemsList from './community_selected_tabs_messages_component';
import * as firebase from 'firebase';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',
    flexGrow: 1,
  },
}));

var list = [];

export default function ScrollableTabsButtonAuto(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //console.log(props.user);

  const handleChangeIndex = index => {
    setValue(index);
  };

  // BELOW WE ARE ABOUT TO START GETTING THE SEASONS FOR A SELECTED SHOW

  // const rootRef = firebase.firestore().collection('comments');

  // rootRef.get().then((snapshot) => {
  //     snapshot.docs.forEach(doc => {
  //         list.push(doc.data());
  //     });
  //     list.sort(function (a, b) {
  //         return a.time.seconds - b.time.seconds;
  //     });
  //     this.listItems = ListItemEl(this.state.list);
  //     this.setState({ list: list });
  // });

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="Item One" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
          <Tab label="Item Four" {...a11yProps(3)} />
          <Tab label="Item Five" {...a11yProps(4)} />
          <Tab label="Item Six" {...a11yProps(5)} />
          <Tab label="Item Seven" {...a11yProps(6)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <AlignItemsList user={props.user}></AlignItemsList>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <AlignItemsList user={props.user}></AlignItemsList>
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <AlignItemsList user={props.user}></AlignItemsList>
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
          <AlignItemsList user={props.user}></AlignItemsList>
        </TabPanel>
        <TabPanel value={value} index={4} dir={theme.direction}>
          <AlignItemsList user={props.user}></AlignItemsList>
        </TabPanel>
        <TabPanel value={value} index={5} dir={theme.direction}>
          <AlignItemsList user={props.user}></AlignItemsList>
        </TabPanel>
        <TabPanel value={value} index={6} dir={theme.direction}>
          <AlignItemsList user={props.user}></AlignItemsList>
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}