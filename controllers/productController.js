const Product = require('../models/Product');
const saveAuditLog = require('../utils/auditLog');

// Create Product — Admin Only
exports.createProduct = async (req, res, next) => {
  try {
    const { name, description, price, category, stock } = req.body;

    const product = new Product({
      name,
      description,
      price,
      category,
      stock
    });

    await product.save();
    await saveAuditLog(req.user, 'create product', `Created product ${product._id}`, req);
    res.status(201).json(product);
  } catch (err) {
    console.error('Product creation error:', err); // optional debug log
    next(err);
  }
};


// Get All Products — Public
exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    next(err);
  }
};

// Get Product by ID — Public
exports.getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    next(err);
  }
};

// Update Product — Admin Only
exports.updateProduct = async (req, res, next) => {
  try {
    const { name, description, price } = req.body;
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, description, price },
      { new: true, runValidators: true }
    );

    if (!product) return res.status(404).json({ message: 'Product not found' });

    await saveAuditLog(req.user, 'update product', `Updated product ${product._id}`, req);
    res.json(product);
  } catch (err) {
    next(err);
  }
};

// Delete Product — Admin Only
exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    await saveAuditLog(req.user, 'delete product', `Deleted product ${product._id}`, req);
    res.json({ message: 'Product deleted' });
  } catch (err) {
    next(err);
  }
};
