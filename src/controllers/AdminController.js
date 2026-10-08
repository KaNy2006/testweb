const ProductModel = require("../models/ProductModel");
const OrderModel = require("../models/OrderModel");

const defaultCategories = ["CPU", "GPU", "Mainboard", "RAM", "SSD", "PSU", "Case", "Cooler", "PC Build sẵn"];

function flash(req, type, message) {
  req.session.flash = { type, message };
}

function parseProduct(body) {
  const name = String(body.name || "").trim();
  const brand = String(body.brand || "").trim();
  const category = String(body.category || "").trim();
  const price = Number(body.price);
  const stock = Number(body.stock);
  const performance = Number(body.performance);
  if (!name || !brand || !defaultCategories.includes(category)) {
    throw new Error("Vui lòng nhập tên, hãng và danh mục hợp lệ.");
  }
  if (!Number.isFinite(price) || price < 0 || !Number.isInteger(price) ||
      !Number.isInteger(stock) || stock < 0 ||
      !Number.isInteger(performance) || performance < 1 || performance > 100) {
    throw new Error("Giá, tồn kho hoặc hiệu năng không hợp lệ.");
  }
  let specs;
  try {
    specs = JSON.parse(body.specs || "{}");
  } catch (_) {
    throw new Error("Thông số kỹ thuật phải đúng định dạng JSON.");
  }
  if (!specs || Array.isArray(specs) || typeof specs !== "object") {
    throw new Error("Thông số kỹ thuật phải là đối tượng JSON.");
  }
  return { name, brand, category, price, stock, performance, specs,
    image: String(body.image || "").trim() || "/uploads/component.svg",
    featured: body.featured === "on" };
}

async function dashboard(req, res) {
  const [orders, summary, products] = await Promise.all([
    OrderModel.getAll(), OrderModel.getRevenueSummary(), ProductModel.getAll()
  ]);
  res.render("admin/dashboard", {
    title: "Tổng quan quản trị", summary, orders: orders.slice(0, 6),
    productCount: products.length,
    prebuiltCount: products.filter(p => p.category === "PC Build sẵn").length
  });
}

async function products(req, res) {
  const keyword = String(req.query.keyword || "").trim();
  const category = String(req.query.category || "").trim();
  const filters = { keyword, category };
  const [items, existingCategories] = await Promise.all([
    ProductModel.getAll(filters), ProductModel.getCategories()
  ]);
  res.render("admin/manage-products", {
    title: "Quản lý sản phẩm", products: items, filters,
    categories: [...new Set([...defaultCategories, ...existingCategories])]
  });
}

async function productDetail(req, res) {
  const product = await ProductModel.getById(req.params.id);
  if (!product) {
    flash(req, "error", "Không tìm thấy sản phẩm.");
    return res.redirect("/admin/products");
  }
  res.render("admin/product-detail", { title: "Chi tiết sản phẩm", product });
}

async function editProductPage(req, res) {
  const product = await ProductModel.getById(req.params.id);
  if (!product) {
    flash(req, "error", "Không tìm thấy sản phẩm.");
    return res.redirect("/admin/products");
  }
  res.render("admin/edit-product", {
    title: "Sửa sản phẩm", product,
    categories: [...new Set([...defaultCategories, ...await ProductModel.getCategories()])]
  });
}

async function createProduct(req, res) {
  try {
    await ProductModel.create(parseProduct(req.body));
    flash(req, "success", "Đã thêm sản phẩm thành công.");
  } catch (error) {
    flash(req, "error", error.message);
  }
  res.redirect("/admin/products");
}

async function updateProduct(req, res) {
  try {
    if (!await ProductModel.getById(req.params.id)) throw new Error("Sản phẩm không tồn tại.");
    await ProductModel.update(req.params.id, parseProduct(req.body));
    flash(req, "success", "Đã cập nhật sản phẩm.");
    return res.redirect("/admin/products/" + req.params.id);
  } catch (error) {
    flash(req, "error", error.message);
    return res.redirect("/admin/products/" + req.params.id + "/edit");
  }
}

async function deleteProduct(req, res) {
  try {
    const removed = await ProductModel.remove(req.params.id);
    flash(req, removed ? "success" : "error", removed ? "Đã xóa sản phẩm." : "Sản phẩm không tồn tại.");
  } catch (error) {
    flash(req, "error", "Không thể xóa sản phẩm: " + error.message);
  }
  res.redirect("/admin/products");
}

async function orders(req, res) {
  res.render("admin/manage-orders", {
    title: "Quản lý đơn hàng",
    orders: await OrderModel.getAll()
  });
}

async function updateOrder(req, res) {
  const statuses = ["Chờ duyệt", "Đang giao", "Hoàn tất", "Đã hủy"];
  if (!statuses.includes(req.body.status)) {
    flash(req, "error", "Trạng thái đơn hàng không hợp lệ.");
  } else {
    await OrderModel.updateStatus(req.params.id, req.body.status);
    flash(req, "success", "Đã cập nhật trạng thái đơn hàng.");
  }
  res.redirect("/admin/orders");
}

module.exports = {
  dashboard, products, productDetail, editProductPage,
  createProduct, updateProduct, deleteProduct, orders, updateOrder
};
