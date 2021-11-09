const gtForm = document.querySelector(".js-name"),
      gtInput = gtForm.querySelector("input"),
      gretting = document.querySelector(".js-name");

const USER_LS = "currentUser",
    SHOWING_CN = "showing";

function saveName(name){
    localStorage.setItem(USER_LS, name);
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = gtInput.value;
    paintGretting(currentValue);
    saveName(currentValue);
}

function askForName(){
    gtForm.classList.add(SHOWING_CN);
    gtForm.addEventListener("submit", handleSubmit);
}

function paintGretting(text){
    gtForm.classList.remove(SHOWING_CN);
    gretting.classList.add(SHOWING_CN);
    gretting.innerText = `Hello ${text}`;
}

function loadName(){
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null) {
        askForName();
    } else {
        paintGretting(currentUser);
    }
}
function init(){
    loadName();
}
init();