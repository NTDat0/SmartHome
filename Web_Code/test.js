function showContent(room) {
    // Hide all room contents
    const contents = document.querySelectorAll('.room-content');
    contents.forEach(content => content.style.display = 'none');

    // Show selected room content
    const selectedRoom = document.getElementById(room);
    if (selectedRoom) {
        if (room = 'livingroom'){
            selectedRoom.style.display = 'grid';
        } else{
        selectedRoom.style.display = 'block'
        }
    }
}

const firebaseConfig = {
    apiKey: "AIzaSyC63uf1mxrpp0l9kYgJ0JeDRF0i0usUCDA",
    authDomain: "testhtml-2a632.firebaseapp.com",
    databaseURL: "https://testhtml-2a632-default-rtdb.firebaseio.com",
    projectId: "testhtml-2a632",
    storageBucket: "testhtml-2a632.appspot.com",
    messagingSenderId: "424230708069",
    appId: "1:424230708069:web:5f1db0b0d5a10c9d88378c",
    measurementId: "G-7DJRS7HNDY"
};  

firebase.initializeApp(firebaseConfig);
// JS kitchen temp
function updateWeatherImage(temperature) {  // Thêm tham số temperature
    const temperatureElement = document.getElementById('KTTemperature');
    const weatherImage = document.getElementById('anhthoitiet');
    temperatureElement.textContent = temperature;
    if (temperature < 25) {
        weatherImage.src = 'images/cold.png';
        weatherImage.alt = 'cold';
    } else if (temperature >= 25 && temperature <= 35) {
        weatherImage.src = 'images/warm.png';
        weatherImage.alt = 'warm';
    } else {
        weatherImage.src = 'images/hot.png';
        weatherImage.alt = 'hot';
    }
}

function listenToFirebase() {
    const dbRef = firebase.database().ref('kitchen/temperature');
    dbRef.on('value', (snapshot) => {
        const temperature = snapshot.val();
        updateWeatherImage(temperature);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    listenToFirebase();
});
// end JS kitchen temp
// JS humility 
const database = firebase.database();
const humidityRef = database.ref('kitchen/humidity');
humidityRef.on('value', (snapshot) => {
    const humidity = snapshot.val();
    document.getElementById('KThumidity').textContent = humidity;
});
//end JS humility
// js gas
function framecolor(gas_var) {
    const gasindex = document.getElementById('gas_var');
    const gasLayer1 = document.querySelector('.gas_layer1');
    const gasStatus = document.querySelector('.gas_status');
    const gassuggest = document.querySelector('.gas_status p');
    gasindex.textContent = gas_var;

    let backgroundColor;
    let statusText;

    if (gas_var >= 1 && gas_var <= 25) {
        backgroundColor = '#32c93f';
        statusText = 'GOOD';
    } else if (gas_var >= 26 && gas_var <= 45) {
        backgroundColor = 'yellow';
        statusText = 'NORMAL';
    } else if (gas_var >= 45 && gas_var <= 100) {
        backgroundColor = 'red';
        statusText = 'GAS LEAK DETECION';
    } else {
        backgroundColor = 'grey'; // Mặc định cho giá trị không hợp lệ
        statusText = 'INVALID';
    }

    // Áp dụng màu nền
    gasLayer1.style.backgroundColor = backgroundColor;
    gasStatus.style.backgroundColor = backgroundColor;

    // Điều chỉnh màu chữ để đảm bảo độ tương phản
    gasStatus.style.color = (backgroundColor === 'yellow' || backgroundColor === 'green') ? 'black' : 'white';

    gassuggest.textContent = statusText;
}
function adjustFontSize(element) {
    const maxWidth = element.offsetWidth;
    const maxHeight = element.offsetHeight;
    let fontSize = 20; 

    element.style.fontSize = fontSize + 'px';

    while ((element.scrollWidth > maxWidth || element.scrollHeight > maxHeight) && fontSize > 8) {
        fontSize--;
        element.style.fontSize = fontSize + 'px';
    }
}
const gasRef = database.ref('kitchen/gasLevel');

gasRef.on('value', (snapshot) => {
    const gas_var = snapshot.val();
    document.getElementById('gas_var').textContent = gas_var;
    framecolor(gas_var)
});
//end js gas
//js kitchen divice
const toggle_AC = document.getElementById('AC_kitchen');
const toggle_Lamp = document.getElementById('Lamp_kitchen');
const toggle_refrigerator = document.getElementById('Refrigerator_kitchen');
const toggle_Fan = document.getElementById('Fan_kitchen');
//ham AC
toggle_AC.addEventListener('click', function() {
  const currentColor = window.getComputedStyle(toggle_AC).backgroundColor;
  if (currentColor === 'rgba(213, 48, 225, 0.26)') { 
    toggle_AC.style.backgroundColor = '#ffffff';
    database.ref('kitchen/AC').set(false);
  } else {
    toggle_AC.style.backgroundColor = '#d530e142';
    database.ref('kitchen/AC').set(true);
  }
});

database.ref('kitchen/AC').on('value',(snapshot)=>{
    const status_AC=snapshot.val();
    if(status_AC=== true)
    {
        toggle_AC.style.backgroundColor='#d530e142';
    }
    else if (status_AC === false)
    {
        toggle_AC.style.backgroundColor='#ffffff';
    }
});
//ket thuc ham AC
//ham lamp
toggle_Lamp.addEventListener('click', function() {
    const currentColor = window.getComputedStyle(toggle_Lamp).backgroundColor;
    if (currentColor === 'rgba(48, 225, 101, 0.7)') { 
      toggle_Lamp.style.backgroundColor = '#ffffff';
      database.ref('kitchen/Lamp').set(false);
    } else {
      toggle_Lamp.style.backgroundColor = '#30e165b3';
      database.ref('kitchen/Lamp').set(true);
    }
});

database.ref('kitchen/Lamp').on('value',(snapshot)=>{
    const status_Lamp=snapshot.val();
    if(status_Lamp === true)
    {
        toggle_Lamp.style.backgroundColor='#30e165b3';
    }
    else if (status_Lamp === false)
    {
        toggle_Lamp.style.backgroundColor='#ffffff';
    }
});

//ket thuc ham lamp
//bat dau ham refrigerator
toggle_refrigerator.addEventListener('click', function() {
    const currentColor = window.getComputedStyle(toggle_refrigerator).backgroundColor;
    if (currentColor === 'rgba(239, 180, 42, 0.74)') { 
      toggle_refrigerator.style.backgroundColor = '#ffffff';
      database.ref('kitchen/refrigerator').set(false);
    } else {
      toggle_refrigerator .style.backgroundColor = '#efb42abd';
      database.ref('kitchen/refrigerator').set(true);
    }
});
database.ref('kitchen/refrigerator').on('value',(snapshot)=>{
    const status_refrigerator=snapshot.val();
    if(status_refrigerator === true)
    {
        toggle_refrigerator.style.backgroundColor='#efb42abd';
    }
    else if (status_refrigerator === false)
    {
        toggle_refrigerator.style.backgroundColor='#ffffff';
    }
});


//ket thuc ham refrigerator
//ham fan
toggle_Fan.addEventListener('click', function() {
    const currentColor = window.getComputedStyle(toggle_Fan).backgroundColor;
    if (currentColor === 'rgba(48, 166, 225, 0.51)') { 
      toggle_Fan.style.backgroundColor = '#ffffff';
      database.ref('kitchen/fan').set(false);
    } else {
      toggle_Fan.style.backgroundColor = '#30a6e182';
      database.ref('kitchen/fan').set(true);
    }
});
database.ref('kitchen/fan').on('value',(snapshot)=>{
    const status_Fan=snapshot.val();
    if(status_Fan=== true)
    {
        toggle_Fan.style.backgroundColor='#30a6e182';
    }
    else if (status_Fan=== false)
    {
        toggle_Fan.style.backgroundColor='#ffffff';
    }
});
// ket thuc ham fan
//end js kitchen divice
//js power cp
const kitchen_energyRef = database.ref('kitchen/energy');
kitchen_energyRef.on('value', (snapshot) => {
    const kitchen_energy = snapshot.val();
    document.getElementById('kt-energy').textContent = kitchen_energy;
});
//end js power cp
//start kitchen chart
function drawChart() {
    var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/1wMh-lmqJeRdu8c4Y7zWiPSnnhZ2lGx2u08bVdOJg1l4/edit?gid=0#gid=0');
    
    // Lấy 7 hàng cuối cùng từ cột B (Date) và C (Power Consumption)
    query.setQuery('SELECT B, C ORDER BY B DESC LIMIT 7');
    query.send(handleQueryResponse);
}

function handleQueryResponse(response) {
    if (response.isError()) {
        alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
        return;
    }

    var data = response.getDataTable();
    var view = new google.visualization.DataView(data);
    
    // Thêm annotation cho mỗi cột
    view.setColumns([0, 1, {
        calc: "stringify",
        sourceColumn: 1,
        type: "string",
        role: "annotation"
    }]);

    var options = {
        width: 950,
        height: 400,
        title: 'Năng lượng tiêu thụ trong 7 ngày gần nhất',
        legend: { position: 'none' },
        hAxis: {
            title: 'Ngày',
            titleTextStyle: { color: '#333' },
            slantedText: true,
            slantedTextAngle: 45
        },
        vAxis: {
            title: 'Năng lượng tiêu thụ (kW)',
            titleTextStyle: { color: '#333' }
        },
        annotations: {
            textStyle: {
                fontSize: 12,
                color: '#000'
            }
        },
        colors: ['#3366CC']
    };

    var chart = new google.visualization.ColumnChart(document.getElementById('KitchenChart'));
    chart.draw(view, options);
}

google.charts.setOnLoadCallback(drawChart);
//end kitchen chart
//----------------------------------livingroom--------------------------------------------
let livingroom = firebase.database().ref("livingroom");
/*----------------main-top-----------------*/
/*--------Temp-----*/
let img4 = document.querySelector('#check-temp-livingroom');
let temp = document.querySelector('#temp-livingroom');
function updateImage() {
    let tempValue = parseInt(temp.textContent);

    if (tempValue < 25) {
        img4.src = 'img/nhietdothap.png';  
    } else if (tempValue >= 25 && tempValue < 35) {
        img4.src = 'img/nhietdovua.png';  
    } else {
        img4.src = 'img/nhietdocao.png'; 
    }
}
const observer = new MutationObserver(updateImage);
observer.observe(temp, { childList: true, subtree: true });
updateImage();

livingroom.child("temperature").on('value', (snapshot) => {
    const tempValue = snapshot.val();
    temp.textContent = `${tempValue}°C`;
});

/*-------Humidity-----*/
let img5 = document.querySelector('#check-humidity-livingroom');
let humidity = document.querySelector('#humidity-livingroom');
let namehumi = document.querySelector('#namehumi-livingroom');
function updateImage1() {
    let humiValue = parseInt(humidity.textContent); 
    if (humiValue < 40) {
        img5.src = 'img/humidity-low.png';
        namehumi.textContent = 'Low' 
        namehumi.style.color = "green"
    } else if (humiValue >= 40 && humiValue < 70) {
        img5.src = 'img/humidity-moderate.png';
        namehumi.textContent = 'Moderate'  
        namehumi.style.color = "yellow"   
    } else {
        img5.src = 'img/humidity-high.png'; 
        namehumi.textContent = 'High' 
        namehumi.style.color = "red"
    }
}
const observer1 = new MutationObserver(updateImage1);
observer1.observe(humidity, { childList: true, subtree: true });
updateImage1();

livingroom.child("humidity").on('value', (snapshot) => {
    const humiValue = snapshot.val(); // 
    humidity.textContent = `${humiValue}%`; 
});

/*-------AQI-----*/
let img6 = document.querySelector('#check-aqi-livingroom');
let aqi = document.querySelector('#aqi-livingroom');
function updateImage2() {
    let aqiValue = parseInt(aqi.textContent); 
    if (aqiValue >= 0 && aqiValue < 50) {
        img6.src = 'img/AQI-50.png';
    } else if (aqiValue >= 50 && aqiValue < 100) {
        img6.src = 'img/AQI-100.png';
    } else if (aqiValue >= 100 && aqiValue < 150){
        img6.src = 'img/AQI-150.png';
    } else if (aqiValue >= 150 && aqiValue < 200){
        img6.src = 'img/AQI-200.png';
    } else if (aqiValue >= 200 && aqiValue < 300){
        img6.src = 'img/AQI-300.png';
    } else if (aqiValue >= 300 && aqiValue < 350){
        img6.src = 'img/AQI-350.png';
    } else if (aqiValue >= 350 && aqiValue < 400){
        img6.src = 'img/AQI-400.png';
    } else if (aqiValue >= 400 && aqiValue < 450){
        img6.src = 'img/AQI-450.png';
    } else{
        img6.src = 'img/AQI-500.png';
    }
}
const observer2 = new MutationObserver(updateImage2);
observer2.observe(aqi, { childList: true, subtree: true });
updateImage2();

livingroom.child("aqi").on('value', (snapshot) => {
    const aqiValue = snapshot.val(); 
    aqi.textContent = `${aqiValue}`; 
});
/*-------top2------*/
/*-------top2-center------*/
let dayValue = document.querySelector('#day-livingroom');
function updateDate() {
    const now = new Date();
    const day = now.getDate();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[now.getMonth()];
    const year = now.getFullYear();
    const dateString = day + '-' + month + '-' + year;
    dayValue.textContent = dateString;
}
updateDate(); 

let timeValue = document.querySelector('#time-livingroom');
function updateTime() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    timeValue.textContent = hours + ':' + minutes + ampm;
}
setInterval(updateTime, 1000);
updateTime();
/*------top2-right------*/
let weatherText = document.querySelector('#weather-livingroom');
let img7 = document.querySelector('#check-weather-livingroom');

livingroom.child("Weather").on('value', (snapshot) => {
    const weatherValue = snapshot.val(); 
    if (weatherValue === 0) {
        img7.src = 'img/sun.gif'; 
        weatherText.textContent = "Sunny"; 
    } else if (weatherValue === 1) {
        img7.src = 'img/rain.gif'; 
        weatherText.textContent = "Rain"; 
    }
});
/*----------main-bottom------------------*/
function showChart(chartType) {
    // Ẩn tất cả các biểu đồ
    document.getElementById('temp_chart_div_livingroom').style.display = 'none';
    document.getElementById('humidity_chart_div_livingroom').style.display = 'none';
    document.getElementById('aqi_chart_div_livingroom').style.display = 'none';

    // Hiển thị biểu đồ dựa trên loại
    if (chartType === 'templivingroom') {
        document.getElementById('temp_chart_div_livingroom').style.display = 'block';
    } else if (chartType === 'humiditylivingroom') {
        document.getElementById('humidity_chart_div_livingroom').style.display = 'block';
    } else if (chartType === 'aqilivingroom') {
        document.getElementById('aqi_chart_div_livingroom').style.display = 'block';
    }

     // Vẽ lại các biểu đồ sau khi hiển thị biểu đồ mới
     drawCharts();
    
}
// Khởi tạo biểu đồ
google.charts.load('current', { packages: ['corechart', 'bar'] });
google.charts.setOnLoadCallback(initCharts);
// Dữ liệu cho các biểu đồ
var temperatureData = [['Thời gian', 'Nhiệt độ']];
var humidityData = [['Thời gian', 'Độ ẩm']];
var aqiData = [['Thời gian', 'AQI']];
var maxDataPoints = 5;  // Số lượng điểm dữ liệu tối đa
var tempChartlivingroom, humidityChartlivingroom, aqiChartlivingroom;
// Khởi tạo biểu đồ
function initCharts() {
    tempChartlivingroom = new google.visualization.ColumnChart(document.getElementById('temp_chart_div_livingroom'));
    humidityChartlivingroom = new google.visualization.ColumnChart(document.getElementById('humidity_chart_div_livingroom'));
    aqiChartlivingroom = new google.visualization.ColumnChart(document.getElementById('aqi_chart_div_livingroom'));
    // Lấy dữ liệu từ Firebase và hiển thị ngay lập tức
    updateDataFromFirebase();
    drawCharts();
    showChart('templivingroom');
      // Thêm dòng này để gọi hàm hiển thị
    // Cập nhật dữ liệu mỗi 10 phút (600000 milliseconds)
    setInterval(updateDataFromFirebase, 600000);
}
// Vẽ biểu đồ dựa trên dữ liệu hiện tại
function drawCharts() {
    var currentTime = new Date().toLocaleTimeString();
    // Chỉ vẽ biểu đồ khi khu vực đó đang hiển thị
    if (document.getElementById('temp_chart_div_livingroom').style.display === 'block') {
        tempChartlivingroom.draw(google.visualization.arrayToDataTable(temperatureData), {
            hAxis: { title: 'Thời gian', format: 'HH:mm:ss', showTextEvery: 1 },
            vAxis: { title: 'Nhiệt độ (°C)', minValue: 0, maxValue: 100 },
            legend: { position: 'bottom' }
        });
    }
    if (document.getElementById('humidity_chart_div_livingroom').style.display === 'block') {
        humidityChartlivingroom.draw(google.visualization.arrayToDataTable(humidityData), {
            hAxis: { title: 'Thời gian', format: 'HH:mm:ss', showTextEvery: 1 },
            vAxis: { title: 'Độ ẩm (%)', minValue: 0, maxValue: 100 },
            legend: { position: 'bottom' }
        });
    }
    if (document.getElementById('aqi_chart_div_livingroom').style.display === 'block') {
        aqiChartlivingroom.draw(google.visualization.arrayToDataTable(aqiData), {
            hAxis: { title: 'Thời gian', format: 'HH:mm:ss', showTextEvery: 1 },
            vAxis: { minValue: 0, maxValue: 500},
            legend: { position: 'bottom' }
        });
    }
}
// Hàm cập nhật dữ liệu từ Firebase
function updateDataFromFirebase() {
    database.ref().once('value').then(function(snapshot) {
        var temperature = snapshot.val().livingroom.temperature;
        var humidity = snapshot.val().livingroom.humidity;
        var aqi = snapshot.val().livingroom.aqi;
        var currentTime = new Date().toLocaleTimeString();
        // Cập nhật dữ liệu
        if (temperatureData.length >= maxDataPoints) temperatureData.splice(1, 1);
        if (humidityData.length >= maxDataPoints) humidityData.splice(1, 1);
        if (aqiData.length >= maxDataPoints) aqiData.splice(1, 1);
        temperatureData.push([currentTime, temperature]);
        humidityData.push([currentTime, humidity]);
        aqiData.push([currentTime, aqi]);
        drawCharts();
    });
}
/*----------------side-----------------*/
let Device = firebase.database().ref("Device");
/*---------------air condition----------*/
let checkair = document.querySelector('#check-air-livingroom');
let img1 = document.querySelector('#air-livingroom');
let nameair = document.querySelector('#nameair-livingroom');
checkair.addEventListener('change', () => {
    if (checkair.checked) {
        img1.src = 'img/air-condition.gif';  // Chuyển sang ảnh GIF
        nameair.textContent = 'Connected' // Thay đổi chữ thành "Connected"
        livingroom.child("Device").update({ AirConditioner: 1 }); // Cập nhật giá trị trong "Device"
    } else {
        img1.src = 'img/air-condition.png';  // Quay lại ảnh PNG
        nameair.textContent = 'Disconnected' // Thay đổi chữ thành "Disconnected"
        livingroom.child("Device").update({ AirConditioner: 0 }); // Cập nhật giá trị trong "Device"
    }
})

// Lắng nghe thay đổi từ Firebase
livingroom.child("Device/AirConditioner").on('value', (snapshot) => {
    const maylanhState = snapshot.val();
    // Cập nhật trạng thái của checkbox và giao diện dựa trên giá trị từ Firebase
    if (maylanhState === 1) {
        checkair.checked = true; // Đánh dấu checkbox là checked
        img1.src = 'img/air-condition.gif'; // Chuyển sang ảnh GIF
        nameair.textContent = 'Connected'; // Thay đổi chữ thành "Connected"
    } else {
        checkair.checked = false; // Đánh dấu checkbox là không checked
        img1.src = 'img/air-condition.png'; // Quay lại ảnh PNG
        nameair.textContent = 'Disconnected'; // Thay đổi chữ thành "Disconnected"
    }
});

/*-----------------TV--------------*/
let checktv = document.querySelector('#check-tv-livingroom');
let img2 = document.querySelector('#tv-livingroom');
let nametv = document.querySelector('#nametv-livingroom');
checktv.addEventListener('change', () => {
    if (checktv.checked) {
        img2.src = 'img/television.gif';  // Chuyển sang ảnh GIF
        nametv.textContent = 'Connected' // Thay đổi chữ thành "Connected"
        livingroom.child("Device").update({ Television: 1 });
    } else {
        img2.src = 'img/television.png';  // Quay lại ảnh PNG
        nametv.textContent = 'Disconnected' // Thay đổi chữ thành "Disconnected"
        livingroom.child("Device").update({ Television: 0 });
    }
})

livingroom.child("Device/Television").on('value', (snapshot) => {
    const tvState = snapshot.val();
    // Cập nhật trạng thái của checkbox và giao diện dựa trên giá trị từ Firebase
    if (tvState === 1) {
        checktv.checked = true; // Đánh dấu checkbox là checked
        img2.src = 'img/television.gif'; // Chuyển sang ảnh GIF
        nametv.textContent = 'Connected'; // Thay đổi chữ thành "Connected"
    } else {
        checktv.checked = false; // Đánh dấu checkbox là không checked
        img2.src = 'img/television.png'; // Quay lại ảnh PNG
        nametv.textContent = 'Disconnected'; // Thay đổi chữ thành "Disconnected"
    }
});

/*-----------------Light--------------*/
let checklight = document.querySelector('#check-light-livingroom');
let img3 = document.querySelector('#light-livingroom');
let namelight = document.querySelector('#namelight-livingroom');
checklight.addEventListener('change', () => {
    if (checklight.checked) {
        img3.src = 'img/light.gif';  // Chuyển sang ảnh GIF
        namelight.textContent = 'Connected' // Thay đổi chữ thành "Connected"
        livingroom.child("Device").update({ Lamp: 1 });
    } else {
        img3.src = 'img/light.png';  // Quay lại ảnh PNG
        namelight.textContent = 'Disconnected' // Thay đổi chữ thành "Disconnected"
        livingroom.child("Device").update({ Lamp: 0});
    }
})

livingroom.child("Device/Lamp").on('value', (snapshot) => {
    const lightState = snapshot.val();
    // Cập nhật trạng thái của checkbox và giao diện dựa trên giá trị từ Firebase
    if (lightState === 1) {
        checklight.checked = true; // Đánh dấu checkbox là checked
        img3.src = 'img/light.gif';  // Chuyển sang ảnh GIF
        namelight.textContent = 'Connected'; // Thay đổi chữ thành "Connected"
    } else {
        checklight.checked = false; // Đánh dấu checkbox là không checked
        img3.src = 'img/light.png'; // Quay lại ảnh PNG
        namelight.textContent = 'Disconnected'; // Thay đổi chữ thành "Disconnected"
    }
});
// js bedroom------------------------------------------------------------------------------------
// Hàm cập nhật trạng thái switch lên Firebase
function updateFirebaseSwitchStatus(switchId, status) {
    const switchRef = firebase.database().ref('bedroom/switches/' + switchId);
    switchRef.set({ status: status });
}

// Module quản lý trạng thái cho switch TV
function setupTVSwitch() {
    const toggleSwitch = document.getElementById('TV');
    const container = document.getElementById('container1');

    toggleSwitch.addEventListener('change', function() {
        if (this.checked) {
            container.style.backgroundColor = '#5493e6';
            updateFirebaseSwitchStatus('TV', 1);
        } else {
            container.style.backgroundColor = 'gray';
            updateFirebaseSwitchStatus('TV', 0);
        }
    });

    // Tải trạng thái hiện tại của switch TV từ Firebase
    const switchRef = firebase.database().ref('bedroom/switches/TV');
    switchRef.on('value', (snapshot) => {
        const status = snapshot.val().status;
        if (status === 1) {
            toggleSwitch.checked = true;
            container.style.backgroundColor = '#5493e6';
        } else {
            toggleSwitch.checked = false;
            container.style.backgroundColor = 'gray';
        }
    });
}

// Module quản lý trạng thái cho switch AC
function setupACSwitch() {
    const toggleSwitch = document.getElementById('AC');
    const container = document.getElementById('container2');

    toggleSwitch.addEventListener('change', function() {
        if (this.checked) {
            container.style.backgroundColor = '#5493e6';
            updateFirebaseSwitchStatus('AC', 1);
        } else {
            container.style.backgroundColor = 'gray';
            updateFirebaseSwitchStatus('AC', 0);
        }
    });

    // Tải trạng thái hiện tại của switch AC từ Firebase
    const switchRef = firebase.database().ref('bedroom/switches/AC');
    switchRef.on('value', (snapshot) => {
        const status = snapshot.val().status;
        if (status === 1) {
            toggleSwitch.checked = true;
            container.style.backgroundColor = '#5493e6';
        } else {
            toggleSwitch.checked = false;
            container.style.backgroundColor = 'gray';
        }
    });
}

// Module quản lý trạng thái cho switch light
function setupLightSwitch() {
    const toggleSwitch = document.getElementById('light');
    const container = document.getElementById('container3');

    toggleSwitch.addEventListener('change', function() {
        if (this.checked) {
            container.style.backgroundColor = '#5493e6';
            updateFirebaseSwitchStatus('light', 1);
        } else {
            container.style.backgroundColor = 'gray';
            updateFirebaseSwitchStatus('light', 0);
        }
    });

    // Tải trạng thái hiện tại của switch Light từ Firebase
    const switchRef = firebase.database().ref('bedroom/switches/light');
    switchRef.on('value', (snapshot) => {
        const status = snapshot.val().status;
        if (status === 1) {
            toggleSwitch.checked = true;
            container.style.backgroundColor = '#5493e6';
        } else {
            toggleSwitch.checked = false;
            container.style.backgroundColor = 'gray';
        }
    });
}

// Module quản lý trạng thái cho switch fan
function setupFanSwitch() {
    const toggleSwitch = document.getElementById('fan');
    const container = document.getElementById('container4');

    toggleSwitch.addEventListener('change', function() {
        if (this.checked) {
            container.style.backgroundColor = '#5493e6';
            updateFirebaseSwitchStatus('fan', 1);
        } else {
            container.style.backgroundColor = 'gray';
            updateFirebaseSwitchStatus('fan', 0);
        }
    });

    // Tải trạng thái hiện tại của switch fan từ Firebase
    const switchRef = firebase.database().ref('bedroom/switches/fan');
    switchRef.on('value', (snapshot) => {
        const status = snapshot.val().status;
        if (status === 1) {
            toggleSwitch.checked = true;
            container.style.backgroundColor = '#5493e6';
        } else {
            toggleSwitch.checked = false;
            container.style.backgroundColor = 'gray';
        }
    });
}
// Khởi chạy từng module khi trang được tải
window.onload = function() {
    setupTVSwitch();
    setupACSwitch();
    setupLightSwitch();
    setupFanSwitch();
};

//-----------------Temperature--------------------
const temperatureRef = database.ref('bedroom/temperature');
temperatureRef.on('value', (snapshot) => {
    const temperature = snapshot.val();
    document.getElementById('temp-value').textContent = temperature;
    updateImageTemp(temperature);
});
// Hàm để cập nhật hình ảnh dựa trên giá trị x
function updateImageTemp(temp1) {
    const imgElement = document.getElementById("display-imageTemp");
    //const  temp1 =document.getElementById('temp-value');
    if (temp1>= 0 && temp1 < 12) {
        imgElement.src = "imagebedroom/Cyantemp.png"; // Hình a
    } else if (temp1 >= 12 && temp1 < 28) {
        imgElement.src = "imagebedroom/Greentemp.png"; // Hình b
    } else if (temp1 >= 28 && temp1 < 35) {
        imgElement.src = "imagebedroom/Yellowtemp.png"; // Hình b
    } else if (temp1 >= 35 && temp1 <= 100) {
        imgElement.src = "imagebedroom/Redtemp.png"; // Hình c
    } else {
        imgElement.src = ""; // Nếu x không trong khoảng, không hiển thị hình nào
    }
}
// Gọi hàm lần đầu để hiển thị hình ảnh ban đầu
updateImageTemp();



//-----------------Humidity--------------------
const HumidityRef = database.ref('bedroom/humidity');
HumidityRef.on('value', (snapshot) => {
    const humidity = snapshot.val();
    document.getElementById('humi-value').textContent = humidity;
    updateImageHumi(humidity);
});
// Hàm để cập nhật hình ảnh dựa trên giá trị x
function updateImageHumi(humi1) {
    const imgElement = document.getElementById("display-imageHumi");
    //const  humi1 =document.getElementById('humi-value');
    if (humi1>= 0 && humi1 < 40) {
        imgElement.src = "imagebedroom/low.png"; // Hình a
    } else if (humi1 >= 40 && humi1 < 70) {
        imgElement.src = "imagebedroom/normal.png"; // Hình b
    } else if (humi1 >= 70 && humi1 <= 100) {
        imgElement.src = "imagebedroom/high.png"; // Hình c
    } else {
        imgElement.src = ""; // Nếu x không trong khoảng, không hiển thị hình nào
    }
}
// Gọi hàm lần đầu để hiển thị hình ảnh ban đầu
updateImageHumi();

//---------------------AQI------------------------

const AQIBedroomRef = database.ref('bedroom/AQI');
AQIBedroomRef.on('value', (snapshot) => {
    const airquality = snapshot.val();
    document.getElementById('AQI-value').textContent = airquality;
    updateImageAQI(airquality);
    updatetextAQI(airquality);
});
// Hàm để cập nhật hình ảnh dựa trên giá trị x
function updateImageAQI(AQI1) {
    const imgElement = document.getElementById("display-imageAQI");
    //const  AQI1 =document.getElementById('AQI-value');
    if (AQI1>= 0 && AQI1 < 50) {
        imgElement.src = "imagebedroom/GoodAir.png"; // Hình a
    } else if (AQI1 >= 50 && AQI1 < 125) {
        imgElement.src = "imagebedroom/normalAir.png"; // Hình b
    } else if (AQI1 >= 125 && AQI1 <= 500) {
        imgElement.src = "imagebedroom/Danger.png"; // Hình c
    } else {
        imgElement.src = ""; // Nếu x không trong khoảng, không hiển thị hình nào
    }
}
// Gọi hàm lần đầu để hiển thị hình ảnh ban đầu
updateImageAQI();

// Hàm để cập nhật hình ảnh dựa trên giá trị x
function updatetextAQI(AQI1) {
    const imgElement = document.getElementById("display-statusAQI");
    //const  AQI1 =document.getElementById('AQI-value');
    if (AQI1>= 0 && AQI1 < 50) {
        imgElement.textContent = "GOOD"; // Nhiệt độ thấp
        imgElement.style.color = "green";  // Hình a
    } else if (AQI1 >= 50 && AQI1 < 125) {
        imgElement.textContent = "NORMAL"; // Nhiệt độ thấp
        imgElement.style.color = "#c2a324";  // Hình b
    } else if (AQI1 >= 125 && AQI1 <= 500) {
        imgElement.textContent = "BAD"; // Nhiệt độ thấp
        imgElement.style.color = "red";  // Hình c
    } else {
        imgElement.textContent = ""; // Nhiệt độ thấp
          // Nếu x không trong khoảng, không hiển thị hình nào
    }
}
// Gọi hàm lần đầu để hiển thị hình ảnh ban đầu
updatetextAQI();

//---------------------Time Bedroom---------------
function updateTimeBedroom() {
    // Lấy giờ và phút từ máy tính
    const nowBedroom = new Date();
    const hoursBedroom = nowBedroom.getHours().toString().padStart(2, '0'); // Lấy giờ, định dạng 2 chữ số
    const minutesBedroom = nowBedroom.getMinutes().toString().padStart(2, '0'); // Lấy phút, định dạng 2 chữ số

    // Hiển thị giờ và phút lên khung
    const clockElementBedroom = document.getElementById('ClockBedroom');
    clockElementBedroom.textContent = `${hoursBedroom}:${minutesBedroom}`;
}

// Cập nhật giờ mỗi 1 giây
setInterval(updateTimeBedroom, 1000);

// Gọi hàm lần đầu để hiển thị giờ ngay khi trang tải
updateTimeBedroom();


//-------------button bedroom------------------------------------------------------------------------------------

function toggleContent(contentIdchart) {
    // Ẩn tất cả các phần tử có class 'content'
    var contents = document.querySelectorAll('.content-chart-bedroom');
    contents.forEach(function(contentchartbedroom) {
        contentchartbedroom.style.display = 'none';  // Ẩn tất cả nội dung
    });
    
    // Hiển thị phần nội dung tương ứng với id được truyền vào
    var selectedContent = document.getElementById(contentIdchart);
    selectedContent.style.display = 'block';  // Hiển thị nội dung
}

// Thêm sự kiện 'click' cho các nút mà không thay đổi HTML
document.querySelector('button:nth-child(1)').addEventListener('click', function() {
    toggleContent('temp-chart');
});

document.querySelector('button:nth-child(2)').addEventListener('click', function() {
    toggleContent('humi-chart');
});

document.querySelector('button:nth-child(3)').addEventListener('click', function() {
    toggleContent('AQI-chart');
});

//--------------------------temp chart bedroom-----------------------------------------------
google.charts.load('current', { packages: ['corechart'] });
google.charts.setOnLoadCallback(khoiTaoBieuDo);

let data1, chart1, options1;
let latestTemperature = 0;  // Lưu trữ giá trị nhiệt độ mới nhất
function khoiTaoBieuDo() {
    // Định nghĩa bảng dữ liệu cho biểu đồ
    data1 = new google.visualization.DataTable();
    data1.addColumn('datetime', 'Thời gian');
    data1.addColumn('number', 'Nhiệt độ (°C)');
    
    // Định nghĩa các tùy chọn cho biểu đồ
    options1 = {
        title: 'Giám sát Nhiệt độ Theo Thời Gian Thực',
        curveType: 'function',
        legend: { position: 'bottom' },
        hAxis: { title: 'Thời gian', format: 'HH:mm:ss' },
        vAxis: {
            title: 'Nhiệt độ (°C)',
            gridlines: { count: 10 },
            viewWindow: { min: 0, max: 50 }
        }
    };

    // Tạo biểu đồ và hiển thị nó trong div "temperature_chart"
    chart1 = new google.visualization.LineChart(document.getElementById('temperature_chart'));
    chart1.draw(data1, options1);

    // Bắt đầu lắng nghe cập nhật nhiệt độ từ Firebase
    capNhatNhietDoFirebase();
    
    // Cập nhật biểu đồ mỗi 2 giây
    setInterval(capNhatBieuDoMoi2Giay, 2000);
}

function capNhatNhietDoFirebase() {
    // Thiết lập tham chiếu đến Firebase để lấy nhiệt độ
    const temperatureRef = database.ref('bedroom/temperature');

    // Cập nhật nhiệt độ từ Firebase theo thời gian thực
    temperatureRef.on('value', (snapshot) => {
        latestTemperature = snapshot.val();  // Lưu lại giá trị nhiệt độ mới nhất
    });
}

function capNhatBieuDoMoi2Giay() {
    const thoiGianHienTai = new Date();

    // Cập nhật dữ liệu vào biểu đồ
    data1.addRow([thoiGianHienTai, latestTemperature]);

    // Giới hạn số lượng mốc thời gian hiển thị, chỉ giữ lại 6 mốc thời gian mới nhất
    if (data1.getNumberOfRows() > 6) {
        data1.removeRow(0);  // Xóa mốc thời gian cũ nhất (dòng đầu tiên)
    }

    // Cập nhật phạm vi hiển thị của trục Y dựa trên giá trị nhiệt độ
    if (latestTemperature < 10) {
        options1.vAxis.gridlines.count = 10;
        options1.vAxis.viewWindow = { min: 0, max: 20 };
    } else if (latestTemperature >= 10 && latestTemperature <= 50) {
        options1.vAxis.gridlines.count = 5;
        options1.vAxis.viewWindow = { min: 0, max: 50 };
    } else if (latestTemperature > 50 && latestTemperature <= 100) {
        options1.vAxis.gridlines.count = 10;
        options1.vAxis.viewWindow = { min: 0, max: 100 };
    } else {
        options1.vAxis.gridlines.count = 10;
        options1.vAxis.viewWindow = { min: 0, max: latestTemperature + 20 };
    }

    // Vẽ lại biểu đồ với dữ liệu và cấu hình mới
    chart1.draw(data1, options1);
}
//------------------------Humichart------------------------------------------------------------------------------

google.charts.load('current', { packages: ['corechart'] });
google.charts.setOnLoadCallback(khoiTaoBieuDoDoAm);

let data2, chart2, options2;
let latestHumidity = 0;  // Lưu trữ giá trị nhiệt độ mới nhất
function khoiTaoBieuDoDoAm() {
    // Định nghĩa bảng dữ liệu cho biểu đồ
    data2 = new google.visualization.DataTable();
    data2.addColumn('datetime', 'Thời gian');
    data2.addColumn('number', 'Độ ẩm (%)');
    
    // Định nghĩa các tùy chọn cho biểu đồ
    options2 = {
        title: 'Giám sát Độ ẩm Theo Thời Gian Thực',
        curveType: 'function',
        legend: { position: 'bottom' },
        hAxis: { title: 'Thời gian', format: 'HH:mm:ss' },
        vAxis: {
            title: 'Độ ẩm (%)',
            gridlines: { count: 10 },
            viewWindow: { min: 0, max: 50 }
        }
    };

    // Tạo biểu đồ và hiển thị nó trong div "humidity_chart"
    chart2 = new google.visualization.LineChart(document.getElementById('humidity_chart'));
    chart2.draw(data2, options2);

    // Bắt đầu lắng nghe cập nhật nhiệt độ từ Firebase
    capNhatDoAmFirebase();
    
    // Cập nhật biểu đồ mỗi 2 giây
    setInterval(capNhatBieuDoMoi2GiayDoAm, 2000);
}

function capNhatDoAmFirebase() {
    // Thiết lập tham chiếu đến Firebase để lấy nhiệt độ
    const humidityRef = database.ref('bedroom/humidity');

    // Cập nhật nhiệt độ từ Firebase theo thời gian thực
    humidityRef.on('value', (snapshot) => {
        latestHumidity = snapshot.val();  // Lưu lại giá trị nhiệt độ mới nhất
    });
}

function capNhatBieuDoMoi2GiayDoAm() {
    const thoiGianHienTai = new Date();

    // Cập nhật dữ liệu vào biểu đồ
    data2.addRow([thoiGianHienTai, latestHumidity]);

    // Giới hạn số lượng mốc thời gian hiển thị, chỉ giữ lại 6 mốc thời gian mới nhất
    if (data2.getNumberOfRows() > 6) {
        data2.removeRow(0);  // Xóa mốc thời gian cũ nhất (dòng đầu tiên)
    }

    // Cập nhật phạm vi hiển thị của trục Y dựa trên giá trị nhiệt độ
    if (latestHumidity < 10) {
        options2.vAxis.gridlines.count = 10;
        options2.vAxis.viewWindow = { min: 0, max: 20 };
    } else if (latestHumidity >= 10 && latestHumidity <= 50) {
        options2.vAxis.gridlines.count = 5;
        options2.vAxis.viewWindow = { min: 0, max: 50 };
    } else if (latestHumidity > 50 && latestHumidity <= 100) {
        options2.vAxis.gridlines.count = 10;
        options2.vAxis.viewWindow = { min: 0, max: 100 };
    } else {
        options2.vAxis.gridlines.count = 10;
        options2.vAxis.viewWindow = { min: 0, max: latestHumidity + 20 };
    }

    // Vẽ lại biểu đồ với dữ liệu và cấu hình mới
    chart2.draw(data2, options2);
}
//----------------------------------AQI-chart--------------------------------------------------------------------
google.charts.load('current', { packages: ['corechart'] });
google.charts.setOnLoadCallback(khoiTaoBieuDoAQI);

let data3, chart3, options3;
let latestAQI = 0;  // Lưu trữ giá trị nhiệt độ mới nhất
function khoiTaoBieuDoAQI() {
    // Định nghĩa bảng dữ liệu cho biểu đồ
    data3 = new google.visualization.DataTable();
    data3.addColumn('datetime', 'Thời gian');
    data3.addColumn('number', 'AQI');
    
    // Định nghĩa các tùy chọn cho biểu đồ
    options3 = {
        title: 'Giám sát AQI Theo Thời Gian Thực',
        curveType: 'function',
        legend: { position: 'bottom' },
        hAxis: { title: 'Thời gian', format: 'HH:mm:ss' },
        vAxis: {
            title: 'AQI',
            gridlines: { count: 10 },
            viewWindow: { min: 0, max: 50 }
        }
    };

    // Tạo biểu đồ và hiển thị nó trong div "Airquality_chart"
    chart3 = new google.visualization.LineChart(document.getElementById('Airquality_chart'));
    chart3.draw(data3, options3);

    // Bắt đầu lắng nghe cập nhật nhiệt độ từ Firebase
    capNhatAQIFirebase();
    
    // Cập nhật biểu đồ mỗi 2 giây
    setInterval(capNhatBieuDoMoi2GiayAQI, 2000);
}

function capNhatAQIFirebase() {
    // Thiết lập tham chiếu đến Firebase để lấy nhiệt độ
    const AQIRef = database.ref('bedroom/AQI');

    // Cập nhật nhiệt độ từ Firebase theo thời gian thực
    AQIRef.on('value', (snapshot) => {
        latestAQI = snapshot.val();  // Lưu lại giá trị nhiệt độ mới nhất
    });
}

function capNhatBieuDoMoi2GiayAQI() {
    const thoiGianHienTai = new Date();

    // Cập nhật dữ liệu vào biểu đồ
    data3.addRow([thoiGianHienTai, latestAQI]);

    // Giới hạn số lượng mốc thời gian hiển thị, chỉ giữ lại 6 mốc thời gian mới nhất
    if (data3.getNumberOfRows() > 6) {
        data3.removeRow(0);  // Xóa mốc thời gian cũ nhất (dòng đầu tiên)
    }

    // Cập nhật phạm vi hiển thị của trục Y dựa trên giá trị nhiệt độ
    if (latestAQI < 10) {
        options3.vAxis.gridlines.count = 10;
        options3.vAxis.viewWindow = { min: 0, max: 20 };
    } else if (latestAQI >= 10 && latestAQI <= 50) {
        options3.vAxis.gridlines.count = 5;
        options3.vAxis.viewWindow = { min: 0, max: 50 };
    } else if (latestAQI > 50 && latestAQI <= 100) {
        options3.vAxis.gridlines.count = 10;
        options3.vAxis.viewWindow = { min: 0, max: 100 };
    } else {
        options3.vAxis.gridlines.count = 10;
        options3.vAxis.viewWindow = { min: 0, max: latestAQI + 20 };
    }

    // Vẽ lại biểu đồ với dữ liệu và cấu hình mới
    chart3.draw(data3, options3);
}

//---------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------
//---------------------End bedroom-------------------------------------------------------------------------------