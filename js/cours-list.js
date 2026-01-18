const chapters = window.DB_COURSE_CHAPTERS || [];
const list = document.getElementById("courseList");
const totalTime = document.getElementById("totalTime");

const total = chapters.reduce((acc, c) => acc + (c.minutes || 0), 0);
totalTime.textContent = `${total} min`;

list.innerHTML = chapters.map((c, i) => `
  <a class="course-item" href="${c.href}">
    <div class="course-left">
      <div class="course-index">${String(i+1).padStart(2,"0")}</div>
      <div class="course-title">${c.title}</div>
    </div>
    <div class="course-right">
      <span class="chip">${c.minutes} min</span>
      <span class="arrow">→</span>
    </div>
  </a>
`).join("");
