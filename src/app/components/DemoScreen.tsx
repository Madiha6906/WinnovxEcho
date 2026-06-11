import { useEffect, useRef } from 'react';
import { ArrowLeft, Volume2 } from 'lucide-react';
import { speak } from '../../services/speech/textToSpeech';
import { useLanguage, getMessage, demoScreenSentences, demoScreenListItems } from '../../services/language';

interface DemoScreenProps {
  onBack: () => void;
  onStartAssistant: () => void;
}

export default function DemoScreen({ onBack, onStartAssistant }: DemoScreenProps) {
  const cancelRef = useRef(false);
  const recognitionRef = useRef<any>(null);
  const activeRecognition = useRef(false);

  const language = useLanguage();

  useEffect(() => {
    cancelRef.current = false;
    speakDemo();
    startVoiceListener();

    return () => {
      stopRecognition();
      cancelSpeech();
    };
  }, [language]);

  async function speakDemo() {
    speechSynthesis.cancel();
    await new Promise((resolve) => setTimeout(resolve, 250));
    const sentences = demoScreenSentences[language];
    for (const sentence of sentences) {
      if (cancelRef.current) {
        return;
      }
      await speak(sentence);
    }
  }

  function cancelSpeech() {
    cancelRef.current = true;
    speechSynthesis.cancel();
  }

  function handleVoiceNavigation(command: 'start' | 'back' | 'stop') {
    if (command === 'stop') {
      cancelSpeech();
      return;
    }

    stopRecognition();
    cancelSpeech();

    if (command === 'start') {
      speak(getMessage('startScreen', 'openingAssistant', language));
      setTimeout(() => {
        onStartAssistant();
      }, 1200);
    } else if (command === 'back') {
      speak(getMessage('demoScreen', 'returning', language));
      setTimeout(() => {
        onBack();
      }, 1200);
    }
  }

  function startVoiceListener() {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) {
      return;
    }

    try {
      const recognition = new SR();
      recognition.continuous = true;
      recognition.interimResults = false;

      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join(' ')
          .toLowerCase();

        if (transcript.includes('stop') || transcript.includes('ఆపు')) {
          handleVoiceNavigation('stop');
          return;
        }

        if (transcript.includes('go back') || transcript.includes('go back to') || transcript.includes('back') || transcript.includes('return') || transcript.includes('తిరిగి')) {
          handleVoiceNavigation('back');
          return;
        }

        if (transcript.includes('start assistant') || transcript.includes('start') || transcript.includes('assistant') || transcript.includes('అశిస్టెంట్') || transcript.includes('ప్రారంభించండి')) {
          handleVoiceNavigation('start');
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

      recognition.lang = language === 'telugu' ? 'te-IN' : 'en-US';
      recognition.start();
      recognitionRef.current = recognition;
      activeRecognition.current = true;
    } catch {
      activeRecognition.current = false;
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
      <div className="flex flex-col items-center gap-10 max-w-3xl w-full">
        <div className="w-full flex items-center justify-between">
          <button
            onClick={() => {
              cancelSpeech();
              onBack();
            }}
            className="inline-flex items-center gap-2 px-4 py-3 rounded-lg bg-white/10 border border-gray-700 text-white hover:bg-white/15"
          >
            <ArrowLeft size={18} /> {getMessage('demoScreen', 'back', language)}
          </button>
          <button
            onClick={cancelSpeech}
            className="inline-flex items-center gap-2 px-4 py-3 rounded-lg bg-red-600 text-white hover:bg-red-500"
          >
            {getMessage('demoScreen', 'stopVoice', language)}
          </button>
        </div>

        <div className="text-center w-full">
          <h1 className="text-[52px] font-bold mb-4" style={{ fontFamily: 'Neuton, serif' }}>
            {getMessage('demoScreen', 'title', language)}
          </h1>
          <p className="text-[20px] text-gray-300" style={{ fontFamily: 'Inter, sans-serif' }}>
            {getMessage('demoScreen', 'description', language)}
          </p>
        </div>

        <div className="space-y-4 w-full rounded-3xl bg-white/5 border border-white/10 p-8">
          <p className="text-[18px] text-white font-semibold" style={{ fontFamily: 'Inter, sans-serif' }}>
            {getMessage('demoScreen', 'howToUseHeader', language)}
          </p>
          <ul className="space-y-3 text-gray-200 text-[16px] leading-7" style={{ fontFamily: 'Inter, sans-serif' }}>
            {demoScreenListItems[language].map((item, index) => (
              <li key={index}>• {item}</li>
            ))}
          </ul>
        </div>

        <button
          onClick={() => {
            cancelSpeech();
            onStartAssistant();
          }}
          className="w-full min-h-[90px] bg-[#FFD700] text-black rounded-lg hover:scale-105 transition-transform duration-200 focus:outline-none focus:ring-4 focus:ring-[#FFD700] flex items-center justify-center gap-4"
        >
          <Volume2 size={32} />
          <span className="text-[24px] font-bold" style={{ fontFamily: 'Neuton, serif' }}>
            {getMessage('demoScreen', 'buttonStart', language)}
          </span>
        </button>
      </div>
    </div>
  );
}
