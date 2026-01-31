fetch("https://dummyjson.com/products")
  .then((res) => res.json())
  .then((data) => {
    const container = document.getElementById("products-container");
    if (!container) return;
    container.innerHTML = "";

    data.products.forEach((product) => {
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
  })
  .catch((error) => console.error("Error", error));

const searchbtn = document.getElementById("sbtn");
const searchInput = document.getElementById("search");
const viewHistoryBtn = document.getElementById("viewHistory");
const viewAllBtn = document.getElementById("viewAll");

if (searchbtn && searchInput) {
  searchbtn.addEventListener("click", () => {
    const query = searchInput.value.trim();
    if (!query) return;

    try {
      const key = "searchHistory";
      const history = JSON.parse(localStorage.getItem(key)) || [];
      history.push({ query, time: Date.now() });
      localStorage.setItem(key, JSON.stringify(history));
    } catch (e) {
      console.error("Failed to save search history", e);
    }

    window.location.href = `search.html?q=${encodeURIComponent(query)}`;
    searchInput.value = "";
  });
}

if (viewHistoryBtn) {
  viewHistoryBtn.addEventListener("click", () => {
    window.location.href = "history.html";
  });
}

if (viewAllBtn) {
  viewAllBtn.addEventListener("click", () => {
    window.location.href = "pagination.html";
  });
}