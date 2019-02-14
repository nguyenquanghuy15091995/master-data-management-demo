export function validate(values, props) {
  const errors = {};
  if (props.registeredFields !== null && props.registeredFields !== undefined) {
    const registeredFields = Object.keys(props.registeredFields.toJS());
    registeredFields.map((field) => {
      if (!values.get(field)) {
        errors[field] = 'Required';
      }
    });
  }
  return errors;
}

export function listStyles() {
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

export function formStyles() {
  return {
    topControl: {
      padding: '5px 0px 20px 0px',
      display: 'flex',
      borderBottom: '1px solid #ccc',
    },
    viewTitle: {
      flexGrow: 1,
    },
    leftIcon: {
      marginRight: 5,
    },
    botControl: {
      padding: '5px 0px',
      display: 'flex',
      justifyContent: 'flex-end',
    },
    formContent: {
      padding: '40px 40px 30px 40px',
    },
    tableContent: {
      padding: '10px 20px 30px 20px',
    },
    rightActions: {
      flexGrow: 1,
    },
    addButton: {
      marginLeft: 15,
      backgroundColor: '#1e88e5',
      color: '#FFF',
      '&:hover': {
        backgroundColor: '#2196f3',
      },
    },
    deleteButton: {
      marginLeft: 10,
      backgroundColor: '#e53935',
      color: '#FFF',
      '&:hover': {
        backgroundColor: '#f44336',
      },
    },
  };
}
