const { sequelize } = require('../config/database');

// Importar todos los modelos
const User = require('./User');
const Category = require('./Category');
const Product = require('./Product');
const Cart = require('./Cart');
const Order = require('./Order');
const OrderItem = require('./OrderItem');

// DEFINIR RELACIONES

// 1. Category -> Products (una categoría tiene muchos productos)
Category.hasMany(Product, {
  foreignKey: 'categoryId',
  as: 'products'
});

Product.belongsTo(Category, {
  foreignKey: 'categoryId',
  as: 'category'
});

// 2. User -> Products (un admin crea muchos productos)
User.hasMany(Product, {
  foreignKey: 'createdBy',
  as: 'createdProducts'
});

Product.belongsTo(User, {
  foreignKey: 'createdBy',
  as: 'creator'
});

// 3. User -> Cart (un usuario tiene muchos items en carrito)
User.hasMany(Cart, {
  foreignKey: 'userId',
  as: 'cartItems'
});

Cart.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user'
});

// 4. Product -> Cart (un producto puede estar en muchos carritos)
Product.hasMany(Cart, {
  foreignKey: 'productId',
  as: 'cartItems'
});

Cart.belongsTo(Product, {
  foreignKey: 'productId',
  as: 'product'
});

// 5. User -> Orders (un usuario tiene muchas órdenes)
User.hasMany(Order, {
  foreignKey: 'userId',
  as: 'orders'
});

Order.belongsTo(User, {
  foreignKey: 'userId',
  as: 'customer'
});

// 6. Order -> OrderItems (una orden tiene muchos items)
Order.hasMany(OrderItem, {
  foreignKey: 'orderId',
  as: 'items'
});

OrderItem.belongsTo(Order, {
  foreignKey: 'orderId',
  as: 'order'
});

// 7. Product -> OrderItems (un producto puede estar en muchos items de órdenes)
Product.hasMany(OrderItem, {
  foreignKey: 'productId',
  as: 'orderItems'
});

OrderItem.belongsTo(Product, {
  foreignKey: 'productId',
  as: 'product'
});

// Función para sincronizar BD
const syncDatabase = async (force = false) => {
  try {
    // Sincronizar modelos base primero
    await User.sync({ force });
    await Category.sync({ force });
    await Product.sync({ force });
    
    // Luego los que dependen de otros
    await Cart.sync({ force });
    await Order.sync({ force });
    await OrderItem.sync({ force });
    
    console.log(`✅ Tablas ${force ? 'recreadas' : 'sincronizadas'} correctamente`);
  } catch (error) {
    console.error('❌ Error sincronizando BD:', error.message);
  }
};

module.exports = {
  sequelize,
  User,
  Category,
  Product,
  Cart,
  Order,
  OrderItem,
  syncDatabase
};