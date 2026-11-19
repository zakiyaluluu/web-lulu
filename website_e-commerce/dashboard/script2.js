```javascript
document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       ELEMENTS
    ========================================= */

    const registerForm = document.getElementById("registerForm");

    const fullname = document.getElementById("fullname");
    const email = document.getElementById("email");

    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");

    const togglePassword = document.getElementById("togglePassword");
    const toggleConfirmPassword =
        document.getElementById("toggleConfirmPassword");

    const terms = document.getElementById("terms");

    const registerButton =
        document.querySelector(".register-button");

    const socialButton =
        document.querySelector(".social-button");


    /* =========================================
       SHOW / HIDE PASSWORD
    ========================================= */

    function togglePasswordVisibility(input, button) {

        if (!input || !button) return;

        const icon = button.querySelector("i");

        if (input.type === "password") {

            input.type = "text";

            icon.classList.remove("fa-eye");
            icon.classList.add("fa-eye-slash");

            button.setAttribute(
                "aria-label",
                "Hide password"
            );

        } else {

            input.type = "password";

            icon.classList.remove("fa-eye-slash");
            icon.classList.add("fa-eye");

            button.setAttribute(
                "aria-label",
                "Show password"
            );
        }
    }


    if (togglePassword) {

        togglePassword.addEventListener("click", () => {

            togglePasswordVisibility(
                password,
                togglePassword
            );

        });

    }


    if (toggleConfirmPassword) {

        toggleConfirmPassword.addEventListener("click", () => {

            togglePasswordVisibility(
                confirmPassword,
                toggleConfirmPassword
            );

        });

    }


    /* =========================================
       INPUT VALIDATION STYLE
    ========================================= */

    function setError(input) {

        const box = input.closest(".input-box");

        if (box) {

            box.classList.remove("success");
            box.classList.add("error");

        }
    }


    function setSuccess(input) {

        const box = input.closest(".input-box");

        if (box) {

            box.classList.remove("error");
            box.classList.add("success");

        }
    }


    function clearValidation(input) {

        const box = input.closest(".input-box");

        if (box) {

            box.classList.remove("error");
            box.classList.remove("success");

        }
    }


    /* =========================================
       FULL NAME VALIDATION
    ========================================= */

    fullname.addEventListener("input", () => {

        const value = fullname.value.trim();

        if (value.length >= 3) {

            setSuccess(fullname);

        } else {

            clearValidation(fullname);

        }

    });


    /* =========================================
       EMAIL VALIDATION
    ========================================= */

    email.addEventListener("input", () => {

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        const value
```
