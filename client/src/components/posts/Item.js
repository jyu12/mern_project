import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { deletePost, like, unlike } from '../../actions/post'

class Item extends Component {
  onDeleteClick(id) {
    this.props.deletePost(id);
  }
  
  onLikeClick(id) {
      this.props.like(id);
  }

  onUnlikeClick(id) {
      this.props.unlike(id);
  }
  
  findUserLiked(likes) {
      const { authentication } = this.props;
      if (likes.filter(like => like.user === authentication.user.id).length > 0) {
        return true;
      } else {
        return false;
      }
  }

  render() {
    const { post, authentication, showActions } = this.props;

    return (
        <div className="card card-body mb-3">
            <div className="row">
            <div className="col-md-2">
                <a href="profile.html">
                <img className="rounded-circle d-none d-md-block" 
                    src={post.avatar}
                    alt="" />
                </a>
                <br />
                <p className="text-center">{post.name}</p>
            </div>
            <div className="col-md-10">
                <p className="lead">{post.text}</p>
                {showActions ? (
                <span>
                    <button onClick={this.onLikeClick.bind(this, post._id)} type="button" className="btn btn-light mr-1">
                    <i className={classnames('fas fa-thumbs-up', {
                        'text-info': this.findUserLiked(post.likes) })}>
                    </i>
                    <span className="badge badge-light">{post.likes.length}</span>
                    </button>
                    <button onClick={this.onUnlikeClick.bind(this, post._id)} type="button" className="btn btn-light mr-1">
                    <i className="text-secondary fas fa-thumbs-down"></i>
                    </button>
                    <Link to={`/post/${post._id}`} className="btn btn-info mr-1">Comments</Link>
                    {post.user === authentication.user.id ? (
                        <button onClick={this.onDeleteClick.bind(this, post._id)} type="button"
                        className="btn -danger mr-1"><i className="fas fa-times"></i></button>
                    ): null }
                </span>) : null}
            </div>
            </div>
        </div>
    )
  }
}

Item.defaultProps = {
    showActions: true
}

Item.propTypes = {
    deletePost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    authentication: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    authentication: state.authentication
});

export default connect(mapStateToProps, { deletePost, like, unlike })(Item);
