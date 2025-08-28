const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const OrderItem = sequelize.define('OrderItem', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: { args: [1], msg: 'La cantidad debe ser al menos 1' }
    }
  },
  // Precio al momento de la compra (snapshot)
  unitPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: { args: [0], msg: 'El precio unitario debe ser mayor a 0' }
    },
    comment: 'Precio del producto al momento de la compra'
  },
  totalPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: { args: [0], msg: 'El precio total debe ser mayor a 0' }
    },
    comment: 'quantity * unitPrice'
  },
  // Información del producto al momento de la compra (snapshot)
  productName: {
    type: DataTypes.STRING(200),
    allowNull: false,
    comment: 'Nombre del producto al momento de la compra'
  },
  productSku: {
    type: DataTypes.STRING(50),
    allowNull: true,
    comment: 'SKU del producto al momento de la compra'
  },
  // Foreign Keys
  orderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'orders',
      key: 'id'
    }
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'products',
      key: 'id'
    },
    comment: 'Referencia al producto original'
  }
}, {
  tableName: 'order_items',
  timestamps: true,
  indexes: [
    { fields: ['orderId'] },
    { fields: ['productId'] }
  ],
  hooks: {
    // Calcular precio total automáticamente
    beforeCreate: (orderItem) => {
      orderItem.totalPrice = orderItem.quantity * orderItem.unitPrice;
    },
    beforeUpdate: (orderItem) => {
      if (orderItem.changed('quantity') || orderItem.changed('unitPrice')) {
        orderItem.totalPrice = orderItem.quantity * orderItem.unitPrice;
      }
    }
  }
});

module.exports = OrderItem;