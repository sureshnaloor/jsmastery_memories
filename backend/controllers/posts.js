import mongoose  from 'mongoose';
import PostMessage from '../models/postMessage.js'

const getPosts = async (_,res) => {
    // res.json({message: 'inside backend root'})
    try {
        const postMessages = await PostMessage.find({})
        // console.log(postMessages)
        res.status(200).json(postMessages)
        
    } catch (error) {
        res.status(400).json({ error: `sorry, some error happened, not able to fetch posts: check : ${error}` });
    }
}

const createPost = async (req,res) => {
    // res.json({message:'post creation'})
    const post = req.body;
    const newPost = new PostMessage(post);
    
    try {        
        await newPost.save()
        res.status(200).json({message:'new post created'})
        
    } catch (error) {
        res.send({error: `sorry, some error happened: check : ${error}`})
    }
}

const editPost = async (req, res) => {
    const {id} = req.params;
    const post = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:`sorry, the parameter id passed: ${id} is not a valid post id`})
    }
    try {
        const updatedPost = await PostMessage.findByIdAndUpdate({_id: id}, post, {new:true})
        // new true parameter returns the updated document, default is 'stale one' returns
        return res.status(201).json(updatedPost)
        
    } catch (error) {
        res.json({error: `sorry, some error happened: check : ${error}`})
    }
    }


const deletePost = async  (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
			return res
				.status(404)
				.json({
					error: `sorry, no such post exists to delete`,
				});
		}
    try {
        await postMessages.findByIdAndRemove(id);
        res.status(201).json({message: 'post removed'})
        
    } catch (error) {
        res.status(500).json({ error: `sorry, some error happened: check : ${error}`})
        
    }

}

const getbyId = () => {

}

const deleteAll = () => {

}

export {getPosts, createPost, editPost, deletePost, getbyId, deleteAll}