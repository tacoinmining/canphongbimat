const body = document.body;
const lightSwitch = document.getElementById("lightSwitch");
const switchText = document.getElementById("switchText");
const ransomModal = document.getElementById("ransomModal");
const trappedModal = document.getElementById("trappedModal");
const fakeWarning = document.getElementById("fakeWarning");
const modalContent = document.querySelector(".modal-content");
const prankAudio = document.getElementById("prankAudio");
const lofiOverlay = document.getElementById("lofiOverlay");
const rainContainer = document.getElementById("rainContainer");

let isLightOn = false;

const warningMessages = [
  "⚠️ Tính lươn lẹo à? Chuyển tiền ngay!",
  "🤨 Định bùng phí mở đèn cơ à? Không dễ thế đâu!",
  "💸 Hệ thống quét chưa thấy tiền về tài khoản!",
  "🛑 Thử bấm 'Chưa chuyển tiền' lần nữa xem có tắt được đèn không nhé!",
  "🤡 Cố chấp quá! Mau quét mã chuyển khoản đi bạn ơi!",
];

function handleToggle() {
  if (!isLightOn) {
    body.classList.remove("dark-mode");
    body.classList.add("light-mode");
    switchText.innerText = "Tắt đèn";
    isLightOn = true;
  } else {
    lightSwitch.checked = true;
    fakeWarning.innerText = "";
    ransomModal.style.display = "flex";
  }
}

function handleNotYet() {
  const randomMsg =
    warningMessages[Math.floor(Math.random() * warningMessages.length)];
  fakeWarning.innerText = randomMsg;

  modalContent.classList.remove("shake-effect");
  void modalContent.offsetWidth;
  modalContent.classList.add("shake-effect");
}

function handleTransferDone() {
  ransomModal.style.display = "none";
  trappedModal.style.display = "flex";

  if (prankAudio) {
    prankAudio.currentTime = 0;
    prankAudio.play().catch((e) => {
      console.log("Trình duyệt chặn tự động phát nhạc:", e);
    });
  }
}

function closePrankPopupOnly() {
  trappedModal.style.display = "none";
  lofiOverlay.style.display = "flex";
  startRainEffect();
}

function startRainEffect() {
  // Thêm nhiều icon tuyết, mưa, nốt nhạc, sao sáng đa dạng
  const symbols = ["❄️", "💧", "🎵", "✨", "🎶", "❄️", "🌧️"];

  // Tăng tần suất xuất hiện hạt (rơi dày đặc hơn)
  setInterval(() => {
    const drop = document.createElement("div");
    drop.classList.add("rain-drop");
    drop.innerText = symbols[Math.floor(Math.random() * symbols.length)];
    drop.style.left = Math.random() * window.innerWidth + "px";
    drop.style.animationDuration = Math.random() * 2 + 1.5 + "s"; // Rơi nhanh và mượt hơn (từ 1.5 đến 3.5 giây)
    drop.style.fontSize = Math.random() * 1.2 + 0.8 + "rem";

    rainContainer.appendChild(drop);

    setTimeout(() => {
      drop.remove();
    }, 4000);
  }, 60); // Cứ mỗi 60 mili-giây lại thả một đợt hiệu ứng xuống
}
