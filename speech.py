import speech_recognition as sr
# pip install SpeechRecognition
# pip install pyaudio
r = sr.Recognizer()
mic = sr.Microphone()

print("speeking...")
with mic as source:
    r.adjust_for_ambient_noise(source)
    audio = r.listen(source)

print("recognizing...")
test = r.recognize_google(audio, language='cmn-Hans-TW')
print(test)
