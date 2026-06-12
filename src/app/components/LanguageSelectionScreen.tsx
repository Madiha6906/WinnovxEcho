import { useEffect, useRef, useState } from 'react';
import { speak, setSpeechLanguage } from '../../services/speech/textToSpeech';
import { LanguageOption, getLanguageName, getMessage, speechLanguage } from '../../services/language';

interface LanguageSelectionScreenProps {
  onLanguageSelected: (language: LanguageOption) => void;
}

export default function LanguageSelectionScreen({ onLanguageSelected }: LanguageSelectionScreenProps) {
  const recognitionRef = useRef<any>(null);
  const activeRecognition = useRef(false);

  const [status, setStatus] = useState('Idle');
  const [language, setLanguage] = useState<LanguageOption | ''>('');
  const [message, setMessage] = useState(getMessage('languageSelection', 'messageDefault', 'english'));

  const displayLanguage = language || 'english';

  useEffect(() => {
    speechSynthesis.cancel();

    async function init() {
      setStatus('Speaking...');
      await speak(getMessage('languageSelection', 'subtitle', displayLanguage));
      setStatus('Listening...');
      startListener();
    }

    init();

    return () => {
      stopRecognition();
      speechSynthesis.cancel();
    };
  }, []);

  async function chooseLanguage(lang: LanguageOption) {
    stopRecognition();
    cancelSpeech();
    setLanguage(lang);
    setStatus('Speaking...');
    setMessage(getMessage('languageSelection', 'languageSelected', lang).replace('{lang}', getLanguageName(lang)));
    setSpeechLanguage(speechLanguage[lang]);
    await speak(getMessage('languageSelection', lang === 'english' ? 'selectedSpeechEnglish' : 'selectedSpeechTelugu', lang));
    setTimeout(() => {
      onLanguageSelected(lang);
    }, 800);
  }


  function cancelSpeech() {
    speechSynthesis.cancel();
    setStatus('Idle');
  }

  function startListener() {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) {
      setMessage('Speech recognition is not supported in this browser.');
      return;
    }

    try {
      const recognition = new SR();
      recognition.continuous = true;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join(' ')
          .toLowerCase();

        if (transcript.includes('english') || transcript.includes('ఆంగ్లం')) {
          chooseLanguage('english');
          return;
        }

        if (transcript.includes('telugu') || transcript.includes('తెలుగు')) {
          chooseLanguage('telugu');
          return;
        }

        if (transcript.includes('stop') || transcript.includes('ఆపు')) {
          cancelSpeech();
          setMessage(getMessage('languageSelection', 'messageDefault', displayLanguage));
          return;
        }
      };

      recognition.onend = () => {
        if (activeRecognition.current) {
          setTimeout(() => {
            try {
              recognition.start();
            } catch {
              // ignore restart failure
            }
          }, 500);
        }
      };

      recognition.start();
      recognitionRef.current = recognition;
      activeRecognition.current = true;
    } catch {
      activeRecognition.current = false;
      setMessage('Unable to start speech recognition.');
    }
  }

  function stopRecognition() {
    if (recognitionRef.current) {
      activeRecognition.current = false;
      recognitionRef.current.onend = null;
      try {
        recognitionRef.current.stop();
      } catch {
        // ignore
      }
      recognitionRef.current = null;
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-full px-6 py-12 bg-black text-white">
      <div className="flex flex-col items-center gap-10 max-w-2xl w-full">
        <div className="text-center">
          <h1 className="text-[64px] font-bold mb-4" style={{ fontFamily: 'Neuton, serif' }}>
            Serah AI
          </h1>
          <p className="text-[22px]" style={{ fontFamily: 'Inter, sans-serif' }}>
            {getMessage('languageSelection', 'subtitle', displayLanguage)}
          </p>
        </div>

        <div className="w-full grid gap-4 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => chooseLanguage('english')}
            className="min-h-[90px] bg-[#FFD700] text-black rounded-lg hover:scale-105 transition-transform duration-200 focus:outline-none focus:ring-4 focus:ring-[#FFD700]"
          >
            <span className="text-[24px] font-bold" style={{ fontFamily: 'Neuton, serif' }}>
              {getMessage('languageSelection', 'english', displayLanguage)}
            </span>
          </button>
          <button
            type="button"
            onClick={() => chooseLanguage('telugu')}
            className="min-h-[90px] bg-white/10 text-white border border-white/20 rounded-lg hover:bg-white/15 transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-white/20"
          >
            <span className="text-[24px] font-bold" style={{ fontFamily: 'Neuton, serif' }}>
              {getMessage('languageSelection', 'telugu', displayLanguage)}
            </span>
          </button>
        </div>

        <div className="w-full text-center text-white/80 text-[15px] leading-6">
          {message}
        </div>

        <div className="w-full flex flex-col gap-4 sm:flex-row">
          <button
            type="button"
            onClick={() => language && chooseLanguage(language)}
            disabled={!language}
            className="w-full min-h-[70px] rounded-lg bg-[#FFD700] text-black font-bold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {getMessage('languageSelection', 'continue', displayLanguage)}
          </button>
          <button
            type="button"
            onClick={cancelSpeech}
            className="w-full min-h-[70px] rounded-lg bg-red-600 text-white hover:bg-red-500 transition-colors duration-200"
          >
            {getMessage('languageSelection', 'stopListening', displayLanguage)}
          </button>
        </div>

        <div className="text-sm text-white/60">Status: {status}</div>
      </div>
    </div>
  );
}
