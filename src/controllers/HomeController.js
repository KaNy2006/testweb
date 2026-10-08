const ProductModel = require("../models/ProductModel");

async function index(req, res) {
  res.render("client/home", {
    title: "Linh kien may tinh",
    featuredProducts: await ProductModel.getFeatured(),
    allProducts: await ProductModel.getAll(),
    prebuiltProducts: await ProductModel.getAll({ category: "PC Build sẵn" }),
    categories: await ProductModel.getCategories(),
  });
}

module.exports = { 
  index 
};
