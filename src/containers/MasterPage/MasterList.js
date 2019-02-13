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
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import RestoreIcon from '@material-ui/icons/Restore';

import DialogConfirm from 'components/DialogConfirm';
import CustomTable from 'components/CustomTable';
import TablePaginationActions from 'components/CustomTable/TablePaginationActions';

import {
  makeSelectMasterList,
  makeSelectMasterListActive,
  makeSelectMasterListInactive,
} from 'containers/App/selectors';
import {
  deleteMasterItem,
  restoreMasterItem,
} from 'containers/App/actions';
import {
  RECORD_STATUS,
} from 'containers/App/constants';

import { setMasterListState } from './actions';
import { makeSelectListState } from './selectors';
import { MASTER_LIST_HEADER, masterListStyles } from './constants';

class MasterList extends PureComponent {
  state = {
    page: 0,
    rowsPerPage: 5,
    searchName: '',
    askOpen: false,
    askTitle: '',
    askContentText: '',
    currMaster: null,
  }

  handleAskCancel = () => {
    this.setState({
      askOpen: false,
      currMaster: null,
      askTitle: '',
      askContentText: '',
    });
  }

  handleAskOpen = (master, title, contentText) => {
    this.setState({
      currMaster: master,
      askOpen: true,
      askTitle: title,
      askContentText: contentText,
    });
  }

  handleAskConfirm = () => {
    const { doDeleteMasterItem, doRestoreMasterItem, currentMaster } = this.props;
    const { currMaster } = this.state;
    if (currMaster !== null) {
      if (currMaster.active) {
        doDeleteMasterItem(currMaster.id);
      } else {
        doRestoreMasterItem(currMaster.id);
      }
    }
    this.handleAskCancel();
  }

  handleSearchChange = (event) => {
    this.setState({ searchName: event.target.value });
  }

  handleListState = (event) => {
    this.props.doSetMasterListState(event.target.value);
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: event.target.value });
  };

  render() {
    const { masterListAll, masterListActive, masterListInactive, classes, redirect, listState } = this.props;
    const { page, rowsPerPage, searchName } = this.state;

    let listResult = masterListActive;
    if (listState === RECORD_STATUS.ALL) {
      listResult = masterListAll;
    } else if (listState === RECORD_STATUS.DELETED) {
      listResult = masterListInactive;
    }

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
          <div className={classes.toolbar}>
            <div className={classes.toolbarLeft}>
              <TextField
                placeholder="Search by Name"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                onChange={this.handleSearchChange}
                value={searchName}
              />
            </div>
            <FormControl style={{ minWidth: 120 }}>
              <InputLabel htmlFor="list-state">List State</InputLabel>
              <Select
                value={listState}
                onChange={this.handleListState}
                inputProps={{
                  name: 'listState',
                  id: 'list-state',
                }}
              >
                <MenuItem value={RECORD_STATUS.ALL}>All</MenuItem>
                <MenuItem value={RECORD_STATUS.ACTIVE}>Active</MenuItem>
                <MenuItem value={RECORD_STATUS.DELETED}>Deleted</MenuItem>
              </Select>
            </FormControl>

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
                      align={item.value === 'icon' || item.value === 'actions' ? 'center' : 'left'}
                    >
                      {item.name}
                    </TableCell>
                  ))
                }
              </TableRow>
            </TableHead>
            <TableBody>
              {listResult.filter(
                (element) => element.name.search(searchName) !== -1
                  || this.state.searchName === ''
                  || this.state.searchName === null
                  || this.state.searchName === undefined
              ).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => (
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
                          <TableCell key={item.id} component="td" scope="row">
                            <span className={classes[row[item.value]]}></span><span>{row[item.value]}</span>
                          </TableCell>
                        );
                      } else if (item.value === 'name') {
                        return (
                          <TableCell key={item.id} component="td" scope="row">
                            {row[item.value]}
                          </TableCell>
                        );
                      } else if (item.value === 'actions') {
                        return (
                          <TableCell key={item.id} component="td" scope="row" align="center">
                            <Tooltip title="Edit" placement="top">
                              <IconButton
                                onClick={() => redirect(`/master/detail/${row.id}`)}
                              >
                                <EditIcon style={{ fontSize: 20, color: '#2979ff' }} />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title={row.active ? 'Delete' : 'Restore'} placement="top">
                              {
                                row.active ? (
                                  <IconButton
                                    onClick={() => this.handleAskOpen(row, 'Delete Confirm', `Do you want to delete ${row.name}?`)}
                                  >
                                    <DeleteIcon style={{ fontSize: 20, color: '#e53935' }} />
                                  </IconButton>
                                ) : (
                                    <IconButton
                                      onClick={() => this.handleAskOpen(row, 'Restore Confirm', `Do you want to restore ${row.name}?`)}
                                    >
                                      <RestoreIcon style={{ fontSize: 20, color: '#3f51b5' }} />
                                    </IconButton>
                                  )
                              }
                            </Tooltip>
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
                  count={masterListActive.length}
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
          <DialogConfirm
            title={this.state.askTitle}
            contentText={this.state.askContentText}
            open={this.state.askOpen}
            handleCancel={this.handleAskCancel}
            handleConfirm={this.handleAskConfirm}
          />
        </div>
      </Fade>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  masterListAll: makeSelectMasterList(),
  masterListActive: makeSelectMasterListActive(),
  masterListInactive: makeSelectMasterListInactive(),
  listState: makeSelectListState(),
});

function mapDispatchToProps(dispatch) {
  return {
    redirect: bindActionCreators(push, dispatch),
    doDeleteMasterItem: bindActionCreators(deleteMasterItem, dispatch),
    doRestoreMasterItem: bindActionCreators(restoreMasterItem, dispatch),
    doSetMasterListState: bindActionCreators(setMasterListState, dispatch),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const styleConnect = withStyles(masterListStyles);

export default compose(withConnect, styleConnect)(MasterList);
