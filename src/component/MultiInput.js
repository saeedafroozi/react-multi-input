import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Clear from '@material-ui/icons/Clear';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import uuidv1 from 'uuid/v1';
import { toArrayObject, toPlainArray } from './ultility';
import {styles} from '../Style/multiInputStyles'

import SingleInput from './SingleInput'


class MultiInput extends React.Component {

  static getDerivedStateFromProps(nextProps, nextState) {
    if (nextState.oldProps.join('') !== nextProps.multiValue.join('')) {
      nextState.inputArrays = toArrayObject(nextProps.multiValue);
      nextState.oldProps = nextProps.multiValue;
      return nextState;
    }
    else {
      return nextState;
    }
  }

  static defaultProps = {
    onChange: () => null,
  }

  constructor(props) {
    super(props);
    this.state = {
      inputArrays: toArrayObject(props.multiValue),
      oldProps: props.multiValue
    };
  }

  handleOnChange = name => value => {
    const arr = [...this.state.inputArrays];
    let currentIndex = 0;
    arr.forEach((item, index, theArray) => {
      if (item.key === name) {
        theArray[index].value = value;
        currentIndex = index;
      }
    })
    if (arr.length - 1 === currentIndex)
      arr.push({ key: uuidv1(), value: "" });

    if (!value && currentIndex === arr.length - 2)
      arr.pop();

    this.setState({
      inputArrays: arr,
    });
  };

  handleOnDelete = name => () => {
    this.deleteItemArray(name);
  }

  deleteItemArray = name => {
    const arr = [...this.state.inputArrays];
    const currentIndex = arr.findIndex(x => x.key === name);
    if (currentIndex !== arr.length - 1)
      arr.splice(currentIndex, 1);
    this.setState({
      inputArrays: arr,
    });
  }

  renderInputs() {
    const { inputArrays } = this.state;
    return (inputArrays || []).map((item, index) => <SingleInput key={item.key} OnChange={this.handleOnChange(item.key)} OnDelete={this.handleOnDelete(item.key)} value={item.value} />);
  }

  handleSave = event => {
    const arr = [...this.state.inputArrays];

    if (!arr[arr.length - 1].value)
      arr.pop();
      
    this.props.onChange(toPlainArray(arr));
  }

  handleCancel = event => {
    const arr = [...this.props.multiValue];
    this.setState({
      inputArrays: toArrayObject(arr)
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.container} noValidate autoComplete="off">
        <div className={classes.divContainer} >
          <div className={classes.divHeader} >
            <header className={classes.header} >Test</header>
          </div>
          {this.renderInputs()}
        </div>
        <AppBar className={classes.bottomBar} margin="normal" position="static" >
          <Toolbar>
            <div >
              <Button color="primary" onClick={this.handleSave} className={classes.button}>
                Save
            </Button>
              <Button onClick={this.handleCancel} className={classes.button}>Cancel</Button>
            </div>
          </Toolbar>
        </AppBar>
      </form>
    );
  }
}

MultiInput.propTypes = {
  classes: PropTypes.object.isRequired,
  onChange: PropTypes.func,
  multiValue: PropTypes.array
};

export default withStyles(styles)(MultiInput);