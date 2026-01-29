fetch("https://dummyjson.com/products")
  .then(res => res.json())
  .then(data => {
    var container = document.getElementById("products-container");
    container.innerHTML = "";
    data.products.forEach(product => {
      container.innerHTML += `
        <div>
          <img src="${product.thumbnail}" width="100%" >
          <h3>${product.title}</h3>
          <p><b>Price:</b> $${product.price}</p>
        </div>
      `;
    });
  })
  .catch(error => console.error("Error", error));
