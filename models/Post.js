const {Schema, model, plugin} = require('mongoose');
const urlSlug = require('mongoose-slug-generator');

plugin(urlSlug);
const PostSchema = Schema({

    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        unique: true,
        slug: "title"
    },
    image: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    }

});

PostSchema.pre('save', function(next){
    this.slug = this.title.split(" ").join("-");
    next();
});

module.exports = model('Posts', PostSchema);