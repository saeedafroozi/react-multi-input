import React, { Component } from 'react';
import logo from '../Style/logo.svg';
import MultiInput from './MultiInput';
import Button from '@material-ui/core/Button';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      arr: ["first", "second"]
    }
  }
  handleOnclick = event => {
    console.log(this)
    this.setState({
      arr: ["third"]
    });
  }
  render() {
    return (
      <React.Fragment>
        <MultiInput multiValue={this.state.arr} onChange={(arr) => { console.log(arr) }} />
        <div style={{ textAlign: 'center' }}>
          <Button variant="contained" onClick={this.handleOnclick} color="primary" >
            Update Props!
        </Button>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
