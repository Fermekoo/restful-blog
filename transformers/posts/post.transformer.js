const category = require('../category/category.transformer');

exports.collection = async (data) => {
    
    const posts = [];

   await data.forEach(element => {

       const post = {
           id: element._id,
           postTitle: element.title,
           postDescription: element.description,
           postImage: element.image,
           category: element.category ? {
               categoryId: element.category._id,
               categoryName: element.category.category
           } : null
       } 
       
       posts.push(post);
    });

    return posts;
}

exports.item = async (data) => {
    const post = {
        id: data._id,
        postTitle: data.title,
        postDescription: data.description,
        postImage: data.image,
        category: data.category ? {
            categoryId: data.category._id,
            categoryName: data.category.category
        } : null
    } 

    return post;
}