exports.item = async (data) => {
    const category = {
        categoryId: data._id,
        categoryName: data.category
    } 

    return category;
}

exports.collection = async (data) => {
    const categories = [];

   await data.forEach(element => {
        const category = {
            categoryId: element._id,
            categoryName: element.category
        } 

        categories.push(category);
    });

    return categories;
}