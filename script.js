"use strict";

/* ===== Settings: change the WhatsApp number here (country code, no + or spaces) ===== */
const WHATSAPP_NUMBER = "2348012345678";

/* ===== Property data ===== */
const IMG = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1000&q=80`;

const properties = [
  {
    id: 1, title: "Banana Island Waterfront Mansion", city: "Lagos", area: "Banana Island, Ikoyi",
    type: "House", status: "For sale", price: 1250000000, beds: 6, baths: 7, size: "1,200 sqm",
    desc: "A landmark waterfront residence with double-height living spaces, a private jetty, cinema room and staff quarters, finished to the highest standard.",
    features: ["Private jetty", "Smart home system", "Swimming pool", "Cinema room", "24/7 power backup", "Gated security"],
    images: ["photo-1613490493576-7fde63acd811", "photo-1600585154340-be6161a56a0c", "photo-1600607687939-ce8a6c25118c"]
  },
  {
    id: 2, title: "Maitama Contemporary Duplex", city: "Abuja", area: "Maitama District",
    type: "House", status: "For sale", price: 650000000, beds: 5, baths: 6, size: "780 sqm",
    desc: "A modern detached duplex in the heart of Maitama, close to embassies and top schools. Large landscaped garden and a separate boys' quarters.",
    features: ["Landscaped garden", "Boys' quarters", "Solar backup", "Fitted kitchen", "CCTV", "Ample parking"],
    images: ["photo-1512917774080-9991f1c4c750", "photo-1600596542815-ffad4c1539a9", "photo-1600566753190-17f0baa2a6c3"]
  },
  {
    id: 3, title: "Eko Atlantic Sky Apartment", city: "Lagos", area: "Eko Atlantic City",
    type: "Apartment", status: "For sale", price: 420000000, beds: 3, baths: 4, size: "260 sqm",
    desc: "A high-floor apartment with sweeping ocean views, residents' lounge, gym and concierge service in Lagos' newest waterfront city.",
    features: ["Ocean views", "Concierge", "Gym and spa", "Covered parking", "Elevator", "Backup power"],
    images: ["photo-1545324418-cc1a3fa10c00", "photo-1560448204-e02f11c3d0e2", "photo-1502672260266-1c1ef2d93688"]
  },
  {
    id: 4, title: "Lekki Phase 1 Smart Terrace", city: "Lagos", area: "Lekki Phase 1",
    type: "House", status: "For sale", price: 185000000, beds: 4, baths: 5, size: "420 sqm",
    desc: "A well-built terrace in a quiet, secure estate minutes from the Lekki-Epe Expressway, with a private rooftop terrace and a modern kitchen.",
    features: ["Rooftop terrace", "Estate security", "Treated water", "Inverter system", "Fitted wardrobes", "BQ"],
    images: ["photo-1564013799919-ab600027ffc6", "photo-1600047509807-ba8f99d2cdde", "photo-1600210492486-724fe5c67fb0"]
  },
  {
    id: 5, title: "Wuse 2 Executive Apartment", city: "Abuja", area: "Wuse 2",
    type: "Apartment", status: "For sale", price: 95000000, beds: 2, baths: 3, size: "150 sqm",
    desc: "A polished two-bedroom apartment within walking distance of restaurants and offices. Ideal for professionals and investors seeking steady rental income.",
    features: ["Serviced building", "Fitted kitchen", "Elevator", "Gated parking", "Fibre internet", "Generator"],
    images: ["photo-1522708323590-d24dbb6b0267", "photo-1560185007-cde436f6a4d0", "photo-1484154218962-a197022b5858"]
  },
  {
    id: 6, title: "Ibeju-Lekki Prime Land, 600 sqm", city: "Lagos", area: "Ibeju-Lekki",
    type: "Land", status: "For sale", price: 38000000, beds: 0, baths: 0, size: "600 sqm",
    desc: "A dry, fully documented plot in a fast-growing corridor near the Lekki Free Zone and the airport. Excellent for building or long-term investment.",
    features: ["Registered survey", "Governor's consent", "Dry land", "Good road access", "Estate layout", "Flexible payment"],
    images: ["photo-1500382017468-9049fed747ef", "photo-1500076656116-558758c991c1", "photo-1473448912268-2022ce9509d8"]
  },
  {
    id: 7, title: "Old GRA Executive Residence", city: "Port Harcourt", area: "Old GRA",
    type: "House", status: "For sale", price: 290000000, beds: 5, baths: 5, size: "650 sqm",
    desc: "A stately home on a generous plot in Old GRA with mature trees, wide verandas and spacious entertaining areas. Fully fenced and secure.",
    features: ["Large compound", "Wide verandas", "Borehole", "Generator house", "Staff quarters", "Secure fencing"],
    images: ["photo-1600573472550-8090b5e0745e", "photo-1600585153490-76fb20a32601", "photo-1600607688969-a5bfcd646154"]
  },
  {
    id: 8, title: "Victoria Island Penthouse", city: "Lagos", area: "Victoria Island",
    type: "Apartment", status: "For sale", price: 780000000, beds: 4, baths: 5, size: "430 sqm",
    desc: "A full-floor penthouse with a wraparound terrace, private lift lobby and views over the lagoon. Fully furnished to a hotel standard.",
    features: ["Private lift lobby", "Wraparound terrace", "Fully furnished", "Infinity pool access", "Valet parking", "24/7 concierge"],
    images: ["photo-1512918728675-ed5a9ecdebfd", "photo-1600121848594-d8644e57abab", "photo-1493809842364-78817add7ffb"]
  }
];

/* ===== Helpers ===== */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const naira = (n) => "₦" + n.toLocaleString("en-NG");
const waLink = (text) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
const fallbackImg = (img) => { img.onerror = null; img.style.visibility = "hidden"; };

/* ===== State ===== */
const state = { type: "all", city: "all", maxPrice: 0 };

/* ===== Render listings ===== */
const grid = $("#propertyGrid");

function renderProperties() {
  const list = properties.filter((p) =>
    (state.type === "all" || p.type === state.type) &&
    (state.city === "all" || p.city === state.city) &&
    (!state.maxPrice || p.price <= state.maxPrice)
  );

  grid.innerHTML = list.map((p) => `
    <article class="card">
      <div class="card-img">
        <img src="${IMG(p.images[0])}" alt="${p.title}" loading="lazy" onerror="this.onerror=null;this.style.visibility='hidden'">
        <span class="badge">${p.status}</span>
      </div>
      <div class="card-body">
        <h3>${p.title}</h3>
        <p class="loc">${p.area}, ${p.city}</p>
        <p class="price">${naira(p.price)}</p>
        <div class="meta">
          ${p.type === "Land"
            ? `<span>${p.size}</span><span>Residential plot</span>`
            : `<span>${p.beds} beds</span><span>${p.baths} baths</span><span>${p.size}</span>`}
        </div>
        <button class="btn btn-outline-dark" data-id="${p.id}">View details</button>
      </div>
    </article>`).join("");

  $("#resultCount").textContent = `${list.length} ${list.length === 1 ? "property" : "properties"} found`;
  $("#emptyState").hidden = list.length > 0;
}

/* Filter chips */
$$(".chip").forEach((chip) => chip.addEventListener("click", () => {
  $$(".chip").forEach((c) => c.classList.remove("active"));
  chip.classList.add("active");
  state.type = chip.dataset.type;
  $("#sType").value = state.type;
  renderProperties();
}));

/* Hero search */
$("#heroSearch").addEventListener("submit", (e) => {
  e.preventDefault();
  state.city = $("#sCity").value;
  state.type = $("#sType").value;
  state.maxPrice = Number($("#sPrice").value);
  $$(".chip").forEach((c) => c.classList.toggle("active", c.dataset.type === state.type));
  renderProperties();
  $("#properties").scrollIntoView({ behavior: "smooth" });
});

/* ===== Property details modal ===== */
const modal = $("#detailModal");

function openDetails(id) {
  const p = properties.find((x) => x.id === id);
  if (!p) return;

  const main = $("#dMainImg");
  main.src = IMG(p.images[0]);
  main.alt = p.title;

  $("#dThumbs").innerHTML = p.images.map((img, i) =>
    `<button type="button" class="${i === 0 ? "on" : ""}" data-img="${img}" aria-label="Show photo ${i + 1}"><img src="${IMG(img)}" alt=""></button>`
  ).join("");

  $("#dTag").textContent = `${p.type} · ${p.status}`;
  $("#dTitle").textContent = p.title;
  $("#dLoc").textContent = `${p.area}, ${p.city}`;
  $("#dPrice").textContent = naira(p.price);
  $("#dDesc").textContent = p.desc;
  $("#dSpecs").innerHTML = p.type === "Land"
    ? `<li><strong>${p.size}</strong>Plot size</li><li><strong>${p.city}</strong>City</li><li><strong>Titled</strong>Documents</li>`
    : `<li><strong>${p.beds}</strong>Bedrooms</li><li><strong>${p.baths}</strong>Bathrooms</li><li><strong>${p.size}</strong>Size</li>`;
  $("#dFeatures").innerHTML = p.features.map((f) => `<li>${f}</li>`).join("");
  $("#dWhatsapp").href = waLink(`Hello Northstar Realty, I am interested in "${p.title}" (${naira(p.price)}) in ${p.area}, ${p.city}. Please share more details and available viewing times.`);

  modal.showModal();
  document.body.style.overflow = "hidden";
}

function closeDetails() { modal.close(); }

grid.addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-id]");
  if (btn) openDetails(Number(btn.dataset.id));
});

$("#dThumbs").addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-img]");
  if (!btn) return;
  $("#dMainImg").src = IMG(btn.dataset.img);
  $$("#dThumbs button").forEach((b) => b.classList.toggle("on", b === btn));
});

$("#modalClose").addEventListener("click", closeDetails);
modal.addEventListener("click", (e) => { if (e.target === modal) closeDetails(); });
modal.addEventListener("close", () => { document.body.style.overflow = ""; });

/* ===== Navigation ===== */
const header = $("#header");
const nav = $("#nav");
const toggle = $("#navToggle");

function setMenu(open) {
  nav.classList.toggle("open", open);
  header.classList.toggle("menu-open", open);
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
}

toggle.addEventListener("click", () => setMenu(!nav.classList.contains("open")));
$$(".nav a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });

function onScroll() { header.classList.toggle("scrolled", window.scrollY > 40); }
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

/* Highlight the nav link of the section in view */
const links = $$(".nav-link");
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      links.forEach((l) => l.classList.toggle("active", l.getAttribute("href") === `#${entry.target.id}`));
    }
  });
}, { rootMargin: "-45% 0px -50% 0px" });
["home", "properties", "about", "contact"].forEach((id) => observer.observe($("#" + id)));

/* ===== Contact form ===== */
const form = $("#contactForm");
const rules = {
  cName: (v) => v.trim().length >= 2 || "Enter your full name.",
  cPhone: (v) => /^(\+?234|0)[789][01]\d{8}$/.test(v.replace(/[\s-]/g, "")) || "Enter a valid Nigerian phone number.",
  cEmail: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || "Enter a valid email address.",
  cMessage: (v) => v.trim().length >= 10 || "Tell us a little more (at least 10 characters)."
};

function validateField(id) {
  const input = $("#" + id);
  const result = rules[id](input.value);
  const msg = $(`.error[data-for="${id}"]`);
  const ok = result === true;
  input.classList.toggle("invalid", !ok);
  msg.textContent = ok ? "" : result;
  return ok;
}

Object.keys(rules).forEach((id) => $("#" + id).addEventListener("blur", () => validateField(id)));

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const valid = Object.keys(rules).map(validateField).every(Boolean);
  const status = $("#formStatus");
  if (!valid) { status.textContent = ""; return; }

  const text = `Hello Northstar Realty,\nName: ${$("#cName").value.trim()}\nPhone: ${$("#cPhone").value.trim()}\nEmail: ${$("#cEmail").value.trim()}\n\n${$("#cMessage").value.trim()}`;
  window.open(waLink(text), "_blank", "noopener");
  status.textContent = "Thank you. Your enquiry is ready to send in WhatsApp.";
  form.reset();
});

/* ===== Init ===== */
$("#waFloat").href = waLink("Hello Northstar Realty, I would like to enquire about your properties.");
$("#year").textContent = new Date().getFullYear();
renderProperties();
