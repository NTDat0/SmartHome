function showContent(room) {
    // Hide all room contents
    const contents = document.querySelectorAll('.room-content');
    contents.forEach(content => content.style.display = 'none');

    // Show selected room content
    const selectedRoom = document.getElementById(room);
    if (selectedRoom) {
        if (room === 'bedroom') {
            selectedRoom.style.display = 'grid';  // Hiển thị bedroom với grid layout
        } else {
            selectedRoom.style.display = 'block';  // Hiển thị các phòng khác với block layout
        }
    }
}


//--------------------Bedroom JS-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------
const firebaseConfig = {
    apiKey: "AIzaSyD5LT_SEl7OmpNcagXCfL0QFDNMqs_5CGg",
    authDomain: "smarthome-dc558.firebaseapp.com",
    databaseURL: "https://smarthome-dc558-default-rtdb.firebaseio.com",
    projectId: "smarthome-dc558",
    storageBucket: "smarthome-dc558.appspot.com",
    messagingSenderId: "289208113725",
    appId: "1:289208113725:web:9b2a310536ae8b60246854",
    measurementId: "G-FTVNGLJXNZ"
  };
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();


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
