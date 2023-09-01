import "@/scss/index.scss";

const checkbox = document.getElementById("checkbox-burger") as HTMLInputElement;
const menu = document.querySelector(".menu") as HTMLUListElement;

menu.addEventListener("click", () => (checkbox.checked = !checkbox.checked));

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    e.preventDefault();

    document.querySelector((e.target as HTMLLinkElement)?.getAttribute("href")!)?.scrollIntoView({
      behavior: "smooth",
    });
  });
});
