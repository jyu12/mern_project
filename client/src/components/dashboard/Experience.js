import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { deleteExperience } from '../../actions/profile'

class Experience extends Component {
  onDeleteClick(id) {
      this.props.deleteExperience(id, this.props.history);
  }

  render() {
    const exp = this.props.experience.map(ex => (
        <tr key={ex._id}>
            <td>{ex.company}</td>
            <td>{ex.title}</td>
            <td><Moment format="MM/DD/YYYY">{ex.from}</Moment>{' - '}
                {ex.to === null ? ('Now') : (<Moment format="MM/DD/YYYY">{ex.to}</Moment>)}
            </td>
            <td><button onClick={this.onDeleteClick.bind(this, ex._id)}className="btn btn-danger">Delete</button></td>
        </tr>
    ));
    return (
      <div>
        <h4 className="mb-4"> Experience Credentials</h4>
        <table className="table">
            <thead>
                <tr>
                    <th>Company</th>
                    <th>Title</th>
                    <th>Years</th>
                    <th></th>
                </tr>
                    {exp}
            </thead>
        </table>
      </div>
    )
  }
}

Experience.propTypes = {
    deleteExperience: PropTypes.func.isRequired
};

export default connect(null, { deleteExperience })(Experience);