const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Cart = sequelize.define('Cart', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
    validate: {
      min: { args: [1], msg: 'La cantidad debe ser al menos 1' },
      max: { args: [99], msg: 'Cantidad máxima: 99 unidades' }
    }
  },
  // Foreign Keys
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'products',
      key: 'id'
    }
  }
}, {
  tableName: 'carts',
  timestamps: true,
  indexes: [
    // Índice compuesto para evitar duplicados
    {
      unique: true,
      fields: ['userId', 'productId'],
      name: 'unique_user_product_cart'
    },
    // Índice para búsquedas por usuario
    { fields: ['userId'] }
  ]
});

module.exports = Cart;