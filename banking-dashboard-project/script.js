// ===============================
// Banking Dashboard Pro
// ===============================

// Elements
const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");

const amount = document.getElementById("amount");
const search = document.getElementById("search");

const depositBtn = document.getElementById("depositBtn");
const withdrawBtn = document.getElementById("withdrawBtn");

const history = document.getElementById("history");

// Load saved transactions
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

// ===============================
// Save Data
// ===============================
function saveData() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

// ===============================
// Update Summary
// ===============================
function updateSummary() {
  const totalIncome = transactions.reduce(function (total, transaction) {
    if (transaction.amount > 0) {
      return total + transaction.amount;
    }

    return total;
  }, 0);

  const totalExpense = transactions.reduce(function (total, transaction) {
    if (transaction.amount < 0) {
      return total + Math.abs(transaction.amount);
    }

    return total;
  }, 0);

  const totalBalance = totalIncome - totalExpense;

  income.textContent = `$${totalIncome.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

  expense.textContent = `$${totalExpense.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

  balance.textContent = `$${totalBalance.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

// ===============================
// Display Transactions
// ===============================
function displayTransactions(searchText = "") {
  history.innerHTML = "";

  const filteredTransactions = transactions.filter(function (transaction) {
    return transaction.type.toLowerCase().includes(searchText.toLowerCase());
  });

  filteredTransactions
    .slice()
    .reverse()
    .forEach(function (transaction) {
      const item = document.createElement("div");

      item.classList.add("transaction");

      item.innerHTML = `
                <div>
                    <strong>${transaction.type}</strong><br>
                    <small>${transaction.date}</small>
                </div>

                <div class="right">

                    <span class="${transaction.amount > 0 ? "deposit" : "withdraw"}">
                        ${transaction.amount > 0 ? "+" : "-"}$${Math.abs(
                          transaction.amount,
                        ).toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                    </span>

                    <button class="delete-btn" data-id="${transaction.id}">
                        🗑️ Delete
                    </button>

                </div>
            `;

      history.appendChild(item);

      const deleteBtn = item.querySelector(".delete-btn");

      deleteBtn.addEventListener("click", function () {
        const id = Number(deleteBtn.dataset.id);

        transactions = transactions.filter(function (transaction) {
          return transaction.id !== id;
        });

        saveData();
        displayTransactions(search.value);
        updateSummary();
      });
    });
}

// ===============================
// Deposit
// ===============================
depositBtn.addEventListener("click", function () {
  const money = Number(amount.value);

  if (money <= 0 || isNaN(money)) {
    alert("Please enter a valid amount.");
    return;
  }

  transactions.push({
    id: Date.now(),
    type: "Deposit",
    amount: money,
    date: new Date().toLocaleString(),
  });

  saveData();
  displayTransactions(search.value);
  updateSummary();

  amount.value = "";
});

// ===============================
// Withdraw
// ===============================
withdrawBtn.addEventListener("click", function () {
  const money = Number(amount.value);

  if (money <= 0 || isNaN(money)) {
    alert("Please enter a valid amount.");
    return;
  }

  const totalBalance = transactions.reduce(function (total, transaction) {
    return total + transaction.amount;
  }, 0);

  if (money > totalBalance) {
    alert("Insufficient balance.");
    return;
  }

  transactions.push({
    id: Date.now(),
    type: "Withdraw",
    amount: -money,
    date: new Date().toLocaleString(),
  });

  saveData();
  displayTransactions(search.value);
  updateSummary();

  amount.value = "";
});

// ===============================
// Search
// ===============================
search.addEventListener("input", function () {
  displayTransactions(search.value);
});

// ===============================
// Start App
// ===============================
displayTransactions();
updateSummary();
