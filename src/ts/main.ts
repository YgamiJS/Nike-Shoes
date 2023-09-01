import type { ISale } from "../types";
import sales from "../data/sale.json";
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

const shoeSlider = document.querySelector(".slider .slider__wrapper") as HTMLDivElement;
const shoeSliderControl = document.querySelector(".slider__control") as HTMLDivElement;
let activeshoeIndex = 0;

function ListShoe(shoes: ISale[]) {
  shoes.forEach(
    (shoe) =>
      (shoeSlider.innerHTML += `
        <div class="slider__slide">
          <div class="discount">
            <span class="discount__content">${shoe.discount}% off</span>
          </div>
          <svg
            class="slider__arrow"
            width="40"
            height="111"
            viewBox="0 0 40 111"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M23.3504 0.466012C24.1517 0.255642 24.9718 0.734662 25.1822 1.53593L28.6103 14.5934C28.8207 15.3947 28.3417 16.2148 27.5404 16.4251C26.7392 16.6355 25.9191 16.1565 25.7087 15.3552L22.6614 3.74858L11.0548 6.79585C10.2535 7.00622 9.4334 6.5272 9.22303 5.72593C9.01266 4.92466 9.49168 4.10456 10.293 3.89419L23.3504 0.466012ZM38.9082 110.947C19.9682 109.22 9.19396 101.427 4.00273 90.4385C-1.1194 79.5964 -0.640858 65.971 2.10384 52.8422C4.85756 39.6703 9.94622 26.7491 14.3285 17.1457C16.5223 12.338 18.5453 8.34863 20.0211 5.55879C20.7591 4.16364 21.3606 3.06784 21.7787 2.31901C21.9877 1.94457 22.151 1.65684 22.2625 1.46175C22.3182 1.3642 22.3611 1.28981 22.3903 1.23932C22.4048 1.21408 22.416 1.19481 22.4237 1.18161C22.4275 1.175 22.4305 1.16992 22.4326 1.16636C22.4336 1.16459 22.4345 1.16307 22.435 1.16218C22.4357 1.16104 22.4361 1.16029 23.7313 1.91684C25.0266 2.67339 25.0266 2.67341 25.0263 2.67381C25.026 2.67445 25.0255 2.67524 25.0247 2.67652C25.0232 2.67909 25.0209 2.68319 25.0176 2.6888C25.0111 2.70001 25.0011 2.71728 24.9877 2.74049C24.9608 2.78693 24.9204 2.85719 24.867 2.95052C24.7603 3.13719 24.602 3.41615 24.3981 3.78146C23.9902 4.51211 23.3995 5.58798 22.6729 6.96158C21.2194 9.70924 19.2232 13.6456 17.0577 18.3912C12.7213 27.8942 7.7303 40.5892 5.04036 53.4561C2.3414 66.3661 2.01225 79.2021 6.71525 89.157C11.3492 98.9656 21.0329 106.305 39.1806 107.959L38.9082 110.947Z"
              fill="#A8E892"
            />
          </svg>
          <img class="slider__img" src=${shoe.img} alt="Nike" />
        </div>
    `)
  );
}

function ListShoeVariants(shoes: ISale[]) {
  shoes.forEach((shoe, index) => {
    shoeSliderControl.innerHTML += `
        <div class="slider__shoe-variant ${
          index == activeshoeIndex ? "slider__shoe-variant_active" : ""
        }" data-id=${index}>
          <img class="slider__shoe-variant-img" src=${shoe.img} alt="Nike" />
        </div>
    `;
  });
}

function changeColorLine(color: ISale["color"]) {
  const line = document.querySelector(".header__line") as SVGElement;

  line.setAttribute("fill", color);
}

shoeSliderControl.addEventListener("click", (e) => {
  const target = (e.target as HTMLDivElement).closest(".slider__shoe-variant") as HTMLDivElement;

  if (target.classList.contains(".slider__control")) return;

  const scrollTarget = document.querySelector(`.slider__slide[data-id="${target.dataset.id!}"]`);
  activeshoeIndex = +target.dataset.id!;

  changeColorLine(sales[activeshoeIndex].color as ISale["color"]);

  scrollTarget?.scrollIntoView({ behavior: "smooth" });
});

ListShoe(sales as ISale[]);
ListShoeVariants(sales as ISale[]);