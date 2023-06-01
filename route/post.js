const express = require('express');
const router = express.Router();
const postController = require('../controller/post');

// POST /posts
router.post('/', postController.createPost);

// GET /posts - Get all posts
router.get('/', postController.getAllPosts);

// GET /posts/:id - Get a post by ID
router.get('/:id', postController.getPostById);

router.get('/getAllPostUserId/user/:userId', postController.getAllPostUserId);

// PUT /posts/:id - Update a post by ID
router.put('/:id', postController.updatePost);

// DELETE /posts/:id - Delete a post by ID
router.delete('/:id', postController.deletePost);

router.post('/posts/:id/like', postController.addLike);

router.get('/posts/:id/like/count', postController.getLikeCount);

router.post('/posts/:id/comment', postController.addComment);


module.exports = router;



