import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';

class ReduxField extends Component {
  render() {
    const {
      label,
      input,
      meta: { touched, invalid, error },
      ...custom
    } = this.props;
    return (
      <TextField
        label={label}
        placeholder={label}
        error={touched && invalid}
        helperText={touched && error}
        {...input}
        {...custom}
      />
    );
  }
}

export default ReduxField;
