class Product {
  constructor(id, name, price) {
    this.id = id;
    this.name = name;
    this.price = price;
  }
}

const log = console.log;

window.addEventListener('load', () => {
  const myForm = document.getElementById('myForm');
  const submitButton = document.getElementById('submitButton');
  const updateProductsButton = document.getElementById('updateProducts');
  const wrapper = document.getElementById('wrapper');

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
      log(data);
    } else {
      alert("Error: " + response.status);
    }
  }

  function renderTable() {
    new gridjs.Grid({
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

  submitButton.addEventListener('click', () => {
    const result = generateProduct();

    if (result.product) {
      addProduct(result.product);
      renderTable();
    } else {
      alert(result.msg);
    }
  });

  updateProductsButton.addEventListener('click', () => {
    renderTable();
  });

  renderTable();
});