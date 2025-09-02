const Cart = require('../models/Cart');
const CartItem = require('../models/CartItem');
const Product = require('../models/Product');

// Obtener o crear carrito activo del usuario
const getOrCreateActiveCart = async (userId) => {
  let cart = await Cart.findOne({
    where: { userId }
  });

  if (!cart) {
    cart = await Cart.create({
      userId
    });
  }

  return cart;
};

// GET /api/cart - Ver carrito actual
const getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const cart = await Cart.findOne({
      where: { userId }
    });

    if (!cart) {
      return res.json({
        success: true,
        data: {
          items: [],
          total: 0,
          itemCount: 0
        }
      });
    }

    // Obtener items del carrito por separado
    const cartItems = await CartItem.findAll({
      where: { cartId: cart.id },
      include: [{
        model: Product,
        as: 'product',
        attributes: ['id', 'name', 'price', 'stock', 'imageUrl']
      }]
    });

    // Calcular totales
    const total = cartItems.reduce((sum, item) => {
      return sum + (parseFloat(item.priceAtTimeAdded) * item.quantity);
    }, 0);

    const itemCount = cartItems.reduce((sum, item) => {
      return sum + item.quantity;
    }, 0);

    res.json({
      success: true,
      data: {
        id: cart.id,
        items: cartItems,
        total: parseFloat(total.toFixed(2)),
        itemCount
      }
    });
  } catch (error) {
    console.error('Error getting cart:', error);
    res.status(500).json({
      success: false,
      error: 'Error interno del servidor'
    });
  }
};

// POST /api/cart/add - Agregar producto al carrito
const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity = 1 } = req.body;

    // Validaciones básicas
    if (!productId) {
      return res.status(400).json({
        success: false,
        error: 'productId es requerido'
      });
    }

    if (!Number.isInteger(quantity) || quantity < 1) {
      return res.status(400).json({
        success: false,
        error: 'La cantidad debe ser un número entero mayor a 0'
      });
    }

    // Verificar que el producto existe
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Producto no encontrado'
      });
    }

    // Verificar stock disponible
    if (product.stock === 0) {
      return res.status(409).json({
        success: false,
        error: 'Producto sin stock disponible'
      });
    }

    // Obtener o crear carrito activo
    const cart = await getOrCreateActiveCart(userId);

    // Verificar si ya existe este producto en el carrito
    let cartItem = await CartItem.findOne({
      where: {
        cartId: cart.id,
        productId
      }
    });

    let finalQuantity = quantity;
    let isUpdate = false;

    if (cartItem) {
      // Ya existe, incrementar cantidad
      finalQuantity = cartItem.quantity + quantity;
      isUpdate = true;
    }

    // Ajustar cantidad si excede el stock
    if (finalQuantity > product.stock) {
      finalQuantity = product.stock;
    }

    if (cartItem) {
      // Actualizar item existente
      cartItem.quantity = finalQuantity;
      await cartItem.save();
    } else {
      // Crear nuevo item
      cartItem = await CartItem.create({
        cartId: cart.id,
        productId,
        quantity: finalQuantity,
        priceAtTimeAdded: product.price
      });
    }

    // Cargar el item con el producto para la respuesta
    await cartItem.reload({
      include: [{
        model: Product,
        as: 'product',
        attributes: ['id', 'name', 'price', 'stock', 'imageUrl']
      }]
    });

    const message = finalQuantity < quantity 
      ? `Solo se agregaron ${finalQuantity} unidades (stock limitado)`
      : isUpdate 
        ? `Cantidad actualizada a ${finalQuantity} unidades`
        : 'Producto agregado al carrito';

    res.status(201).json({
      success: true,
      message,
      data: cartItem
    });

  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({
      success: false,
      error: 'Error interno del servidor'
    });
  }
};

// PUT /api/cart/item/:id - Modificar cantidad de un item
const updateCartItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const itemId = req.params.id;
    const { quantity } = req.body;

    // Validaciones
    if (!Number.isInteger(quantity) || quantity < 1) {
      return res.status(400).json({
        success: false,
        error: 'La cantidad debe ser un número entero mayor a 0'
      });
    }

    // Encontrar el item y verificar que pertenece al usuario
    const cartItem = await CartItem.findOne({
      where: { id: itemId },
      include: [{
        model: Cart,
        as: 'cart',
        where: { userId }
      }, {
        model: Product,
        as: 'product'
      }]
    });

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        error: 'Item del carrito no encontrado'
      });
    }

    // Verificar stock disponible
    let finalQuantity = quantity;
    if (quantity > cartItem.product.stock) {
      finalQuantity = cartItem.product.stock;
    }

    cartItem.quantity = finalQuantity;
    await cartItem.save();

    const message = finalQuantity < quantity 
      ? `Cantidad ajustada a ${finalQuantity} (stock limitado)`
      : 'Cantidad actualizada correctamente';

    res.json({
      success: true,
      message,
      data: cartItem
    });

  } catch (error) {
    console.error('Error updating cart item:', error);
    res.status(500).json({
      success: false,
      error: 'Error interno del servidor'
    });
  }
};

// DELETE /api/cart/item/:id - Eliminar item específico
const removeCartItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const itemId = req.params.id;

    // Primero encontrar el cart item y verificar que pertenece al usuario
    const cartItem = await CartItem.findOne({
      where: { id: itemId },
      include: [{
        model: Cart,
        as: 'cart',
        where: { userId }
      }]
    });

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        error: 'Item del carrito no encontrado'
      });
    }

    // Eliminar el item
    await cartItem.destroy();

    res.json({
      success: true,
      message: 'Producto eliminado del carrito'
    });

  } catch (error) {
    console.error('Error removing cart item:', error);
    res.status(500).json({
      success: false,
      error: 'Error interno del servidor'
    });
  }
};

// DELETE /api/cart - Vaciar carrito completo
const clearCart = async (req, res) => {
  try {
    const userId = req.user.id;

    // Encontrar carrito del usuario
    const cart = await Cart.findOne({
      where: { userId }
    });

    if (!cart) {
      return res.json({
        success: true,
        message: 'El carrito ya está vacío'
      });
    }

    // Eliminar todos los items del carrito
    await CartItem.destroy({
      where: { cartId: cart.id }
    });

    res.json({
      success: true,
      message: 'Carrito vaciado correctamente'
    });

  } catch (error) {
    console.error('Error clearing cart:', error);
    res.status(500).json({
      success: false,
      error: 'Error interno del servidor'
    });
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart
};