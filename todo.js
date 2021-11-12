

const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");
    toDoBt = document.querySelector("button");
    toDo = document.querySelector(".js-toDo");

const TODOS_LS = 'toDos';

//데이터를 삭제후 재할당이 필요하므로 let을 사용했다.
let toDos = [];
// let chkList = toDoList.children[0]
// console.log(chkList);
/*
//filterFn는 toDo의 id가 1인 li를 필터링 하는 테스트용 함수
function filterFn(toDo){
    return toDo.id === 1;
}
*/

function checkBox(event){
    const clickBox = event.target.parentElement;    //span의 부모 li의 class 리스트를 가져옴
    // clickBox.classList.toggle("strikeout");      //li의 class에 strikeout를 추가/제거
    if(clickBox.className === ""){
        clickBox.className = "strikeout"
    }else{
        clickBox.className = ""
    }

    // const checkLine = toDos.join(function(toDo){
    //     if(clickBox.classList ===)
    // })
    console.log("wait", clickBox.className);
    console.log("not", clickBox.classList);
    // console.log(DOMTokenList());
    // const mmm = toDoList.getParameter("");
    // console.log("test", mmm);
    //취소선 저장부분 미완
    // const clickText = clickBox
    // console.dir(clickText);

    // console.log(clickBox.classList.value);
    // const saved = toDos.filter(function(toDo){
    //     if(clickBox.className === "js-list"){
    //         toDo.class = "js-list"
    //     }else{
    //         toDo.class = "strikeout"
    //     }
    // })
    // toDos = saved
    // saveToDos();
    // const saved = localStorage.getItem(TODOS_LS)
    // if(saved){
    //     const parsed = JSON.parse(saved);
    //     toDos = parsed;
    //     parsed.forEach(paintToDo);
    // }
    // for(var i=0; i<toDos.length; i++){
    //     var test1 = toDos[i];
    //     console.log(test1.class);
    // }
    
    
}



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

function editTodo(event){
    const edit = event.target;
    const editLi = edit.parentNode;
    const test1 = edit.parentElement;
    console.log("몰까", editLi);
    console.dir(TODOS_LS);
    console.log("이거 투두",toDoList.appendChild(test1));
    //.getParameter("") 사용해서 input값 받아와도 될듯
    
}


function saveToDos(){
    //자바스크립트는 localStorage에 있는 모든 데이터를 string으로 저장하려고 한다.
    //JSON객체를 string으로 저장해주기위해 JSON.stringify를 사용한다
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const editBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    const chkBtn = document.createElement("input");     //input을 생성
    const liClass = li.className;
    // console.log("wait");
    console.dir(liClass);
    chkBtn.setAttribute("type", "checkbox");            //생성한 input에 type="checkbox" 추가
    chkBtn.setAttribute("class", "btn-chk");            //class="btn-chk"를 추가
    chkBtn.addEventListener("click", checkBox);
    delBtn.innerText = "del";
    delBtn.addEventListener("click", deleteToDo);
    editBtn.innerText = "edit";
    editBtn.addEventListener("click", editTodo);
    span.innerText = text;
    li.appendChild(chkBtn);     //li 추가시 checkbox, text, delButton을 같이생성
    li.appendChild(span);
    li.appendChild(delBtn);
    li.appendChild(editBtn);
    li.id = newId;
    li.className = liClass;
    toDoList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId,
        class: liClass
    };
    toDos.push(toDoObj);
    saveToDos(); 
}

function moreMenu(){
    document.write(`<script type='text/javascript' src='listMenu.js'></script>`)    //import, export를 사용못해서 이렇게 불러왔다.

}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    saveToDos(currentValue);
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
        //console.log(loadedToDos);
        //loadedToDos를 log로 보면 string 값으로 출력된다.
        //string객체를 JSON객체로 변환 시켜주기위해 JSON.parse를 사용했다.
        const parsedToDos = JSON.parse(loadedToDos);
        //console.log(parsedToDos);
        //forEach로 array에 있는 것들을 각각 한번씩 함수를 실행시켜준다.
        parsedToDos.forEach(function(toDo){
            paintToDo(toDo.text);
            saveToDos(toDo.text);
        });
    }
}


function onDisplay(){
    //처음에 showId에 const를 사용해 계속 오류가 났다.
    //getElementByClassName에서는 style을 찾을 수 없다하여서 getElementById를 사용하였다. -> 다시 querySelector로 바꿈
    //안되는이유를 찾지못함....
    let showId = document.querySelector(".js-toDo").style.opacity;  //display대신 opacity를 사용해 ease-in-out 효과를 적용

    if(showId === ""){      //""을 none으로 설정해주면 새로고침시 두번클릭해야 작동한다
        document.querySelector(".js-toDo").style.opacity = "1";
    }else{
        document.querySelector(".js-toDo").style.opacity = "";
    }
}


function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
    toDoBt.addEventListener("click", onDisplay);
}

init();