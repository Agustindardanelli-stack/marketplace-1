// backend/src/controllers/productController.js
const { Product, Category } = require('../models');
const { Op } = require('sequelize');

// GET ALL PRODUCTS (Público - con filtros y búsqueda)
const getAllProducts = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 12, 
      search, 
      category, 
      minPrice, 
      maxPrice,
      sortBy = 'createdAt',
      sortOrder = 'DESC'
    } = req.query;

    // Construir filtros dinámicos
    const whereClause = {};
    
    // Filtro de búsqueda (nombre + descripción)
    if (search) {
      whereClause[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } }
      ];
    }
    
    // Filtro por rango de precio
    if (minPrice || maxPrice) {
      whereClause.price = {};
      if (minPrice) whereClause.price[Op.gte] = parseFloat(minPrice);
      if (maxPrice) whereClause.price[Op.lte] = parseFloat(maxPrice);
    }

    // Filtro por categoría
    const includeOptions = {
      model: Category,
      as: 'category',
      attributes: ['id', 'name', 'description']
    };
    
    if (category) {
      includeOptions.where = { id: category };
    }

    // Paginación
    const offset = (page - 1) * limit;

    const { count, rows: products } = await Product.findAndCountAll({
      where: whereClause,
      include: [includeOptions],
      order: [[sortBy, sortOrder.toUpperCase()]],
      limit: parseInt(limit),
      offset: offset,
      distinct: true // Para count correcto con includes
    });

    // Respuesta con metadatos de paginación
    res.json({
      products,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(count / limit),
        totalProducts: count,
        hasNext: page * limit < count,
        hasPrev: page > 1
      },
      filters: {
        search: search || null,
        category: category || null,
        priceRange: { min: minPrice, max: maxPrice }
      }
    });

  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

// GET SINGLE PRODUCT (Público)
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const product = await Product.findByPk(id, {
      include: [{
        model: Category,
        as: 'category',
        attributes: ['id', 'name', 'description']
      }]
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ product });

  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
};

// CREATE PRODUCT (Solo Admin)
const createProduct = async (req, res) => {
  try {
    const { 
      name, 
      description, 
      price, 
      stock, 
      imageUrl, 
      categoryId 
    } = req.body;

    // Validaciones
    if (!name || !description || !price || stock === undefined || !categoryId) {
      return res.status(400).json({
        error: 'Required fields: name, description, price, stock, categoryId'
      });
    }

    // Verificar que la categoría existe
    const category = await Category.findByPk(categoryId);
    if (!category) {
      return res.status(400).json({ error: 'Invalid category' });
    }

    const product = await Product.create({
      name,
      description,
      price: parseFloat(price),
      stock: parseInt(stock),
      imageUrl,
      categoryId
    });

    // Respuesta con categoría incluida
    const createdProduct = await Product.findByPk(product.id, {
      include: [{
        model: Category,
        as: 'category',
        attributes: ['id', 'name', 'description']
      }]
    });

    res.status(201).json({
      message: 'Product created successfully',
      product: createdProduct
    });

  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({ error: 'Failed to create product' });
  }
};

// UPDATE PRODUCT (Solo Admin)
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, stock, imageUrl, categoryId } = req.body;

    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Si se cambia categoría, verificar que existe
    if (categoryId) {
      const category = await Category.findByPk(categoryId);
      if (!category) {
        return res.status(400).json({ error: 'Invalid category' });
      }
    }

    await product.update({
      name: name || product.name,
      description: description || product.description,
      price: price ? parseFloat(price) : product.price,
      stock: stock !== undefined ? parseInt(stock) : product.stock,
      imageUrl: imageUrl || product.imageUrl,
      categoryId: categoryId || product.categoryId
    });

    // Respuesta con categoría incluida
    const updatedProduct = await Product.findByPk(product.id, {
      include: [{
        model: Category,
        as: 'category',
        attributes: ['id', 'name', 'description']
      }]
    });

    res.json({
      message: 'Product updated successfully',
      product: updatedProduct
    });

  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({ error: 'Failed to update product' });
  }
};

// DELETE PRODUCT (Solo Admin)
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    await product.destroy();
    
    res.json({ message: 'Product deleted successfully' });

  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};