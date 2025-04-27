import time
import random
import smtplib
from email.message import EmailMessage

# -------- CONFIGURATION --------
EMERGENCY_THRESHOLD = 40  # bpm
HOSPITAL_EMAIL = 'hospital_emergency@example.com'  # Replace with hospital email
YOUR_EMAIL = 'your_email@gmail.com'  # Replace with your email
YOUR_PASSWORD = 'your_app_password'  # App password from your Gmail account

PULSE_CHECK_INTERVAL = 5  # seconds

# -------- FUNCTIONS --------
def read_pulse():
    """
    Simulates reading the pulse rate from a smartwatch.
    Replace this with real sensor reading if available.
    """
    simulated_pulse = random.randint(25, 100)
    return simulated_pulse

def send_emergency_alert(current_pulse):
    """
    Sends an emergency email to the hospital when pulse is critically low.
    """
    print("🚑 Preparing emergency alert...")

    msg = EmailMessage()
    msg['Subject'] = '🚨 EMERGENCY: Low Pulse Detected'
    msg['From'] = YOUR_EMAIL
    msg['To'] = HOSPITAL_EMAIL
    msg.set_content(f"""
    Patient Emergency Alert!

    Critical pulse detected: {current_pulse} bpm (below safe limit).
    Immediate medical attention is required.

    Patient's location is already registered with the hospital.
    Time: {time.strftime('%Y-%m-%d %H:%M:%S')}
    """)

    try:
        with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
            smtp.login(YOUR_EMAIL, YOUR_PASSWORD)
            smtp.send_message(msg)
        print("✅ Emergency alert successfully sent!")
    except Exception as error:
        print(f"❌ Failed to send alert: {error}")

# -------- MAIN LOOP --------
def monitor_pulse():
    print("⌚ Starting pulse monitoring...")
    while True:
        pulse = read_pulse()
        print(f"❤️ Current Pulse: {pulse} bpm")

        if pulse < EMERGENCY_THRESHOLD:
            print("⚠️ Critical pulse detected!")
            send_emergency_alert(pulse)
            break  # Stop monitoring after sending alert
        
        time.sleep(PULSE_CHECK_INTERVAL)

# -------- START PROGRAM --------
if __name__ == "__main__":
    monitor_pulse()
