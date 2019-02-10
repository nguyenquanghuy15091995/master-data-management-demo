import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';

function styles(theme) {
  return {
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
    },
    table: {
      minWidth: 500,
    },
    tableWrapper: {
      overflowX: 'auto',
    },
  };
}

class CustomTable extends Component {
  render() {
    const { classes, children } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            {children}
          </Table>
        </div>
      </div>
    );
  }
}

CustomTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomTable);
