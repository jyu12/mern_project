import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteComment } from '../../actions/post';
import post from '../../reducers/post';

class CommentItem extends Component {
  onDeleteCLick(postId, commentId) {
      this.props.deleteComment(postId, commentId) 
  }
  render() {
    const {comment, postId, authentication } = this.props;
    return (
        <div className="card card-body mb-3">
            <div className="row">
                <div className="col-md-2">
                    <a href="profile.html">
                    <img className="rounded-circle d-none d-md-block" src={comment.avatar} alt="" />
                    </a>
                    <br />
                    <p className="text-center">{comment.name}</p>
                </div>
                <div className="col-md-10">
                    <p className="lead">{comment.text}</p>
                    {comment.user === authentication.user.id ? (
                        <button 
                            onClick={this.onDeleteCLick.bind(this, postId, comment._id)}
                            type="button"
                            className="btn btn-danger mr-1"
                        > <i className="fas fa-times" />
                        </button>
                    ) : null }
                </div>
            </div>
        </div>
    )
  }
}

CommentItem.propTypes = {
    deleteComment: PropTypes.func.isRequired,
    comment: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired,
    authentication: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    authentication: state.authentication
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);