import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { deleteEducation } from '../../actions/profile'

class Education extends Component {
  onDeleteClick(id) {
      this.props.deleteEducation(id, this.props.history);
  }

  render() {
    const edu = this.props.education.map(ed => (
        <tr key={ed._id}>
            <td>{ed.school}</td>
            <td>{ed.degree}</td>
            <td><Moment format="MM/DD/YYYY">{ed.from}</Moment>{' - '}
                {ed.to === null ? ('Now') : (<Moment format="MM/DD/YYYY">{ed.to}</Moment>)}
            </td>
            <td><button onClick={this.onDeleteClick.bind(this, ed._id)}className="btn btn-danger">Delete</button></td>
        </tr>
    ));
    return (
      <div>
        <h4 className="mb-4"> Education </h4>
        <table className="table">
            <thead>
                <tr>
                    <th>School</th>
                    <th>Degree</th>
                    <th>Years</th>
                    <th></th>
                </tr>
                    {edu}
            </thead>
        </table>
      </div>
    )
  }
}

Education.propTypes = {
    deleteEducation: PropTypes.func.isRequired
};

export default connect(null, { deleteEducation })(Education);