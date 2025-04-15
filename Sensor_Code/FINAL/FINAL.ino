#include <DHT.h>
#include <WiFi.h>
#include <FirebaseESP32.h>

#define WIFI_SSID "iPhone"
#define WIFI_PASSWORD "Dat22112004"

#define DELAY_TIME 2000
#define Dht_pin 13
#define dht_type DHT22

#define ANALOG_PIN 36
int rainThreshold = 2000;

const int mq135Pin = 34;

#define FIREBASE_HOST "testhtml-2a632-default-rtdb.firebaseio.com"
#define FIREBASE_AUTH "FUhmiaSp9QWKDTaMrTdLKSqxvOetmRfBF2hiB0RU"

FirebaseData fbdb;
FirebaseAuth auth;
FirebaseConfig config;
String path = "/";

DHT dht(Dht_pin, dht_type);

void setup() {
  Serial.begin(115200);
  dht.begin();

  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(300);
  }
  Serial.println();
  Serial.print("Connected with IP: ");
  Serial.println(WiFi.localIP());
  Serial.println();

  // Khởi tạo Firebase
  config.host = FIREBASE_HOST;
  config.signer.tokens.legacy_token = FIREBASE_AUTH;

  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true); 

  Firebase.setReadTimeout(fbdb, 1000 *  60);
  Firebase.setwriteSizeLimit(fbdb, "tiny");
}

void loop() {
  // Nhiệt độ và độ ẩm
  float humid = dht.readHumidity();
  float temp = dht.readTemperature();

  if (isnan(humid) || isnan(temp)) {
    Serial.println("Failed to read from DHT sensor!");
    return;
  }

  Serial.print("Temperature Value: ");
  Serial.println(temp);
  Serial.print("Humidity Value: ");
  Serial.println(humid);

  Firebase.setFloat(fbdb, "/livingroom/humidity", humid);
  Firebase.setFloat(fbdb, "/livingroom/temperature", temp);

  //Mưa hay không
  int rainLevel = analogRead(ANALOG_PIN);
  int rainfb = 0;
  Serial.print("Rain-analog: ");
  Serial.println(rainLevel);

  if (rainLevel > rainThreshold) {
    Serial.println("Không mưa!");
    rainfb = 0;
    Firebase.setInt (fbdb, "/livingroom/Weather", rainfb);
  } else {
    Serial.println("Có mưa!");
    rainfb = 1;
    Firebase.setInt (fbdb, "/livingroom/Weather", rainfb);
  }

  // AQI
  int analogValue = analogRead(mq135Pin);
  Serial.print("MQ-135 Analog Value: ");
  Serial.println(analogValue);

  float ppm = map(analogValue, 0, 4095, 0, 1000);  

  int aqi = calculateAQI(ppm);
  Serial.print("AQI: ");
  Serial.println(aqi);

  Firebase.setInt (fbdb, "/livingroom/aqi", aqi);
 
  // Chờ trước khi lặp lại
  delay(DELAY_TIME);
}

// Hàm quy đổi PPM sang AQI
int calculateAQI(float ppm) {
  int aqi;

  if (ppm <= 300) {
    aqi = map(ppm, 0, 300, 0, 50);      
  } else if (ppm <= 400) {
    aqi = map(ppm, 301, 400, 51, 100); 
  } else if (ppm <= 500) {
    aqi = map(ppm, 401, 500, 101, 150); 
  } else if (ppm <= 600) {
    aqi = map(ppm, 501, 600, 151, 200); 
  } else if (ppm <= 700) {
    aqi = map(ppm, 601, 700, 201, 300); 
  } else if (ppm <= 800) {
    aqi = map(ppm, 701, 800, 301, 400);
  } else if (ppm <= 900) {
    aqi = map(ppm, 801, 900, 401, 500);
  } else {
    aqi = 501;
  }

  return aqi;
}

