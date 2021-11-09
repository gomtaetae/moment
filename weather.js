const weather = document.querySelector(".js-weather")

const API_KEY = "1cbbb11fc1bfac759acc5499f29a9647" //날씨 정보가져오는 API
const COORDS = 'coords';

function getWeather(lat, lng){
    fetch(
        //openweathermap 사이트에서 가져온 코드이다.
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    ).then(function(response){  //then을 사용하게 되면 데이터가 완전히 들어온 뒤에 호출을 할 수 있다.(데이터가 로딩중에 호출되는 것을 방지할 수 있다.)
        return response.json();//console.log(response);  //log로 response에 데이터가 있다는 것을 확인
    })
    .then(function(json) {
        //console.log("제이슨",json);  //원하는 데이터 가져오는것을 확인 가능
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `${temperature} & ${place}`
    })
}

//내 위치를 저장하기
function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position){
    //console.log(position);
    //경도와 위도
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,  //latitude: latitude, 변수와 key이름이 같으면 하나로 써도 무방하다.
        longitude  //longitude: longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoErro(){
    console.log('Cant access geo location');
}


function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoErro);
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    } else {
        //string이어서 object로 변환
        const parseCoords = JSON.parse(loadedCoords);
        console.log(parseCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude)
    }
}

function init(){
    loadCoords();
}

init();