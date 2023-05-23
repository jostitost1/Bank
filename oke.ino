#include <SPI.h>
#include <MFRC522.h>
#include <Keypad.h>

#define SS_PIN 10
#define RST_PIN 9

MFRC522 mfrc522(SS_PIN, RST_PIN);   // Create MFRC522 instance.
char initial_password[4] = {'1', '2', '3', '4'};  // Variable to store initial password
char password[4];   // Variable to store users password
uint8_t i = 0;  // Variable used for counter

char key_pressed = 0; // Variable to store incoming keys
const byte rows = 4;
const byte columns = 4;
char hexaKeys[rows][columns] = {
  {'1', '2', '3', 'A'},
  {'4', '5', '6', 'B'},
  {'7', '8', '9', 'C'},
  {'*', '0', '#', 'D'}
};
byte row_pins[rows] = {A0, A1, A2, A3};
byte column_pins[columns] = {5, 4, 3, 2};

Keypad keypad_key = Keypad( makeKeymap(hexaKeys), row_pins, column_pins, rows, columns);
boolean RFIDMode = true; // boolean to change modes
boolean GeldOpnemenMode = false; 

void setup() 
{
  Serial.begin(9600);   // Initiate a serial communication
  SPI.begin();      // Initiate  SPI bus
  mfrc522.PCD_Init();   // Initiate MFRC522
  Serial.println("Approximate your card to the reader...");
  Serial.println();
  pinMode(7, OUTPUT); digitalWrite(7, LOW);

}
void loop() 
{
  if(RFIDMode == true){
  // Look for new cards
  if ( ! mfrc522.PICC_IsNewCardPresent()) 
  {
    return;
  }
  // Select one of the cards
  if ( ! mfrc522.PICC_ReadCardSerial()) 
  {
    return;
  }
  //Show UID on serial monitor
  Serial.print("UID tag :");
  String content= "";
  byte letter;
  for (byte i = 0; i < mfrc522.uid.size; i++) 
  {
     Serial.print(mfrc522.uid.uidByte[i] < 0x10 ? " 0" : " ");
     Serial.print(mfrc522.uid.uidByte[i], HEX);
     content.concat(String(mfrc522.uid.uidByte[i] < 0x10 ? " 0" : " "));
     content.concat(String(mfrc522.uid.uidByte[i], HEX));
  }
  Serial.println();
  Serial.print("Message : ");
  content.toUpperCase();
  if (content.substring(1) == "53 F2 80 1A") //change here the UID of the card/cards that you want to give access
  {
    Serial.println("Tag Matched");
    delay(3000);
    Serial.println();
    Serial.println("Enter Password");
    RFIDMode = false;
    delay(3000);
  }
 else   
 {
    Serial.println(" Access denied");
    delay(3000);
    }
  }
  if (RFIDMode == false) {
    key_pressed = keypad_key.getKey(); // Storing keys
    if(key_pressed)
    {
      password[i++] = key_pressed; // Storing in password variable
      Serial.print("*");
    }
    if (i == 4) // If 4 keys are completed
    {
      delay(200);
      if (!(strncmp(password, initial_password, 4))) // If password is matched
      {
        Serial.println(" ");
        Serial.println("Pass Accepted");
        delay(3000);
        }
      else    // If password is not matched
      {
        Serial.print("Wrong Password");
        delay(3000);
        i = 0;
        RFIDMode = true;  // Make RFID mode true
      }
    }
  }
}

