const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Post = require('../../models/Post');
const Profile = require('../../models/Profile')
const validatePostInput = require('../../validation/post')

router.get('/new', (request, respond) => respond.json({msg: "post work"}));

//  @route   GET api/posts
//  @desc    Get post
//  @access  public
router.get('/', (request, response) => {
    Post.find()
        .sort({date: -1})
        .then(posts => response.json(posts))
        .catch(error => request.status(404));
});

//  @route   GET api/posts/:id
//  @desc    Get post by id
//  @access  public
router.get('/:id', (request, response) => {
    Post.findById(request.params.id)
        .then(post => response.json(post))
        .catch(error => request.status(404).json({ postNotFound: 'No post with that Id'}));
});

//  @route   POST api/posts
//  @desc    Create post
//  @access  private
router.post('/', passport.authenticate('jwt', { session: false }), (request, response) => {
    const { errors, isValid } = validatePostInput(request.body);

    if (!isValid) {
        return response.status(400).json(errors);
    }

    const newPost = new Post({
        text: request.body.text,
        name: request.body.name,
        avatar: request.body.avatar,
        user: request.user.id
    });
    newPost.save().then(post => response.json(post));
});

//  @route   delete api/posts/:id
//  @desc    delete post
//  @access  private
router.delete('/:id', passport.authenticate('jwt', { session: false }), (request, response) => {
    Profile.findOne({ user: request.user.id })
    .then(profile => {
        Post.findById(request.params.id)
        .then(post => {
            if(post.user.toString() !== request.user.id) {
                return response.status(401).json({unauthorized: 'Not authorized to delete'});
            }
            post.remove().then(() => response.json({ success: true }));
        }).catch(error => response.status(404).json({ postNotFound: 'Post not found'}))
    })
});

//  @route   POST api/like/:id
//  @desc    Like
//  @access  private
router.post('/like/:id', passport.authenticate('jwt', { session: false }), (request, response) => {
    Profile.findOne({ user: request.user.id })
    .then(profile => {
        Post.findById(request.params.id)
        .then(post => { 
            if(post.likes.filter(like => like.user.toString() === request.user.id).length > 0) {
                return response.status(400).json({ alreadyLiked: 'User Already liked'})
            }
            post.likes.push({ user: request.user.id });
            post.save().then(post => response.json(post));
        }).catch(error => response.status(404).json({ postNotFound: 'Post not found'}))
    })
});

//  @route   POST api/unlike/:id
//  @desc    unlike
//  @access  private
router.post('/unlike/:id', passport.authenticate('jwt', { session: false }), (request, response) => {
    Profile.findOne({ user: request.user.id })
    .then(profile => {
        Post.findById(request.params.id)
        .then(post => { 
            if(post.likes.filter(like => like.user.toString() === request.user.id).length === 0) {
                return response.status(400).json({ alreadyLiked: 'Not liked yet'})
            }
            const removeIdx = post.likes
                .map(item => item.user.toString())
                .indexOf(request.user.id);
            
            post.likes.splice(removeIdx, 1);
            post.save().then(post => response.json(post));
        }).catch(error => response.status(404).json({ postNotFound: 'Post not found'}))
    })
});

//  @route   POST api/posts/comment/:id
//  @desc    add comment to post
//  @access  private
router.post('/comment/:id', passport.authenticate('jwt', { session: false }), (request, response) => {
    const { errors, isValid } = validatePostInput(request.body);

    if (!isValid) {
        return response.status(400).json(errors);
    }

    Post.findById(request.params.id)
    .then(post => { 
        const newComment = {
            text: request.body.text,
            name: request.body.name,
            avatar: request.body.avatar,
            user: request.user.id
        }
        post.comments.unshift(newComment);
        post.save().then(post => response.json(post));
    }).catch(error => response.status(404).json({ postNotFound: 'Post not found'}))
});

//  @route   Delete api/comment/:id/:commentId
//  @desc    remove comment from post
//  @access  private
router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', { session: false }), (request, response) => {
    Profile.findOne({ user: request.user.id })
    .then(profile => {
        Post.findById(request.params.id)
        .then(post => { 
            if(post.comments.filter(comment => comment._id.toString() === request.params.comment_id).length === 0) {
                return response.status(404).json({ commentDoesNotExist: 'Comment does not exist' });
            }
            const removeIdx = post.comments
                .map(item => item._id.toString())
                .indexOf(request.params.comment_id);
            post.comments.splice(removeIdx, 1);
            post.save().then(post => response.json(post));
        }).catch(error => response.status(404).json({ postNotFound: 'Post not found'}))
    })
});

module.exports = router;