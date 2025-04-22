document.querySelector(".burger-menu").addEventListener("click", function () {
  // Переключаем класс 'open' у меню
  document.querySelector(".menu").classList.toggle("open");
});

document.addEventListener("DOMContentLoaded", function () {
  const animatedItems = document.querySelectorAll(".animate__animated");

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate__fadeIn"); // fallback, если класс не указан
          entry.target.classList.add("animate__visible"); // просто маркер, что элемент уже был показан
          entry.target.style.visibility = "visible";
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  animatedItems.forEach((item) => {
    // Храним все классы анимации Animate.css, кроме animate__animated и delay
    const animationClasses = Array.from(item.classList).filter(
      (cls) =>
        cls.startsWith("animate__") &&
        cls !== "animate__animated" &&
        !cls.startsWith("animate__delay")
    );

    // Удаляем анимационные классы до появления в зоне видимости
    animationClasses.forEach((cls) => item.classList.remove(cls));

    // Прячем визуально
    item.style.visibility = "hidden";

    // Сохраняем нужную анимацию в data-атрибут
    if (animationClasses.length > 0) {
      item.dataset.animation = animationClasses.join(" ");
    }

    observer.observe(item);
  });
});
