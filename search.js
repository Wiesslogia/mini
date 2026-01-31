let param = new URLSearchParams(window.location.search);
let query = param.get("q");

fetch("https://dummyjson.com/products")
  .then((res) => res.json())
  .then((data) => {
    let products = data.products;
    const header = document.getElementById("search-query");
    const q = query ? query.trim() : "";

    if (header) {
      header.textContent = q ? `Results for "${q}"` : "All Products";
    }

    let filtered = products;
    if (q) {
      filtered = products.filter(
        (p) =>
          p.title.toLowerCase().includes(q.toLowerCase()) ||
          (p.description && p.description.toLowerCase().includes(q.toLowerCase()))
      );
    }

    const container = document.getElementById("products-container");
    container.innerHTML = "";

    if (!filtered || filtered.length === 0) {
      container.innerHTML = `<div class="no-results"><p>No products found${q ? ` for "${q}"` : ""}.</p></div>`;
      return;
    }

    filtered.forEach((product) => {
      container.innerHTML += `
        <a class="product-link" href="product.html?id=${product.id}" style="text-decoration:none;color:inherit">
          <div class="product-card">
            <img src="${product.thumbnail}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p><b>Price:</b> $${product.price}</p>
            <p><b>Category:</b> ${product.category}</p>
          </div>
        </a>
      `;
    });
  })
  .catch((error) => console.error("Error fetching products:", error));