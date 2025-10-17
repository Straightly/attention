# First NLP.py

import librosa
import numpy as np
from transformers import pipeline
from allosaurus.app import read_recognizer
import string
import sys

def clean_text(text):
# Remove punctuation and lowercase
return ''.join(c for c in text if c not in string.punctuation).lower().strip()

def process_audio(audio_file):
target_sentence = "Buri munsi, abanyeshuri baririmba indirimbo."
clean_target = clean_text(target_sentence)

```
# Load audio
y, sr = librosa.load(audio_file, sr=None)

# Step 1: Transcribe using KinyaWhisper
transcriber = pipeline(
    "automatic-speech-recognition",
    model="benax-rw/KinyaWhisper",
    chunk_length_s=30,
)
transcription = transcriber(audio_file, return_timestamps="word")

# Extract text and chunks
full_text = transcription['text']
chunks = transcription['chunks']

# Clean transcribed text
clean_trans = clean_text(full_text)

# Check if matches
if clean_trans != clean_target:
    return "The sentence was not spoken or not recognized correctly."

# Extract word timestamps
word_times = {}
transcribed_words = []
for chunk in chunks:
    word = clean_text(chunk['text'])
    if word:  # skip empty
        transcribed_words.append(word)
        word_times[word] = chunk['timestamp']

# Double-check join
if ' '.join(transcribed_words) != clean_target:
    return "The sentence was not spoken or not recognized correctly."

# Step 2: Check for background noise
# Create speech mask
speech_mask = np.zeros(len(y), dtype=bool)
for timestamp in word_times.values():
    start_idx = int(timestamp[0] * sr) if timestamp[0] is not None else 0
    end_idx = int(timestamp[1] * sr) if timestamp[1] is not None else len(y)
    speech_mask[start_idx:end_idx] = True

speech_y = y[speech_mask]
noise_y = y[~speech_mask]

if len(speech_y) == 0:
    return "No speech detected."

rms_speech = np.sqrt(np.mean(speech_y**2)) if len(speech_y) > 0 else 0
rms_noise = np.sqrt(np.mean(noise_y**2)) if len(noise_y) > 0 else 0

if rms_noise == 0:
    snr = float('inf')
else:
    snr = 20 * np.log10(rms_speech / rms_noise)

if snr < 20:
    return f"The audio has too much background noise (SNR: {snr:.2f} dB)."

# Step 3: Measure F0 of second vowel in "baririmba"
# Get word segment times
baririmba_times = word_times.get('baririmba')
if not baririmba_times:
    return "Word 'baririmba' not found in transcription."
word_start, word_end = baririmba_times

# Use Allosaurus for phone recognition with timestamps
model = read_recognizer()
phone_result = model.recognize(audio_file, lang_id='kin', timestamp=True)

# Parse phones
phones = []
for line in phone_result.split('\\n'):
    if line.strip():
        start, dur, phone = line.split()
        phones.append({
            'start': float(start),
            'dur': float(dur),
            'phone': phone
        })

# Filter phones within word
word_phones = [p for p in phones if p['start'] >= word_start and p['start'] + p['dur'] <= word_end]

# Define vowel phones (common IPA vowels)
vowels = set('aeiouɑɛɪɔʊɐəɨʉɘ')

vowel_phones = [p for p in word_phones if p['phone'] in vowels]

if len(vowel_phones) < 2:
    return "Could not detect enough vowels in 'baririmba'."

# Second vowel
second_vowel = vowel_phones[1]
vowel_start = second_vowel['start']
vowel_end = vowel_start + second_vowel['dur']

# Extract vowel audio
v_start_idx = int(vowel_start * sr)
v_end_idx = int(vowel_end * sr)
vowel_y = y[v_start_idx:v_end_idx]

if len(vowel_y) == 0:
    return "Vowel segment too short."

# Compute F0 using YIN
f0 = librosa.yin(vowel_y, fmin=75, fmax=500, sr=sr)
f0_mean = np.median(f0[f0 > 0])  # median of non-zero

if np.isnan(f0_mean):
    return "Could not estimate F0."

return f"The sentence was spoken cleanly (SNR: {snr:.2f} dB). The F0 of the second vowel in 'baririmba' is {f0_mean:.2f} Hz."

```

# Usage

if **name** == "**main**":
if len(sys.argv) != 2:
print("Usage: python [script.py](http://script.py/) <audio_file>")
sys.exit(1)
audio_file = sys.argv[1]
result = process_audio(audio_file)
print(result)