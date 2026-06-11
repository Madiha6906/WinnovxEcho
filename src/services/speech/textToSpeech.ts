let currentSpeechLang = 'en-US';

export function setSpeechLanguage(lang: string) {
  currentSpeechLang = lang;
}

function chooseVoice(lang: string): SpeechSynthesisVoice | null {
  const voices = speechSynthesis.getVoices();
  if (!voices || voices.length === 0) return null;

  const normalized = lang.toLowerCase();
  const matchingVoices = voices.filter((voice) =>
    voice.lang.toLowerCase().startsWith(normalized)
  );

  const maleVoicePattern = /(male|man|boy|eric|david|mark|google|google uk|google us|matt|raj|gagan|azure)/i;
  const maleMatching = matchingVoices.filter((voice) =>
    maleVoicePattern.test(`${voice.name} ${voice.voiceURI}`)
  );

  if (maleMatching.length > 0) return maleMatching[0];
  if (matchingVoices.length > 0) return matchingVoices[0];

  return (
    voices.find((voice) => voice.lang.toLowerCase().includes(normalized)) ||
    voices[0] ||
    null
  );
}

export function createSpeechUtterance(text: string) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = currentSpeechLang;
  utterance.voice = chooseVoice(currentSpeechLang);
  utterance.rate = 0.9;
  utterance.pitch = 1.0;
  return utterance;
}

function isTeluguTts(lang: string) {
  return lang.toLowerCase().startsWith('te');
}

let currentAudio: HTMLAudioElement | null = null;

function stopCurrentAudio() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.src = '';
    currentAudio = null;
  }
}

async function fetchTtsAudio(text: string): Promise<Blob> {
  const payload = { text, lang: currentSpeechLang };
  const response = await fetch('http://127.0.0.1:8000/tts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`TTS request failed: ${response.status}`);
  }

  return await response.blob();
}

async function playTtsAudio(text: string): Promise<void> {
  try {
    const audioBlob = await fetchTtsAudio(text);
    const audioUrl = URL.createObjectURL(audioBlob);
    stopCurrentAudio();
    const audio = new Audio(audioUrl);
    currentAudio = audio;

    return new Promise((resolve) => {
      audio.onended = () => {
        URL.revokeObjectURL(audioUrl);
        currentAudio = null;
        resolve();
      };
      audio.onerror = () => {
        URL.revokeObjectURL(audioUrl);
        currentAudio = null;
        resolve();
      };

      audio.play().catch(() => {
        URL.revokeObjectURL(audioUrl);
        currentAudio = null;
        resolve();
      });
    });
  } catch (error) {
    console.warn('Telugu TTS failed, falling back to browser speech.', error);
    return speakBrowser(text);
  }
}

function speakBrowser(text: string): Promise<void> {
  return new Promise((resolve) => {
    const utterance = createSpeechUtterance(text);
    utterance.onend = () => resolve();
    utterance.onerror = () => resolve();
    speechSynthesis.speak(utterance);
  });
}

export async function speak(text: string): Promise<void> {
  if (isTeluguTts(currentSpeechLang)) {
    return await playTtsAudio(text);
  }
  return await speakBrowser(text);
}

export function speakNow(text: string) {
  if (isTeluguTts(currentSpeechLang)) {
    void playTtsAudio(text);
    return;
  }

  const utterance = createSpeechUtterance(text);
  speechSynthesis.speak(utterance);
}

export function speakAndWait(text: string): Promise<void> {
  return speak(text);
}
