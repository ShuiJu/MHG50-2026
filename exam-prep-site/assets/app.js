(function () {
  const searchInputs = document.querySelectorAll("[data-keyword-search]");

  searchInputs.forEach((input) => {
    const targetSelector = input.getAttribute("data-keyword-search");
    const items = document.querySelectorAll(targetSelector);

    input.addEventListener("input", () => {
      const query = input.value.trim().toLowerCase();
      items.forEach((item) => {
        const text = item.textContent.toLowerCase();
        const keywords = (item.getAttribute("data-keywords") || "").toLowerCase();
        item.classList.toggle("hidden", query.length > 0 && !text.includes(query) && !keywords.includes(query));
      });
    });
  });

  document.querySelectorAll("[data-copy-template]").forEach((button) => {
    button.addEventListener("click", async () => {
      const target = document.querySelector(button.getAttribute("data-copy-template"));
      if (!target || !navigator.clipboard) return;
      await navigator.clipboard.writeText(target.innerText);
      const oldText = button.textContent;
      button.textContent = "已复制";
      window.setTimeout(() => {
        button.textContent = oldText;
      }, 1200);
    });
  });
})();
