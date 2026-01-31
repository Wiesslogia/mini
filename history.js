const key = "searchHistory";
const container = document.getElementById("historyList");
const clearBtn = document.getElementById("clearHistory");

function renderHistory() {
  container.innerHTML = "";
  const raw = localStorage.getItem(key);
  const history = raw ? JSON.parse(raw) : [];

  if (!history || history.length === 0) {
    container.innerHTML = "<p style='padding:12px'>No search history.</p>";
    return;
  }

  history
    .slice()
    .sort((a, b) => b.time - a.time)
    .forEach((item) => {
      const div = document.createElement("div");
      div.className = "history-item";
      const date = new Date(item.time);
      div.innerHTML = `<a href="search.html?q=${encodeURIComponent(item.query)}">${item.query}</a> <span style="color:#666"> — ${date.toLocaleString()}</span>`;
      container.appendChild(div);
    });
}

if (clearBtn) {
  clearBtn.addEventListener("click", () => {
    localStorage.removeItem(key);
    renderHistory();
  });
}

renderHistory();