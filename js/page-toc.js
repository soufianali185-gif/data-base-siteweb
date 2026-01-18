const toc = document.getElementById("toc");
const headings = [...document.querySelectorAll("article h2, article h3")];

toc.innerHTML = headings.map(h => {
  const indent = h.tagName === "H3" ? " style='margin-left:12px;'" : "";
  return `<a href="#${h.id}" data-id="${h.id}"${indent}>${h.textContent}</a>`;
}).join("");

document.documentElement.style.scrollBehavior = "smooth";

const text = document.querySelector("article").innerText.trim();
const words = text.split(/\s+/).filter(Boolean).length;
const minutes = Math.max(1, Math.round(words / 200));
document.getElementById("readingTime").textContent = `${minutes} minute${minutes>1 ? "s":""}`;

const links = [...toc.querySelectorAll("a")];
const map = new Map(links.map(a => [a.dataset.id, a]));

const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      links.forEach(a => a.classList.remove("active"));
      const a = map.get(e.target.id);
      if (a) a.classList.add("active");
    }
  });
}, { rootMargin: "-30% 0px -60% 0px", threshold: 0.1 });

headings.forEach(h => io.observe(h));
