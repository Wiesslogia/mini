const params = new URLSearchParams(window.location.search);
const productId = params.get("id");
const details = document.getElementById("details");

if (!details) throw new Error("Missing #details element in product.html");

if (!productId) {
  details.innerHTML = "<p>No product id provided.</p>";
} else {
  fetch(`https://dummyjson.com/products/${productId}`)
    .then((res) => {
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json();
    })
    .then((product) => {
      details.innerHTML = "";
      const card = document.createElement("div");
      card.className = "card product-detail";

      const imagesHtml = (product.images || [])
        .map((src) => `<img src="${src}" alt="${product.title}" style="max-width:120px;margin:4px;border-radius:4px">`)
        .join("");

      card.innerHTML = `
        <div style="display:flex;gap:20px;align-items:flex-start;flex-wrap:wrap">
          <div style="flex:0 0 320px">
            <img src="${product.thumbnail}" alt="${product.title}" style="width:100%;border-radius:6px">
            <div style="margin-top:8px;display:flex;flex-wrap:wrap">${imagesHtml}</div>
          </div>
          <div style="flex:1;min-width:240px">
            <h2>${product.title}</h2>
            <p><b>Price:</b> $${product.price}</p>
            <p><b>Brand:</b> ${product.brand}</p>
            <p><b>Category:</b> ${product.category}</p>
            <p><b>Rating:</b> ${product.rating}</p>
            <p><b>Stock:</b> ${product.stock}</p>
            <p><b>Discount:</b> ${product.discountPercentage}%</p>
            <p style="margin-top:12px">${product.description}</p>
          </div>
        </div>
      `;
      details.appendChild(card);
    })
    .catch((err) => {
      details.innerHTML = `<p>Error loading product.</p>`;
      console.error(err);
    });
}