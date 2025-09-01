const { Category, Product } = require('../models');


const getAllCategories = async (req, res) => {
  try {
    const { includeProductCount = false } = req.query;
    
    const includeOptions = [];
    
    
    if (includeProductCount === 'true') {
      includeOptions.push({
        model: Product,
        as: 'products',
        attributes: [], 
        required: false 
      });
    }

    const categories = await Category.findAll({
      include: includeOptions,
      attributes: includeProductCount === 'true' 
        ? ['id', 'name', 'description', 'createdAt', 'updatedAt']
        : ['id', 'name', 'description'],
      order: [['name', 'ASC']]
    });

    
    if (includeProductCount === 'true') {
      const categoriesWithCount = await Promise.all(
        categories.map(async (category) => {
          const productCount = await Product.count({
            where: { categoryId: category.id }
          });
          
          return {
            ...category.toJSON(),
            productCount
          };
        })
      );
      
      return res.json({ categories: categoriesWithCount });
    }

    res.json({ categories });

  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
};


const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const { includeProducts = false } = req.query;
    
    const includeOptions = [];
    
    if (includeProducts === 'true') {
      includeOptions.push({
        model: Product,
        as: 'products',
        attributes: ['id', 'name', 'price', 'stock', 'imageUrl']
      });
    }

    const category = await Category.findByPk(id, {
      include: includeOptions
    });

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.json({ category });

  } catch (error) {
    console.error('Get category error:', error);
    res.status(500).json({ error: 'Failed to fetch category' });
  }
};


const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    
    if (!name) {
      return res.status(400).json({
        error: 'Category name is required'
      });
    }

    
    const existingCategory = await Category.findOne({ 
      where: { name } 
    });
    
    if (existingCategory) {
      return res.status(409).json({
        error: 'Category with this name already exists'
      });
    }

    const category = await Category.create({
      name,
      description: description || null
    });

    res.status(201).json({
      message: 'Category created successfully',
      category
    });

  } catch (error) {
    console.error('Create category error:', error);
    res.status(500).json({ error: 'Failed to create category' });
  }
};


const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    
    if (name && name !== category.name) {
      const existingCategory = await Category.findOne({
        where: { name }
      });
      
      if (existingCategory) {
        return res.status(409).json({
          error: 'Category with this name already exists'
        });
      }
    }

    await category.update({
      name: name || category.name,
      description: description !== undefined ? description : category.description
    });

    res.json({
      message: 'Category updated successfully',
      category
    });

  } catch (error) {
    console.error('Update category error:', error);
    res.status(500).json({ error: 'Failed to update category' });
  }
};


const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    
    const productsCount = await Product.count({
      where: { categoryId: id }
    });

    if (productsCount > 0) {
      return res.status(400).json({
        error: `Cannot delete category. It has ${productsCount} products assigned. Please reassign or delete products first.`
      });
    }

    await category.destroy();
    
    res.json({ 
      message: 'Category deleted successfully'
    });

  } catch (error) {
    console.error('Delete category error:', error);
    res.status(500).json({ error: 'Failed to delete category' });
  }
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
};