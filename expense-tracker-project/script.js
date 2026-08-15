const description = document.getElementById("description");
const amount = document.getElementById("amount");
const addBtn = document.getElementById("addBtn");
const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");
const searchInput = document.getElementById("searchInput");
const transactionList = document.getElementById("transactionList");
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
// Display all transactions
function displayTransactions() {
  transactionList.innerHTML = "";

  const searchText = searchInput.value.toLowerCase();

  transactions.forEach(function (transaction, index) {
    if (!transaction.description.toLowerCase().includes(searchText)) {
      return;
    }
    const item = document.createElement("div");
    item.classList.add("transaction");

    item.innerHTML = `
    <small>${transaction.date}</small>
    <p><strong>${transaction.description}</strong></p>
    <p>$${transaction.amount}</p>
    <button class="delete-btn">🗑️ Delete</button>
`;

    const deleteBtn = item.querySelector(".delete-btn");

    deleteBtn.addEventListener("click", function () {
      transactions.splice(index, 1);

      localStorage.setItem("transactions", JSON.stringify(transactions));

      displayTransactions();
      updateBalance();
    });

    transactionList.appendChild(item);
  });
}

// Update balance
function updateBalance() {
  let total = 0;
  let incomeTotal = 0;
  let expenseTotal = 0;

  transactions.forEach(function (transaction) {
    total += transaction.amount;

    if (transaction.amount > 0) {
      incomeTotal += transaction.amount;
    } else {
      expenseTotal += Math.abs(transaction.amount);
    }
  });

  balance.textContent = "Balance: $" + total.toFixed(2);
  income.textContent = "🟢 Income: $" + incomeTotal.toFixed(2);
  expense.textContent = "🔴 Expense: $" + expenseTotal.toFixed(2);
}

// Add new transaction
addBtn.addEventListener("click", function () {
  const text = description.value.trim();
  const money = Number(amount.value);

  if (text === "" || amount.value === "") {
    alert("Please enter a description and an amount.");
    return;
  }

  const transaction = {
    description: text,
    amount: money,
    date: new Date().toLocaleString(),
  };

  transactions.push(transaction);

  localStorage.setItem("transactions", JSON.stringify(transactions));

  displayTransactions();
  updateBalance();
});

// Load transactions when page opens
displayTransactions();
updateBalance();

searchInput.addEventListener("input", function () {
  displayTransactions();
});
