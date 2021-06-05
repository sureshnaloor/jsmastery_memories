import express from 'express'
const router = express.Router()

import {getPosts, createPost, editPost, deletePost, deleteAll, getbyId} from '../controllers/posts.js'

router.get('/', getPosts)
router.post('/', createPost)
router.patch('/:id', editPost)
router.delete('/:id', deletePost)
router.delete('/', deleteAll)
router.get('/:id', getbyId)


export default router;