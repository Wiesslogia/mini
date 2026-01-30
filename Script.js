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



  const searchbtn=document.getElementById("sbtn");
  const searchInput= document.getElementById("search");

  searchbtn.addEventListener("click", ()=>{
    const query = searchInput.value;
    if(!query) return;
    console.log(query);
    window.location.href = `search.html?q=${encodeURIComponent(query)}`;
    searchInput.value="";
  });

  // Allow Enter key to trigger search
  searchInput.addEventListener("keydown", (e)=>{
    if(e.key === "Enter"){
      e.preventDefault();
      searchbtn.click();
    }
  });


