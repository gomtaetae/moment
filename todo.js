const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos';

//데이터를 삭제후 재할당이 필요하므로 let을 사용했다.
let toDos = [];

/*
//filterFn는 toDo의 id가 1인 li를 필터링 하는 테스트용 함수
function filterFn(toDo){
    return toDo.id === 1;
}
*/

function deleteToDo(event){
    //console.log(event.target.parentNode); //log를 이용해 삭제되어야할 정보를 찾는다. li 전체를 지워야함
    //console.dir(event.target);  //dir, target을 사용해서 li의 parentNode를 찾았다.
    //parentNode를 log로 출력하고 x버튼을 누르면 li의 정보가 뜨는것을 확인.
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);   //여기까지 실행하면 버튼을 누르면 삭제되지만 정보는 남아있어 새로고침하면 다시 생김.
    const cleanToDos = toDos.filter(function(toDo){
        //console.log(toDo.id, li.id); //확인해보면 toDo는 숫자 li는 string이다. 그러므로 li를 int로 바꿔준다.
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos; //toDos를 삭제된후인 cleanToDos로 바꿔준다.
    saveToDos();    //삭제되고 다시 바뀐 toDos를 저장해준다.
    //console.log(cleanToDos);
}

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
    delBtn.addEventListener("click", deleteToDo);
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