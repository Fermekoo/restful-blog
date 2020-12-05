const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
    category: {
        type: String,
        required: true 
    },
    created_at: {
        type: Date,
        default: Date.now 
    },
    posts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Posts'}]
});

module.exports = mongoose.model('Category', CategorySchema);