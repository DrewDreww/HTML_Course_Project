let cartCount = document.getElementById("cart-count");
let cartButton = document.getElementById("cart-button");
let cartItems = [];

cartButton.onclick = function() {
  if (cartItems.length === 0) {
    alert("Корзина пуста!");
  } else {
    let message = "Содержимое корзины:\n";
    let totalPrice = 0;
    for (let i = 0; i < cartItems.length; i++) {
      let item = cartItems[i];
      message += `${i + 1}. ${item.name} - ${item.price} руб.\n`;
      totalPrice += item.price;
    }
    message += `Итого: ${totalPrice} руб.`;
    alert(message);
  }
};

let addToCartButtons = document.getElementsByClassName("add-to-cart");

for (let i = 0; i < addToCartButtons.length; i++) {
  addToCartButtons[i].onclick = function() {
    let name = this.getAttribute("data-name");
    let price = Number(this.getAttribute("data-price"));

    alert(`Вы добавили "${name}" в корзину за ${price} руб.`);
    cartCount.innerHTML = Number(cartCount.innerHTML) + 1;
    cartItems.push({ name: name, price: price });
  };
}

let deleteFromCartButtons = document.getElementsByClassName("delete-from-cart");

for (let i = 0; i < deleteFromCartButtons.length; i++) {
  deleteFromCartButtons[i].onclick = function() {
    let index = Number(this.getAttribute("data-index"));
    let item = cartItems[index];
    if (confirm(`Вы уверены, что хотите удалить "${item.name}" из корзины?`)) {
      cartItems.splice(index, 1);
      updateCart();
      cartCount.innerHTML = Number(cartCount.innerHTML) - 1;
    }
  };
}

function updateCart() {
  let cartList = document.getElementById("cart-list");
  let totalPrice = 0;
  cartList.innerHTML = "";
  cartItems.sort(function(a, b) {
    return a.price - b.price;
  });
  for (let i = 0; i < cartItems.length; i++) {
    let item = cartItems[i];
    let li = document.createElement("li");
    let spanName = document.createElement("span");
    spanName.innerHTML = item.name;
    let spanPrice = document.createElement("span");
    spanPrice.innerHTML = `${item.price} руб.`;
    let button = document.createElement("button");
    button.innerHTML = "Удалить";
    button.setAttribute("data-index", i);
    button.className = "delete-from-cart";
    button.onclick = function() {
      if (confirm(`Вы уверены, что хотите удалить "${item.name}" из корзины?`)) {
        cartItems.splice(i, 1);
        updateCart();
        cartCount.innerHTML = Number(cartCount.innerHTML) - 1;
      }
    };
    li.appendChild(spanName);
    li.appendChild(document.createTextNode(" - "));
    li.appendChild(spanPrice);
    li.appendChild(document.createTextNode(" "));
    li.appendChild(button);
    cartList.appendChild(li);
    totalPrice += item.price;
  }
  let cartTotal = document.getElementById("cart-total");
  cartTotal.innerHTML = totalPrice;
}
