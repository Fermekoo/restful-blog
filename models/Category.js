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
    updated_at: {
            type: Date
    },

    posts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Posts'}]
});

module.exports = mongoose.model('Category', CategorySchema);