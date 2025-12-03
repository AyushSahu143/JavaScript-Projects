//Storage for objects of transactions
let transactions = [];
let expenseChart = null;

function loadTransactions() {
  const stored = localStorage.getItem("transactions");
  if (stored) {
    transactions = JSON.parse(stored);
    updateUI();
  }
}

//Grabbing elements by their neck ;)
const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");
const descinput = document.getElementById("text");
const amountIn = document.getElementById("amount");
const addBtn = document.getElementById("add-btn");
const history = document.getElementById("list");

loadTransactions();

// Check for empty inputs and others
function initialize() {
  descinput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      amountIn.focus();
    }
  });

  amountIn.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addBtn.click();
    }
  });
}

//Add transaction button
addBtn.addEventListener("click", addTransaction);

initialize();

function addTransaction() {
  const description = descinput.value.trim();
  console.log(description);
  const amt = Number(amountIn.value);
  console.log(amt);

  if (description === "" || amt === 0) return;

  const transaction = {
    id: Date.now(),
    info: description,
    amount: amt,
  };

  transactions.push(transaction);
  localStorage.setItem("transactions", JSON.stringify(transactions));

  updateUI();

  descinput.value = "";
  amountIn.value = "";
  descinput.focus();
}

//update the UI logic
function updateUI() {
  const totals = calcTotals();

  income.textContent = `₹${totals.incomeVal}`;
  expense.textContent = `₹${totals.expenseVal}`;
  balance.textContent = `₹${totals.balanceVal}`;

  updateHistory();
  updateChart(totals);
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

//calculate data
function calcTotals() {
  let incomeVal = 0;
  let expenseVal = 0;

  transactions.forEach((t) => {
    if (t.amount > 0) {
      incomeVal += t.amount;
    } else {
      expenseVal += Math.abs(t.amount);
    }
  });
  const balanceVal = incomeVal - expenseVal;
  return { incomeVal, expenseVal, balanceVal };
}

// Transaction history
function updateHistory() {
  history.innerHTML = "";

  transactions.forEach((t) => {
    const li = document.createElement("li");

    li.classList.add(t.amount > 0 ? "plus" : "minus");
    li.innerHTML = `
        <span>${t.info}</span>
        <span>${t.amount > 0 ? "+" : "-"}₹${Math.abs(t.amount)}</span>
        <button class="del-btn" data-id="${t.id}">✖</button>
    `;

        li.querySelector(".del-btn").addEventListener("click", () => {
      deleteTransaction(t.id);
    });
    
    history.appendChild(li);
  });
}

//Delete Transaction logic
function deleteTransaction(id) {
    transactions = transactions.filter(t => t.id !== id);
    localStorage.setItem("transactions", JSON.stringify(transactions));
    updateUI();
}


//Pie CHART OR analysis
function updateChart(totals) {
  const ctx = document.getElementById("expense-chart");

  if (expenseChart !== null) {
    expenseChart.destroy();
  }

  expenseChart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["Income", "Expense"],
      datasets: [
        {
          data: [totals.incomeVal, totals.expenseVal],
          backgroundColor: ["#00c853", "#d50000"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
    },
  });
}
