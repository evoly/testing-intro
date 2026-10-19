function addToCart(cart, product, quantity) {
  if (quantity <= 0) throw new RangeError("количество должно быть больше 0");
  
  const cartItem = cart.find(item => item.id === product.id);  

  if (cartItem) {
    const total = cartItem.quantity + quantity;    
    if (total > product.stock) throw new RangeError("недостаточно товара на складе"); // todo add name
    cartItem.quantity = total;
  } else {
    if (quantity > product.stock) throw new RangeError("недостаточно товара на складе");
    cart.push({ ...product, quantity });
  };
  return cart;
}

function changeQuantity(cart, id, quantity) {
  if (quantity <= 0) throw new RangeError("Количество должно быть больше 1");

  const cartItem = cart.find(item => item.id === id);
  if (!cartItem) return cart;

  if (quantity > cartItem.stock) throw new RangeError("Недостаточно товара на складе");

  cartItem.quantity = quantity;

  return cart;
}

function removeFromCart(cart, id) {
  return cart.filter(item => item.id !== id);
}

function calculateCartSubtotal(cart) {  
  return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
}

function calculateOrderTotal(cart, inputPromo = '') {
  const subtotal = calculateCartSubtotal(cart);
  const isPromo = inputPromo.toUpperCase() === 'SAVE10';
  const delivery = subtotal >= 50000 ? 0 : 30000;
  const discount = isPromo && subtotal >= 20000 ? subtotal * 0.1 : 0;
  const total = subtotal - discount + delivery;

  return { discount, subtotal, delivery, total}
}

const cartApi = { addToCart, changeQuantity, removeFromCart, calculateCartSubtotal, calculateOrderTotal };

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;
