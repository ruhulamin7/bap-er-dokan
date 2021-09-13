// loading all pdoducts
const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// display all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `
      <div class="single-product text-muted">
        <div>
          <img class="product-image" src=${image}></img>
        </div>
        <h5>${product.title}</h5>
        <p>Category: ${product.category}</p>
        <p class="rating text-warning rounded-pill badge bg-secondary"> 
        <i class="fas fs-6 fa-star"></i> ${product.rating.rate} Rated by ${product.rating.count} Peoples</p>
        <h4 class="text-success">Price: $ ${product.price}</h4>
        <button onclick="addToCart(${product.id},${product.price})"       id="addToCart-btn" class="buy-now btn btn-outline-success">Add to cart</button>
        <button action="#details-container" type="button" id="details-btn" class="btn btn-secondary" onclick="productDetails('${product.id}')" >Details</button>
      </div>
      `;
    document.getElementById("all-products").appendChild(div);
  };
};

// loading single product details data 
const productDetails = (id) => {
  const url = `https://fakestoreapi.com/products/${id}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showDetails(data));
};

// show single product details in UI 
const showDetails = (product) => {
  const detailsContainer = document.getElementById('details-container');
  // clearing product details container
  detailsContainer.textContent = ''
  div = document.createElement('div')
  div.classList.add('row');
  div.innerHTML = `
    <div class="card mb-3 mx-auto text-muted" style="max-width: 740px;">
      <div class="row g-0">
          <div class="col-md-4">
            <img src="${product.image}" class="img-fluid rounded-start" alt="...">
          </div>
        <div class="col-md-8">
          <div class="card-body">
            <h4 class="card-title">${product.title}</h4>
            <p class="card-text"><b>Product Details:</b> ${product.description}</p>
            <h4 class="text-success">Price: $ ${product.price}</h4>
            <button onclick="addToCart(${product.id},${product.price})"       id="addToCart-btn" class="buy-now btn btn-success">Add to cart</button>    
          </div>
        </div>
      </div>
    </div>
  `;
  window.location.href = "#details-container";
  detailsContainer.appendChild(div)
};

// product count and totaal price
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);
  updateTaxAndCharge();
  updateTotal()
  document.getElementById("total-Products").innerText = count;
};

// get elements inner text and convert to floating point
const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value.toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  };
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  };
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  };
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};
