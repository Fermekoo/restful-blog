exports.item = (data) => {
    const category = {
        categoryId: data._id,
        categoryName: data.category
    } 

    return category;
}

exports.collection = (data) => {
    const categories = [];

    data.forEach(element => {
        const category = {
            categoryId: element._id,
            categoryName: element.category
        } 

        categories.push(category);
    });

    return categories;
}