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
import Icon from '@material-ui/core/Icon';

import CustomTable from 'components/CustomTable';
import TablePaginationActions from 'components/CustomTable/TablePaginationActions';

import {
  makeSelectMasterList,
} from 'containers/App/selectors';

import { MASTER_LIST_HEADER } from './constants';

function styles() {
  return {
    masterPageContainer: {},
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

class MasterList extends PureComponent {
  state = {
    page: 0,
    rowsPerPage: 5,
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: event.target.value });
  };

  render() {
    const { masterList, classes, redirect } = this.props;
    const { page, rowsPerPage } = this.state;
    return (
      <Fade in timeout={700}>
        <div className={classes.masterPageContainer}>
          <div className={classes.topControl}>
            <Typography variant="h5" className={classes.viewTitle}>Master Data List</Typography>
            <Button
              variant="contained"
              className={classes.addButton}
              onClick={() => redirect('/master/create')}
            >
              <AddIcon className={classes.leftIcon} />
              Create New Master Data
            </Button>
          </div>
          <CustomTable>
            <TableHead>
              <TableRow>
                {
                  MASTER_LIST_HEADER.map((item) => (
                    <TableCell
                      key={item.id}
                      component="th"
                      scope="row"
                      align={item.value === 'status' || item.value === 'icon' ? 'center' : 'left'}
                    >
                      {item.name}
                    </TableCell>
                  ))
                }
              </TableRow>
            </TableHead>
            <TableBody>
              {masterList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => (
                <TableRow key={row.id}>
                  {
                    MASTER_LIST_HEADER.map((item) => {
                      if (item.value === 'icon') {
                        return (
                          <TableCell key={item.id} component="td" scope="row" align="center">
                            <Icon style={{ color: '#a6a6a6' }}>{row[item.value]}</Icon>
                          </TableCell>
                        );
                      } else if (item.value === 'status') {
                        return (
                          <TableCell key={item.id} component="td" scope="row" align="center">
                            <div className={classes[row[item.value]]}>{row[item.value]}</div>
                          </TableCell>
                        );
                      } else if (item.value === 'name') {
                        return (
                          <TableCell key={item.id} component="td" scope="row">
                            <span
                              className={classes.linkDetail}
                              onClick={() => redirect(`/master/detail/${item.id}`)}
                            >
                              {row[item.value]}
                            </span>
                          </TableCell>
                        );
                      } else {
                        return (
                          <TableCell key={item.id} component="td" scope="row">
                            {row[item.value]}
                          </TableCell>
                        );
                      }
                    })
                  }

                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  colSpan={MASTER_LIST_HEADER.length}
                  count={masterList.length}
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
  masterList: makeSelectMasterList(),
});

function mapDispatchToProps(dispatch) {
  return {
    redirect: bindActionCreators(push, dispatch),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const styleConnect = withStyles(styles);

export default compose(withConnect, styleConnect)(MasterList);
