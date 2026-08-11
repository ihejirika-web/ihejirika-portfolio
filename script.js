// =============================
// DARK / LIGHT MODE
// =============================

const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    themeToggle.textContent = "☀️";
    localStorage.setItem("theme", "dark");
  } else {
    themeToggle.textContent = "🌙";
    localStorage.setItem("theme", "light");
  }
});

// =============================
// REMEMBER USER'S THEME
// =============================

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark-mode");
  themeToggle.textContent = "☀️";
} else {
  themeToggle.textContent = "🌙";
}
// =============================
// TYPING EFFECT
// =============================

const typingText = document.getElementById("typing");

const words = [
  "Aspiring Full-Stack Web Developer",
  "Frontend Developer",
  "JavaScript Developer",
  "Future Software Engineer",
];

let wordIndex = 0;
let characterIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentWord = words[wordIndex];

  if (isDeleting) {
    typingText.textContent = currentWord.substring(0, characterIndex - 1);

    characterIndex--;
  } else {
    typingText.textContent = currentWord.substring(0, characterIndex + 1);

    characterIndex++;
  }

  let speed = isDeleting ? 60 : 100;

  if (!isDeleting && characterIndex === currentWord.length) {
    speed = 1500;
    isDeleting = true;
  }

  if (isDeleting && characterIndex === 0) {
    isDeleting = false;
    wordIndex++;

    if (wordIndex === words.length) {
      wordIndex = 0;
    }

    speed = 500;
  }

  setTimeout(typeEffect, speed);
}

typeEffect();
// =============================
// CONTACT BUTTON
// =============================

const contactBtn = document.getElementById("contactBtn");

if (contactBtn) {
  contactBtn.addEventListener("click", () => {
    window.location.href = "mailto:onyeihejirika@gmail.com";
  });
}
// =============================
// PROJECT LINKS
// =============================

const projectLinks = document.querySelectorAll(".project-btn");

projectLinks.forEach((link) => {
  link.addEventListener("click", () => {
    link.style.transform = "scale(0.97)";

    setTimeout(() => {
      link.style.transform = "";
    }, 150);
  });
});

// =============================
// EXTERNAL LINKS
// =============================

const externalLinks = document.querySelectorAll('a[target="_blank"]');

externalLinks.forEach((link) => {
  link.setAttribute("rel", "noopener noreferrer");
});
// =============================
// FINAL PORTFOLIO POLISH
// =============================

document.addEventListener("DOMContentLoaded", () => {
  // Add current year automatically to the footer
  const copyright = document.querySelector(".copyright");

  if (copyright) {
    copyright.innerHTML = `© ${new Date().getFullYear()} Ihejirika Alexander Onyeka. All Rights Reserved.`;
  }

  // Highlight navigation link while scrolling
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-links a");

  window.addEventListener("scroll", () => {
    let currentSection = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 150;
      const sectionHeight = section.offsetHeight;

      if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionTop + sectionHeight
      ) {
        currentSection = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");

      if (link.getAttribute("href") === `#${currentSection}`) {
        link.classList.add("active");
      }
    });
  });
});
