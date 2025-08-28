const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(200),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'El nombre del producto es requerido' },
      len: { args: [2, 200], msg: 'Nombre debe tener entre 2 y 200 caracteres' }
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'La descripción es requerida' }
    }
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: { args: [0], msg: 'El precio debe ser mayor a 0' },
      notNull: { msg: 'El precio es requerido' }
    }
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: { args: [0], msg: 'El stock no puede ser negativo' }
    }
  },
  imageUrl: {
    type: DataTypes.STRING(500),
    allowNull: true,
    validate: {
      isUrl: { msg: 'Debe ser una URL válida' }
    }
  },
  sku: {
    type: DataTypes.STRING(50),
    allowNull: true,
    unique: true,
    comment: 'Código único del producto'
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  // Foreign Keys
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'categories',
      key: 'id'
    }
  },
  createdBy: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    },
    comment: 'ID del admin que creó el producto'
  }
}, {
  tableName: 'products',
  timestamps: true,
  indexes: [
    // Índices para mejorar performance en búsquedas
    { fields: ['categoryId'] },
    { fields: ['isActive'] },
    { fields: ['name'] },
    { fields: ['price'] }
  ]
});

module.exports = Product;