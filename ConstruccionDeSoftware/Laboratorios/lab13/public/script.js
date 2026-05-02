// ===================== CLASE PRODUCTO =====================
class Product {
  constructor(id, name, price) {
    this.id = id;
    this.name = name;
    this.price = price;
  }
}

const log = console.log;

window.addEventListener('load', () => {
  log("Page loaded");

  const myForm = document.getElementById('myForm');
  const submitButton = document.getElementById('submitButton');
  const updateProductsButton = document.getElementById('updateProducts');
  const wrapper = document.getElementById('wrapper');

  let gridTable;

  function generateProduct() {
    const id = myForm.elements['id'].value;
    const name = myForm.elements['name'].value;
    const price = myForm.elements['price'].value;

    let msg = "Created product";
    let product = null;

    if (!id) msg = "Id is empty";
    if (!name) msg = "Name is empty";
    if (!price) msg = "Price is empty";

    if (msg === "Created product") {
      product = new Product(id, name, price);
    }

    return { product, msg };
  }

  async function addProduct(product) {
    const response = await fetch('/add_product', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    });

    if (response.ok) {
      const data = await response.json();
      log("Added:", data);
    } else {
      alert("Error " + response.status);
    }
  }

  async function loadProducts() {
    const response = await fetch('/products');

    if (response.ok) {
      const json = await response.json();
      wrapper.innerHTML = JSON.stringify(json.products);
    } else {
      alert("HTTP Error: " + response.status);
    }
  }

  function renderTable() {
    if (gridTable) gridTable.destroy();

    gridTable = new gridjs.Grid({
      columns: ["Id", "Name", "Price"],
      search: true,
      sort: true,
      pagination: true,
      server: {
        url: "/products",
        then: data => data.products
      }
    }).render(wrapper);
  }

  submitButton.addEventListener('click', (event) => {
    event.preventDefault();

    const result = generateProduct();

    if (result.product) {
      addProduct(result.product);
      loadProducts();
      renderTable();
    } else {
      alert(result.msg);
    }
  });

  updateProductsButton.addEventListener('click', () => {
    loadProducts();
    renderTable();
  });

  // setInterval(() => {
  //   loadProducts();
  //   renderTable();
  // }, 5000);

  
  renderTable();
});