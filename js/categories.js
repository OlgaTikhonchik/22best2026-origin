document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll(".categories__list li");
  const items = document.querySelectorAll(".categories__list-desk > li");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selected = button.textContent.trim();

      items.forEach((item) => {
        const category = item.getAttribute("data-category");

        if (
          selected === "All" ||
          category?.toLowerCase() === selected.toLowerCase()
        ) {
          item.style.display = "";
        } else {
          item.style.display = "none";
        }
      });

      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
    });
  });
});


// document.addEventListener("DOMContentLoaded", function () {
//   const filterButtons = document.querySelectorAll(".categories__list li");
//   // const items = document.querySelectorAll(".categories__list-nominate > li");
//    const items = document.querySelectorAll(".categories__list-all .categories__list-nominate > li");

//   filterButtons.forEach((button) => {
//     button.addEventListener("click", () => {
//       const selected = button.textContent.trim();

//       items.forEach((item) => {
//         const category = item.getAttribute("data-category");

//         if (
//           selected === "All" ||
//           category?.toLowerCase() === selected.toLowerCase()
//         ) {
//           item.style.display = "";
//         } else {
//           item.style.display = "none";
//         }
//       });

//       filterButtons.forEach((btn) => btn.classList.remove("active"));
//       button.classList.add("active");
//     });
//   });
// });

document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll(".categories__list li");
  const categoryGroups = document.querySelectorAll(".categories__list-all > li");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selected = button.textContent.trim();

      categoryGroups.forEach((group) => {
        const groupTitle = group.querySelector("h3")?.textContent.trim();

        if (selected === "All" || groupTitle?.toLowerCase() === selected.toLowerCase()) {
          group.style.display = "";
        } else {
          group.style.display = "none";
        }
      });

      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
    });
  });
});
