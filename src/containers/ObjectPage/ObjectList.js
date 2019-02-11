import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { push } from 'connected-react-router';
import Typography from '@material-ui/core/Typography';
import Fade from '@material-ui/core/Fade';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import CustomTable from 'components/CustomTable';
import TablePaginationActions from 'components/CustomTable/TablePaginationActions';

import { setCurrentObject } from 'containers/App/actions';
import { makeSelectCurrentObject } from 'containers/App/selectors';

function styles() {
  return {
    objectListContainer: {},
    ENABLE: {
      display: 'inline-block',
      backgroundColor: '#2962ff',
      padding: 7,
      color: '#FFF',
      borderRadius: 3,
      minWidth: 60,
    },
    DISABLE: {
      display: 'inline-block',
      backgroundColor: '#f50057',
      padding: 7,
      color: '#FFF',
      borderRadius: 3,
      minWidth: 60,
    },
    topControl: {
      padding: '5px 0px',
      display: 'flex',
    },
    viewTitle: {
      flexGrow: 1,
    },
    addButton: {
      marginLeft: 10,
      backgroundColor: '#009688',
      color: '#FFF',
      '&:hover': {
        backgroundColor: '#4db6ac',
      },
    },
    leftIcon: {
      color: '#FFF',
      marginRight: 5,
    },
    linkDetail: {
      '&:hover': {
        textDecoration: 'underline',
        color: '#2979ff',
        cursor: 'pointer',
      },
    },
  };
}

class ObjectList extends PureComponent {
  state = {
    page: 0,
    rowsPerPage: 5,
  };

  componentDidMount() {
    const {
      doSetCurrentObject,
      match: { params },
    } = this.props;
    doSetCurrentObject(params.masterId);
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: event.target.value });
  };

  render() {
    const { classes, currentObject } = this.props;
    const { page, rowsPerPage } = this.state;
    if (currentObject === null) {
      return (
        <Fade in timeout={700}>
          <Typography variant="h5" className={classes.viewTitle}>Waiting...</Typography>
        </Fade>
      );
    }

    if(currentObject.attributes === undefined || currentObject.attributes === null || currentObject.attributes === []) {
      return (
        <Fade in timeout={700}>
          <Typography variant="h5" className={classes.viewTitle}>{currentObject.name} is empty object!</Typography>
        </Fade>
      );
    }

    return (
      <Fade in timeout={700}>
        <div className={classes.objectListContainer}>
          <div className={classes.topControl}>
            <Typography variant="h5" className={classes.viewTitle}>{currentObject.name} List</Typography>
            <Button
              variant="contained"
              className={classes.addButton}
            >
              <AddIcon className={classes.leftIcon} />
              Create New Data
            </Button>
          </div>
          <CustomTable>
            <TableHead>
              <TableRow>
                {
                  currentObject.attributes.map(attribute => (
                    <TableCell
                      key={attribute.id}
                      component="th"
                      scope="row"
                      align={attribute.value === 'status' ? 'center' : 'left'}
                    >
                      {attribute.name}
                    </TableCell>
                  ))
                }
              </TableRow>
            </TableHead>
            <TableBody>
              {
                currentObject.data.map(row => (
                  <TableRow key={row.id}>
                    {
                      currentObject.attributes.map((item, index) => {
                        return (
                          <TableCell key={item.id} component="td" scope="row">
                            {row[item.code]}
                          </TableCell>
                        );
                      })
                    }
                  </TableRow>
                ))
              }
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  colSpan={currentObject.attributes.length}
                  count={currentObject.data.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    native: true,
                  }}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </CustomTable>
        </div>
      </Fade>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentObject: makeSelectCurrentObject(),
});

function mapDispatchToProps(dispatch) {
  return {
    doSetCurrentObject: bindActionCreators(setCurrentObject, dispatch),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const connectStyles = withStyles(styles);

export default compose(withConnect, connectStyles)(ObjectList);
