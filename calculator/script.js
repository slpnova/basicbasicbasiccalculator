document.addEventListener("DOMContentLoaded", () => {
    const resultField = document.getElementById("result");
    const historyList = document.getElementById("history");

    // Klavye ile giriş
    document.addEventListener("keydown", (e) => {
        const resultField = document.getElementById("result");
        const allowedKeys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "+", "-", "*", "/", "%"];

        if (allowedKeys.includes(e.key)) {
            e.preventDefault();
            // Prevent entering the same number or operator twice in a row
            const lastChar = resultField.value.slice(-1);
            const operators = ["+", "-", "*", "/", "%", "." ,"%"];
            if (
                (e.key >= "0" && e.key <= "9" && lastChar === e.key) ||
                (operators.includes(e.key) && operators.includes(lastChar))
            ) {
                // Do nothing if same number or operator is entered twice
                return;
            }
            resultField.value += e.key;
        } else if (e.key === "Enter") {
            
            calculateResult();
        } else if (e.key === "Backspace") {
            e.preventDefault();
            backspace();
        } else if (e.key === "Escape") {
            resultField.value = '';
        }
    });

    // Butonlara tıklama
    document.querySelectorAll(".calc-btn").forEach(button => {
        button.addEventListener("click", () => {
            const value = button.getAttribute("data-value");
            e.preventDefault();

            if (value === "C") { 
                resultField.value = "";
                historyList.innerHTML = ""; // Tüm geçmişi de sil
            } else if (value === "=") {
                calculateResult();
            } else if (value === "back") {
                backspace();
            } else {
                appendToResult(value);
            }
        });
    });
});

function appendToResult(value) {
    const resultField = document.getElementById("result");
    resultField.value += value;
}

function backspace() {
    const resultField = document.getElementById("result");
    resultField.value = resultField.value.slice(0, -1);
}

function calculateResult() {
    const resultField = document.getElementById("result");
    const historyList = document.getElementById("history");

    try {
        const expression = resultField.value;
        const result = eval(expression);

        resultField.value = result;

        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";
        li.innerHTML = `
            <span>${expression} = ${result}</span>
            <span class="delete-btn">&times;</span>
        `;

        // Silme butonuna animasyonlu işlem
        li.querySelector(".delete-btn").addEventListener("click", () => {
            li.classList.add("fade-out");
            setTimeout(() => li.remove(), 500);
        });

        historyList.prepend(li);
    } catch (e) {
        resultField.value = "Hata";
        resultField.classList.add("is-invalid");
    }
}













