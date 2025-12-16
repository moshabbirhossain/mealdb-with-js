const jumpBtnElement = document.getElementById("jump-btn");

window.addEventListener("scroll", () => {
    if (
        document.body.scrollTop > 50 ||
        document.documentElement.scrollTop > 50
    ) {
        jumpBtnElement.classList.remove("hidden");
    } else {
        jumpBtnElement.classList.add("hidden");
    }
});

jumpBtnElement.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
});
