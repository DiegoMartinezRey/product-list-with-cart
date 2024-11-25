const buttonCartElement = document.getElementById("button-cart");

let products = [
  {
    id: 1,
    name: "waffle",
    price: 0,
    quantity: 0,
  },
  {
    id: 2,
    name: "brulee",
    price: 0,
    quantity: 0,
  },
  {
    id: 3,
    name: "macaron",
    price: 0,
    quantity: 0,
  },
  {
    id: 4,
    name: "tiramisu",
    price: 0,
    quantity: 0,
  },
  {
    id: 5,
    name: "baklava",
    price: 0,
    quantity: 0,
  },
  {
    id: 6,
    name: "meringue",
    price: 0,
    quantity: 0,
  },
  {
    id: 7,
    name: "cake",
    price: 0,
    quantity: 0,
  },
  {
    id: 8,
    name: "brownie",
    price: 0,
    quantity: 0,
  },
  {
    id: 9,
    name: "cotta",
    price: 0,
    quantity: 0,
  },
];

const addItemToCart = (e) => {
  const productName = e.currentTarget.getAttribute("data-id");
  const buttonCartAddRemove = document.querySelector(
    `.button-cart-add-remove[data-id="${productName}"]`
  );

  if (buttonCartAddRemove) {
    buttonCartAddRemove.classList.remove("button-disable");
  }

  incrementProduct(e);
};

const incrementProduct = (e) => {
  const productName = e.currentTarget.getAttribute("data-id");
  const quantityText = document.querySelector(
    `.quantity[data-id="${productName}"]`
  );

  const product = products.find((item) => item.name === productName);

  product.quantity++;
  quantityText.textContent = product.quantity;
};

const decrementProduct = (e) => {
  const productName = e.currentTarget.getAttribute("data-id");
  const quantityText = document.querySelector(
    `.quantity[data-id="${productName}"]`
  );
  const buttonCartAddRemove = document.querySelector(
    `.button-cart-add-remove[data-id="${productName}"]`
  );

  const product = products.find((item) => item.name === productName);
  product.quantity--;
  quantityText.textContent = product.quantity;

  if (product.quantity < 1) {
    buttonCartAddRemove.classList.add("button-disable");
  }
};

document.querySelectorAll(".button-cart").forEach((button) => {
  button.addEventListener("click", addItemToCart);
});
document.querySelectorAll(".increment-icon").forEach((button) => {
  button.addEventListener("click", incrementProduct);
});
document.querySelectorAll(".decrement-icon").forEach((button) => {
  button.addEventListener("click", decrementProduct);
});
