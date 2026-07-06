const container = document.querySelector(".items");
const add_item_btn = document.getElementById("add_item_button");
const popUp = document.querySelector(".pop_up")
const cnclPopup = document.querySelector(".cancel_popup_button");
const submit_button = document.getElementById("submit");

function add_item_fun(){
    // const name = document.getElementById("title");
    // const category = document.getElementById("category");
    // const price = document.getElementById("amount");
    // const expense_row = document.createElement("div");
    // const Name = document.createElement("div");
    // const Category = document.createElement("div");
    // const Price = document.createElement("div");
    // const delete_btn = document.createElement("button");
    // const edit_btn = document.createElement("button");
    // Name.textContent = name.value();
    console.log("Submitted succesfully..");

}


add_item_btn.addEventListener("click", ()=>{
    popUp.classList.add("show");
})
cnclPopup.addEventListener("click", ()=>{
    popUp.classList.remove("show");
})
submit_button.addEventListener("click", ()=>{
    add_item_fun();
})














