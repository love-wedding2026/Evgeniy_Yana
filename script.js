const startBtn = document.getElementById("startBtn");
const startScreen = document.getElementById("startScreen");
const siteContent = document.getElementById("siteContent");

const bgMusic = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

const openFormBtn = document.getElementById("openFormBtn");
const block6FormWrap = document.getElementById("block6FormWrap");
const block6Form = document.getElementById("block6Form");

const revealItems = document.querySelectorAll(".reveal");

/* стартовый экран */
if (startBtn && startScreen && siteContent) {
  startBtn.addEventListener("click", function () {
    startScreen.classList.add("hide");
    siteContent.classList.add("show");

    if (bgMusic) {
      bgMusic.play().catch(() => {});
      if (musicBtn) {
        musicBtn.classList.remove("off");
      }
    }
  });
}

/* музыка */
if (musicBtn && bgMusic) {
  musicBtn.addEventListener("click", function () {
    if (bgMusic.paused) {
      bgMusic.play().catch(() => {});
      musicBtn.classList.remove("off");
    } else {
      bgMusic.pause();
      musicBtn.classList.add("off");
    }
  });
}

/* анкета показать / скрыть */
if (openFormBtn && block6FormWrap) {
  openFormBtn.addEventListener("click", function () {
    block6FormWrap.classList.toggle("show");
  });
}

/* отправка формы на почту без перехода */
if (block6Form) {
  block6Form.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData();

    const fio = block6Form.querySelector('input[name="fio"]')?.value || "";
    const attendance = block6Form.querySelector('input[name="attendance"]:checked')?.value || "";

    const alcoholSelected = [];
    block6Form.querySelectorAll('input[name="alcohol"]:checked').forEach((item) => {
      alcoholSelected.push(item.value);
    });

    formData.append("ФИО", fio);
    formData.append("Присутствие", attendance);
    formData.append(
      "Предпочтения в алкоголе",
      alcoholSelected.length ? alcoholSelected.join(", ") : "Ничего не выбрано"
    );
    formData.append("_captcha", "false");

    fetch("https://formsubmit.co/ajax/Yana.demchenko.0101@mail.ru", {
      method: "POST",
      body: formData
    })
      .then((response) => response.json())
      .then(() => {
        block6Form.reset();
        block6FormWrap.classList.remove("show");
      })
      .catch((error) => {
        console.log("Ошибка отправки:", error);
      });
  });
}

/* плавное появление блоков */
if (revealItems.length) {
  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    },
    {
      threshold: 0.15
    }
  );

  revealItems.forEach((item) => {
    observer.observe(item);
  });
}

/* таймер */
const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

/* поставь свою дату свадьбы */
const weddingDate = new Date("2026-06-17T00:00:00").getTime();

function updateTimer() {
  const now = new Date().getTime();
  const distance = weddingDate - now;

  if (distance <= 0) {
    if (daysEl) daysEl.textContent = "00";
    if (hoursEl) hoursEl.textContent = "00";
    if (minutesEl) minutesEl.textContent = "00";
    if (secondsEl) secondsEl.textContent = "00";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  if (daysEl) daysEl.textContent = String(days).padStart(2, "0");
  if (hoursEl) hoursEl.textContent = String(hours).padStart(2, "0");
  if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, "0");
  if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, "0");
}

if (daysEl && hoursEl && minutesEl && secondsEl) {
  updateTimer();
  setInterval(updateTimer, 1000);
}
