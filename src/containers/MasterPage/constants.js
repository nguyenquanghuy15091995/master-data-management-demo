import { fromJS } from 'immutable';

export const MASTER_LIST_HEADER = [
  { id: 1, name: 'Name', value: 'name' },
  { id: 2, name: 'Icon', value: 'icon' },
  { id: 3, name: 'Description', value: 'description' },
  { id: 4, name: 'URL', value: 'url' },
  { id: 5, name: 'Status', value: 'status' },
];

export const ATTRIBUTE_LIST_HEADER = [
  { id: 1, name: 'Name', value: 'name' },
  { id: 2, name: 'Type', value: 'type' },
  { id: 3, name: 'Code', value: 'code' },
  { id: 4, name: 'Status', value: 'status' },
  { id: 5, name: 'Description', value: 'description' },
  { id: 6, name: 'Actions', value: 'actions' },
];

export const MASTER_DATA_STATUS = {
  ENABLE: 'ENABLE',
  DISABLE: 'DISABLE',
};

export const ATTRIBUTE_TYPES = {
  text: 'text',
  longText: 'long text',
  number: 'number',
};

export function validate(values) {
  const errors = {};
  if (!values.get('name')) {
    errors.name = 'Required'
  }
  if (!values.get('url')) {
    errors.url = 'Required'
  }
  if (!values.get('status')) {
    errors.status = 'Required'
  } else {
    const attErrors = [];
    if (values.get('attributes')) {
      values.get('attributes').forEach((attribute, index) => {
        const attError = {};
        if (!attribute || !fromJS(attribute).get('name')) {
          attError.name = 'Required';
        }
        if (!attribute || !fromJS(attribute).get('type')) {
          attError.type = 'Required';
        }
        if (!attribute || !fromJS(attribute).get('status')) {
          attError.status = 'Required';
        }
        attErrors[index] = attError;
      });
      if (attErrors.length > 0) {
        errors.attributes = attErrors;
      }
    }
  }

  return errors;
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
      marginLeft: 10,
      backgroundColor: '#1e88e5',
      color: '#FFF',
      '&:hover': {
        backgroundColor: '#2196f3',
      },
    },
    enableColor: {
      display: 'inline-block',
      backgroundColor: '#2962ff',
      padding: 10,
      marginRight: 10,
      borderRadius: '50%',
    },
    disableColor: {
      display: 'inline-block',
      backgroundColor: '#f50057',
      padding: 10,
      marginRight: 10,
      borderRadius: '50%',
    },
  };
}
