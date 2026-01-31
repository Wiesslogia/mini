let currentPage = 1;
let itemsPerPage = 8;
let allProducts = [];

const container = document.getElementById("product-list");
const prevbtn = document.getElementById("previousBtn");
const nextbtn = document.getElementById("nextBtn");
const pageInfo = document.getElementById("pageInfo");

fetch("https://dummyjson.com/products")
  .then((res) => res.json())
  .then((data) => {
    allProducts = data.products || [];

    if (allProducts.length === 0) {
      container.innerHTML = "<p>No product available</p>";
      prevbtn.disabled = true;
      nextbtn.disabled = true;
      return;
    }

    renderPage();
  })
  .catch((error) => console.error("Error:", error));

function renderPage() {
  container.innerHTML = "";

  let start = (currentPage - 1) * itemsPerPage;
  let end = start + itemsPerPage;

  let pageItems = allProducts.slice(start, end);

  pageItems.forEach((product) => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${product.thumbnail}" width="100%" alt="${product.title}">
      <h3>${product.title}</h3>
      <p><b>Price:</b> $${product.price}</p>
    `;

    card.addEventListener("click", () => {
      window.location.href = `product.html?id=${product.id}`;
    });

    container.appendChild(card);
  });

  const totalPages = Math.ceil(allProducts.length / itemsPerPage);

  if (pageInfo) pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;

  prevbtn.disabled = currentPage === 1;
  nextbtn.disabled = currentPage === totalPages;
}

if (prevbtn) {
  prevbtn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      renderPage();
    }
  });
}

if (nextbtn) {
  nextbtn.addEventListener("click", () => {
    const totalPages = Math.ceil(allProducts.length / itemsPerPage);
    if (currentPage < totalPages) {
      currentPage++;
      renderPage();
    }
  });
}