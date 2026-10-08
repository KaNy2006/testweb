const ProductModel = require("../models/ProductModel");

async function index(req, res) {
  res.render("client/home", {
    title: "Linh kien may tinh",
    featuredProducts: await ProductModel.getFeatured(),
    allProducts: await ProductModel.getAll(),
    categories: await ProductModel.getCategories(),
  });
}

module.exports = { 
  index 
};
