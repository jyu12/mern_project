import React from 'react';
import classnames from 'classnames';
import { PropTypes } from 'prop-types';

const TextAreaInputForm = ({
    name,
    placeholder,
    value,
    error,
    info,
    onChange,
}) => {
    return (
        <div className="form-group">
            <textarea
                className={classnames("form-control form-control-lg", {
                'is-invalid': error
                })} 
                placeholder={ placeholder }
                name={ name }
                value={ value } 
                onChange={ onChange } 
            />
            <small className="form-text text-muted">{info}</small>
            <div className="invalid-feedback">{ error }</div>
        </div>
    );
};

TextAreaInputForm.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,

    placeholder: PropTypes.string,
    info: PropTypes.string,
    error: PropTypes.string,
}

export default TextAreaInputForm;