const Category = require('../../models/Category');
const validation = require('../../validations/category.validation');
const transform = require('../../transformers/category/category.transformer');

exports.getAll = async (req, res) => {
    try {
        const categories = await Category.find().populate('posts');
        
        res.json({
            message: 'categories',
            result: await transform.collection(categories)
        });

    } catch (error) {
        res.status(500).json({message: error});
    }
}

exports.findById = async (req, res) => {

    const id = req.params.id;

    try {

        const category = await Category.findById(id);

        res.json({
            message: 'Article',
            result: await transform.item(category)
        });

    } catch (error) {
        res.json({
            message: error
        });
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

exports.update = async (req, res) => {

    const {error} = validation.categoryValidation(req.body);

    if(error) return res.status(400).json({
        message: error.details[0].message
    });

    const id = req.params.id;

    try {
        const updateCategory = await Category.updateOne({_id: id}, {
            $set: {
                category: req.body.categoryName,
                // updated_at: Date.now
            }
        })

        res.status(200).json({
            message: 'Category updated',
            result: updateCategory
        });

    } catch (error) {
        res.status(500).json({
            message: error
        });
    }
}