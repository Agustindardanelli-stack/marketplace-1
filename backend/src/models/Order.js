const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  orderNumber: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true,
    comment: 'Número único de orden (ej: ORD-2024-001)'
  },
  status: {
    type: DataTypes.ENUM('PENDING', 'PAID', 'SHIPPED', 'DELIVERED', 'CANCELLED'),
    allowNull: false,
    defaultValue: 'PENDING'
  },
  totalAmount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: { args: [0], msg: 'El total debe ser mayor a 0' }
    }
  },
  // Información de envío (snapshot al momento de la compra)
  shippingAddress: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  shippingCity: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  shippingPostalCode: {
    type: DataTypes.STRING(10),
    allowNull: false
  },
  customerName: {
    type: DataTypes.STRING(100),
    allowNull: false,
    comment: 'Nombre completo al momento de la compra'
  },
  customerEmail: {
    type: DataTypes.STRING(100),
    allowNull: false,
    comment: 'Email al momento de la compra'
  },
  customerPhone: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  // Información de pago
  paymentMethod: {
    type: DataTypes.ENUM('CREDIT_CARD', 'DEBIT_CARD', 'TRANSFER', 'CASH'),
    allowNull: true
  },
  paymentStatus: {
    type: DataTypes.ENUM('PENDING', 'COMPLETED', 'FAILED', 'REFUNDED'),
    allowNull: false,
    defaultValue: 'PENDING'
  },
  paidAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  // Foreign Key
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  }
}, {
  tableName: 'orders',
  timestamps: true,
  indexes: [
    { fields: ['userId'] },
    { fields: ['status'] },
    { fields: ['orderNumber'] },
    { fields: ['createdAt'] }
  ],
  hooks: {
    // Generar número de orden automáticamente
    beforeCreate: async (order) => {
      const year = new Date().getFullYear();
      const count = await Order.count() + 1;
      order.orderNumber = `ORD-${year}-${count.toString().padStart(3, '0')}`;
    }
  }
});

module.exports = Order;