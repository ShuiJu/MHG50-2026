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

  document.querySelectorAll("[data-fast-demo]").forEach((demo) => {
    const steps = Array.from(demo.querySelectorAll("[data-demo-step]"));
    if (steps.length === 0) return;

    const status = demo.querySelector("[data-demo-status]");
    const progress = demo.querySelector("[data-demo-progress]");
    const interval = Number(demo.getAttribute("data-demo-interval") || 2600);
    const autoplay = demo.getAttribute("data-demo-autoplay") === "true";
    let index = 0;

    const showStep = (nextIndex) => {
      index = nextIndex;
      steps.forEach((step, stepIndex) => {
        step.classList.toggle("is-active", stepIndex === index);
      });
      if (status) {
        status.textContent = `第 ${index + 1}/${steps.length} 步`;
      }
      if (progress) {
        progress.style.width = `${((index + 1) / steps.length) * 100}%`;
      }
    };

    showStep(0);
    if (autoplay) {
      window.setInterval(() => {
        showStep((index + 1) % steps.length);
      }, interval);
    }
  });

  document.querySelectorAll("[data-scenario-demo]").forEach((demo) => {
    const buttons = Array.from(demo.querySelectorAll("[data-scenario-button]"));
    const panels = Array.from(demo.querySelectorAll("[data-scenario-panel]"));
    if (buttons.length === 0 || panels.length === 0) return;

    const status = demo.querySelector("[data-scenario-status]");
    const interval = Number(demo.getAttribute("data-scenario-interval") || 4200);
    const autoplay = demo.getAttribute("data-scenario-autoplay") === "true";
    let index = 0;

    const showScenario = (nextIndex) => {
      index = nextIndex;
      buttons.forEach((button, buttonIndex) => {
        const isActive = buttonIndex === index;
        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
      });
      panels.forEach((panel, panelIndex) => {
        panel.classList.toggle("is-active", panelIndex === index);
      });
      if (status) {
        status.textContent = `${index + 1}/${panels.length}`;
      }
    };

    buttons.forEach((button, buttonIndex) => {
      button.addEventListener("click", () => showScenario(buttonIndex));
    });

    showScenario(0);
    if (autoplay) {
      window.setInterval(() => {
        showScenario((index + 1) % panels.length);
      }, interval);
    }
  });

  document.querySelectorAll("[data-square-sim]").forEach((sim) => {
    const countInput = sim.querySelector("[data-square-count]");
    const rangeSelect = sim.querySelector("[data-square-range]");
    const runButton = sim.querySelector("[data-square-run]");
    const sampleBox = sim.querySelector("[data-square-samples]");
    const hitOutput = sim.querySelector("[data-square-hits]");
    const ratioOutput = sim.querySelector("[data-square-ratio]");
    const expectedOutput = sim.querySelector("[data-square-expected]");
    const messageOutput = sim.querySelector("[data-square-message]");
    if (!countInput || !rangeSelect || !runButton || !sampleBox) return;

    const isSquare = (value) => {
      if (value < 0) return false;
      const root = Math.floor(Math.sqrt(value));
      return root * root === value;
    };

    const squareCountInRange = (min, max) => {
      if (max < 0) return 0;
      const low = Math.max(0, min);
      const firstRoot = Math.ceil(Math.sqrt(low));
      const lastRoot = Math.floor(Math.sqrt(max));
      return Math.max(0, lastRoot - firstRoot + 1);
    };

    const formatPercent = (value) => `${(value * 100).toFixed(value < 0.0001 ? 5 : 3)}%`;

    const runSimulation = () => {
      const requestedCount = Number.parseInt(countInput.value, 10);
      const count = Math.min(Math.max(Number.isFinite(requestedCount) ? requestedCount : 1000, 1), 200000);
      countInput.value = String(count);

      const [min, max] = rangeSelect.value.split(",").map((part) => Number.parseInt(part, 10));
      const span = max - min + 1;
      const sampleLimit = 48;
      let hits = 0;
      const samples = [];

      for (let i = 0; i < count; i += 1) {
        const value = Math.floor(Math.random() * span) + min;
        const square = isSquare(value);
        if (square) hits += 1;
        if (samples.length < sampleLimit) {
          samples.push({ value, square });
        }
      }

      const possibleSquares = squareCountInRange(min, max);
      const expectedHits = count * (possibleSquares / span);
      const ratio = hits / count;

      if (hitOutput) hitOutput.textContent = `${hits} / ${count}`;
      if (ratioOutput) ratioOutput.textContent = formatPercent(ratio);
      if (expectedOutput) expectedOutput.textContent = `${expectedHits.toFixed(expectedHits < 1 ? 3 : 1)} expected`;
      if (messageOutput) {
        messageOutput.textContent =
          hits === 0
            ? "这轮没有命中 true path。测试跑了，但平方数分支仍可能完全没被测到。"
            : `这轮命中了 ${hits} 个平方数；命中靠运气，不等于结构化覆盖已经完成。`;
      }

      sampleBox.innerHTML = "";
      samples.forEach((sample) => {
        const chip = document.createElement("span");
        chip.className = `sample-chip${sample.square ? " is-square" : sample.value < 0 ? " is-negative" : ""}`;
        chip.textContent = String(sample.value);
        chip.title = sample.square ? "perfect square -> true path" : "non-square -> false path";
        sampleBox.appendChild(chip);
      });
    };

    runButton.addEventListener("click", runSimulation);
    runSimulation();
  });
})();
