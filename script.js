/* =========================================================
   POLISHED LIVING — Shared JavaScript
   - Renders nav + footer into every page
   - Handles mobile menu, FAQ accordion, booking flow
   - Submits forms to Formspree (set your endpoint in CONFIG)
   ========================================================= */

// =========================================================
// CONFIG — edit these
// =========================================================
const CONFIG = {
  // 1) Sign up at https://formspree.io (free) — create a form, paste your endpoint here
  //    Looks like: https://formspree.io/f/xxxxxxxx
  formspreeEndpoint: "https://formspree.io/f/xdajnvyv",

  // 2) Business info — used in nav, footer, and contact links
  business: {
    name: "Polished Living",
    tagline: "Clean spaces. Elevated living.",
    phone: "(786) 671-7415",
    phoneHref: "tel:+17866717415",
    email: "contact@polishedliving.work",
    supportEmail: "support@polishedliving.work",
    city: "Pensacola, FL",
    hoursWeekday: "Mon–Sat · 7am–7pm",
    hoursWeekend: "Sun · 9am–4pm",
  },
};

// =========================================================
// Helpers
// =========================================================
function getCurrentPage() {
  const path = window.location.pathname;
  const file = path.split("/").pop() || "index.html";
  return file.replace(".html", "") || "index";
}

function logomarkSVG(navyColor = "var(--navy)", goldColor = "var(--gold)", size = 32) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 60 60" fill="none" aria-label="Polished Living logomark"><path d="M 11 32 Q 30 52 49 32" stroke="${goldColor}" stroke-width="1.8" fill="none" stroke-linecap="round"/><text x="30" y="36" font-family="Fraunces, serif" font-size="24" font-weight="500" fill="${navyColor}" text-anchor="middle" letter-spacing="-1">PL</text><path d="M 46 12 L 47 16 L 51 17 L 47 18 L 46 22 L 45 18 L 41 17 L 45 16 Z" fill="${goldColor}"/></svg>`;
}

// =========================================================
// Render nav
// =========================================================
function renderNav() {
  const navHost = document.getElementById("nav");
  if (!navHost) return;
  const current = getCurrentPage();

  const links = [
    { href: "services.html", label: "Services", id: "services" },
    { href: "pricing.html", label: "Pricing", id: "pricing" },
    { href: "about.html", label: "About", id: "about" },
    { href: "reviews.html", label: "Reviews", id: "reviews" },
    { href: "areas.html", label: "Service Areas", id: "areas" },
    { href: "faq.html", label: "FAQ", id: "faq" },
  ];

  const navLinks = links
    .map(
      (l) =>
        `<a href="${l.href}" class="nav-link link-line${current === l.id ? " current" : ""}">${l.label}</a>`
    )
    .join("");

  const mobileLinks = links
    .map((l) => `<a href="${l.href}" class="mobile-menu-link">${l.label}</a>`)
    .join("");

  navHost.innerHTML = `
    <header class="nav">
      <div class="nav-inner">
        <a href="index.html" class="nav-brand">${logomarkSVG()}<span class="nav-brand-text">${CONFIG.business.name}</span></a>
        <nav class="nav-links">${navLinks}</nav>
        <div class="nav-right">
          <a href="${CONFIG.business.phoneHref}" class="nav-phone"><i data-lucide="phone" width="14" height="14"></i><span class="mono-num">${CONFIG.business.phone}</span></a>
          <a href="book.html" class="btn btn-primary btn-sm">Book now <i data-lucide="arrow-right" width="14" height="14"></i></a>
          <button class="nav-menu-btn" id="navMenuOpen"><i data-lucide="menu" width="22" height="22"></i></button>
        </div>
      </div>
    </header>
    <div class="mobile-menu" id="mobileMenu">
      <div class="mobile-menu-top">
        <a href="index.html" class="nav-brand">${logomarkSVG()}<span class="nav-brand-text">${CONFIG.business.name}</span></a>
        <button id="navMenuClose"><i data-lucide="x" width="22" height="22"></i></button>
      </div>
      <div class="mobile-menu-links">
        ${mobileLinks}
        <div class="rule" style="margin-top: 16px;"></div>
        <a href="${CONFIG.business.phoneHref}" style="display:flex;align-items:center;gap:8px;"><i data-lucide="phone" width="16" height="16"></i><span class="mono-num">${CONFIG.business.phone}</span></a>
        <a href="book.html" class="btn btn-primary" style="align-self:flex-start;margin-top:16px;">Book now <i data-lucide="arrow-right" width="14" height="14"></i></a>
      </div>
    </div>
  `;

  document.getElementById("navMenuOpen")?.addEventListener("click", () => {
    document.getElementById("mobileMenu").classList.add("open");
  });
  document.getElementById("navMenuClose")?.addEventListener("click", () => {
    document.getElementById("mobileMenu").classList.remove("open");
  });
}

// =========================================================
// Render footer
// =========================================================
function renderFooter() {
  const footerHost = document.getElementById("footer");
  if (!footerHost) return;

  footerHost.innerHTML = `
    <footer class="site-footer grain">
      <div class="footer-inner">
        <div class="footer-grid">
          <div class="footer-col-5">
            <a href="index.html" class="nav-brand" style="margin-bottom: 24px; color: var(--cream-light);">
              ${logomarkSVG("var(--cream-light)", "var(--gold-light)", 36)}
              <span class="nav-brand-text" style="color: var(--cream-light); font-size: 17px; letter-spacing: 0.14em;">${CONFIG.business.name}</span>
            </a>
            <p class="footer-tag">Clean spaces. <em class="serif-italic" style="color: var(--gold-light);">Elevated</em> living. A small team of vetted professionals caring for homes and offices across the city.</p>
            <div style="margin-top: 40px;">
              <p class="eyebrow" style="color: var(--cream-soft); margin-bottom: 12px;">Join the list</p>
              <form class="email-form" id="newsletterForm">
                <input type="email" name="email" placeholder="Your email" required />
                <button type="submit" class="btn btn-light">Subscribe</button>
              </form>
            </div>
          </div>

          <div class="footer-col-2">
            <p class="eyebrow" style="color: var(--cream-soft); margin-bottom: 20px;">Site</p>
            <ul class="footer-list">
              <li><a href="services.html" class="link-line">Services</a></li>
              <li><a href="pricing.html" class="link-line">Pricing</a></li>
              <li><a href="about.html" class="link-line">About</a></li>
              <li><a href="reviews.html" class="link-line">Reviews</a></li>
              <li><a href="faq.html" class="link-line">FAQ</a></li>
              <li><a href="book.html" class="link-line">Book</a></li>
            </ul>
          </div>

          <div class="footer-col-2">
            <p class="eyebrow" style="color: var(--cream-soft); margin-bottom: 20px;">Areas</p>
            <ul class="footer-list">
              <li>Downtown Pensacola</li>
              <li>East Hill</li>
              <li>North Hill</li>
              <li>Cordova Park</li>
              <li>Gulf Breeze</li>
              <li>Pensacola Beach</li>
              <li>Perdido Key</li>
              <li>Pace &amp; Milton</li>
            </ul>
          </div>

          <div class="footer-col-3">
            <p class="eyebrow" style="color: var(--cream-soft); margin-bottom: 20px;">Reach us</p>
            <ul class="footer-list">
              <li class="with-icon"><i data-lucide="phone" width="14" height="14"></i><a href="${CONFIG.business.phoneHref}"><span class="mono-num">${CONFIG.business.phone}</span></a></li>
              <li class="with-icon"><i data-lucide="mail" width="14" height="14"></i><a href="mailto:${CONFIG.business.email}">${CONFIG.business.email}</a></li>
              <li class="with-icon"><i data-lucide="life-buoy" width="14" height="14"></i><a href="mailto:${CONFIG.business.supportEmail}">${CONFIG.business.supportEmail}</a></li>
              <li class="with-icon"><i data-lucide="map-pin" width="14" height="14"></i>${CONFIG.business.city}</li>
            </ul>
            <p class="eyebrow" style="color: var(--cream-soft); margin: 32px 0 12px;">Hours</p>
            <p style="font-size: 14px; opacity: 0.8;">${CONFIG.business.hoursWeekday}<br/>${CONFIG.business.hoursWeekend}</p>
          </div>
        </div>

        <div class="rule" style="margin: 64px 0 24px; background: rgba(245, 241, 234, 0.15);"></div>

        <div class="footer-bottom">
          <span>© ${new Date().getFullYear()} ${CONFIG.business.name} Cleaning Co. · Licensed, bonded &amp; insured</span>
          <div class="footer-bottom-links">
            <a href="privacy.html">Privacy</a>
            <a href="terms.html">Terms</a>
            <a href="refund.html">Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  `;

  // Newsletter form
  const newsletter = document.getElementById("newsletterForm");
  if (newsletter) {
    newsletter.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = newsletter.email.value;
      const ok = await submitForm({ _subject: "Newsletter signup", email, source: "Footer newsletter" });
      newsletter.innerHTML = ok
        ? `<p style="color: var(--cream-light); font-size: 14px;">Thanks — you're on the list.</p>`
        : `<p style="color: var(--cream-light); font-size: 14px;">Something went wrong. Try emailing ${CONFIG.business.email}.</p>`;
    });
  }
}

// =========================================================
// Generic form submission to Formspree
// =========================================================
async function submitForm(data) {
  try {
    const res = await fetch(CONFIG.formspreeEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(data),
    });
    return res.ok;
  } catch (err) {
    console.error("Form submit failed", err);
    return false;
  }
}

// =========================================================
// FAQ accordion
// =========================================================
function initFAQ() {
  document.querySelectorAll(".faq-q").forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".faq-item");
      const isOpen = item.classList.contains("open");
      // Close all
      document.querySelectorAll(".faq-item").forEach((i) => i.classList.remove("open"));
      // Open this if it was closed
      if (!isOpen) item.classList.add("open");
    });
  });
  // Open first item by default
  document.querySelector(".faq-item")?.classList.add("open");
}

// =========================================================
// Booking flow
// =========================================================
function initBooking() {
  const form = document.getElementById("bookForm");
  if (!form) return;

  const state = {
    service: "",
    size: "",
    date: "",
    time: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    notes: "",
  };

  let currentStep = 1;
  const totalSteps = 5;

  // Build date buttons (next 14 days)
  const dateGrid = document.getElementById("dateGrid");
  if (dateGrid) {
    for (let i = 1; i <= 14; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      const label = d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "option-sm date";
      btn.textContent = label;
      btn.dataset.value = label;
      btn.addEventListener("click", () => {
        document.querySelectorAll("#dateGrid .option-sm").forEach((b) => b.classList.remove("selected"));
        btn.classList.add("selected");
        state.date = label;
      });
      dateGrid.appendChild(btn);
    }
  }

  // Option selectors (single-select within a group)
  document.querySelectorAll("[data-select-group]").forEach((group) => {
    const key = group.dataset.selectGroup;
    group.querySelectorAll("[data-value]").forEach((btn) => {
      btn.addEventListener("click", () => {
        group.querySelectorAll("[data-value]").forEach((b) => b.classList.remove("selected"));
        btn.classList.add("selected");
        state[key] = btn.dataset.value;
      });
    });
  });

  // Text inputs
  document.querySelectorAll("[data-field]").forEach((el) => {
    el.addEventListener("input", (e) => {
      state[el.dataset.field] = e.target.value;
    });
  });

  function showStep(n) {
    currentStep = n;
    document.querySelectorAll(".step-panel").forEach((p) => p.classList.remove("active"));
    document.querySelector(`.step-panel[data-step="${n}"]`)?.classList.add("active");
    // update step bar
    document.querySelectorAll(".step-pill").forEach((pill, i) => {
      const idx = i + 1;
      const num = pill.querySelector(".step-pill-num");
      const label = pill.querySelector(".step-pill-label");
      num.classList.remove("active", "done");
      label.classList.remove("active", "done");
      if (idx < n) { num.classList.add("done"); label.classList.add("done"); }
      if (idx === n) { num.classList.add("active"); label.classList.add("active"); }
    });
    document.querySelectorAll(".step-pill-line").forEach((line, i) => {
      line.classList.toggle("done", i + 1 < n);
    });
    // update nav buttons
    const backBtn = document.getElementById("stepBack");
    const nextBtn = document.getElementById("stepNext");
    const stepNav = document.getElementById("stepNav");
    if (backBtn) backBtn.disabled = n === 1;
    if (n === 5) {
      stepNav.style.display = "none";
    } else {
      stepNav.style.display = "flex";
      nextBtn.innerHTML = n === 4 ? `Confirm booking <i data-lucide="arrow-right" width="14" height="14"></i>` : `Continue <i data-lucide="arrow-right" width="14" height="14"></i>`;
      if (window.lucide) window.lucide.createIcons();
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  document.getElementById("stepBack")?.addEventListener("click", () => {
    if (currentStep > 1) showStep(currentStep - 1);
  });
  document.getElementById("stepNext")?.addEventListener("click", async () => {
    if (currentStep === 4) {
      // Submit
      const ok = await submitForm({
        _subject: `New booking — ${state.name || "no name"}`,
        ...state,
        source: "Booking form",
      });
      if (ok) {
        // Fill summary
        document.getElementById("sumService").textContent = state.service || "—";
        document.getElementById("sumSize").textContent = state.size || "—";
        document.getElementById("sumDate").textContent = state.date || "—";
        document.getElementById("sumTime").textContent = state.time || "—";
        document.getElementById("sumEmail").textContent = state.email || "your email";
        showStep(5);
      } else {
        alert("Sorry — something went wrong sending the booking. Please call us at " + CONFIG.business.phone + " or email " + CONFIG.business.email);
      }
    } else if (currentStep < totalSteps) {
      showStep(currentStep + 1);
    }
  });

  showStep(1);
}

// =========================================================
// Init on DOM ready
// =========================================================
document.addEventListener("DOMContentLoaded", () => {
  renderNav();
  renderFooter();
  initFAQ();
  initBooking();
  // Lucide icons (loaded via CDN in HTML)
  if (window.lucide) window.lucide.createIcons();
});
