import React, { Component } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

class ReduxCheckbox extends Component {
  render() {
    const { input, label, style, color } = this.props;
    return (
      <FormControlLabel
        control={
          <Checkbox
            checked={input.value ? true : false}
            onChange={input.onChange}
            color={color}
          />
        }
        label={label ? label : ''}
        style={style}
      />
    );
  }
}

export default ReduxCheckbox;
