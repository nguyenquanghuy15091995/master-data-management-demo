import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { bindActionCreators, compose } from 'redux';
import { push } from 'connected-react-router';
import { createStructuredSelector } from 'reselect';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';

import ViewModuleIcon from '@material-ui/icons/ViewModule';

import {
  MASTER_DATA_STATUS,
} from 'containers/MasterPage/constants';

import { HEADER_HEIGHT } from './Header';
import {
  makeSelectSidebarOpen,
  makeSelectLocation,
  makeSelectMasterList,
} from './selectors';
import { setSidebarOpen } from './actions';
import {
  checkPage,
} from './constants';

export const SIDEBAR_WIDTH = 250;

function styles(theme) {
  return {
    drawerPaper: {
      border: 'none',
      width: SIDEBAR_WIDTH,
      backgroundColor: '#18202c',
    },
    drawerContent: {
      display: 'flex',
      flexDirection: 'column',
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: SIDEBAR_WIDTH,
        flexShrink: 0,
      },
    },
    mainTitleItem: {
      width: '100%',
      color: '#FFF',
      boxShadow: '0 -1px 0 #404854 inset',
      backgroundColor: '#232f3e',
      height: HEADER_HEIGHT + 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    listItem: {
      width: '100%',
    },
    item: {
      color: '#FFF',
    },
    itemPrimary: {
      color: 'inherit',
    },
    itemIcon: {
      color: 'inherit',
      margin: 0,
    },
    itemActionable: {
      '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
      },
    },
    itemActiveItem: {
      color: '#4fc3f7',
    },
  };
}

class Sidebar extends PureComponent {
  componentDidMount() {
    const { masterList, redirect, location } = this.props;
    if (masterList.length === 0) {
      redirect('/');
      document.getElementById('page-title-01').innerHTML = 'Home';
    } else {
      const currentMaster = masterList.find((element) => element.url === location.pathname);
      if (checkPage(location.pathname, '/master')) {
        document.getElementById('page-title-01').innerHTML = 'Master Page';
      } else if (location.pathname === '/') {
        document.getElementById('page-title-01').innerHTML = 'Home';
      } else if (currentMaster === undefined) {
        document.getElementById('page-title-01').innerHTML = '--Unknown--';
      } else {
        document.getElementById('page-title-01').innerHTML = currentMaster.name;
      }
    }
  }

  handleMenuItem = (item) => {
    this.props.redirect(item.url);
    document.getElementById('page-title-01').innerHTML = item.name;
  }

  render() {
    const { classes, theme, container, location, sidebarOpen, doSetSidebarOpen, masterList } = this.props;

    const drawerContent = (
      <div className={classes.drawerContent}>
        <div className={classes.mainTitleItem}>
          <Typography variant="h5" color="inherit">MDM Demo</Typography>
        </div>
        <div className={classes.listItem}>
          <List>
            <ListItem
              button
              className={classNames(
                classes.item,
                classes.itemActionable,
                checkPage(location.pathname, '/master') && classes.itemActiveItem
              )}
              onClick={() => this.handleMenuItem({ name: 'Master Page', url: '/master' })}
            >
              <ListItemIcon className={classes.itemIcon}>
                <ViewModuleIcon />
              </ListItemIcon>
              <ListItemText
                classes={{
                  primary: classes.itemPrimary,
                }}
                primary="Master Page"
              />
            </ListItem>
            <ListItem className={classes.item}>
              <ListItemText
                classes={{
                  primary: classes.itemPrimary,
                }}
                primary="OBJECTS"
              />
            </ListItem>
            {
              masterList.map((item) => {
                if (item.status === MASTER_DATA_STATUS.ENABLE) {
                  return (
                    <ListItem
                      key={item.id}
                      button
                      className={classNames(
                        classes.item,
                        classes.itemActionable,
                        checkPage(location.pathname, item.url) && classes.itemActiveItem
                      )}
                      onClick={() => this.handleMenuItem(item)}
                    >
                      <ListItemIcon className={classes.itemIcon}>
                        <Icon>{item.icon}</Icon>
                      </ListItemIcon>
                      <ListItemText
                        classes={{
                          primary: classes.itemPrimary,
                        }}
                        primary={item.name}
                      />
                    </ListItem>
                  );
                } else {
                  return null;
                }
              })
            }
          </List>
        </div>
      </div>
    );

    return (
      <nav className={classes.drawer}>
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={sidebarOpen}
            onClose={() => doSetSidebarOpen(false)}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            {drawerContent}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawerContent}
          </Drawer>
        </Hidden>
      </nav>
    );
  }
}

Sidebar.propTypes = {
  masterList: PropTypes.array,
  sidebarOpen: PropTypes.bool,
  location: PropTypes.object,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  container: PropTypes.object,
  doSetSidebarOpen: PropTypes.func,
  redirect: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  sidebarOpen: makeSelectSidebarOpen(),
  location: makeSelectLocation(),
  masterList: makeSelectMasterList(),
});

function mapDispatchToProps(dispatch) {
  return {
    doSetSidebarOpen: bindActionCreators(setSidebarOpen, dispatch),
    redirect: bindActionCreators(push, dispatch),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const styleConnect = withStyles(styles, { withTheme: true });

export default compose(withConnect, styleConnect)(Sidebar);
