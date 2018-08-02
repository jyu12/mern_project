import React from 'react';
import classnames from 'classnames';
import { PropTypes } from 'prop-types';

const TextInputForm = ({
    // props in a functional component declared here first
    name,
    placeholder,
    value,
    error,
    label,
    info,
    type,
    onChange,
    disabled
}) => {
    return (
        <div className="form-group">
            <input type={ type } 
                className={classnames("form-control form-control-lg", {
                'is-invalid': error
                })} 
                placeholder={ placeholder }
                name={ name }
                value={ value } 
                onChange={ onChange } 
                disabled={ disabled }
            />
            <small className="form-text text-muted">{info}</small>
            <div className="invalid-feedback">{ error }</div>
        </div>
    );
};

TextInputForm.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,

    placeholder: PropTypes.string,
    info: PropTypes.string,
    error: PropTypes.string,
    disabled: PropTypes.string
}

// defines the default props, anything is just false or null by default?
TextInputForm.defaultProps = {
    type: '',
}

export default TextInputForm;