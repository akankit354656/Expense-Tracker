console.log("js started");
const container = document.querySelector(".items");
const add_item_btn = document.getElementById("add_item_button");
const popUp = document.querySelector(".pop_up")
const cnclPopup = document.querySelector(".cancel_popup_button");
const submit_button = document.getElementById("submit");
const expenseListDiv = document.getElementById("expenseListDiv");
// const expenseList = [];
const expenseList = JSON.parse(localStorage.getItem("expenses")) || [];
expenseList.forEach((expense, index) => {
    displayExpense(expense, index);
});

function displayExpense(expense, index){
    const row = document.createElement("div");
    row.className = "expense";
    row.innerHTML = `
    <span>${expense.expense_name}</span>
    <span>${expense.expense_category}</span>
    <span>₹ ${expense.expense_amount}</span>
    <button id=${index} >Delete</button>
    <button >Edit</button>
    `;
    expenseListDiv.appendChild(row);
    document.getElementById(`${index}`).addEventListener("click", ()=>{
        console.log("Delete clicked", index);
        expenseList.splice(index, 1);
        localStorage.setItem(
            "expenses",
            JSON.stringify(expenseList)
        );
    });
}

function add_item_fun(){

    let name = document.getElementById("title").value;
    let amount = document.getElementById("amount").value;
    let category = document.getElementById("category").value;
    const expense = {
        expense_name : name,
        expense_amount : amount,
        expense_category : category
    };
    expenseList.push(expense);
    localStorage.setItem(
        "expenses",
        JSON.stringify(expenseList)
    );
   
    displayExpense(expense);

}

add_item_btn.addEventListener("click", ()=>{
    popUp.classList.add("show");
})
cnclPopup.addEventListener("click", ()=>{
    popUp.classList.remove("show");
})
submit_button.addEventListener("click", ()=>{
    add_item_fun();
    popUp.classList.remove("show");
})

