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

  document.querySelectorAll(".qa-card .qa-question").forEach((button) => {
    const card = button.closest(".qa-card");
    if (!card) return;

    button.addEventListener("click", () => {
      const isOpen = card.classList.toggle("is-open");
      button.setAttribute("aria-expanded", String(isOpen));
    });
  });

  document.querySelectorAll(".qa-gate[data-progress-key]").forEach((panel) => {
    const storageKey = `exam-prep-progress:${panel.getAttribute("data-progress-key")}`;
    const checkboxes = Array.from(panel.querySelectorAll("input[data-gate-id]"));
    const status = panel.querySelector(".qa-gate-status");
    let progress = {};

    try {
      progress = JSON.parse(window.localStorage.getItem(storageKey) || "{}");
    } catch (error) {
      progress = {};
    }

    const writeProgress = () => {
      try {
        window.localStorage.setItem(storageKey, JSON.stringify(progress));
      } catch (error) {
        // Progress is helpful but not required; private browsing can block storage.
      }
    };

    const updateStatus = () => {
      const doneCount = checkboxes.filter((checkbox) => checkbox.checked).length;
      panel.classList.toggle("is-complete", doneCount === checkboxes.length);
      if (!status) return;
      status.textContent =
        doneCount === checkboxes.length
          ? "本节已过关：可以进入下一节，或回题型页做同类真题。"
          : `还差 ${checkboxes.length - doneCount} 个门槛：不要急着跳下一节，先补没有勾上的部分。`;
    };

    checkboxes.forEach((checkbox) => {
      const id = checkbox.getAttribute("data-gate-id");
      checkbox.checked = Boolean(progress[id]);
      checkbox.addEventListener("change", () => {
        progress[id] = checkbox.checked;
        writeProgress();
        updateStatus();
      });
    });

    updateStatus();
  });
})();
