console.log("js started");

const container = document.querySelector(".items");
const add_item_btn = document.getElementById("add_item_button");
const popUp = document.querySelector(".pop_up");
const cnclPopup = document.querySelector(".cancel_popup_button");
const submit_button = document.getElementById("submit");
const expenseListDiv = document.getElementById("expenseListDiv");
const totalExpenseSpace = document.querySelector(".Total-Expense");
const expenseList = JSON.parse(localStorage.getItem("expenses")) || [];
let editIndex = null;
let totalExpense = 0;

// ---------------- TOTAL ----------------
function updateTotal() {
    totalExpense = expenseList.reduce((sum, expense) => {
        return sum + parseInt(expense.expense_amount || 0);
    }, 0);

    totalExpenseSpace.innerHTML = `<span>Total : ₹ ${totalExpense}</span>`;
}

loadExpenses();
updateTotal();

function loadExpenses() {
    expenseListDiv.innerHTML = "";

    expenseList.forEach((expense, index) => {
        displayExpense(expense, index);
    });
}

function displayExpense(expense, index) {

    const row = document.createElement("div");
    row.className = "expense";

    row.innerHTML = `
        <span>${expense.expense_name}</span>
        <span>${expense.expense_category}</span>
        <span>₹ ${expense.expense_amount}</span>
        <button data-index="${index}" class="delete-btn">Delete</button>
        <button data-index="${index}" class="edit-btn">Edit</button>
        <div class="date">${expense.expense_date}</div>
    `;

    expenseListDiv.appendChild(row);

    // Delete
    row.querySelector(".delete-btn").addEventListener("click", (e) => {
        const isConfirm = confirm("Are you sure you want to delete expense?");

        if (isConfirm) {
            const index = e.target.dataset.index;
            expenseList.splice(index, 1);
            localStorage.setItem(
                "expenses",
                JSON.stringify(expenseList)
            );
            loadExpenses();
            updateTotal();
        }
    });

    // Edit
    row.querySelector(".edit-btn").addEventListener("click", () => {
        edit_expense(expense, index);
    });
}

function edit_expense(expense, index) {
    editIndex = index;

    popUp.classList.add("show");

    document.getElementById("title").value = expense.expense_name;
    document.getElementById("amount").value = expense.expense_amount;
    document.getElementById("category").value = expense.expense_category;
}

function add_item_fun() {

    let name = document.getElementById("title").value;
    let amount = document.getElementById("amount").value;
    let category = document.getElementById("category").value;

    if (amount.trim() === "") amount = 0;

    const expense = {
        expense_name: name,
        expense_amount: amount,
        expense_category: category,

        expense_date:
            editIndex === null
                ? new Date().toLocaleString("en-IN")
                : expenseList[editIndex].expense_date
    };

    if (editIndex === null) {
        expenseList.push(expense);
    } else {
        expenseList[editIndex] = expense;
    }

    localStorage.setItem(
        "expenses",
        JSON.stringify(expenseList)
    );

    loadExpenses();
    updateTotal();

    document.getElementById("title").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("category").selectedIndex = 0;
    editIndex = null;
}

add_item_btn.addEventListener("click", () => {
    editIndex = null;
    popUp.classList.add("show");

});

cnclPopup.addEventListener("click", () => {

    document.getElementById("title").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("category").selectedIndex = 0;

    popUp.classList.remove("show");
});

submit_button.addEventListener("click", () => {

    add_item_fun();
    popUp.classList.remove("show");

});

const deleteAllBtn = document.getElementById("delete_all_button");

deleteAllBtn.addEventListener("click", () => {

    const isConfirm = confirm("Are you sure you want to delete all expenses?");

    if (isConfirm) {
        expenseList.length = 0;
        localStorage.removeItem("expenses");
        loadExpenses();
        updateTotal();
    }
});