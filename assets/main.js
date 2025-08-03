//============================ Filter =============================
const filter_tabs = document.querySelectorAll(".filter-btn");
const filter_contents = document.querySelectorAll(".filter [data-content]");

filter_tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        const target = document.querySelector(tab.dataset.target);

        filter_contents.forEach((fc) =>{
            fc.classList.remove("active");
        });

        target.classList.add("active");

        filter_tabs.forEach((tab) => {
            fc.classList.remove("active");
        });

        target.classList.add("active");
    });
});

//=============== Theme =================
const theme_btn = document.getElementById("theme-btn");

theme_btn.addEventListener("click",() => {
    const body = document.querySelector("body");
    body.classList.toggle("dark-theme");
    
    //change icon
    theme_btn.classList.toggle("ri-moon-line"); // moon icon
    theme_btn.classList.toggle("ri-sun-line"); // sun icon

});

//===== Scroll Reveral Animation =======
const sr = ScrollReval ({
    origin: "top",
    distance: "600px",
    duration: 2500,
    delay: 400,
});

sr.reval('.profile-data .imgBx');
sr.reval('.profile-data .name', {delay: 500});
sr.reval('.profile-data .profession', {delay: 600});
sr.reval('.profile-data .socials', {delay:700});
sr.reval('.profile-info', {interval:100, delay: 600});
sr.reval('.profile-btns', {delay: 800});
sr.reval('.profile-tabs', {delay: 900});
sr.reval('.profile-sections', {delay: 1000});

