const nav = document.querySelector(".site-nav");
const navToggle = document.querySelector(".nav-toggle");
const cursorGlow = document.querySelector(".cursor-glow");
const revealEls = document.querySelectorAll(".reveal");
const counters = document.querySelectorAll(".counter");
const auctionCards = document.querySelectorAll(".auction-card");
const fishParts = document.querySelectorAll(".fish-part");
const cultureImage = document.querySelector(".culture-image");
const filterToggle = document.querySelector(".filter-toggle");

const fishData = {
  head: {
    part: "頭肉",
    title: "緊實厚重的港邊滋味",
    text: "頭肉肉質較緊實，適合煮湯與燉煮。它保留黑鮪魚更日常的一面，也接近漁港餐桌的生活感。"
  },
  jaw: {
    part: "下巴肉",
    title: "油脂豐富的炙烤香氣",
    text: "下巴肉油脂豐富，適合烤、煮湯與炙燒。厚實香氣讓它成為東港料理中很有記憶點的部位。"
  },
  akami: {
    part: "背肉（赤身）",
    title: "緊實鮮明的魚身主味",
    text: "背肉肉質緊實、鐵質風味鮮明，適合生魚片，是理解黑鮪魚乾淨鮮味的核心部位。"
  },
  chutoro: {
    part: "中腹",
    title: "油脂均勻的細緻平衡",
    text: "中腹油脂均勻、口感細緻，適合生食。它介於赤身與大腹之間，呈現黑鮪魚最耐看的平衡感。"
  },
  belly: {
    part: "腹肉（大腹）",
    title: "油脂豐厚的季節記憶",
    text: "油脂最多、口感細密，是頂級生魚片常見部位，也是黑鮪魚市場價值最容易被討論的焦點。"
  },
  tailBelly: {
    part: "尾腹肉",
    title: "風味佳、CP值高的部位",
    text: "尾腹肉油脂豐富、風味集中，常被視為美味且實用的部位，適合多種料理方式。"
  },
  tail: {
    part: "尾肉",
    title: "柔嫩尾段與多元料理",
    text: "尾肉肉質較嫩，適合煎、炒與燉煮。呼應黑鮪魚洄游的速度，也延伸出更家常的料理想像。"
  }
};

const updateNav = () => {
  nav.classList.toggle("scrolled", window.scrollY > 24);
};

const animateCounter = (counter) => {
  const target = Number(counter.dataset.target);
  const duration = 1500;
  const start = performance.now();

  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.floor(target * eased);
    counter.textContent = value.toLocaleString("en-US");

    if (progress < 1) {
      requestAnimationFrame(tick);
    }
  };

  requestAnimationFrame(tick);
};

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("in-view");

      if (entry.target.classList.contains("auction-record")) {
        counters.forEach((counter) => {
          if (counter.dataset.done) return;
          counter.dataset.done = "true";
          animateCounter(counter);
        });
      }
    });
  },
  { threshold: 0.18 }
);

revealEls.forEach((el) => revealObserver.observe(el));

window.addEventListener("scroll", () => {
  updateNav();

  document.querySelectorAll(".story-scene, .hero, .final-section").forEach((section) => {
    const rect = section.getBoundingClientRect();
    const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
    const clamped = Math.max(0, Math.min(1, progress));
    section.style.setProperty("--scroll", clamped.toFixed(3));
  });
}, { passive: true });

window.addEventListener("mousemove", (event) => {
  const { clientX, clientY } = event;

  if (cursorGlow) {
    cursorGlow.style.left = `${clientX}px`;
    cursorGlow.style.top = `${clientY}px`;
  }

  document.querySelectorAll(".depth-scene").forEach((scene) => {
    const rect = scene.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > window.innerHeight) return;

    const x = (clientX - rect.left) / rect.width - 0.5;
    const y = (clientY - rect.top) / rect.height - 0.5;

    scene.querySelectorAll(".depth-layer").forEach((layer) => {
      const depth = Number(layer.dataset.depth || 0.08);
      layer.style.transform = `translate3d(${x * depth * -54}px, ${y * depth * -40}px, 0) scale(1.04)`;
    });
  });
}, { passive: true });

navToggle?.addEventListener("click", () => {
  nav.classList.toggle("menu-active");
  document.body.classList.toggle("menu-open");
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("menu-active");
    document.body.classList.remove("menu-open");
  });
});

auctionCards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    auctionCards.forEach((item) => item.classList.remove("active"));
    card.classList.add("active");
    document.querySelector("#auctionYear").textContent = card.dataset.year;
    document.querySelector("#auctionWeight").textContent = card.dataset.weight;
    document.querySelector("#auctionPrice").textContent = card.dataset.price;
    document.querySelector("#auctionDesc").textContent = card.querySelector("p").textContent;
  });
});

fishParts.forEach((part) => {
  part.addEventListener("click", () => {
    const key = part.dataset.part;
    const data = fishData[key];
    if (!data) return;

    fishParts.forEach((item) => item.classList.remove("active"));
    part.classList.add("active");
    document.querySelector("#fishPart").textContent = data.part;
    document.querySelector("#fishTitle").textContent = data.title;
    document.querySelector("#fishText").textContent = data.text;
  });
});

filterToggle?.addEventListener("click", () => {
  cultureImage.classList.toggle("vintage");
});

updateNav();
