function showContent(room) {
    // Hide all room contents
    const contents = document.querySelectorAll('.room-content');
    contents.forEach(content => content.style.display = 'none');

    // Show selected room content
    const selectedRoom = document.getElementById(room);
    if (selectedRoom) {
        selectedRoom.style.display = 'block';
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
    var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/1446XDWidVPLierX1HXMPi8_8yEUchm4rrzb37MieZlg/edit?gid=0#gid=0'); 
    query.send(handleQueryResponse);
  }
  
  var options = {
    width: 950,  // Set the width of the chart in pixels
    height: 400, // Set the height of the chart in pixels
    title: 'Năng lương tiêu thụ trong 7 ngày ', // Optional: Add a chart title
    hAxis: {
      title: 'Ngày', // Add X-axis title
      titleTextStyle: { color: '#333' }, // Optional: Style the title
      gridlines: { count: 7 },
    },
    vAxis: {
      title: 'Năng lượng (kW)', // Add Y-axis title
      titleTextStyle: { color: '#333' }, // Optional: Style the title
    },
  };
  function handleQueryResponse(response) {
    if (response.isError()) {
      alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
      return;
    }
    var data = response.getDataTable();
    var view = new google.visualization.DataView(data);
    view.setColumns([0, 1, { 
      calc: "stringify",
      sourceColumn: 1, 
      type: "string",
      role: "annotation" 
    }]);
    var chart = new google.visualization.ColumnChart(document.getElementById('KitchenChart')); // Replace 'chart_div' with your HTML element ID
    chart.draw(view,options); 
  }
  google.charts.setOnLoadCallback(drawChart)
//end kitchen chart