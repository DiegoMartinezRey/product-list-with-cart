const rootStyles = document.documentElement.style;

const buttonCartElement = document.getElementById("button-cart");

const containerCartElement = document.getElementById("container-cart");
const numberOfItemsElement = document.getElementById("number-of-items");
const containerEmptyCartElement = document.getElementById(
  "container-empty-cart"
);
const containerItemsList = document.getElementById("container-items-list");
const itemsListElement = document.getElementById("items-list");

const totalPriceElement = document.getElementById("total-price");

const blackoutElement = document.getElementById("blackout");
const buttonConfirmOrderElement = document.getElementById(
  "button-confirm-order"
);
const resumeItemsElement = document.getElementById("container-resume-list");

const products = [
  {
    id: 1,
    name: "id-waffle",
    nameToShow: "Waffle with Berries",
    price: 6.5,
    quantity: 0,
    imgThumbnail: "/assets/images/image-waffle-thumbnail.jpg",
  },
  {
    id: 2,
    name: "id-creme",
    nameToShow: "Vanilla Bean Crème Brûlée",
    price: 7.0,
    quantity: 0,
    imgThumbnail: "/assets/images/image-creme-brulee-thumbnail.jpg",
  },
  {
    id: 3,
    name: "id-macaron",
    nameToShow: "Macaron Mix of Five",
    price: 8.0,
    quantity: 0,
    imgThumbnail: "/assets/images/image-macaron-thumbnail.jpg",
  },
  {
    id: 4,
    name: "id-tiramisu",
    nameToShow: "Classic Tiramisu",
    price: 5.5,
    quantity: 0,
    imgThumbnail: "/assets/images/image-tiramisu-thumbnail.jpg",
  },
  {
    id: 5,
    name: "id-baklava",
    nameToShow: "Pistachio Baklava",
    price: 4.0,
    quantity: 0,
    imgThumbnail: "/assets/images/image-baklava-thumbnail.jpg",
  },
  {
    id: 6,
    name: "id-pie",
    nameToShow: "Lemon Meringue Pie",
    price: 5,
    quantity: 0,
    imgThumbnail: "/assets/images/image-meringue-thumbnail.jpg",
  },
  {
    id: 7,
    name: "id-cake",
    nameToShow: "Red Velvet Cake",
    price: 4.5,
    quantity: 0,
    imgThumbnail: "/assets/images/image-cake-thumbnail.jpg",
  },
  {
    id: 8,
    name: "id-brownie",
    nameToShow: "Salted Caramel Brownie",
    price: 5.5,
    quantity: 0,
    imgThumbnail: "/assets/images/image-brownie-thumbnail.jpg",
  },
  {
    id: 9,
    name: "id-cotta",
    nameToShow: "Vanilla Panna Cotta",
    price: 6.5,
    quantity: 0,
    imgThumbnail: "/assets/images/image-panna-cotta-thumbnail.jpg",
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

  updateTotalItems(product, true);
};

const decrementProduct = (e) => {
  const productName = e.currentTarget.getAttribute("data-id");
  const quantityText = document.querySelector(
    `.quantity[data-id="${productName}"]`
  );
  const buttonCartAddRemove = document.querySelector(
    `.button-cart-add-remove[data-id="${productName}"]`
  );

  const product = products.find((product) => product.name === productName);
  product.quantity--;
  quantityText.textContent = product.quantity;

  if (product.quantity < 1) {
    buttonCartAddRemove.classList.add("button-disable");
  }

  updateTotalItems(product, false);
};

const updateTotalItems = (product, isIncreasing) => {
  const totalItems = products.reduce((acc, product) => {
    return acc + product.quantity;
  }, 0);
  numberOfItemsElement.textContent = totalItems;

  if (totalItems === 0) {
    containerEmptyCartElement.classList.remove("disable");
    containerItemsList.classList.add("disable");
  } else {
    containerEmptyCartElement.classList.add("disable");
    containerItemsList.classList.remove("disable");
  }

  const existingItem = document.querySelector(`li[data-id="${product.name}"]`);
  if (isIncreasing) {
    if (!existingItem) {
      const newItem = document.createElement("li");
      newItem.classList.add("product-in-cart");
      newItem.setAttribute("data-id", product.name);

      newItem.innerHTML = `
      <div class="text-product">
        <p>${product.nameToShow}</p>
        <div class="text-price-quantity">
          <p>${product.quantity}x</p>
          <p>@ $${product.price.toFixed(2)}</p>
          <p>$${(product.quantity * product.price).toFixed(2)}</p>
        </div>
      </div>
      <div>
        <img src="/assets/images/icon-remove-item.svg" alt="Remove item" />
      </div>
    `;

      itemsListElement.append(newItem);
    } else {
      const quantityElement = existingItem.querySelector(
        ".text-price-quantity p:nth-child(1)"
      );
      const totalElement = existingItem.querySelector(
        ".text-price-quantity p:nth-child(3)"
      );

      quantityElement.textContent = `${product.quantity}x`;
      totalElement.textContent = `$${(product.quantity * product.price).toFixed(
        2
      )}`;
    }
  } else {
    if (existingItem) {
      if (product.quantity === 0) {
        existingItem.remove();
      } else {
        const quantityElement = existingItem.querySelector(
          ".text-price-quantity p:nth-child(1)"
        );
        const totalElement = existingItem.querySelector(
          ".text-price-quantity p:nth-child(3)"
        );

        quantityElement.textContent = `${product.quantity}x`;
        totalElement.textContent = `$${(
          product.quantity * product.price
        ).toFixed(2)}`;
      }
    }
  }

  const totalPrice = products.reduce((acc, product) => {
    return acc + product.price * product.quantity;
  }, 0);
  totalPriceElement.textContent = totalPrice.toFixed(2);
};

const getResumeProducts = () => {
  const resumeProducts = products.filter((product) => {
    return product.quantity > 0;
  });

  resumeProducts.map((resumeProduct) => {
    const newItem = document.createElement("li");
    newItem.classList.add("product-in-cart");
    newItem.setAttribute("data-id", resumeProduct.name);

    newItem.innerHTML = `
        <img
          src=${resumeProduct.imgThumbnail}
          alt=${resumeProduct.name}
        />
        <div class="text-product">
          <p>${resumeProduct.nameToShow}</p>
          <div class="text-price-quantity">
            <p>${resumeProduct.quantity}x</p>
            <p>@ $${resumeProduct.price.toFixed(2)}</p>
            <p>$${(resumeProduct.quantity * resumeProduct.price).toFixed(2)}</p>
          </div>
        </div>
      `;

    resumeItemsElement.append(newItem);
  });
};

const emptyResumeList = () => {
  resumeItemsElement.innerHTML = "";
};

const getResumeOrder = (e) => {
  if (e.currentTarget.dataset.blackout === "confirmOrder") {
    getResumeProducts();
    rootStyles.setProperty("--scale-blackout", "scale(100%)");
  } else if (e.target.dataset.blackout === "blackout") {
    emptyResumeList();
    rootStyles.setProperty("--scale-blackout", "scale(0)");
  }
};

const startNewOrder = () => {};

document.querySelectorAll(".button-cart").forEach((button) => {
  button.addEventListener("click", addItemToCart);
});
document.querySelectorAll(".increment-icon").forEach((button) => {
  button.addEventListener("click", incrementProduct);
});
document.querySelectorAll(".decrement-icon").forEach((button) => {
  button.addEventListener("click", decrementProduct);
});

buttonConfirmOrderElement.addEventListener("click", getResumeOrder);
blackoutElement.addEventListener("click", getResumeOrder);
