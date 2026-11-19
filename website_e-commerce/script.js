document.addEventListener("DOMContentLoaded", () => {

    /* ========================================
       ELEMENT
    ======================================== */

    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("navMenu");

    const cartButton = document.getElementById("cartButton");
    const cartPanel = document.getElementById("cartPanel");
    const closeCart = document.getElementById("closeCart");
    const overlay = document.getElementById("overlay");

    const cartCount = document.getElementById("cartCount");
    const cartItems = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");
    const checkoutButton = document.getElementById("checkoutButton");

    const searchInput = document.getElementById("searchInput");
    const productGrid = document.getElementById("productGrid");
    const emptyProduct = document.getElementById("emptyProduct");

    const categoryButtons =
        document.querySelectorAll(".category-btn");

    const products =
        document.querySelectorAll(".product-card");

    const wishlistButtons =
        document.querySelectorAll(".wishlist");

    const addCartButtons =
        document.querySelectorAll(".add-cart");


    /* ========================================
       CART DATA
    ======================================== */

    let cart = JSON.parse(
        localStorage.getItem("louisVuittonCart")
    ) || [];


    let currentCategory = "all";


    /* ========================================
       FORMAT RUPIAH
    ======================================== */

    function formatRupiah(number) {

        return new Intl.NumberFormat(
            "id-ID",
            {
                style: "currency",
                currency: "IDR",
                maximumFractionDigits: 0
            }
        ).format(number);

    }


    /* ========================================
       SAVE CART
    ======================================== */

    function saveCart() {

        localStorage.setItem(
            "louisVuittonCart",
            JSON.stringify(cart)
        );

    }


    /* ========================================
       UPDATE CART COUNT
    ======================================== */

    function updateCartCount() {

        const totalQuantity = cart.reduce(
            (total, item) => total + item.quantity,
            0
        );

        cartCount.textContent = totalQuantity;

    }


    /* ========================================
       HAMBURGER MENU
    ======================================== */

    if (hamburger && navMenu) {

        hamburger.addEventListener("click", () => {

            navMenu.classList.toggle("show");

            hamburger.classList.toggle("active");

            const isOpen =
                navMenu.classList.contains("show");

            hamburger.setAttribute(
                "aria-expanded",
                isOpen
            );

        });


        /* Tutup menu setelah link diklik */

        navMenu.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                navMenu.classList.remove("show");

                hamburger.classList.remove("active");

                hamburger.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });

    }


    /* ========================================
       OPEN CART
    ======================================== */

    function openCart() {

        cartPanel.classList.add("open");

        overlay.classList.add("show");

        document.body.classList.add("no-scroll");

    }


    /* ========================================
       CLOSE CART
    ======================================== */

    function closeCartPanel() {

        cartPanel.classList.remove("open");

        overlay.classList.remove("show");

        document.body.classList.remove("no-scroll");

    }


    /* ========================================
       CART EVENTS
    ======================================== */

    cartButton.addEventListener(
        "click",
        openCart
    );

    closeCart.addEventListener(
        "click",
        closeCartPanel
    );

    overlay.addEventListener(
        "click",
        closeCartPanel
    );


    /* ========================================
       WISHLIST
    ======================================== */

    wishlistButtons.forEach(button => {

        button.addEventListener("click", (event) => {

            event.preventDefault();

            event.stopPropagation();

            button.classList.toggle("liked");

            const icon =
                button.querySelector("i");

            if (!icon) return;


            if (button.classList.contains("liked")) {

                icon.classList.remove(
                    "fa-regular"
                );

                icon.classList.add(
                    "fa-solid"
                );

                button.setAttribute(
                    "aria-label",
                    "Hapus dari wishlist"
                );

            } else {

                icon.classList.remove(
                    "fa-solid"
                );

                icon.classList.add(
                    "fa-regular"
                );

                button.setAttribute(
                    "aria-label",
                    "Tambah ke wishlist"
                );

            }

        });

    });


    /* ========================================
       ADD TO CART
    ======================================== */

    addCartButtons.forEach(button => {

        button.addEventListener("click", (event) => {

            event.preventDefault();

            event.stopPropagation();


            const productName =
                button.dataset.product;

            const price =
                Number(button.dataset.price);


            if (!productName || !price) {
                return;
            }


            /* Cari produk yang sudah ada */

            const existingProduct =
                cart.find(
                    item => item.product === productName
                );


            if (existingProduct) {

                existingProduct.quantity += 1;

            } else {

                cart.push({
                    product: productName,
                    price: price,
                    quantity: 1
                });

            }


            saveCart();

            renderCart();

            updateCartCount();


            /* Animasi tombol */

            const icon =
                button.querySelector("i");

            button.classList.add("added");


            if (icon) {

                icon.classList.remove(
                    "fa-plus"
                );

                icon.classList.add(
                    "fa-check"
                );

            }


            setTimeout(() => {

                button.classList.remove("added");

                if (icon) {

                    icon.classList.remove(
                        "fa-check"
                    );

                    icon.classList.add(
                        "fa-plus"
                    );

                }

            }, 800);


            /* Buka cart */

            openCart();

        });

    });


    /* ========================================
       RENDER CART
    ======================================== */

    function renderCart() {

        if (cart.length === 0) {

            cartItems.innerHTML = `
                <div class="empty-cart">
                    <i class="fa-solid fa-bag-shopping"></i>

                    <h4>
                        Your bag is empty
                    </h4>

                    <p>
                        Tambahkan produk favoritmu.
                    </p>
                </div>
            `;

            cartTotal.textContent =
                formatRupiah(0);

            updateCartCount();

            return;
        }


        cartItems.innerHTML = cart.map(
            (item, index) => {

                return `
                    <div class="cart-item">

                        <div>
                            <h4>
                                ${item.product}
                            </h4>

                            <p>
                                ${formatRupiah(item.price)}
                            </p>
                        </div>

                        <div class="cart-item-actions">

                            <div class="quantity-controls">

                                <button
                                    type="button"
                                    class="quantity-minus"
                                    data-index="${index}"
                                    aria-label="Kurangi jumlah"
                                >
                                    <i class="fa-solid fa-minus"></i>
                                </button>

                                <span>
                                    ${item.quantity}
                                </span>

                                <button
                                    type="button"
                                    class="quantity-plus"
                                    data-index="${index}"
                                    aria-label="Tambah jumlah"
                                >
                                    <i class="fa-solid fa-plus"></i>
                                </button>

                            </div>

                            <button
                                type="button"
                                class="remove-item"
                                data-index="${index}"
                                aria-label="Hapus produk"
                            >
                                <i class="fa-solid fa-trash"></i>
                            </button>

                        </div>

                    </div>
                `;

            }
        ).join("");


        /* Total */

        const total = cart.reduce(
            (sum, item) =>
                sum + (item.price * item.quantity),
            0
        );


        cartTotal.textContent =
            formatRupiah(total);


        updateCartCount();


        /* ========================================
           QUANTITY MINUS
        ======================================== */

        document
            .querySelectorAll(".quantity-minus")
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        const index =
                            Number(button.dataset.index);

                        if (
                            cart[index] &&
                            cart[index].quantity > 1
                        ) {

                            cart[index].quantity -= 1;

                        } else {

                            cart.splice(index, 1);

                        }

                        saveCart();

                        renderCart();

                    }
                );

            });


        /* ========================================
           QUANTITY PLUS
        ======================================== */

        document
            .querySelectorAll(".quantity-plus")
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        const index =
                            Number(button.dataset.index);

                        if (cart[index]) {

                            cart[index].quantity += 1;

                        }

                        saveCart();

                        renderCart();

                    }
                );

            });


        /* ========================================
           REMOVE ITEM
        ======================================== */

        document
            .querySelectorAll(".remove-item")
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        const index =
                            Number(button.dataset.index);

                        cart.splice(index, 1);

                        saveCart();

                        renderCart();

                    }
                );

            });

    }


    /* ========================================
       FILTER PRODUCTS
    ======================================== */

    function filterProducts() {

        const searchTerm =
            searchInput.value
                .toLowerCase()
                .trim();


        let visibleProducts = 0;


        products.forEach(product => {

            const name =
                product.dataset.name
                    .toLowerCase();

            const category =
                product.dataset.category;


            const matchesSearch =
                name.includes(searchTerm);


            const matchesCategory =
                currentCategory === "all" ||
                category === currentCategory;


            if (
                matchesSearch &&
                matchesCategory
            ) {

                product.classList.remove("hide");

                visibleProducts++;

            } else {

                product.classList.add("hide");

            }

        });


        /* Tampilkan empty state */

        if (visibleProducts === 0) {

            emptyProduct.classList.add("show");

        } else {

            emptyProduct.classList.remove("show");

        }

    }


    /* ========================================
       CATEGORY BUTTON
    ======================================== */

    categoryButtons.forEach(button => {

        button.addEventListener("click", () => {

            categoryButtons.forEach(btn => {

                btn.classList.remove("active");

            });


            button.classList.add("active");


            currentCategory =
                button.dataset.filter;


            filterProducts();

        });

    });


    /* ========================================
       SEARCH
    ======================================== */

    searchInput.addEventListener(
        "input",
        filterProducts
    );


    /* ========================================
       CHECKOUT
    ======================================== */

    checkoutButton.addEventListener(
        "click",
        () => {

            if (cart.length === 0) {

                alert(
                    "Keranjang kamu masih kosong."
                );

                return;
            }


            const total = cart.reduce(
                (sum, item) =>
                    sum + (item.price * item.quantity),
                0
            );


            alert(
                `Terima kasih!\n\nTotal belanja kamu: ${formatRupiah(total)}\n\nFitur pembayaran dapat dihubungkan ke sistem pembayaran nantinya.`
            );

        }
    );


    /* ========================================
       SMOOTH SCROLL
    ======================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    const targetId =
                        link.getAttribute("href");

                    if (
                        !targetId ||
                        targetId === "#"
                    ) {
                        return;
                    }


                    const target =
                        document.querySelector(targetId);


                    if (target) {

                        event.preventDefault();


                        target.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    }

                }
            );

        });


    /* ========================================
       ESCAPE
    ======================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {

                closeCartPanel();

                navMenu?.classList.remove("show");

                hamburger?.classList.remove("active");

            }

        }
    );


    /* ========================================
       NAVBAR ACTIVE LINK
    ======================================== */

    const sections =
        document.querySelectorAll("section[id]");

    const navLinks =
        document.querySelectorAll(".nav-menu a");


    window.addEventListener(
        "scroll",
        () => {

            let currentSection = "home";


            sections.forEach(section => {

                const sectionTop =
                    section.offsetTop - 120;

                if (
                    window.scrollY >= sectionTop
                ) {

                    currentSection =
                        section.getAttribute("id");

                }

            });


            navLinks.forEach(link => {

                link.classList.remove("active");


                const href =
                    link.getAttribute("href");


                if (
                    href === `#${currentSection}`
                ) {

                    link.classList.add("active");

                }

            });

        }
    );


    /* ========================================
       INITIALIZE
    ======================================== */

    renderCart();

    updateCartCount();

    filterProducts();

});