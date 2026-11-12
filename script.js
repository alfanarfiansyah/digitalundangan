
document.addEventListener("DOMContentLoaded", function () {

    // =====================================
    // NAMA TAMU DARI URL
    // =====================================

    const params = new URLSearchParams(window.location.search);
    const guest = params.get("to");

    if (guest) {
        document.getElementById("guestName").textContent =
            guest.replace(/\+/g, " ");
    }


    // =====================================
    // BUKA UNDANGAN
    // =====================================

    const cover = document.getElementById("cover");
    const mainInvitation = document.getElementById("mainInvitation");
    const openButton = document.getElementById("openInvitation");

    openButton.addEventListener("click", function () {

        cover.classList.add("hide");
        mainInvitation.classList.add("show");

        document.body.classList.remove("locked");

        // Coba putar musik setelah interaksi pengguna
        playMusic();

        setTimeout(function () {
            cover.style.display = "none";
        }, 1000);

    });


    // =====================================
    // MUSIK
    // =====================================

    const music = document.getElementById("weddingMusic");
    const musicButton = document.getElementById("musicButton");

    function playMusic() {

        music.play().then(function () {
            musicButton.classList.add("playing");
        }).catch(function () {
            musicButton.classList.remove("playing");
        });

    }

    musicButton.addEventListener("click", function () {

        if (music.paused) {

            playMusic();

        } else {

            music.pause();
            musicButton.classList.remove("playing");

        }

    });


    // =====================================
    // COUNTDOWN PERNIKAHAN
    // =====================================

    // Format tanggal: YYYY-MM-DDTHH:mm:ss+08:00
    const weddingDate = new Date("2026-12-20T08:00:00+08:00").getTime();

    function updateCountdown() {

        const now = new Date().getTime();
        const distance = weddingDate - now;

        if (distance <= 0) {

            document.getElementById("countdown").innerHTML =
                "<h3>Hari Bahagia Telah Tiba ❤️</h3>";

            return;

        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((distance / (1000 * 60)) % 60);
        const seconds = Math.floor((distance / 1000) % 60);

        document.getElementById("days").textContent = days;
        document.getElementById("hours").textContent = String(hours).padStart(2, "0");
        document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
        document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");

    }

    updateCountdown();
    setInterval(updateCountdown, 1000);


    // =====================================
    // GALERI FOTO / LIGHTBOX
    // =====================================

    const galleryImages = Array.from(
        document.querySelectorAll(".gallery-grid img")
    );

    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightboxImage");

    let currentImage = 0;

    window.openGallery = function (image) {

        currentImage = galleryImages.indexOf(image);

        showGalleryImage();

        lightbox.classList.add("active");

        document.body.style.overflow = "hidden";

    };

    function showGalleryImage() {

        lightboxImage.src = galleryImages[currentImage].src;
        lightboxImage.alt = galleryImages[currentImage].alt;

    }

    window.changeGallery = function (direction) {

        currentImage += direction;

        if (currentImage < 0) {
            currentImage = galleryImages.length - 1;
        }

        if (currentImage >= galleryImages.length) {
            currentImage = 0;
        }

        showGalleryImage();

    };

    window.closeGallery = function () {

        lightbox.classList.remove("active");
        document.body.style.overflow = "";

    };

    lightbox.addEventListener("click", function (e) {

        if (e.target === lightbox) {
            window.closeGallery();
        }

    });

    document.addEventListener("keydown", function (e) {

        if (!lightbox.classList.contains("active")) return;

        if (e.key === "Escape") {
            window.closeGallery();
        }

        if (e.key === "ArrowRight") {
            window.changeGallery(1);
        }

        if (e.key === "ArrowLeft") {
            window.changeGallery(-1);
        }

    });


    // =====================================
    // RSVP WHATSAPP
    // =====================================

    const rsvpForm = document.getElementById("rsvpForm");

    // Ganti dengan nomor WhatsApp admin
    const adminWhatsApp = "6281234567890";

    rsvpForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const name = document.getElementById("rsvpName").value.trim();
        const attendance = document.getElementById("attendance").value;
        const guestCount = document.getElementById("guestCount").value;

        const message =
            `Assalamualaikum, saya ingin mengonfirmasi kehadiran.\n\n` +
            `Nama: ${name}\n` +
            `Konfirmasi: ${attendance}\n` +
            `Jumlah tamu: ${guestCount}\n\n` +
            `Terima kasih.`;

        const url =
            "https://wa.me/" + adminWhatsApp +
            "?text=" + encodeURIComponent(message);

        window.open(url, "_blank");

    });


/* ================= COPY WEDDING GIFT ================= */

function copyGift(elementId) {

    const account = document.getElementById(elementId);

    if (!account) return;

    const number = account.innerText.trim();

    navigator.clipboard.writeText(number)
        .then(() => {
            alert("Nomor berhasil disalin: " + number);
        })
        .catch(() => {
            const textarea = document.createElement("textarea");
            textarea.value = number;

            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand("copy");
            textarea.remove();

            alert("Nomor berhasil disalin!");
        });

}



    // =====================================
    // UCAPAN DAN DOA
    // =====================================

    const wishForm = document.getElementById("wishForm");
    const wishList = document.getElementById("wishList");

    wishForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const name = document.getElementById("wishName").value.trim();
        const message = document.getElementById("wishMessage").value.trim();

        if (!name || !message) return;

        const item = document.createElement("div");
        item.className = "wish-item";

        const strong = document.createElement("strong");
        strong.textContent = name;

        const paragraph = document.createElement("p");
        paragraph.textContent = message;

        item.appendChild(strong);
        item.appendChild(paragraph);

        wishList.prepend(item);

        wishForm.reset();

    });


    // =====================================
    // NAVIGASI BOTTOM MOBILE
    // =====================================

    document.querySelectorAll(".bottom-nav a").forEach(function (link) {

        link.addEventListener("click", function () {

            document.querySelectorAll(".bottom-nav a").forEach(function (item) {
                item.style.color = "";
            });

            link.style.color = "#b98580";

        });

    });

});



// ================= WEDDING ANIMATIONS =================

// 1. SCROLL REVEAL

const revealElements = document.querySelectorAll(`
    .section-heading,
    .welcome-content,
    .person-card,
    .countdown-box,
    .event-card,
    .story-item,
    .gallery-grid img,
    .gift-card,
    .gift-intro,
    #rsvpForm,
    #wishForm,
    .closing-content
`);

revealElements.forEach((element, index) => {
    element.classList.add("reveal");

    if (element.matches(".gallery-grid img, .person-card, .event-card, .gift-card")) {
        element.style.transitionDelay = `${(index % 4) * 0.12}s`;
    }
});

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.12
});

revealElements.forEach(element => {
    revealObserver.observe(element);
});


// 2. FALLING FLOWER PETALS

const petalContainer = document.querySelector(".cover-decoration");

if (petalContainer) {
    for (let i = 0; i < 18; i++) {
        const petal = document.createElement("span");

        petal.className = "petal";
        petal.style.left = `${Math.random() * 100}%`;
        petal.style.animationDuration = `${7 + Math.random() * 9}s`;
        petal.style.animationDelay = `${Math.random() * 10}s`;
        petal.style.opacity = `${0.3 + Math.random() * 0.6}`;

        petalContainer.appendChild(petal);
    }
}


// 3. COUNTDOWN NUMBER ANIMATION

const countdownNumbers = document.querySelectorAll(
    ".countdown-box strong"
);

countdownNumbers.forEach(number => {
    number.style.transition = "transform .3s ease";
});


// 4. GALLERY IMAGE HOVER

document.querySelectorAll(".gallery-grid img").forEach(image => {
    image.addEventListener("mouseenter", () => {
        image.style.transform = "scale(1.04)";
    });

    image.addEventListener("mouseleave", () => {
        image.style.transform = "";
    });
});