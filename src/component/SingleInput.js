import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Clear from '@material-ui/icons/Clear';
import {styles} from '../Style/singleInputStyles';


class SingleInput extends React.Component {

    static defaultProps = {
        onChange: () => null,
        OnDelete:() => null,
        value:""
      }

    handleChange = (event) => {
        const value = event.target.value;
        this.props.OnChange(value)
    };

    render() {
        const { classes, value, name } = this.props;

        return (
            <div className={classes.divTextInput} >
                <TextField
                    id="standard-name"
                    label="test attribute"
                    className={classes.textField}
                    value={value}
                    onChange={this.handleChange}
                    fullWidth
                />
                <div className={classes.divIcon} onClick={this.props.OnDelete} ><Clear /></div>
            </div>
        );
    }
}

SingleInput.propTypes = {
    classes: PropTypes.object.isRequired,
    value: PropTypes.string,
    OnChange: PropTypes.func,
    OnDelete: PropTypes.func,
};

export default withStyles(styles)(SingleInput);