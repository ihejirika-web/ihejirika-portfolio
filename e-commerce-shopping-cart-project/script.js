const addCartButtons = document.querySelectorAll(".add-cart-btn"),
  cartCount = document.querySelector("#cart-count"),
  cartItems = document.querySelector("#cart-items"),
  totalPrice = document.querySelector("#total-price"),
  shopButton = document.querySelector("#shop-btn"),
  productsSection = document.querySelector("#products"),
  clearCartButton = document.querySelector("#clear-cart-btn"),
  checkoutButton = document.querySelector("#checkout-btn"),
  searchInput = document.querySelector("#search-input"),
  productCards = document.querySelectorAll(".product-card");
let cart = JSON.parse(localStorage.getItem("cart")) || [];
cart.forEach((item) => {
  if (!item.quantity) item.quantity = 1;
});
function updateCart() {
  cartItems.innerHTML = "";
  let total = 0;
  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Your cart is empty.</p>";
  }
  cart.forEach((item, index) => {
    total += item.price * item.quantity;
    cartItems.innerHTML += `<div class="cart-item"><div><p>${item.name}</p><p>$${item.price} each</p><p><strong>Subtotal: $${item.price * item.quantity}</strong></p></div><div class="quantity-controls"><button class="decrease-btn" data-index="${index}">−</button><span>${item.quantity}</span><button class="increase-btn" data-index="${index}">+</button></div><button class="remove-btn" data-index="${index}">❌</button></div>`;
  });
  cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
  totalPrice.textContent = "$" + total;
  localStorage.setItem("cart", JSON.stringify(cart));
  document.querySelectorAll(".increase-btn").forEach((button) => {
    button.addEventListener("click", () => {
      cart[button.dataset.index].quantity++;
      updateCart();
    });
  });
  document.querySelectorAll(".decrease-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const index = button.dataset.index;
      cart[index].quantity--;
      if (cart[index].quantity <= 0) cart.splice(index, 1);
      updateCart();
    });
  });
  document.querySelectorAll(".remove-btn").forEach((button) => {
    button.addEventListener("click", () => {
      cart.splice(button.dataset.index, 1);
      updateCart();
    });
  });
}
addCartButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const productCard = button.closest(".product-card"),
      productName = productCard.querySelector("h3").textContent,
      productPrice = productCard.querySelector("p").textContent,
      price = Number(productPrice.replace("$", "")),
      existingProduct = cart.find((item) => item.name === productName);
    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      cart.push({ name: productName, price: price, quantity: 1 });
    }
    updateCart();
  });
});
if (shopButton && productsSection) {
  shopButton.addEventListener("click", () => {
    productsSection.scrollIntoView({ behavior: "smooth" });
  });
}
if (searchInput) {
  searchInput.addEventListener("keyup", () => {
    const searchText = searchInput.value.toLowerCase();
    productCards.forEach((card) => {
      const productName = card.querySelector("h3").textContent.toLowerCase();
      card.style.display = productName.includes(searchText) ? "block" : "none";
    });
  });
}
if (clearCartButton) {
  clearCartButton.addEventListener("click", () => {
    cart = [];
    updateCart();
  });
}
if (checkoutButton) {
  checkoutButton.addEventListener("click", () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
    } else {
      alert("Checkout feature coming soon!");
    }
  });
}
updateCart();
