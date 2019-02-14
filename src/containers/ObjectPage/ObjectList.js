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
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';

import DialogConfirm from 'components/DialogConfirm';
import CustomTable from 'components/CustomTable';
import TablePaginationActions from 'components/CustomTable/TablePaginationActions';

import { setCurrentObject, deleteObjectData } from 'containers/App/actions';
import { makeSelectCurrentObject } from 'containers/App/selectors';
import { MASTER_DATA_STATUS } from 'containers/MasterPage/constants';

import {
  setHeaderTitle,
} from 'containers/App/constants';
import {
  listStyles,
} from './constants';

class ObjectList extends PureComponent {
  state = {
    page: 0,
    rowsPerPage: 5,
    currData: null,
    askOpen: false,
    askTitle: '',
    askContentText: '',
  };

  componentDidMount() {
    const {
      doSetCurrentObject,
      match: { params },
      currentMaster,
    } = this.props;
    doSetCurrentObject(params.masterId);
    setHeaderTitle(currentMaster);
  }

  handleAskCancel = () => {
    this.setState({
      currData: null,
      askOpen: false,
      askTitle: '',
      askContentText: '',
    });
  }

  handleAskOpen = (title, contentText, obj) => {
    this.setState({
      askOpen: true,
      currData: obj,
      askTitle: title,
      askContentText: contentText,
    });
  }

  submitAsk = () => {
    const { doDeleteObjectData, currentObject } = this.props;
    doDeleteObjectData(this.state.currData.id, currentObject.id);
    this.handleAskCancel();
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: event.target.value });
  };

  render() {
    const { classes, currentObject, currentMaster, redirect } = this.props;
    const { page, rowsPerPage } = this.state;
    if (currentObject === null || currentMaster === null) {
      return (
        <Fade in timeout={700}>
          <Typography variant="h5" className={classes.viewTitle}>Waiting...</Typography>
        </Fade>
      );
    }

    if (currentMaster.attributes === undefined || currentMaster.attributes === null || currentMaster.attributes === []) {
      return (
        <Fade in timeout={700}>
          <Typography variant="h5" className={classes.viewTitle}>{currentMaster.name} is empty object!</Typography>
        </Fade>
      );
    }

    return (
      <Fade in timeout={700}>
        <div className={classes.objectListContainer}>
          <div className={classes.topControl}>
            <Typography variant="h5" className={classes.viewTitle}>{currentMaster.name} List</Typography>
            <Button
              variant="contained"
              className={classes.addButton}
              onClick={() => redirect(`${currentMaster.url}/${currentMaster.id}/create`)}
            >
              <AddIcon className={classes.leftIcon} />
              Create New Data
            </Button>
          </div>
          <CustomTable>
            <TableHead>
              <TableRow>
                {
                  currentMaster.attributes.map(attribute => (
                    attribute.status === MASTER_DATA_STATUS.ENABLE ? (<TableCell
                      key={attribute.id}
                      component="th"
                      scope="row"
                      align={attribute.value === 'status' ? 'center' : 'left'}
                    >
                      {attribute.name}
                    </TableCell>) : null
                  ))
                }
                <TableCell component="td" scope="row" align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                currentObject.data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => (
                  <TableRow key={row.id}>
                    {
                      currentMaster.attributes.map((item) => {
                        return (
                          item.status === MASTER_DATA_STATUS.ENABLE ? (
                            <TableCell key={item.id} component="td" scope="row">
                              {row[item.code]}
                            </TableCell>
                          ) : null
                        );
                      })
                    }
                    <TableCell component="td" scope="row" align="center">
                      <Tooltip title="Edit" placement="top">
                        <IconButton
                          onClick={() => redirect(`${currentMaster.url}/${currentMaster.id}/detail/${row.id}`)}
                        >
                          <EditIcon style={{ fontSize: 20, color: '#2979ff' }} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete" placement="top">
                        <IconButton
                          onClick={() => this.handleAskOpen('Delete Confirm', `Do you want to DELETE?`, row)}
                        >
                          <DeleteIcon style={{ fontSize: 20, color: '#e53935' }} />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  colSpan={currentMaster.attributes.length + 1}
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
          <DialogConfirm
            title="Delete Confirm"
            contentText="Do you want to DELETE information?"
            open={this.state.askOpen}
            handleCancel={this.handleAskCancel}
            handleConfirm={this.submitAsk}
          />
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
    redirect: bindActionCreators(push, dispatch),
    doDeleteObjectData: bindActionCreators(deleteObjectData, dispatch),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const connectStyles = withStyles(listStyles);

export default compose(withConnect, connectStyles)(ObjectList);
