#include <AccelStepper.h>

const int maxLineLength = 40;
String inputBuffer = "";
bool dataReceived = false;

// NEMA17 & Solenoid Configuration
const int dirPin = 3;
const int stepPin = 2;
const int solenoidPin = 11;  // PWM-capable pin (UNO D11)

// Motion geometry
const float stepsPerMM = 63.3;
const float dotSpacing = 7.0;
float totalDistanceMoved = 0;

// 28BYJ-48 Configuration (AccelStepper)
AccelStepper stepper1(AccelStepper::HALF4WIRE, 4, 6, 5, 7);
AccelStepper stepper2(AccelStepper::HALF4WIRE, 12, 9, 10, 8);
const float stepsPerMM_Y = 42.67;

// Solenoid tuning
const uint8_t SOLENOID_HOLD = 60;   // ~27% hold (0-255)
const uint8_t SOLENOID_FULL = 255;  // full power pulse
const int PUNCH_DOWN_MS   = 90;
const int LIFT_FULL_MS    = 120;
const int SETTLE_MS       = 140;

// Motor smoothing tuning
const float STEPPER_MAX_SPEED = 600.0;
const float STEPPER_ACCEL     = 300.0;
const unsigned int STEP_PULSE_US = 1400;

// Unicode Braille to 6-dot pattern mapping
String unicodeToBraillePattern(String unicodeChar) {
  // Handle common Unicode braille characters (U+2800 to U+283F)
  // Convert 3-byte UTF-8 sequence to braille pattern
  
  if (unicodeChar.length() >= 3) {
    uint8_t byte1 = unicodeChar.charAt(0);
    uint8_t byte2 = unicodeChar.charAt(1);
    uint8_t byte3 = unicodeChar.charAt(2);
    
    // Check if it's a braille character (starts with 0xE2 0xA0)
    if (byte1 == 0xE2 && byte2 == 0xA0) {
      uint8_t pattern = byte3 - 0x80; // Get the pattern from the third byte
      
      // Convert pattern to 6-dot string (dots 1,2,3,4,5,6)
      String result = "";
      result += (pattern & 0x01) ? "1" : "0"; // dot 1
      result += (pattern & 0x02) ? "1" : "0"; // dot 2
      result += (pattern & 0x04) ? "1" : "0"; // dot 3
      result += (pattern & 0x08) ? "1" : "0"; // dot 4
      result += (pattern & 0x10) ? "1" : "0"; // dot 5
      result += (pattern & 0x20) ? "1" : "0"; // dot 6
      
      return result;
    }
  }
  
  // Fallback: try ASCII conversion
  if (unicodeChar.length() == 1) {
    return getBrailleChar(unicodeChar.charAt(0));
  }
  
  return "000000"; // Empty braille cell
}

void punch() {
  // Punch DOWN (release)
  analogWrite(solenoidPin, 0);
  delay(PUNCH_DOWN_MS);
  delay(30);

  // Snap UP with full power briefly
  analogWrite(solenoidPin, SOLENOID_FULL);
  delay(LIFT_FULL_MS);

  // Switch to weak hold to save current
  analogWrite(solenoidPin, SOLENOID_HOLD);
  delay(SETTLE_MS);
}

void moveForward(float mm) {
  long steps = (long)(mm * stepsPerMM);
  digitalWrite(dirPin, HIGH);

  for (long i = 0; i < steps; i++) {
    digitalWrite(stepPin, HIGH);
    delayMicroseconds(STEP_PULSE_US);
    digitalWrite(stepPin, LOW);
    delayMicroseconds(STEP_PULSE_US);
  }
  delay(120);
}

void moveBackToStart() {
  long steps = (long)(totalDistanceMoved * stepsPerMM);
  digitalWrite(dirPin, LOW);
  for (long i = 0; i < steps; i++) {
    digitalWrite(stepPin, HIGH);
    delayMicroseconds(STEP_PULSE_US);
    digitalWrite(stepPin, LOW);
    delayMicroseconds(STEP_PULSE_US);
  }
  delay(120);
  totalDistanceMoved = 0;
}

void moveYaxis(float mm) {
  long steps = (long)(mm * stepsPerMM_Y);
  stepper1.move(steps);
  stepper2.move(steps);
  while (stepper1.isRunning() || stepper2.isRunning()) {
    stepper1.run();
    stepper2.run();
  }
  delay(200);
}

void setup() {
  Serial.begin(9600);
  Serial.setTimeout(5000); // 5 second timeout for serial reads
  
  // Send ready signal to web app
  Serial.println("BRAILLE_EMBOSSER_READY");
  Serial.println("Waiting for braille data from web app...");

  pinMode(stepPin, OUTPUT);
  pinMode(dirPin, OUTPUT);
  pinMode(solenoidPin, OUTPUT);

  // Start UP with weak hold
  analogWrite(solenoidPin, SOLENOID_HOLD);

  stepper1.setMaxSpeed(STEPPER_MAX_SPEED);
  stepper1.setAcceleration(STEPPER_ACCEL);
  stepper2.setMaxSpeed(STEPPER_MAX_SPEED);
  stepper2.setAcceleration(STEPPER_ACCEL);

  // Initial positioning
  moveForward(10.0);
  totalDistanceMoved += 10.0;
  
  Serial.println("Embosser initialized and ready!");
}

void loop() {
  // Handle serial communication from web app
  if (Serial.available()) {
    String receivedData = Serial.readStringUntil('\n');
    receivedData.trim(); // Remove whitespace
    
    if (receivedData.length() > 0) {
      Serial.println("RECEIVED: " + String(receivedData.length()) + " bytes");
      Serial.println("DATA: " + receivedData);
      
      // Process the received braille data
      processBrailleFromWeb(receivedData);
      
      Serial.println("EMBOSSING_COMPLETE");
      Serial.println("Ready for next data...");
    }
  }
}

// Process braille data received from web application
void processBrailleFromWeb(String brailleData) {
  Serial.println("Starting embossing process...");
  
  // Parse UTF-8 braille characters
  int charCount = 0;
  int i = 0;
  
  while (i < brailleData.length()) {
    String brailleChar = "";
    
    // Check if it's a UTF-8 multibyte character (braille)
    if ((uint8_t)brailleData.charAt(i) == 0xE2 && 
        i + 2 < brailleData.length() &&
        (uint8_t)brailleData.charAt(i + 1) == 0xA0) {
      // 3-byte UTF-8 braille character
      brailleChar = brailleData.substring(i, i + 3);
      i += 3;
    } else {
      // Single byte character (ASCII)
      brailleChar = brailleData.substring(i, i + 1);
      i += 1;
    }
    
    charCount++;
    if (charCount > maxLineLength) {
      Serial.println("Line too long, truncating...");
      break;
    }
    
    // Convert to dot pattern and emboss
    String pattern = unicodeToBraillePattern(brailleChar);
    embossCharacter(pattern);
  }
  
  // Move to next line after completing the text
  finishLine();
  Serial.println("Embossed " + String(charCount) + " characters");
}

// Emboss a single braille character using 6-dot pattern
void embossCharacter(String pattern) {
  if (pattern.length() != 6) {
    pattern = "000000"; // Default to empty cell
  }
  
  // Emboss dots in standard braille order (1,4,2,5,3,6)
  for (int group = 0; group < 3; group++) {
    for (int col = 0; col < 2; col++) {
      moveForward(dotSpacing);
      totalDistanceMoved += dotSpacing;
      
      int dotIndex;
      if (group == 0) dotIndex = col;           // dots 1,2
      else if (group == 1) dotIndex = col + 3;  // dots 4,5  
      else dotIndex = col + 2;                  // dots 3,6
      
      if (pattern.charAt(dotIndex) == '1') {
        punch();
      }
    }
    
    // Return to start and move to next row
    moveBackToStart();
    moveForward(10.0);
    totalDistanceMoved += 10.0;
    
    if (group < 2) {
      moveYaxis(dotSpacing);
    }
  }
}

void finishLine() {
  moveYaxis(10.0);  // Move to next braille line
  Serial.println("Line completed, ready for next");
}

// Fallback ASCII to braille conversion (for compatibility)
String getBrailleChar(char c) {
  switch (tolower(c)) {
    case 'a': return "100000";  // dot 1
    case 'b': return "110000";  // dots 1,2
    case 'c': return "100100";  // dots 1,4
    case 'd': return "100110";  // dots 1,4,5
    case 'e': return "100010";  // dots 1,5
    case 'f': return "110100";  // dots 1,2,4
    case 'g': return "110110";  // dots 1,2,4,5
    case 'h': return "110010";  // dots 1,2,5
    case 'i': return "010100";  // dots 2,4
    case 'j': return "010110";  // dots 2,4,5
    case 'k': return "101000";  // dots 1,3
    case 'l': return "111000";  // dots 1,2,3
    case 'm': return "101100";  // dots 1,3,4
    case 'n': return "101110";  // dots 1,3,4,5
    case 'o': return "101010";  // dots 1,3,5
    case 'p': return "111100";  // dots 1,2,3,4
    case 'q': return "111110";  // dots 1,2,3,4,5
    case 'r': return "111010";  // dots 1,2,3,5
    case 's': return "011100";  // dots 2,3,4
    case 't': return "011110";  // dots 2,3,4,5
    case 'u': return "101001";  // dots 1,3,6
    case 'v': return "111001";  // dots 1,2,3,6
    case 'w': return "010111";  // dots 2,4,5,6
    case 'x': return "101101";  // dots 1,3,4,6
    case 'y': return "101111";  // dots 1,3,4,5,6
    case 'z': return "101011";  // dots 1,3,5,6
    case ' ': return "000000";  // space
    default: return "000000";   // unknown character
  }
}

// Legacy function for manual text input (kept for backward compatibility)
void processBraille(String text) {
  Serial.println("Processing legacy ASCII text: " + text);
  
  for (int i = 0; i < text.length() && i < maxLineLength; i++) {
    String pattern = getBrailleChar(text.charAt(i));
    embossCharacter(pattern);
  }
  
  finishLine();
}