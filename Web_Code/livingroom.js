/*----firebase---*/
// Cấu hình Firebase
const firebaseConfig = {
    apiKey: "AIzaSyD-Ew9DU8DNt1EnsQQY3BijYP1DOrts7ew",
    authDomain: "test-22139013.firebaseapp.com",
    databaseURL: "https://test-22139013-default-rtdb.firebaseio.com",
    projectId: "test-22139013",
    storageBucket: "test-22139013.appspot.com",
    messagingSenderId: "885011632680",
    appId: "1:885011632680:web:7ead1d12ab887e95509b1d",
    measurementId: "G-NKZ0CW96WS"
};

// Khởi tạo Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();

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

/*--------------------------------livingroom--------------------------*/
/*----------------main-top-----------------*/
/*--------Temp-----*/
let img4 = document.querySelector('#check-temp-livingroom');
let temp = document.querySelector('#temp-livingroom');
// Hàm để cập nhật hình ảnh dựa trên giá trị nhiệt độ
function updateImage() {
    let tempValue = parseInt(temp.textContent); // Lấy giá trị nhiệt độ và chuyển đổi thành số nguyên

    if (tempValue < 20) {
        img4.src = 'img/nhietdothap.png';  
    } else if (tempValue >= 20 && tempValue < 50) {
        img4.src = 'img/nhietdovua.png';  
    } else {
        img4.src = 'img/nhietdocao.png'; 
    }
}
// Sử dụng MutationObserver để theo dõi sự thay đổi trong nội dung của phần tử temp
const observer = new MutationObserver(updateImage);
// Cấu hình để theo dõi sự thay đổi nội dung của phần tử temp
observer.observe(temp, { childList: true, subtree: true });
// Cập nhật hình ảnh ban đầu khi tải trang
updateImage();

// Tham chiếu đến node 'temp' trong Firebase Realtime Database
const tempRef = database.ref('temp-livingroom');
// Lấy dữ liệu từ Firebase và hiển thị trong phần tử #temp
tempRef.on('value', (snapshot) => {
    const tempValue = snapshot.val(); // Lấy giá trị từ snapshot
    temp.textContent = `${tempValue}°C`; // Hiển thị giá trị lên trang
});

/*-------Humidity-----*/
let img5 = document.querySelector('#check-humidity-livingroom');
let humidity = document.querySelector('#humidity-livingroom');
let namehumi = document.querySelector('#namehumi-livingroom');
function updateImage1() {
    let humiValue = parseInt(humidity.textContent); // Lấy giá trị nhiệt độ và chuyển đổi thành số nguyên
    if (humiValue < 30) {
        img5.src = 'img/humidity-low.png';
        namehumi.textContent = 'Low' 
        namehumi.style.color = "green"
    } else if (humiValue >= 30 && humiValue < 60) {
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

// Tham chiếu đến node 'humidity' trong Firebase Realtime Database
const humiRef = database.ref('humidity-livingroom');
// Lấy dữ liệu từ Firebase và hiển thị trong phần tử #temp
humiRef.on('value', (snapshot) => {
    const humiValue = snapshot.val(); // Lấy giá trị từ snapshot
    humidity.textContent = `${humiValue}%`; // Hiển thị giá trị lên trang
});

/*-------AQI-----*/
let img6 = document.querySelector('#check-aqi-livingroom');
let aqi = document.querySelector('#aqi-livingroom');
function updateImage2() {
    let aqiValue = parseInt(aqi.textContent); // Lấy giá trị nhiệt độ và chuyển đổi thành số nguyên
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

// Tham chiếu đến node 'aqi' trong Firebase Realtime Database
const aqiRef = database.ref('aqi-livingroom');
// Lấy dữ liệu từ Firebase và hiển thị trong phần tử #temp
aqiRef.on('value', (snapshot) => {
    const aqiValue = snapshot.val(); // Lấy giá trị từ snapshot
    aqi.textContent = `${aqiValue}`; // Hiển thị giá trị lên trang
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
updateDate(); // Cập nhật ngày ngay lập tức khi trang tải

/*----time---*/
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
// Tham chiếu đến phần tử trên trang
let weatherText = document.querySelector('#weather-livingroom');
let img7 = document.querySelector('#check-weather-livingroom');
// Lấy dữ liệu từ Firebase và hiển thị trên trang
const weatherRef = firebase.database().ref('weather-livingroom');
weatherRef.on('value', (snapshot) => {
    const weatherValue = snapshot.val(); // Lấy giá trị từ snapshot
    // Cập nhật text và ảnh dựa trên giá trị weatherValue
    if (weatherValue === 0) {
        img7.src = 'img/sun.gif'; // Hiển thị ảnh mặt trời
        weatherText.textContent = "Sunny"; // Hiển thị "Sunny"
    } else if (weatherValue === 1) {
        img7.src = 'img/rain.gif'; // Hiển thị ảnh mưa
        weatherText.textContent = "Rain"; // Hiển thị "Rain"
    }
});

/*----------main-bottom------------------*/
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
    showChart('templivingroom');  // Thêm dòng này để gọi hàm hiển thị
    // Cập nhật dữ liệu mỗi 10 phút (600000 milliseconds)
    setInterval(updateDataFromFirebase, 600000);
}
// Hàm hiển thị biểu đồ theo loại
function showChart(chartType) {
    document.getElementById('temp_chart_div_livingroom').style.display = (chartType === 'templivingroom') ? 'block' : 'none';
    document.getElementById('humidity_chart_div_livingroom').style.display = (chartType === 'humiditylivingroom') ? 'block' : 'none';
    document.getElementById('aqi_chart_div_livingroom').style.display = (chartType === 'aqilivingroom') ? 'block' : 'none';
    drawCharts();  // Vẽ lại biểu đồ
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
    // Truy cập trực tiếp vào các giá trị
    database.ref().once('value').then(function(snapshot) {
        var temperature = snapshot.val()['temp-livingroom'];
        var humidity = snapshot.val()['humidity-livingroom'];
        var aqi = snapshot.val()['aqi-livingroom'];
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
let livingroomdevice = firebase.database().ref("livingroomdevice");
/*---------------air condition----------*/
let checkair = document.querySelector('#check-air-livingroom');
let img1 = document.querySelector('#air-livingroom');
let nameair = document.querySelector('#nameair-livingroom');
checkair.addEventListener('change', () => {
    if (checkair.checked) {
        img1.src = 'img/air-condition.gif';  // Chuyển sang ảnh GIF
        nameair.textContent = 'Connected' // Thay đổi chữ thành "Connected"
        livingroomdevice.update({ maylanh: 1 });
    } else {
        img1.src = 'img/air-condition.png';  // Quay lại ảnh PNG
        nameair.textContent = 'Disconnected' // Thay đổi chữ thành "Disconnected"
        livingroomdevice.update({ maylanh: 1 });
    }
})

// Lắng nghe thay đổi từ Firebase
livingroomdevice.child("maylanh").on('value', (snapshot) => {
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
        livingroomdevice.update({ tv: 1 });
    } else {
        img2.src = 'img/television.png';  // Quay lại ảnh PNG
        nametv.textContent = 'Disconnected' // Thay đổi chữ thành "Disconnected"
        livingroomdevice.update({ tv: 0 });
    }
})

livingroomdevice.child("tv").on('value', (snapshot) => {
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
        livingroomdevice.update({ den: 1 });
    } else {
        img3.src = 'img/light.png';  // Quay lại ảnh PNG
        namelight.textContent = 'Disconnected' // Thay đổi chữ thành "Disconnected"
        livingroomdevice.update({ den: 1 });
    }
})

livingroomdevice.child("den").on('value', (snapshot) => {
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