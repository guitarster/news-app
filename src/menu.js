export function activatePanel() {
  const panel = document.getElementById("infoPanel");
  const openBtn = document.querySelector(".menu__info");
  const closeBtn = document.getElementById("closeInfo");

  openBtn.addEventListener("click", () => {
    panel.classList.add("panel__active");
  });

  closeBtn.addEventListener("click", () => {
    panel.classList.remove("panel__active");
  });
}
