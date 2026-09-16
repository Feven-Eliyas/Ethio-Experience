const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", function () {
    navLinks.classList.toggle("active");

    if (navLinks.classList.contains("active")) {
        menuBtn.textContent = "✕";
    } else {
        menuBtn.textContent = "☰";
    }
});

// =========================================
// BACK TO TOP
// =========================================
const topButton = document.createElement("button");
topButton.className = "scroll-top";
topButton.type = "button";
topButton.setAttribute("aria-label", "Back to top");
topButton.textContent = "↑";
document.body.appendChild(topButton);

window.addEventListener("scroll", () => {
    topButton.classList.toggle("show", window.scrollY > 400);
});

topButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// =========================================
// COMMUNITY FORM VALIDATION
// =========================================
const forms = document.querySelectorAll(".community-hub form");

forms.forEach(form => {
    form.addEventListener("submit", event => {
        event.preventDefault();

        const fields = [...form.querySelectorAll("input, textarea")];
        const emptyField = fields.find(field => !field.value.trim());

        let message = form.querySelector(".form-message");
        if (!message) {
            message = document.createElement("p");
            message.className = "form-message";
            form.appendChild(message);
        }

        if (emptyField) {
            message.textContent = "Please fill in this field before submitting.";
            emptyField.focus();
            return;
        }

        message.textContent = "Thanks! Your response is ready to be submitted.";
        form.reset();
    });
});
/* =========================
   DARK MODE
========================= */

const themeBtn = document.getElementById("themeBtn");

if (themeBtn) {

    themeBtn.addEventListener("click", function () {

        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {
            themeBtn.textContent = "☀️";
        } else {
            themeBtn.textContent = "🌙";
        }

    });

}

const searchInput = document.getElementById("topicSearch");
const clearSearch = document.getElementById("clearSearch");
const searchStatus = document.getElementById("searchStatus");

if (searchInput) {

    searchInput.addEventListener("input", function () {

        const searchWord = searchInput.value
            .toLowerCase()
            .trim();

        const tables = document.querySelectorAll("#maths table");

        let found = 0;

        tables.forEach(function (table) {

            // Get every row in the table
            const rows = table.querySelectorAll("tr");

            let tableHasMatch = false;

            rows.forEach(function (row, index) {

                // Always keep the table header
                if (index === 0) {
                    return;
                }

                const text = row.textContent.toLowerCase();

                if (searchWord === "" || text.includes(searchWord)) {

                    row.style.display = "";
                    tableHasMatch = true;
                    found++;

                } else {

                    row.style.display = "none";

                }

            });

            // Show/hide the table
            if (searchWord === "" || tableHasMatch) {
                table.style.display = "";
            } else {
                table.style.display = "none";
            }

        });

        // Show result count
        if (searchStatus) {

            if (searchWord === "") {
                searchStatus.textContent = "";
            } else {
                searchStatus.textContent =
                    found + " matching topic(s) found";
            }

        }

    });


    // Clear button
    if (clearSearch) {

        clearSearch.addEventListener("click", function () {

            searchInput.value = "";

            const tables =
                document.querySelectorAll("#maths table");

            tables.forEach(function (table) {

                table.style.display = "";

                table.querySelectorAll("tr").forEach(function (row) {
                    row.style.display = "";
                });

            });

            if (searchStatus) {
                searchStatus.textContent = "";
            }

            searchInput.focus();

        });

    }

}
