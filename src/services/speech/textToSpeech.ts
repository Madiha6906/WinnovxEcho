let currentSpeechLang = 'en-US';
let voicesReadyPromise: Promise<void> | null = null;

export function setSpeechLanguage(lang: string) {
  currentSpeechLang = lang;
}

function ensureVoicesReady(): Promise<void> {
  const voices = speechSynthesis.getVoices();
  if (voices.length > 0) return Promise.resolve();
  if (voicesReadyPromise) return voicesReadyPromise;

  voicesReadyPromise = new Promise((resolve) => {
    const onVoicesChanged = () => {
      const loaded = speechSynthesis.getVoices();
      if (loaded.length > 0) {
        speechSynthesis.removeEventListener('voiceschanged', onVoicesChanged);
        resolve();
      }
    };

    speechSynthesis.addEventListener('voiceschanged', onVoicesChanged);
    setTimeout(() => {
      speechSynthesis.removeEventListener('voiceschanged', onVoicesChanged);
      resolve();
    }, 2000);
  });

  return voicesReadyPromise;
}

function chooseVoice(lang: string): SpeechSynthesisVoice | null {
  const voices = speechSynthesis.getVoices();
  if (!voices || voices.length === 0) return null;

  const normalized = lang.toLowerCase();
  const matchingVoices = voices.filter((voice) =>
    voice.lang.toLowerCase().startsWith(normalized)
  );

  const femaleVoicePattern = /(female|woman|girl|lady|zira|samantha|iva|susan|jane|kate|voice 1|voice 2|olivia|ava|bella|michelle|ariana|victoria|nora|emma|alloy|google female|google uk female|google us female|microsoft zira|serena|kira|irina|kyla)/i;
  const femaleMatching = matchingVoices.filter((voice) =>
    femaleVoicePattern.test(`${voice.name} ${voice.voiceURI}`)
  );

  if (femaleMatching.length > 0) return femaleMatching[0];
  if (matchingVoices.length > 0) {
    const fallbackFemale = matchingVoices.find((voice) =>
      femaleVoicePattern.test(`${voice.name} ${voice.voiceURI}`)
    );
    if (fallbackFemale) return fallbackFemale;
    return matchingVoices[0];
  }

  const anyFemale = voices.find((voice) =>
    femaleVoicePattern.test(`${voice.name} ${voice.voiceURI}`)
  );
  if (anyFemale) return anyFemale;

  return (
    voices.find((voice) => voice.lang.toLowerCase().includes(normalized)) ||
    voices[0] ||
    null
  );
}

export async function createSpeechUtterance(text: string) {
  await ensureVoicesReady();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = currentSpeechLang;
  const voice = chooseVoice(currentSpeechLang);
  if (voice) utterance.voice = voice;
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
  const response = await fetch(`${BACKEND_URL}/tts`, {
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

async function speakBrowser(text: string): Promise<void> {
  const utterance = await createSpeechUtterance(text);
  return new Promise((resolve) => {
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

  void createSpeechUtterance(text).then((utterance) => {
    speechSynthesis.speak(utterance);
  });
}

export function speakAndWait(text: string): Promise<void> {
  return speak(text);
}
