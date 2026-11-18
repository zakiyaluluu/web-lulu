// Mobile Navbar 

const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
    menu.classList.toggle("active");
});


// Smooth Scrolling

document.querySelectorAll("a").forEach((link) => {

    link.addEventListener("click", function (e) {

        if (this.hash !== "") {

            e.preventDefault();

            document.querySelector(this.hash).scrollIntoView({
                behavior: "smooth"
            });

        }

    });

});