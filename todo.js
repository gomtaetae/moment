const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos';

const toDos = [];

function saveToDos(){
    //자바스크립트는 localStorage에 있는 모든 데이터를 string으로 저장하려고 한다.
    //string 대신 object로 저장해주기위해 JSON.stringify를 사용한다?(반대인거 같음)
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    delBtn.innerText = "❌";
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId 
    };
    toDos.push(toDoObj);
    saveToDos(); 
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

/*
//parsedToDos.forEach(someThing)을 이용하면 함수를 밖으로 빼줄수 있다.
function someThing(toDo){
   console.log(toDo.text);
}
*/

function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){
        console.log(loadedToDos);
        //loadedToDos를 log로 보면 string 값으로 출력된다.
        //string 대신 object로 변환 시켜주기위해 JSON.parse를 사용했다.
        const parsedToDos = JSON.parse(loadedToDos);
        console.log(parsedToDos);
        //forEach로 array에 있는 것들을 각각 한번씩 함수를 실행시켜준다.
        parsedToDos.forEach(function(toDo){
            paintToDo(toDo.text);
        });
    }
}
function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();