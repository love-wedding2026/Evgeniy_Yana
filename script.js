// СТАРТОВЫЙ ЭКРАН

const startScreen = document.getElementById("startScreen");
const startBtn = document.getElementById("startBtn");
const siteContent = document.getElementById("siteContent");

if(startBtn){

startBtn.addEventListener("click", () => {

  siteContent.classList.add("show");
  startScreen.classList.add("hide");

});

}

// БЛОК 6 — открыть/закрыть анкету

const openFormBtn = document.getElementById("openFormBtn");
const block6FormWrap = document.getElementById("block6FormWrap");
const block6Form = document.getElementById("block6Form");

// ВСТАВЬ СВОИ ДАННЫЕ
const BOT_TOKEN = "8712627003:AAH9swgpFz1Ht7urFT9A8ET1h-8bU9AWY5I";
const CHAT_ID = "994168013";

if(openFormBtn && block6FormWrap){
  openFormBtn.addEventListener("click", function(){
    block6FormWrap.classList.toggle("show");
  });
}


// БЛОК 6 — отправка анкеты в Telegram

if(block6Form){
  block6Form.addEventListener("submit", async function(e){
    e.preventDefault();

    const formData = new FormData(block6Form);

    const fio = formData.get("fio") || "";
    const attendance = formData.get("attendance") || "Не выбрано";
    const alcohol = formData.getAll("alcohol");

    const alcoholText = alcohol.length ? alcohol.join(", ") : "Не выбрано";

    const text =
      `Новая анкета%0A` +
      `ФИО: ${encodeURIComponent(fio)}%0A` +
      `Присутствие: ${encodeURIComponent(attendance)}%0A` +
      `Алкоголь: ${encodeURIComponent(alcoholText)}`;

    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${text}`;

    try{
      const response = await fetch(url);

      if(response.ok){
  block6Form.reset();

  // скрываем анкету
  block6FormWrap.classList.remove("show");

  // можно убрать alert или оставить
  alert("Анкета отправлена");
}else{
        alert("Ошибка отправки");
      }
    }catch(error){
      console.error(error);
      alert("Ошибка сети");
    }
  });
}


// БЛОК 8 — таймер

const countdownDate = new Date("June 17, 2026 00:00:00").getTime();

function updateTimer(){

const now = new Date().getTime();
const distance = countdownDate - now;

if(distance < 0){
document.getElementById("days").textContent = "00";
document.getElementById("hours").textContent = "00";
document.getElementById("minutes").textContent = "00";
document.getElementById("seconds").textContent = "00";
return;
}

const days = Math.floor(distance / (1000 * 60 * 60 * 24));
const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000*60*60));
const minutes = Math.floor((distance % (1000*60*60)) / (1000*60));
const seconds = Math.floor((distance % (1000*60)) / 1000);

document.getElementById("days").textContent = days.toString().padStart(2,'0');
document.getElementById("hours").textContent = hours.toString().padStart(2,'0');
document.getElementById("minutes").textContent = minutes.toString().padStart(2,'0');
document.getElementById("seconds").textContent = seconds.toString().padStart(2,'0');

}

updateTimer();
setInterval(updateTimer, 1000);


// плавное появление блоков при скролле

const revealBlocks = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add("show");
    }
  });
}, {
  threshold: 0.15
});

revealBlocks.forEach(block => {
  revealObserver.observe(block);
});

window.addEventListener("load", () => {
  const firstBlock = document.querySelector(".block1");
  if(firstBlock){
    firstBlock.classList.add("show");
  }
});

// МУЗЫКА

const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

let isPlaying = false;

// попытка автозапуска (сработает не везде)
window.addEventListener("load", () => {
  if(music){
    music.play().then(() => {
      isPlaying = true;
    }).catch(() => {
      // ждём первого клика пользователя
    });
  }
});

// запуск при первом касании (важно для телефона)
document.addEventListener("click", () => {
  if(!isPlaying && music){
    music.play();
    isPlaying = true;
  }
}, { once: true });

// кнопка
if(musicBtn && music){

  musicBtn.addEventListener("click", () => {

    if(music.paused){
      music.play();
      musicBtn.classList.remove("off");
    }else{
      music.pause();
      musicBtn.classList.add("off");
    }

  });

}