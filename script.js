const nav = document.querySelector(".site-nav");
const navToggle = document.querySelector(".nav-toggle");
const cursorGlow = document.querySelector(".cursor-glow");
const revealEls = document.querySelectorAll(".reveal");
const counters = document.querySelectorAll(".counter");
const auctionCards = document.querySelectorAll(".auction-card");
const fishParts = document.querySelectorAll(".fish-part");
const fishInfo = document.querySelector(".fish-info");
const cultureImage = document.querySelector(".culture-image");
const filterToggle = document.querySelector(".filter-toggle");
const auctionSimulator = document.querySelector(".auction-simulator");
const currentBidEl = document.querySelector("#currentBid");
const totalBidEl = document.querySelector("#totalBid");
const startAuctionButton = document.querySelector("#startAuctionButton");
const soldSummary = document.querySelector("#soldSummary");
const bidStatus = document.querySelector("#bidStatus");
const eventCount = document.querySelector("#eventCount");
const bidderCards = document.querySelectorAll(".bidder-card");
const openPictureBookButton = document.querySelector("#openPictureBook");
const pictureBookModal = document.querySelector("#pictureBookModal");
const closePictureBookButton = document.querySelector("#closePictureBook");
const prevPicturePageButton = document.querySelector("#prevPicturePage");
const nextPicturePageButton = document.querySelector("#nextPicturePage");
const pictureBookImage = document.querySelector("#pictureBookImage");
const pictureBookPageCount = document.querySelector("#pictureBookPageCount");

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

const formatCurrency = (value) => `NT$${value.toLocaleString("en-US")}`;

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

    const updateFishInfo = () => {
      document.querySelector("#fishPart").textContent = data.part;
      document.querySelector("#fishTitle").textContent = data.title;
      document.querySelector("#fishText").textContent = data.text;
      fishInfo?.classList.remove("is-changing");
      fishInfo?.classList.add("is-settled");
      window.setTimeout(() => fishInfo?.classList.remove("is-settled"), 460);
    };

    if (!fishInfo) {
      updateFishInfo();
      return;
    }

    fishInfo.classList.remove("is-settled");
    fishInfo.classList.add("is-changing");
    window.setTimeout(updateFishInfo, 180);
  });
});

filterToggle?.addEventListener("click", () => {
  cultureImage.classList.toggle("vintage");
});

document.querySelectorAll("[data-fallback]").forEach((image) => {
  image.addEventListener("error", () => {
    if (image.dataset.fallbackApplied) return;
    image.dataset.fallbackApplied = "true";
    image.src = image.dataset.fallback;
  });
});

if (
  openPictureBookButton &&
  pictureBookModal &&
  closePictureBookButton &&
  prevPicturePageButton &&
  nextPicturePageButton &&
  pictureBookImage &&
  pictureBookPageCount
) {
  const pictureBookPages = [
    { src: "assets/封面.png", alt: "《黑潮來的時候》封面" },
    ...Array.from({ length: 26 }, (_, index) => ({
      src: `assets/p${index + 1}.png`,
      alt: `《黑潮來的時候》第 ${index + 1} 頁`
    }))
  ];
  let currentPicturePage = 0;
  let lastFocusedElement = null;
  let touchStartX = 0;
  let touchStartY = 0;
  let pageChangeToken = 0;
  let hasWarmedPictureBook = false;
  const preloadedPicturePages = new Map();

  const updatePictureBookControls = () => {
    pictureBookPageCount.textContent = `第 ${currentPicturePage + 1} / ${pictureBookPages.length} 頁`;
    prevPicturePageButton.disabled = currentPicturePage === 0;
    nextPicturePageButton.disabled = currentPicturePage === pictureBookPages.length - 1;
  };

  const preloadPicturePage = (pageIndex) => {
    if (pageIndex < 0 || pageIndex >= pictureBookPages.length) {
      return Promise.resolve();
    }

    const page = pictureBookPages[pageIndex];
    if (preloadedPicturePages.has(page.src)) {
      return preloadedPicturePages.get(page.src);
    }

    const image = new Image();
    image.src = page.src;

    const loadPromise = (image.decode ? image.decode() : new Promise((resolve, reject) => {
      image.onload = resolve;
      image.onerror = reject;
    })).catch(() => undefined);

    preloadedPicturePages.set(page.src, loadPromise);
    return loadPromise;
  };

  const preloadNearbyPicturePages = (pageIndex) => {
    [pageIndex - 1, pageIndex, pageIndex + 1, pageIndex + 2].forEach((index) => {
      preloadPicturePage(index);
    });
  };

  const warmPictureBookPages = () => {
    if (hasWarmedPictureBook) return;
    hasWarmedPictureBook = true;
    pictureBookPages.forEach((_, index) => {
      window.setTimeout(() => preloadPicturePage(index), index * 80);
    });
  };

  const showPicturePage = async (pageIndex) => {
    const nextPage = Math.max(0, Math.min(pictureBookPages.length - 1, pageIndex));
    if (nextPage === currentPicturePage && pictureBookImage.src.includes(pictureBookPages[nextPage].src)) {
      updatePictureBookControls();
      preloadNearbyPicturePages(nextPage);
      return;
    }

    const token = ++pageChangeToken;
    await preloadPicturePage(nextPage);
    if (token !== pageChangeToken) return;

    pictureBookImage.classList.add("is-changing");

    window.setTimeout(() => {
      if (token !== pageChangeToken) return;

      currentPicturePage = nextPage;
      const page = pictureBookPages[nextPage];
      pictureBookImage.src = page.src;
      pictureBookImage.alt = page.alt;
      updatePictureBookControls();
      preloadNearbyPicturePages(nextPage);
      window.requestAnimationFrame(() => {
        if (token === pageChangeToken) {
          pictureBookImage.classList.remove("is-changing");
        }
      });
    }, 300);
  };

  const openPictureBook = () => {
    lastFocusedElement = document.activeElement;
    warmPictureBookPages();
    pictureBookModal.classList.add("is-open");
    pictureBookModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("reader-open");
    showPicturePage(0);
    preloadNearbyPicturePages(0);
    closePictureBookButton.focus();
  };

  const closePictureBook = () => {
    pictureBookModal.classList.remove("is-open");
    pictureBookModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("reader-open");
    lastFocusedElement?.focus?.();
  };

  openPictureBookButton.addEventListener("click", openPictureBook);
  openPictureBookButton.addEventListener("mouseenter", warmPictureBookPages);
  openPictureBookButton.addEventListener("focus", warmPictureBookPages);
  closePictureBookButton.addEventListener("click", closePictureBook);
  prevPicturePageButton.addEventListener("click", () => showPicturePage(currentPicturePage - 1));
  nextPicturePageButton.addEventListener("click", () => showPicturePage(currentPicturePage + 1));

  pictureBookModal.addEventListener("touchstart", (event) => {
    const touch = event.changedTouches[0];
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
  }, { passive: true });

  pictureBookModal.addEventListener("touchend", (event) => {
    const touch = event.changedTouches[0];
    const diffX = touch.clientX - touchStartX;
    const diffY = touch.clientY - touchStartY;

    if (Math.abs(diffX) < 48 || Math.abs(diffX) < Math.abs(diffY) * 1.2) return;
    showPicturePage(currentPicturePage + (diffX < 0 ? 1 : -1));
  }, { passive: true });

  window.addEventListener("keydown", (event) => {
    if (!pictureBookModal.classList.contains("is-open")) return;

    if (event.key === "Escape") {
      closePictureBook();
      return;
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showPicturePage(currentPicturePage - 1);
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      showPicturePage(currentPicturePage + 1);
    }
  });

  updatePictureBookControls();
}

if (
  auctionSimulator &&
  currentBidEl &&
  totalBidEl &&
  startAuctionButton &&
  soldSummary &&
  bidStatus &&
  eventCount &&
  bidderCards.length
) {
  const fishWeight = 613;
  const openingUnitBid = 1800;
  const bidSteps = [20, 30, 50, 80, 100, 120, 150];
  const buyers = {
    restaurant: {
      name: "華僑市場餐廳老闆",
      angle: "重視食材新鮮度與觀光人潮",
      background: "第一鮪能成為店面話題，也會影響遊客對東港季節料理的期待。",
      image: "assets/華僑市場餐廳老闆.png",
      log: "重視食材新鮮度與觀光人潮，因此積極出價。",
      phrases: ["看好觀光人潮，願意加價", "新鮮度能帶動店內話題"]
    },
    trader: {
      name: "外縣市盤商",
      angle: "考量轉售價格與市場需求",
      background: "會評估外地通路能否消化高單價魚貨，並觀察後續市場行情。",
      image: "assets/外縣市盤商.png",
      log: "考量轉售價格與市場需求，評估仍有利潤空間。",
      phrases: ["外地市場仍有需求", "轉售行情還有空間"]
    },
    chef: {
      name: "壽司店師傅",
      angle: "重視油脂、肉質與料理表現",
      background: "從魚體色澤、油脂線與可料理部位判斷是否值得拉高單價。",
      image: "assets/壽司店老闆.png",
      log: "重視油脂、肉質與料理表現，判斷適合高端料理。",
      phrases: ["油脂表現漂亮，值得加價", "適合高端握壽司呈現"]
    },
    vendor: {
      name: "在地魚販",
      angle: "熟悉魚體狀態與批發行情",
      background: "熟悉東港魚市場節奏，會用魚體狀態與批發需求抓出合理價位。",
      image: "assets/在地魚販.png",
      log: "熟悉魚體狀態與批發行情，依現場判斷出手。",
      phrases: ["魚體狀態穩，批發有支撐", "依現場行情繼續跟價"]
    }
  };
  let currentUnitBid = openingUnitBid;
  let auctionTimer = null;
  let eventIndex = 0;
  let maxEvents = 0;
  let lastWinner = buyers.restaurant;
  let lastBidderKey = "";
  let isRunning = false;
  let isSold = false;

  const updateBidDisplay = () => {
    currentBidEl.textContent = formatCurrency(currentUnitBid);
    totalBidEl.textContent = formatCurrency(currentUnitBid * fishWeight);
  };

  const clearBidders = () => {
    bidderCards.forEach((card) => {
      card.classList.remove("is-active", "is-winner");
      const bubble = card.querySelector(".bid-bubble");
      if (bubble) bubble.innerHTML = "";
    });
  };

  const showBidderEvent = (key, buyer) => {
    const reason = buyer.phrases[Math.floor(Math.random() * buyer.phrases.length)];

    bidderCards.forEach((card) => {
      const isActive = card.dataset.buyer === key;
      card.classList.toggle("is-active", isActive);
      card.classList.remove("is-winner");

      const bubble = card.querySelector(".bid-bubble");
      if (bubble) {
        bubble.innerHTML = isActive
          ? `<strong>${formatCurrency(currentUnitBid)} / kg</strong><span>${reason}</span>`
          : "";
      }
    });
  };

  const finishAuction = () => {
    isRunning = false;
    isSold = true;
    window.clearTimeout(auctionTimer);
    auctionSimulator.classList.add("is-sold", "is-hammered");
    startAuctionButton.disabled = true;
    startAuctionButton.textContent = "拍賣已結束";
    bidderCards.forEach((card) => {
      card.classList.toggle("is-active", false);
      card.classList.toggle("is-winner", card.dataset.buyer === lastWinner.key);
      const bubble = card.querySelector(".bid-bubble");
      if (bubble) bubble.innerHTML = "";
    });
    bidStatus.classList.remove("is-live", "is-rival");
    bidStatus.textContent = `落槌成交：${lastWinner.name} 以每公斤 ${formatCurrency(currentUnitBid)} 得標`;
    soldSummary.classList.add("is-visible");
    soldSummary.innerHTML = `
      <div class="closed-header">
        <span class="result-kicker">AUCTION CLOSED</span>
        <span class="sold-pill">SOLD</span>
      </div>
      <h4>落槌成交</h4>
      <div class="sold-result">
        <span>得標者：${lastWinner.name}</span>
        <span>每公斤成交價：${formatCurrency(currentUnitBid)} / kg</span>
        <span>黑鮪魚重量：${fishWeight} kg</span>
        <span>總成交價：${formatCurrency(currentUnitBid * fishWeight)}</span>
      </div>
      <div class="winner-card winner-${lastWinner.key}">
        <img src="${lastWinner.image}" alt="${lastWinner.name}" />
        <div>
          <strong>得標者</strong>
          <span>${lastWinner.name}</span>
          <small>${lastWinner.angle}</small>
          <p>${lastWinner.log}</p>
        </div>
      </div>
    `;
  };

  const runBidEvent = () => {
    if (!isRunning || isSold) return;

    let buyerKeys = Object.keys(buyers);
    if (lastBidderKey) {
      buyerKeys = buyerKeys.filter((key) => key !== lastBidderKey);
    }
    const key = buyerKeys[Math.floor(Math.random() * buyerKeys.length)];
    const buyer = { ...buyers[key], key };
    const step = bidSteps[Math.floor(Math.random() * bidSteps.length)];

    eventIndex += 1;
    currentUnitBid += step;
    lastWinner = buyer;
    lastBidderKey = key;
    updateBidDisplay();
    showBidderEvent(key, buyer);
    eventCount.textContent = `第 ${eventIndex} / ${maxEvents} 次出價`;
    bidStatus.classList.add("is-live", "is-rival");
    bidStatus.textContent = `第 ${eventIndex} 次出價：${buyer.name} 依「${buyer.angle}」加價`;

    if (eventIndex >= maxEvents) {
      auctionTimer = window.setTimeout(finishAuction, 3500);
      return;
    }

    auctionTimer = window.setTimeout(runBidEvent, 3500 + Math.random() * 1000);
  };

  const startAuction = () => {
    if (isRunning || isSold) return;

    isRunning = true;
    auctionSimulator.classList.add("is-open");
    auctionSimulator.setAttribute("aria-hidden", "false");
    maxEvents = 8 + Math.floor(Math.random() * 5);
    eventIndex = 0;
    lastBidderKey = "";
    currentUnitBid = openingUnitBid;
    auctionSimulator.classList.remove("is-sold", "is-hammered");
    clearBidders();
    soldSummary.innerHTML = "";
    soldSummary.classList.remove("is-visible");
    updateBidDisplay();
    eventCount.textContent = `第 0 / ${maxEvents} 次出價`;
    startAuctionButton.disabled = true;
    startAuctionButton.textContent = "拍賣進行中";
    bidStatus.classList.add("is-live");
    bidStatus.classList.remove("is-rival");
    bidStatus.textContent = `拍賣開始：黑鮪魚 ${fishWeight} kg，以每公斤 ${formatCurrency(openingUnitBid)} 起標`;
    auctionSimulator.scrollIntoView({ behavior: "smooth", block: "start" });
    auctionTimer = window.setTimeout(runBidEvent, 3500);
  };

  startAuctionButton.addEventListener("click", startAuction);

  updateBidDisplay();
  eventCount.textContent = "第 0 / 0 次出價";
}

updateNav();
