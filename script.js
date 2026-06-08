const nav = document.querySelector(".site-nav");
const navToggle = document.querySelector(".nav-toggle");
const cursorGlow = document.querySelector(".cursor-glow");
const intro = document.querySelector("#intro");
const enterSiteButton = document.querySelector("#enterSite");
const flashlight = document.querySelector(".flashlight");
const lifeTimelineSection = document.querySelector("#life-timeline");
const lifeTimelineNodes = document.querySelectorAll(".life-node[data-video]");
const timelinePreview = document.querySelector(".timeline-preview");
const timelinePreviewVideo = document.querySelector("#timelinePreviewVideo");
const timelinePreviewLabel = document.querySelector("#timelinePreviewLabel");
const endingSection = document.querySelector("#ending");
const revealEls = document.querySelectorAll(".reveal");
const counters = document.querySelectorAll(".counter");
const auctionCards = document.querySelectorAll(".auction-card");
const fishParts = document.querySelectorAll(".fish-part");
const fishModel = document.querySelector(".fish-model");
const fishInfo = document.querySelector(".fish-info");
const fishMethods = document.querySelector("#fishMethods");
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
const pictureBookSection = document.querySelector("#picture-book");
const pageSnapSections = Array.from(document.querySelectorAll(".hero, .scene-sail, .scene-migration, #auction, .auction-simulator, #culture, #picture-book, .fish-section, #life-timeline, #ending"));
const freePageScrollSelector = ".auction-section";

if ("scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}

window.scrollTo(0, 0);
window.addEventListener("load", () => {
  window.scrollTo(0, 0);
});

const fishData = {
  head: {
    part: "頭肉",
    text: "頭肉肉質較緊實，適合煮湯與燉煮。它保留黑鮪魚更日常的一面，也接近漁港餐桌的生活感。",
    methods: ["煮湯", "燉煮"]
  },
  fishEye: {
    part: "魚眼",
    text: "魚眼富含膠質，最常拿來清蒸燉煮。它不是最華麗的部位，卻很能表現港邊料理從頭到尾都不浪費的精神。",
    methods: ["清蒸", "燉煮"]
  },
  jaw: {
    part: "下巴肉",
    text: "下巴肉油脂豐富，厚實香氣讓它成為黑鮪魚中很有記憶點的部位。",
    methods: ["烤", "煮湯", "炙燒"]
  },
  pectoralBone: {
    part: "琵琶骨",
    text: "琵琶骨靠近下巴與胸鰭位置，肉量不多、每條魚僅能取得兩片，口感細嫩，是熟門熟路的人會留意的部位。",
    methods: ["煎", "烤", "清蒸"]
  },
  akami: {
    part: "背肉（赤身）",
    text: "背肉肉質緊實、鐵質風味鮮明，適合生魚片，是理解黑鮪魚乾淨鮮味的核心部位。",
    methods: ["生魚片"]
  },
  skinFat: {
    part: "皮油",
    text: "皮油位在赤身與魚皮之間，油脂豐富、帶一點筋性口，感比赤身更厚、更有層次。",
    methods: ["生魚片", "炙燒"]
  },
  fishBone: {
    part: "魚骨",
    text: "魚骨適合熬湯，能煮出清甜厚實的鮮味，它讓黑鮪魚不只停留在生魚片，也回到熱湯與餐桌的日常。",
    methods: ["熬湯"]
  },
  chutoro: {
    part: "中腹",
    text: "中腹介於赤身與大腹之間，油脂分布均勻，口感軟中帶綿。它不像大腹那麼濃烈，卻更能吃出黑鮪魚的層次。",
    methods: ["生魚片", "炙燒"]
  },
  belly: {
    part: "腹肉（大腹）",
    text: "油脂最多、口感細密，是頂級生魚片常見部位，也是黑鮪魚市場價值最容易被討論的焦點。",
    methods: ["生魚片"]
  },
  otoro: {
    part: "大腹",
    text: "大腹油花密集、入口柔軟，是黑鮪魚最具代表性的高級部位。它的油脂感強烈，也最能呈現黑鮪魚季的豐盛感。",
    methods: ["生魚片"]
  },
  lowerBelly: {
    part: "下腹",
    text: "下腹靠近腹部後段，油脂仍然豐富，它帶有明顯油香，口感比一般赤身更柔潤。",
    methods: ["生魚片", "炙燒"]
  },
  tail: {
    part: "魚尾",
    text: "魚尾活動量大，肉質較有彈性，它把黑鮪魚的力量感留在最後一口。",
    methods: ["乾煎", "醬燒", "燉煮"]
  }
};

const renderFishMethods = (methods = []) => {
  if (!fishMethods) return;

  fishMethods.replaceChildren();
  methods.forEach((method) => {
    const pill = document.createElement("span");
    pill.textContent = method;
    fishMethods.append(pill);
  });
};

const updateNav = () => {
  nav.classList.toggle("scrolled", window.scrollY > 24);
};

if (intro && enterSiteButton) {
  document.body.classList.add("intro-active");

  const moveFlashlight = (clientX, clientY) => {
    intro.style.setProperty("--flash-x", `${clientX}px`);
    intro.style.setProperty("--flash-y", `${clientY}px`);
  };

  intro.addEventListener("pointermove", (event) => {
    if (!flashlight || event.pointerType === "touch") return;
    moveFlashlight(event.clientX, event.clientY);
  }, { passive: true });

  intro.addEventListener("touchstart", (event) => {
    const touch = event.touches[0];
    if (!touch) return;
    moveFlashlight(touch.clientX, touch.clientY);
  }, { passive: true });

  intro.addEventListener("touchmove", (event) => {
    const touch = event.touches[0];
    if (!touch) return;
    moveFlashlight(touch.clientX, touch.clientY);
  }, { passive: true });

  enterSiteButton.addEventListener("click", () => {
    window.scrollTo(0, 0);
    intro.classList.add("is-hiding");
    document.body.classList.remove("intro-active");
    window.setTimeout(() => {
      intro.hidden = true;
    }, 1400);
  });
}

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

let activeTimelineVideo = "";
let timelineSwitchTimer = null;
let timelineAutoplayTimer = null;
let timelineResumeTimer = null;
let activeTimelineIndex = 0;
let isTimelineInView = false;
let isTimelineAutoplayPaused = false;

const timelineAutoplayDelay = 5000;
const timelineResumeDelay = 10000;

const playTimelinePreview = () => {
  if (!timelinePreviewVideo) return;
  if (!isTimelineInView) return;

  timelinePreviewVideo.muted = false;
  timelinePreviewVideo.volume = 0.72;
  timelinePreviewVideo.play().catch(() => undefined);
};

const updateTimelinePreview = (node) => {
  if (!node || !timelinePreview || !timelinePreviewVideo || !timelinePreviewLabel) return;

  const nextVideo = node.dataset.video || "";
  const nextLabel = node.dataset.label || node.querySelector("h3")?.textContent || "";
  const nodeIndex = Array.from(lifeTimelineNodes).indexOf(node);

  if (nodeIndex >= 0) {
    activeTimelineIndex = nodeIndex;
  }

  lifeTimelineNodes.forEach((item) => {
    const isActive = item === node;
    item.classList.toggle("active", isActive);
    if (isActive) {
      item.setAttribute("aria-current", "true");
    } else {
      item.removeAttribute("aria-current");
    }
  });
  timelinePreview.classList.add("is-active", "is-switching");
  timelinePreview.classList.remove("has-error");
  timelinePreviewLabel.textContent = nextLabel;

  window.clearTimeout(timelineSwitchTimer);
  timelineSwitchTimer = window.setTimeout(() => {
    timelinePreview.classList.remove("is-switching");
  }, 620);

  if (!nextVideo || nextVideo === activeTimelineVideo) {
    playTimelinePreview();
    return;
  }

  activeTimelineVideo = nextVideo;
  timelinePreviewVideo.classList.remove("has-media");
  timelinePreviewVideo.pause();
  timelinePreviewVideo.muted = false;
  timelinePreviewVideo.volume = 0.72;
  timelinePreviewVideo.src = nextVideo;
  timelinePreviewVideo.load();
};

const getTimelineNode = (index) => {
  if (!lifeTimelineNodes.length) return null;
  return lifeTimelineNodes[index % lifeTimelineNodes.length];
};

const stopTimelineAutoplay = () => {
  window.clearInterval(timelineAutoplayTimer);
  timelineAutoplayTimer = null;
  window.clearTimeout(timelineResumeTimer);
  timelineResumeTimer = null;
  timelinePreviewVideo?.pause();
};

const startTimelineAutoplay = () => {
  if (!lifeTimelineSection || !lifeTimelineNodes.length || timelineAutoplayTimer) return;

  isTimelineAutoplayPaused = false;
  const activeNode = getTimelineNode(activeTimelineIndex) || lifeTimelineNodes[0];
  updateTimelinePreview(activeNode);

  timelineAutoplayTimer = window.setInterval(() => {
    activeTimelineIndex = (activeTimelineIndex + 1) % lifeTimelineNodes.length;
    updateTimelinePreview(getTimelineNode(activeTimelineIndex));
  }, timelineAutoplayDelay);
};

const resumeTimelineAutoplay = () => {
  if (!isTimelineInView || !lifeTimelineNodes.length) return;

  window.clearInterval(timelineAutoplayTimer);
  timelineAutoplayTimer = null;
  window.clearTimeout(timelineResumeTimer);
  timelineResumeTimer = null;
  isTimelineAutoplayPaused = false;
  updateTimelinePreview(getTimelineNode(activeTimelineIndex));
  timelineAutoplayTimer = window.setInterval(() => {
    activeTimelineIndex = (activeTimelineIndex + 1) % lifeTimelineNodes.length;
    updateTimelinePreview(getTimelineNode(activeTimelineIndex));
  }, timelineAutoplayDelay);
};

const pauseTimelineAutoplay = () => {
  if (!lifeTimelineNodes.length) return;

  window.clearInterval(timelineAutoplayTimer);
  timelineAutoplayTimer = null;
  window.clearTimeout(timelineResumeTimer);
  timelineResumeTimer = null;
  isTimelineAutoplayPaused = true;

  if (!isTimelineInView) return;

  timelineResumeTimer = window.setTimeout(() => {
    if (isTimelineAutoplayPaused) {
      resumeTimelineAutoplay();
    }
  }, timelineResumeDelay);
};

if (timelinePreviewVideo && timelinePreview) {
  timelinePreviewVideo.muted = false;
  timelinePreviewVideo.volume = 0.72;

  timelinePreviewVideo.addEventListener("loadeddata", () => {
    timelinePreview.classList.remove("has-error");
    lifeTimelineSection?.classList.add("has-video");
    timelinePreviewVideo.classList.add("has-media");
    playTimelinePreview();
  });

  timelinePreviewVideo.addEventListener("error", () => {
    timelinePreview.classList.add("has-error");
    lifeTimelineSection?.classList.remove("has-video");
    timelinePreviewVideo.classList.remove("has-media");
  });
}

if (lifeTimelineSection && lifeTimelineNodes.length) {
  const lifeTimelineObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isTimelineInView = true;
          isTimelineAutoplayPaused = false;
          lifeTimelineSection.classList.add("is-visible");
          startTimelineAutoplay();
          return;
        }

        isTimelineInView = false;
        isTimelineAutoplayPaused = false;
        stopTimelineAutoplay();
      });
    },
    { threshold: 0.28 }
  );

  lifeTimelineObserver.observe(lifeTimelineSection);
}

lifeTimelineNodes.forEach((node) => {
  const handleTimelineUserSelect = () => {
    pauseTimelineAutoplay();
    updateTimelinePreview(node);
  };

  node.addEventListener("mouseenter", handleTimelineUserSelect);
  node.addEventListener("focus", handleTimelineUserSelect);
  node.addEventListener("click", handleTimelineUserSelect);
  node.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    handleTimelineUserSelect();
  });
});

if (lifeTimelineNodes[0]) {
  updateTimelinePreview(lifeTimelineNodes[0]);
}

if (endingSection) {
  const endingObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        endingSection.classList.add("is-visible");
        endingObserver.unobserve(endingSection);
      });
    },
    { threshold: 0.35 }
  );

  endingObserver.observe(endingSection);
}

window.addEventListener("scroll", () => {
  updateNav();

  document.querySelectorAll(".story-scene, .hero").forEach((section) => {
    const rect = section.getBoundingClientRect();
    const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
    const clamped = Math.max(0, Math.min(1, progress));
    section.style.setProperty("--scroll", clamped.toFixed(3));
  });
}, { passive: true });

let pageSnapLocked = false;
let pageSnapDelta = 0;
let pageSnapResetTimer = null;
let pageSnapUnlockTimer = null;

const getPageSnapIndex = (section) => {
  if (!section) return -1;
  return getVisiblePageSnapSections().indexOf(section);
};

const getVisiblePageSnapSections = () => {
  return pageSnapSections.filter((section) => {
    if (section.classList.contains("auction-simulator")) {
      return section.classList.contains("is-open");
    }

    return true;
  });
};

const getNearestPageSnapIndex = () => {
  const visiblePageSnapSections = getVisiblePageSnapSections();
  if (!visiblePageSnapSections.length) return -1;

  return visiblePageSnapSections.reduce((nearestIndex, section, index) => {
    const nearestDistance = Math.abs(visiblePageSnapSections[nearestIndex].getBoundingClientRect().top);
    const distance = Math.abs(section.getBoundingClientRect().top);
    return distance < nearestDistance ? index : nearestIndex;
  }, 0);
};

const getCurrentFreePageSection = () => {
  const section = document.querySelector(freePageScrollSelector);
  if (!section) return null;

  const rect = section.getBoundingClientRect();
  return rect.top < window.innerHeight * 0.45 && rect.bottom > window.innerHeight * 0.55 ? section : null;
};

const canScrollInsideFreePageSection = (section, direction) => {
  if (!section) return false;

  if (auctionSimulator?.classList.contains("is-open")) {
    const simulatorRect = auctionSimulator.getBoundingClientRect();
    const shouldSnapToSimulator =
      direction > 0
        ? simulatorRect.top > 24 && simulatorRect.top < window.innerHeight * 0.86
        : simulatorRect.top < -24 && simulatorRect.bottom > window.innerHeight * 0.2;

    if (shouldSnapToSimulator) {
      return false;
    }
  }

  const rect = section.getBoundingClientRect();
  const tolerance = 18;
  return direction > 0 ? rect.bottom > window.innerHeight + tolerance : rect.top < -tolerance;
};

const shouldSkipPageSnap = (event) => {
  const eventTarget = event.target instanceof Element ? event.target : null;

  if (!getVisiblePageSnapSections().length) return true;
  if (window.matchMedia("(max-width: 768px)").matches) return true;
  if (event.ctrlKey || event.metaKey || event.shiftKey) return true;
  if (document.body.classList.contains("intro-active")) return true;
  if (document.body.classList.contains("menu-open")) return true;
  if (document.body.classList.contains("reader-open")) return true;
  if (eventTarget?.closest(".picture-book-modal")) return true;

  return false;
};

window.addEventListener("wheel", (event) => {
  if (shouldSkipPageSnap(event)) return;

  const direction = event.deltaY > 0 ? 1 : -1;
  const freeSection = getCurrentFreePageSection();

  if (canScrollInsideFreePageSection(freeSection, direction)) {
    return;
  }

  event.preventDefault();
  if (pageSnapLocked) return;

  pageSnapDelta += event.deltaY;
  window.clearTimeout(pageSnapResetTimer);
  pageSnapResetTimer = window.setTimeout(() => {
    pageSnapDelta = 0;
  }, 160);

  if (Math.abs(pageSnapDelta) < 58) return;

  const currentIndex = freeSection ? getPageSnapIndex(freeSection) : getNearestPageSnapIndex();
  if (currentIndex < 0) return;

  const visiblePageSnapSections = getVisiblePageSnapSections();
  const nextIndex = Math.max(0, Math.min(visiblePageSnapSections.length - 1, currentIndex + direction));
  const nextSection = visiblePageSnapSections[nextIndex];

  pageSnapDelta = 0;
  if (!nextSection || nextIndex === currentIndex) return;

  pageSnapLocked = true;
  nextSection.scrollIntoView({ behavior: "smooth", block: "start" });

  window.clearTimeout(pageSnapUnlockTimer);
  pageSnapUnlockTimer = window.setTimeout(() => {
    pageSnapLocked = false;
  }, 760);
}, { passive: false });

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
    if (part.dataset.dragged === "true") {
      part.dataset.dragged = "false";
      return;
    }

    const key = part.dataset.part;
    const data = fishData[key];
    if (!data) return;

    fishParts.forEach((item) => item.classList.remove("active"));
    part.classList.add("active");

    const updateFishInfo = () => {
      document.querySelector("#fishPart").textContent = data.part;
      document.querySelector("#fishText").textContent = data.text;
      renderFishMethods(data.methods);
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

const hotspotEditMode = new URLSearchParams(window.location.search).has("editHotspot");

if (hotspotEditMode && fishModel && fishParts.length) {
  document.body.classList.add("hotspot-edit-mode");

  const panel = document.createElement("aside");
  panel.className = "hotspot-editor-panel";
  panel.setAttribute("aria-label", "Hotspot CSS 座標清單");

  const title = document.createElement("strong");
  title.textContent = "Hotspot edit mode";

  const hint = document.createElement("span");
  hint.textContent = "拖曳魚身上的光點，複製下方 CSS 座標。";

  const output = document.createElement("pre");

  panel.append(title, hint, output);
  document.body.append(panel);

  const getHotspotSelector = (part) => {
    const className = Array.from(part.classList).find((name) => !["fish-part", "hotspot", "active"].includes(name));
    return className ? `.hotspot.${className}` : ".hotspot";
  };

  const formatPercent = (value) => {
    const rounded = Math.round(value * 10) / 10;
    return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1);
  };

  const updateHotspotPanel = () => {
    output.textContent = Array.from(fishParts).map((part) => {
      const left = Number.parseFloat(part.style.left || getComputedStyle(part).left);
      const top = Number.parseFloat(part.style.top || getComputedStyle(part).top);
      const rect = fishModel.getBoundingClientRect();
      const computedLeft = part.style.left.endsWith("%") ? Number.parseFloat(part.style.left) : (left / rect.width) * 100;
      const computedTop = part.style.top.endsWith("%") ? Number.parseFloat(part.style.top) : (top / rect.height) * 100;

      return `${getHotspotSelector(part)} { left: ${formatPercent(computedLeft)}%; top: ${formatPercent(computedTop)}%; }`;
    }).join("\n");
  };

  const moveHotspot = (part, clientX, clientY) => {
    const rect = fishModel.getBoundingClientRect();
    const left = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    const top = Math.max(0, Math.min(100, ((clientY - rect.top) / rect.height) * 100));

    part.style.left = `${formatPercent(left)}%`;
    part.style.top = `${formatPercent(top)}%`;
    updateHotspotPanel();
  };

  fishParts.forEach((part) => {
    part.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      part.dataset.dragStartX = String(event.clientX);
      part.dataset.dragStartY = String(event.clientY);
      part.setPointerCapture?.(event.pointerId);
      part.classList.add("is-editing");
      moveHotspot(part, event.clientX, event.clientY);
    });

    part.addEventListener("pointermove", (event) => {
      if (!part.classList.contains("is-editing")) return;

      const startX = Number(part.dataset.dragStartX || event.clientX);
      const startY = Number(part.dataset.dragStartY || event.clientY);
      if (Math.hypot(event.clientX - startX, event.clientY - startY) > 3) {
        part.dataset.dragged = "true";
      }

      moveHotspot(part, event.clientX, event.clientY);
    });

    part.addEventListener("pointerup", (event) => {
      part.releasePointerCapture?.(event.pointerId);
      part.classList.remove("is-editing");
      updateHotspotPanel();
    });

    part.addEventListener("pointercancel", (event) => {
      part.releasePointerCapture?.(event.pointerId);
      part.classList.remove("is-editing");
      updateHotspotPanel();
    });
  });

  window.addEventListener("resize", updateHotspotPanel);
  updateHotspotPanel();
}

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
