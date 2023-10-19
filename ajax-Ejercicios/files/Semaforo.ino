const int ledVerde = 13;
const int ledAmarillo = 12;
const int ledRojo = 8;
String entrada;
const int BOTON = 7;
int valor;
int val;


void setup() {
  // put your setup code here, to run once:
  pinMode(ledVerde, OUTPUT);
  pinMode(ledAmarillo, OUTPUT);
  pinMode(ledRojo, OUTPUT);
  pinMode(BOTON, INPUT);
  Serial.begin(9600);
}

void loop() {
  // put your main code here, to run repeatedly:
  valor = digitalRead(BOTON);
  if(Serial.available()){
    entrada = Serial.readString();  
  }

  if(entrada=="START" || valor==HIGH){
    val=1;
  }
  if(val==1){
    Serial.println();
      digitalWrite(ledVerde, HIGH);
      Serial.write(1);
      delay(3000);
      digitalWrite(ledVerde, LOW);
      Serial.write(0);
      delay(1000);

      digitalWrite(ledAmarillo, HIGH);
      Serial.write(2);
      delay(2000);
      digitalWrite(ledAmarillo, LOW);
      Serial.write(0);
      delay(1000);
      digitalWrite(ledAmarillo, HIGH);
      Serial.write(2);
      delay(1000);
      digitalWrite(ledAmarillo, LOW);
      Serial.write(0);
      delay(1000);
       digitalWrite(ledAmarillo, HIGH);
       Serial.write(2);
      delay(1000);
      digitalWrite(ledAmarillo, LOW);
      Serial.write(0);
      delay(1000);
      
      digitalWrite(ledRojo, HIGH);
      Serial.write(3);
      delay(10000);
      digitalWrite(ledRojo, LOW);
      Serial.write(0);
      delay(1000);

      if(entrada=="APAGAR"){
        Serial.write(0);
          digitalWrite(ledVerde, LOW);
          digitalWrite(ledAmarillo, LOW);
          digitalWrite(ledRojo, LOW);
      }
    }
      
  

}
