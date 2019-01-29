import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles';

import Header, { HEADER_HEIGHT } from './Header';
import Sidebar, { SIDEBAR_WIDTH } from './Sidebar';
import Routes from './Routes';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
});

function styles() {
  return {
    appContainer: {
      position: 'relative',
      height: '100vh',
      width: '100vw',
    },
    mainContainer: {
      position: 'absolute',
      marginTop: HEADER_HEIGHT,
      marginLeft: SIDEBAR_WIDTH,
      width: `calc(100% - ${SIDEBAR_WIDTH}px)`,
      height: `calc(100% - ${HEADER_HEIGHT}px)`,
      overflow: 'auto',
    },
    mainWrapper: {
      posision: 'relative',
      padding: 30,
    },
  };
}

class App extends PureComponent {
  render() {
    const { classes } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.appContainer}>
          <Header />
          <Sidebar />
          <div className={classes.mainContainer}>
            <div className={classes.mainWrapper}>
              <Routes />
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
