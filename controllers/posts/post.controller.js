const { response } = require('express');
const Category = require('../../models/Category');
const Post = require('../../models/Post');
const { createValidation } = require('../../validations/posts.validation');
const transform = require('../../transformers/posts/post.transformer');

exports.getAll = async (req, res) => {

    try {
        const posts = await Post.find().populate('category');
        res.json({message: 'article', result: await transform.collection(posts)});
    } catch (error) {
        res.json({message: error});
    }
}

exports.findOne = async (req, res) => {
    const id = req.params.id
    try {
        const post = await Post.findById(id).populate('category');
        res.json({message: 'article', result: await transform.item(post)});
    } catch (error) {
        res.json({message: error});
    }
}

exports.create = async (req, res) => {

    const { error } = createValidation(req.body);
    if(error) return res.status(400).json({message: error.details[0].message});

    const fileImage = req.image;

    if(!fileImage) return res.status(400).json({message: 'image is required'});

    const categoryId = req.body.categoryId;

    const category = await Category.findById(categoryId);

    const post = new Post({
        title: req.body.title,
        description: req.body.description,
        image: req.file.filename
    });
    
    post.category = category;

    try {

        const savePost = await post.save();
    } catch (error) {
        res.json({ message: error});
    }

    category.posts.push(post);

    try {
        await category.save();
    } catch (error) {
        res.json({message: error});
    }

    res.status(201).json({message:'success'});

}

exports.delete = async (req, res) => {
    const id = req.params.id;

    try {
        const deletePost = await Post.deleteOne({_id: id})

        res.json(deletePost);
    } catch (error) {
        res. json({message});
    }
}

exports.update = async (req, res) => {
    const id = req.params.id;

    try {
        const updatePost = await Post.updateOne({_id: id}, {
            $set: {
                title: req.body.title,
                description: req.body.description
            }
        });
        res.json(updatePost);
    } catch (error) {
        res.json({message: error});
    }
} 

