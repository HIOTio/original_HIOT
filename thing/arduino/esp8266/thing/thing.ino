/*
 * HIOT.io Thing
 *  Simple device for monitoring and controlling soil moisture levels
 *  - Sensors
 *  -- Ambient light level (simple LDR as a voltage divider)
 *  -- Soil moisture sensor
 *  -- Ultrasonic distance measurment (for water level in tank)
 *  -- Temperature level
 *  - Controllers
 *  -- Relay to control water valve for irrigation
 *  
 *  Standard SD card slot for offline data logging 
 *  and for WiFi configuration (updatable via platform)
 *  
 *  I2C LCD Screen for output (moisture level, light level, amounr of water in tank, WiFi connectivity)
 *  
 *  Physical Exception handling
 *  -- No water in tank
 *  -- moisture level outside of expected values
 *  
 *  
*/

#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266WebServer.h>
#include <ESP8266mDNS.h>
#include <ArduinoJson.h>
#include <Wire.h>
#include <LCD.h>
#include <LiquidCrystal_I2C.h>


//configure lcd
#define I2C_ADDR    0x3F // <<----- Add your address here.  Find it from I2C Scanner
#define BACKLIGHT_PIN     3
#define En_pin  2
#define Rw_pin  1
#define Rs_pin  0
#define D4_pin  4
#define D5_pin  5
#define D6_pin  6
#define D7_pin  7


LiquidCrystal_I2C  lcd(I2C_ADDR,En_pin,Rw_pin,Rs_pin,D4_pin,D5_pin,D6_pin,D7_pin);
ESP8266WebServer server(80);

//define pins for sensors and controllers

#define SD_CS 4;
#define SD_SCK 10;
#define SD_MISO 12;
#define SD_MOSI 13;

#define Moist_A0 0;
#define Moist_D0 0;

#define I2C_SDA 4;
#define I2C_SCL 5;

int poll_interval=0;

void setup() {
  lcd.setBacklightPin(BACKLIGHT_PIN,POSITIVE);
lcd.setBacklight(HIGH);
lcd.home (); // go home
 lcd.setBacklight(HIGH); 
  //read config from "config.txt" on SD card
  char ssid[]="";
  char password[]="";
  poll_interval=0;

  
  WiFi.begin(ssid, password);
  //start LCD and display WiFi status
  
  //wait for WiFi connection
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    lcd.print(".");
    //need to add a loop to breakout and display the status if not connected after a defined period
  }
  lcd.println("");
  lcd.print("Connected");

  //Create Thing Endpoints
    server.on("/", []() {
    //display Name and function of Thing
    server.send(200, "text/html","HIOT.io - Irrigation");
  });
  
  server.on("/Thing/Sensor/1",[](){
    sensor1();
  });
  server.on("/Thing/Sensor/2", [](){
    sensor2();
  });
  server.on("/Thing/Sensor/3",[](){
    sensor3();
  });
  server.on("/Thing/Sensor/4",[](){
    sensor4();
  });
  server.on("/Thing/Status",[](){
    stats();
  });
  server.on("/Thing/Sync",[](){
    sync();
  });
  server.on("/Thing/Command",[](){
    returnCommands();
  });
  server.on("/Thing/Command",[](){
    executeCommand();
  });
}

void loop() {
  // put your main code here, to run repeatedly:
  server.handleClient();
}

void sensor1(){
  
}
void sensor2(){
  
}
void sensor3(){
  
}
void sensor4(){
  
}
void stats(){
  
}
void sync(){
  
}
void returnCommands(){
  
}
void executeCommand(){
  
}
void controller1(char state[]){
  
}

