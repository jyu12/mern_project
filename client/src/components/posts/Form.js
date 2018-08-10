import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextAreaInputForm from '../common/TextAreaInputForm';
import { addPost } from '../../actions/post';

class Form extends Component {
  constructor(props) {
      super(props);
      this.state = {
          text: '',
          errors: {}
      };
      this.onChange = this.onChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
        this.setState({errors: newProps.errors})
    }
  }

  onSubmit(event) {
      event.preventDefault();

      const { user } = this.props.authentication;

      const newPost = {
          text: this.state.text,
          name: user.name,
          avatar: user.avatar
      };
      this.props.addPost(newPost);
      this.setState({text: ''});
  }

  onChange(event) {
      this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    const { errors } = this.state;

    return (
        <div className="post-form mb-3">
            <div className="card card-info">
                <div className="card-header bg-info text-white"> Say Somthing...</div>
                <div className="card-body">
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                    <TextAreaInputForm
                        placeholder ="Create a post"
                        name="text"
                        value={this.state.text}
                        onChange={this.onChange}
                        error={errors.text}
                    />
                    </div>
                    <button type="submit" className="btn btn-dark">Submit</button>
                </form>
                </div>
            </div>
        </div>
    )
  }
}

Form.propTypes = {
    addPost: PropTypes.func.isRequired,
    authentication: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    errors: state.errors,
    authentication: state.authentication

});

export default connect(mapStateToProps, {addPost})(Form);
