import React, { Component } from 'react'
import Moment from 'react-moment';

class Credentials extends Component {
  render() {
    const { experience, education } = this.props;
    const exp = experience.map(ex => (
      <li key={ex._id} className="list-group-item">
        <h4>{ex.company}</h4>
        <p>
            <Moment format="MM/DD/YYYY">{ex.from}</Moment> - {ex.to === null ? (' Now') : (<Moment format="MM/DD/YYYY">{ex.to}</Moment>)}
        </p>
        <p><strong>Position:</strong>{ex.title}</p>
        <p>{ex.location === '' ? null: (<span><strong>Location: </strong> {ex.location}</span>)}</p>
        <p>{ex.description === '' ? null: (<span><strong>Description: </strong> {ex.description}</span>)}</p>
      </li>
    ));

    const edu = education.map(ed => (
      <li key={ed._id} className="list-group-item">
        <h4>{ed.school}</h4>
        <p>
            <Moment format="MM/DD/YYYY">{ed.from}</Moment> - {ed.to === null ? (' Now') : (<Moment format="MM/DD/YYYY">{ed.to}</Moment>)}
        </p>
        <p><strong>Degree:</strong>{ed.degree}</p>
        <p><strong>Field of Study: </strong> {ed.location}</p>
        <p>{ed.description === '' ? null: (<span><strong>Description: </strong> {ed.description}</span>)}</p>
      </li>
    ));

    return (
      <div className="row">
        <div className="col-md-6">
          <h3 className="text-center text-info">Experience</h3>
          {exp.length > 0 ? (
            <ul className="list-group">{exp}</ul>) : (<p className="texrt-center">None Listed</p>)}
        </div>

        <div className="col-md-6">
          <h3 className="text-center text-info">Education</h3>
          {edu.length > 0 ? (
            <ul className="list-group">{edu}</ul>) : (<p className="texrt-center">None Listed</p>)}
        </div>        
      </div>
    )
  }
}

export default Credentials;