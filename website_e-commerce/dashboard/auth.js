document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       PASSWORD SHOW / HIDE
       ===================================================== */

    const passwordToggles = document.querySelectorAll(".password-toggle");

    passwordToggles.forEach((toggle) => {

        toggle.addEventListener("click", () => {

            const targetId = toggle.dataset.target;
            const passwordInput = document.getElementById(targetId);
            const icon = toggle.querySelector("i");

            if (!passwordInput) return;

            if (passwordInput.type === "password") {

                passwordInput.type = "text";

                icon.classList.remove("fa-eye");
                icon.classList.add("fa-eye-slash");

                toggle.setAttribute("aria-label", "Hide password");

            } else {

                passwordInput.type = "password";

                icon.classList.remove("fa-eye-slash");
                icon.classList.add("fa-eye");

                toggle.setAttribute("aria-label", "Show password");
            }

        });

    });


    /* =====================================================
       LOGIN FORM
       ===================================================== */

    const loginForm = document.getElementById("loginForm");

    if (loginForm) {

        loginForm.addEventListener("submit", (event) => {

            event.preventDefault();

            const emailInput = document.getElementById("loginEmail");
            const passwordInput = document.getElementById("loginPassword");

            const email = emailInput.value.trim();
            const password = passwordInput.value.trim();

            /* Validasi email */

            if (email === "") {
                showMessage("Silakan masukkan email Anda.", "error");
                emailInput.focus();
                return;
            }

            if (!isValidEmail(email)) {
                showMessage("Format email tidak valid.", "error");
                emailInput.focus();
                return;
            }

            /* Validasi password */

            if (password === "") {
                showMessage("Silakan masukkan password Anda.", "error");
                passwordInput.focus();
                return;
            }

            if (password.length < 6) {
                showMessage(
                    "Password harus memiliki minimal 6 karakter.",
                    "error"
                );
                passwordInput.focus();
                return;
            }


            /* =================================================
               TOMBOL LOADING
               ================================================= */

            const button = loginForm.querySelector(".auth-button");
            const buttonText = button.querySelector("span");
            const buttonIcon = button.querySelector("i");

            button.disabled = true;

            buttonText.textContent = "Signing In...";
            
            buttonIcon.classList.remove("fa-arrow-right");
            buttonIcon.classList.add("fa-spinner", "fa-spin");


            /* =================================================
               SIMULASI PROSES LOGIN
               ================================================= */

            setTimeout(() => {

                button.disabled = false;

                buttonText.textContent = "Sign In";

                buttonIcon.classList.remove(
                    "fa-spinner",
                    "fa-spin"
                );

                buttonIcon.classList.add("fa-arrow-right");


                /*
                 * LOGIN DEMO
                 *
                 * Untuk sementara semua email dan password
                 * yang memenuhi validasi dianggap berhasil.
                 *
                 * Nanti bagian ini bisa dihubungkan ke database.
                 */

                showMessage(
                    "Login berhasil! Selamat datang di LV Maison.",
                    "success"
                );


                /* Redirect ke dashboard */

                setTimeout(() => {

                    window.location.href = "dashboard.html";

                }, 1200);

            }, 1200);

        });

    }


    /* =====================================================
       EMAIL VALIDATION
       ===================================================== */

    function isValidEmail(email) {

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return emailPattern.test(email);

    }


    /* =====================================================
       MESSAGE NOTIFICATION
       ===================================================== */

    function showMessage(message, type) {

        let messageBox =
            document.querySelector(".auth-message");

        if (!messageBox) {

            messageBox = document.createElement("div");

            messageBox.className = "auth-message";

            loginForm.prepend(messageBox);

        }

        messageBox.textContent = message;

        messageBox.className =
            `auth-message ${type}`;

        messageBox.style.opacity = "1";

        messageBox.style.transform = "translateY(0)";


        /* Hapus otomatis */

        setTimeout(() => {

            messageBox.style.opacity = "0";
            messageBox.style.transform =
                "translateY(-5px)";

        }, 3500);

    }


    /* =====================================================
       REMEMBER ME
       ===================================================== */

    const rememberCheckbox =
        document.querySelector(
            '.remember input[type="checkbox"]'
        );

    const emailInput =
        document.getElementById("loginEmail");


    /* Ambil email yang tersimpan */

    const savedEmail =
        localStorage.getItem("lvMaisonEmail");

    if (savedEmail && emailInput) {

        emailInput.value = savedEmail;

        if (rememberCheckbox) {
            rememberCheckbox.checked = true;
        }

    }


    /* Simpan / hapus email */

    if (rememberCheckbox) {

        rememberCheckbox.addEventListener(
            "change",
            () => {

                if (rememberCheckbox.checked) {

                    if (emailInput.value.trim() !== "") {

                        localStorage.setItem(
                            "lvMaisonEmail",
                            emailInput.value.trim()
                        );

                    }

                } else {

                    localStorage.removeItem(
                        "lvMaisonEmail"
                    );

                }

            }
        );

    }


    /* =====================================================
       FORGOT PASSWORD
       ===================================================== */

    const forgotPassword =
        document.querySelector(".forgot");

    if (forgotPassword) {

        forgotPassword.addEventListener("click", (event) => {

            event.preventDefault();

            showMessage(
                "Fitur reset password akan segera tersedia.",
                "success"
            );

        });

    }


    /* =====================================================
       GOOGLE BUTTON
       ===================================================== */

    const googleButton =
        document.querySelector(".google-button");

    if (googleButton) {

        googleButton.addEventListener("click", () => {

            showMessage(
                "Login dengan Google akan segera tersedia.",
                "success"
            );

        });

    }


    /* =====================================================
       INPUT ANIMATION
       ===================================================== */

    const inputs =
        document.querySelectorAll(
            ".input-wrapper input"
        );

    inputs.forEach((input) => {

        input.addEventListener("focus", () => {

            input.parentElement.classList.add(
                "input-focused"
            );

        });

        input.addEventListener("blur", () => {

            input.parentElement.classList.remove(
                "input-focused"
            );

        });

    });

});