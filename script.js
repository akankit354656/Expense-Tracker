const container = document.querySelector(".items");
const add_item_btn = document.getElementById("add_item_button");
const popUp = document.querySelector(".pop_up")
const cnclPopup = document.querySelector(".cancel_popup_button");

add_item_btn.addEventListener("click", ()=>{
    popUp.classList.add("show");
})
cnclPopup.addEventListener("click", ()=>{
    popUp.classList.remove("show");
})
















