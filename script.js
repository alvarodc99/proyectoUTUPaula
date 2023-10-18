const addToCartBtn = document.getElementsByClassName('btn-outline-warning');
const cartProducts = document.getElementsByClassName('cartContent')[0];

for (let i = 0; i < addToCartBtn.length; i++) {
  const btn = addToCartBtn[i];
  btn.addEventListener('click', addToCartClicked);
}

function addToCartClicked(event) {
  const button = event.target;
  const menuItem = button.parentElement.parentElement;
  const img = menuItem.getElementsByClassName('product-image')[0].src;
  const title = menuItem.getElementsByClassName('title')[0].innerText;
  const priceText = menuItem.getElementsByClassName('price')[0].innerText;

  const price = parseFloat(priceText.replace('$', ''));

  addItemToCart(img, title, price);
}

function calculateSubtotal(price, quantity) {
  if (isNaN(quantity)) {
    quantity = 1;
  }
  return price * quantity;
}

function addItemToCart(img, title, price) {
  const cartItem = document.createElement('div');
  cartItem.classList.add('list-group-item', 'background-dark', 'd-row', 'cartProduct', 'justify-content-between', 'container');
  var cartItemContent = `
    <div class="row">
      <div class="col-lg-4 col-sm-6 col-md-6">
        <img src="${img}" class="img-thumbnail">
      </div>
      <div class="col-lg-8 col-sm-6 col-md-6 ps-2">
        <h3 class="pt-2 title">${title} - $${price}</h3>
      </div>
    </div>
    <div class="row pt-2">
      <div>
        <!-- Rest of your cart item content -->
        <label for="quantity" class="pe-2">Cantidad: </label>
        <input type="number" value="1" name="quantity" min="1" max="99" class="quantity-input" />
        <span class="subtotal ms-2">$${price}</span>
        <button class="btn btn-outline-danger ms-5">Eliminar</button>
      </div>
    </div>
  `;
  cartItem.innerHTML = cartItemContent;
  cartProducts.appendChild(cartItem);

  const quantityInput = cartItem.querySelector('.quantity-input');
  const subtotalElement = cartItem.querySelector('.subtotal');

  quantityInput.addEventListener('input', function () {
    const selectedQuantity = parseInt(quantityInput.value);
    if (isNaN(selectedQuantity) || selectedQuantity < 1) {
      quantityInput.value = 1;
    }
    const subtotal = calculateSubtotal(price, selectedQuantity);
    subtotalElement.textContent = `$${subtotal}`;
    updateTotalPrice();
  });

  const removeButton = cartItem.querySelector('.btn-outline-danger');
  removeButton.addEventListener('click', function () {
    cartProducts.removeChild(cartItem);
    updateTotalPrice();
  });

  updateTotalPrice();
}

function updateTotalPrice() {
  const subtotals = document.querySelectorAll('.subtotal');
  let totalPrice = 0;

  subtotals.forEach((subtotal) => {
    totalPrice += parseFloat(subtotal.textContent.replace('$', ''));
  });

  const totalPriceElement = document.getElementById('totalPrice');
  totalPriceElement.textContent = `$${totalPrice}`;
}
