const Category = require('../../models/Category');
const validation = require('../../validations/category.validation');
const transform = require('../../transformers/category/category.transformer');

exports.getAll = async (req, res) => {
    try {
        const categories = await Category.find().populate('posts');
        
        res.json({message: 'categories', result: transform.collection(categories)});
    } catch (error) {
        res.status(500).json({message: Error});
    }
}

exports.create = async (req, res) => {
    const {error} = validation.categoryValidation(req.body);

    if(error) return res.status(400).json({message: error.details[0].message});

    const category = new Category({
        category: req.body.categoryName
    });

    try {
        const saveCategory = await category.save();

        res.json({message: 'category created'});

    } catch (error) {
        res.status(500).json({message: error});
    }
}