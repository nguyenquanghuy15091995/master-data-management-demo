import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import { SIDEBAR_WIDTH } from './Sidebar';
import { setSidebarOpen } from './actions';

export const HEADER_HEIGHT = 60;

function styles(theme) {
  return {
    root: {
      boxShadow: 'none',
      marginLeft: SIDEBAR_WIDTH,
      backgroundColor: '#1e88e5',
      [theme.breakpoints.up('sm')]: {
        width: `calc(100% - ${SIDEBAR_WIDTH}px)`,
      },
    },
    toolbar: {
      height: HEADER_HEIGHT,
      minHeight: 0,
    },
    pageTitle: {
      flexGrow: 1,
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 10,
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
  };
}

class Header extends PureComponent {
  render() {
    const { classes, doSetSidebarOpen } = this.props;
    return (
      <AppBar position="fixed" className={classes.root}>
        <Toolbar className={classes.toolbar}>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={() => doSetSidebarOpen(true)}>
            <MenuIcon />
          </IconButton>
          <Typography id="page-title-01" variant="h5" color="inherit" className={classes.pageTitle} />
        </Toolbar>
      </AppBar>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  doSetSidebarOpen: PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    doSetSidebarOpen: bindActionCreators(setSidebarOpen, dispatch),
  };
}

const withConnect = connect(null, mapDispatchToProps);
const styleConnect = withStyles(styles);

export default compose(withConnect, styleConnect)(Header);
