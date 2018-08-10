import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import keys from '../../config/keys'

class Github extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientId: keys.githubClientId,
      clientSecret: keys.githubClientSecret,
      count: 5,
      sort: 'created: asc',
      repos: []
    }
  }

  componentDidMount() {
    const { username } = this.props;
    const { count, sort, clientId, clientSecret } = this.state;
    fetch(`https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`)
      .then(response => response.json())
      .then(data => { 
        // When the user leaves the page before the fetch is done, the setState will try to mount on a component that no longer exist
        // So this checks to see if it's still mounted befoe calling setState
        if(this.refs.ref) { 
          this.setState({repos: data}); 
        }
      })
      .catch(error => console.log(error))
  }

  render() {
    const { repos } = this.state;
    const repoList = repos.map(repo => (
      <div key={repo.id} className="card card-body mb-2">
        <div className="col-md-6">
          <h4>
            <Link to={repo.html_url} className="text-info" target="_blank">{repo.name}</Link>
          </h4>
          <p>{repo.descrption}</p>
        </div>
        <div className="col-md-6">
          <span className="badge badge-info mr-1">
            Stars: {repo.stargazers_count}
          </span>
          <span className="badge badge-secondary mr-1">
            Watchers: {repo.watchers_count}
          </span>
          <span className="badge badge-success">
            Forks: {repo.forks_count}
          </span>
        </div>
      </div>
    ))
    return (
      <div ref="ref">
        <hr/>
        <h3 className="mb-4"> Github Repos</h3>
        {repoList}
      </div>
    )
  }
}

export default Github;