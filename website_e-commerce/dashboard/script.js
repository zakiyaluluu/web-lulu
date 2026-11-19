document.addEventListener("DOMContentLoaded", function () {

    /* =========================
       SIDEBAR MOBILE
    ========================= */

    const sidebar = document.querySelector(".sidebar");
    const overlay = document.querySelector(".sidebar-overlay");
    const menuToggle = document.querySelector(".menu-toggle");
    const sidebarClose = document.querySelector(".sidebar-close");

    function openSidebar() {
        if (sidebar) sidebar.classList.add("active");
        if (overlay) overlay.classList.add("active");
        document.body.style.overflow = "hidden";
    }

    function closeSidebar() {
        if (sidebar) sidebar.classList.remove("active");
        if (overlay) overlay.classList.remove("active");
        document.body.style.overflow = "";
    }

    if (menuToggle) {
        menuToggle.addEventListener("click", openSidebar);
    }

    if (sidebarClose) {
        sidebarClose.addEventListener("click", closeSidebar);
    }

    if (overlay) {
        overlay.addEventListener("click", closeSidebar);
    }


    /* =========================
       NAVIGATION
    ========================= */

    const navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            navLinks.forEach(function (item) {
                item.classList.remove("active");
            });

            this.classList.add("active");

            if (window.innerWidth <= 768) {
                closeSidebar();
            }
        });

    });


    /* =========================
       SEARCH
    ========================= */

    const searchInput = document.querySelector("#globalSearch");

    if (searchInput) {

        searchInput.addEventListener("input", function () {

            const keyword = this.value.toLowerCase().trim();

            /* Search order */
            const rows = document.querySelectorAll(
                ".recents-orders tbody tr"
            );

            rows.forEach(function (row) {

                const text = row.textContent.toLowerCase();

                row.style.display =
                    text.includes(keyword) ? "" : "none";

            });

            /* Search products */
            const products = document.querySelectorAll(
                ".dashboard-product"
            );

            products.forEach(function (product) {

                const text = product.textContent.toLowerCase();

                product.style.display =
                    text.includes(keyword) ? "" : "none";

            });

        });

    }


    /* =========================
       CTRL + K SEARCH
    ========================= */

    document.addEventListener("keydown", function (event) {

        if (
            (event.ctrlKey || event.metaKey) &&
            event.key.toLowerCase() === "k"
        ) {

            event.preventDefault();

            if (searchInput) {
                searchInput.focus();
            }

        }

        if (event.key === "Escape") {
            closeSidebar();

            if (searchInput) {
                searchInput.blur();
            }
        }

    });


    /* =========================
       TOAST MESSAGE
    ========================= */

    function showToast(message) {

        const oldToast =
            document.querySelector(".maison-toast");

        if (oldToast) {
            oldToast.remove();
        }

        const toast = document.createElement("div");

        toast.className = "maison-toast";

        toast.innerHTML = `
            <i class="fa-solid fa-circle-check"></i>
            <span>${message}</span>
        `;

        document.body.appendChild(toast);

        setTimeout(function () {

            toast.classList.add("hide");

            setTimeout(function () {
                toast.remove();
            }, 300);

        }, 2500);
    }


    /* =========================
       NOTIFICATION
    ========================= */

    const notificationButton =
        document.querySelector(".icon-button");

    let notificationPopup = null;

    if (notificationButton) {

        notificationButton.addEventListener("click", function (event) {

            event.stopPropagation();

            if (notificationPopup) {

                notificationPopup.remove();
                notificationPopup = null;

                return;
            }

            notificationPopup =
                document.createElement("div");

            notificationPopup.className =
                "notification-popup";

            notificationPopup.innerHTML = `
                <div class="notification-header">
                    <strong>Notifications</strong>
                    <span>3 new</span>
                </div>

                <div class="notification-item">
                    <i class="fa-solid fa-box"></i>

                    <div>
                        <strong>New Order</strong>
                        <span>Pesanan baru telah masuk.</span>
                    </div>
                </div>

                <div class="notification-item">
                    <i class="fa-solid fa-user"></i>

                    <div>
                        <strong>New Customer</strong>
                        <span>Pelanggan baru terdaftar.</span>
                    </div>
                </div>

                <div class="notification-item">
                    <i class="fa-solid fa-chart-line"></i>

                    <div>
                        <strong>Sales Update</strong>
                        <span>Penjualan mengalami peningkatan.</span>
                    </div>
                </div>
            `;

            document.body.appendChild(notificationPopup);

            const rect =
                notificationButton.getBoundingClientRect();

            notificationPopup.style.position = "fixed";
            notificationPopup.style.top =
                rect.bottom + 10 + "px";
            notificationPopup.style.right = "25px";
            notificationPopup.style.zIndex = "3000";

        });

    }


    /* =========================
       CLOSE NOTIFICATION
    ========================= */

    document.addEventListener("click", function (event) {

        if (
            notificationPopup &&
            !notificationPopup.contains(event.target) &&
            !notificationButton?.contains(event.target)
        ) {

            notificationPopup.remove();
            notificationPopup = null;

        }

    });


    /* =========================
       EXPORT DATA
    ========================= */

    const exportButton =
        document.querySelector(".export-btn");

    if (exportButton) {

        exportButton.addEventListener("click", function () {

            const rows = document.querySelectorAll(
                ".recents-orders table tr"
            );

            if (!rows.length) {
                showToast("Data pesanan tidak ditemukan.");
                return;
            }

            let csv = [];

            rows.forEach(function (row) {

                const columns =
                    row.querySelectorAll("th, td");

                let rowData = [];

                columns.forEach(function (column) {

                    const text = column.innerText
                        .replace(/\n/g, " ")
                        .replace(/"/g, '""');

                    rowData.push(`"${text}"`);

                });

                csv.push(rowData.join(","));

            });

            const blob = new Blob(
                [csv.join("\n")],
                {
                    type: "text/csv;charset=utf-8;"
                }
            );

            const url =
                URL.createObjectURL(blob);

            const link =
                document.createElement("a");

            link.href = url;
            link.download = "LV-Maison-Orders.csv";

            document.body.appendChild(link);

            link.click();

            link.remove();

            URL.revokeObjectURL(url);

            showToast(
                "Data pesanan berhasil diekspor."
            );

        });

    }


    /* =========================
       ADD PRODUCT
    ========================= */

    const addProductButton =
        document.querySelector(".add-product");

    if (addProductButton) {

        addProductButton.addEventListener(
            "click",
            function () {

                showToast(
                    "Fitur tambah produk siap digunakan."
                );

            }
        );

    }


    /* =========================
       VIEW ALL PRODUCTS
    ========================= */

    const viewProducts =
        document.querySelector(".view-products");

    if (viewProducts) {

        viewProducts.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                const productSection =
                    document.querySelector(".top-products");

                if (productSection) {

                    productSection.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

            }
        );

    }


    /* =========================
       MORE BUTTON
    ========================= */

    const moreButtons =
        document.querySelectorAll(".more-btn");

    moreButtons.forEach(function (button) {

        button.addEventListener("click", function (event) {

            event.stopPropagation();

            document
                .querySelectorAll(".more-menu")
                .forEach(function (menu) {
                    menu.remove();
                });

            const menu =
                document.createElement("div");

            menu.className = "more-menu";

            menu.innerHTML = `
                <button data-action="view">
                    <i class="fa-regular fa-eye"></i>
                    View Details
                </button>

                <button data-action="edit">
                    <i class="fa-regular fa-pen-to-square"></i>
                    Edit
                </button>

                <button data-action="export">
                    <i class="fa-solid fa-download"></i>
                    Export
                </button>
            `;

            document.body.appendChild(menu);

            const rect =
                button.getBoundingClientRect();

            menu.style.position = "fixed";
            menu.style.top =
                rect.bottom + 5 + "px";
            menu.style.left =
                rect.left - 110 + "px";
            menu.style.zIndex = "4000";

            menu.querySelectorAll("button")
                .forEach(function (item) {

                    item.addEventListener(
                        "click",
                        function () {

                            const action =
                                this.dataset.action;

                            if (action === "view") {
                                showToast(
                                    "Detail pesanan dibuka."
                                );
                            }

                            if (action === "edit") {
                                showToast(
                                    "Mode edit dipilih."
                                );
                            }

                            if (action === "export") {
                                showToast(
                                    "Data sedang dipersiapkan."
                                );
                            }

                            menu.remove();

                        }
                    );

                });

        });

    });


    /* =========================
       CLOSE MORE MENU
    ========================= */

    document.addEventListener("click", function () {

        document
            .querySelectorAll(".more-menu")
            .forEach(function (menu) {
                menu.remove();
            });

    });


    /* =========================
       SALES CHART
    ========================= */

    const chartCanvas =
        document.querySelector("#salesChart");

    const chartPeriod =
        document.querySelector("#chartPeriod");

    let salesChart = null;


    function createSalesChart(period) {

        if (
            !chartCanvas ||
            typeof Chart === "undefined"
        ) {
            return;
        }

        if (salesChart) {
            salesChart.destroy();
        }

        let labels = [];
        let data = [];

        /* 7 Days */

        if (period === "7") {

            labels = [
                "Mon",
                "Tue",
                "Wed",
                "Thu",
                "Fri",
                "Sat",
                "Sun"
            ];

            data = [
                18,
                25,
                21,
                34,
                29,
                42,
                38
            ];

        }

        /* 30 Days */

        else if (period === "30") {

            labels = [
                "Week 1",
                "Week 2",
                "Week 3",
                "Week 4"
            ];

            data = [
                82,
                105,
                94,
                128
            ];

        }

        /* 12 Months */

        else {

            labels = [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec"
            ];

            data = [
                82,
                96,
                105,
                91,
                118,
                127,
                114,
                139,
                151,
                143,
                164,
                178
            ];

        }


        salesChart = new Chart(
            chartCanvas,
            {
                type: "line",

                data: {

                    labels: labels,

                    datasets: [
                        {
                            label: "Sales",

                            data: data,

                            borderColor: "#b08a4a",

                            backgroundColor:
                                "rgba(176, 138, 74, 0.08)",

                            borderWidth: 2,

                            pointRadius: 3,

                            pointHoverRadius: 5,

                            pointBackgroundColor:
                                "#b08a4a",

                            pointBorderColor:
                                "#ffffff",

                            pointBorderWidth: 2,

                            tension: 0.4,

                            fill: true
                        }
                    ]

                },

                options: {

                    responsive: true,

                    maintainAspectRatio: false,

                    plugins: {

                        legend: {
                            display: false
                        }

                    },

                    scales: {

                        x: {

                            grid: {
                                display: false
                            },

                            ticks: {
                                color: "#999188",

                                font: {
                                    size: 9
                                }
                            }

                        },

                        y: {

                            beginAtZero: true,

                            grid: {
                                color: "#eee8dc"
                            },

                            ticks: {
                                color: "#999188",

                                font: {
                                    size: 9
                                }
                            }

                        }

                    }

                }

            }
        );

    }


    if (chartCanvas) {
        createSalesChart("7");
    }


    /* =========================
       CHANGE CHART PERIOD
    ========================= */

    if (chartPeriod) {

        chartPeriod.addEventListener(
            "change",
            function () {

                createSalesChart(this.value);

                showToast(
                    "Periode grafik berhasil diubah."
                );

            }
        );

    }


    /* =========================
       TABLE CLICK
    ========================= */

    const tableRows =
        document.querySelectorAll(
            ".recents-orders tbody tr"
        );

    tableRows.forEach(function (row) {

        row.style.cursor = "pointer";

        row.addEventListener(
            "click",
            function (event) {

                if (
                    event.target.closest("button") ||
                    event.target.closest("a")
                ) {
                    return;
                }

                showToast(
                    "Pesanan dipilih."
                );

            }
        );

    });


    /* =========================
       CURRENT DATE
    ========================= */

    const eyebrow =
        document.querySelector(".welcome .eyebrow");

    if (eyebrow) {

        const today = new Date();

        const date =
            today.toLocaleDateString(
                "en-US",
                {
                    month: "long",
                    day: "numeric",
                    year: "numeric"
                }
            );

        eyebrow.textContent =
            "OVERVIEW • " + date;

    }


    /* =========================
       WINDOW RESIZE
    ========================= */

    window.addEventListener(
        "resize",
        function () {

            if (window.innerWidth > 768) {
                closeSidebar();
            }

        }
    );

});