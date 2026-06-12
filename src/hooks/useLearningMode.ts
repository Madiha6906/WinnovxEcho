// src/hooks/useLearningMode.ts
// Fully voice-driven. No button presses required for navigation.
// UI exists only as visual feedback for partially sighted users.
// Every action is triggered by listening to and parsing the user's speech.

import { useState, useCallback, useRef, Dispatch, SetStateAction } from "react";
import { speak } from "../services/speech/textToSpeech";
import { recordAndSendAudio } from "../services/speech/speechToText";
import { getMessage, useLanguage, speechLanguage } from "../services/language";
import {
  generateExplanation,
  generateRecallQuestions,
  evaluateTeachBack,
  RecallQuestion,
} from "../services/geminiLearning";

// ── Types ──────────────────────────────────────────────────────────────────

export type SubMode = "main" | "explanation" | "recall" | "teach";
export type Status  = "idle" | "speaking" | "listening" | "processing" | "error";

export interface ExplanationState {
  topic: string;
  explanation: string;
}

export interface RecallState {
  topic: string;
  questions: RecallQuestion[];
  currentIndex: number;
  feedback: string;
  score: number;
  isComplete: boolean;
}

export interface TeachState {
  topic: string;
  feedback: string;
}

// ── Helpers ────────────────────────────────────────────────────────────────

const delay = (ms: number) => new Promise<void>((res) => setTimeout(res, ms));

function detectSubMode(speech: string): SubMode | null {
  const s = speech.toLowerCase();
  if (s.includes("explanation") || s.includes("explain"))    return "explanation";
  if (s.includes("recall") || s.includes("quiz"))            return "recall";
  if (s.includes("teach") || s.includes("teach me"))         return "teach";
  return null;
}

function isGoBackCommand(speech: string) {
  const s = speech.toLowerCase();
  return (
    s.includes("go back") ||
    s.includes("mode selection") ||
    s.includes("back to mode selection") ||
    s.includes("exit") ||
    s.includes("leave")
  );
}

function exitToModeSelection(onBack?: () => void, setStatus?: Dispatch<SetStateAction<Status>>, isRunning?: React.MutableRefObject<boolean>) {
  if (setStatus) setStatus("idle");
  if (isRunning) isRunning.current = false;
  if (onBack) onBack();
}

// ── Hook ───────────────────────────────────────────────────────────────────

export function useLearningMode(onBack?: () => void) {
  const language = useLanguage();
  const [subMode, setSubMode]   = useState<SubMode>("main");
  const [status,  setStatus]    = useState<Status>("idle");
  const isRunning               = useRef(false);
  const onBackRef               = useRef(onBack);
  const exitRequestedRef        = useRef(false);

  const [explanationState, setExplanationState] = useState<ExplanationState>({
    topic: "",
    explanation: "",
  });

  const [recallState, setRecallState] = useState<RecallState>({
    topic: "",
    questions: [],
    currentIndex: 0,
    feedback: "",
    score: 0,
    isComplete: false,
  });

  const [teachState, setTeachState] = useState<TeachState>({
    topic: "",
    feedback: "",
  });

  // ── Primitives ─────────────────────────────────────────────────────────

  async function say(text: string) {
    setStatus("speaking");
    await speak(text);
    await delay(1200);
  }

  async function listen(durationMs = 7000): Promise<string> {
    setStatus("listening");
    const result = await recordAndSendAudio(speechLanguage[language], durationMs);
    return (result ?? "").trim().toLowerCase();
  }

  // ── Sub-mode flows ─────────────────────────────────────────────────────

  async function runExplanationFlow() {
    setSubMode("explanation");
    setExplanationState({ topic: "", explanation: "" });

    await say(getMessage('learningMode', 'explanationIntro', language));

    const topic = await listen();
    if (isGoBackCommand(topic)) {
      exitRequestedRef.current = true;
      exitToModeSelection(onBackRef.current, setStatus, isRunning);
      return;
    }

    if (!topic) {
      await say(getMessage('learningMode', 'explanationNotHeard', language));
      const retry = await listen();
      if (isGoBackCommand(retry)) {
        exitRequestedRef.current = true;
        exitToModeSelection(onBackRef.current, setStatus, isRunning);
        return;
      }
      if (!retry) {
        await say("Still couldn't hear you. Returning to the main menu.");
        await runMainMenu();
        return;
      }
      await runExplanationForTopic(retry);
    } else {
      await runExplanationForTopic(topic);
    }
  }

  async function runExplanationForTopic(topic: string) {
    await say(getMessage('learningMode', 'explanationGenerating', language, { topic }));

    setStatus("processing");
    const explanation = await generateExplanation(topic);
    setExplanationState({ topic, explanation });

    await say(explanation);

    await say(getMessage('learningMode', 'explanationDone', language));

    const choice = await listen();
    if (isGoBackCommand(choice)) {
      exitRequestedRef.current = true;
      exitToModeSelection(onBackRef.current, setStatus, isRunning);
      return;
    }

    if (choice.includes("again") || choice.includes("repeat")) {
      await say(explanation);
      await runExplanationPostMenu(topic, explanation);
    } else if (choice.includes("new") || choice.includes("topic")) {
      await runExplanationFlow();
    } else if (detectSubMode(choice) === "recall") {
      await runRecallFlow();
    } else if (detectSubMode(choice) === "teach") {
      await runTeachFlow();
    } else {
      await runMainMenu();
    }
  }

  async function runExplanationPostMenu(topic: string, explanation: string) {
    await say(
      "Say 'again' to hear it once more, " +
      "'new topic' to learn something else, " +
      "or 'menu' to go back."
    );
    const choice = await listen();
    if (isGoBackCommand(choice)) {
      exitRequestedRef.current = true;
      exitToModeSelection(onBackRef.current, setStatus, isRunning);
      return;
    }

    if (choice.includes("again") || choice.includes("repeat")) {
      await say(explanation);
      await runExplanationPostMenu(topic, explanation);
    } else if (choice.includes("new") || choice.includes("topic")) {
      await runExplanationFlow();
    } else if (detectSubMode(choice) === "recall") {
      await runRecallFlow();
    } else if (detectSubMode(choice) === "teach") {
      await runTeachFlow();
    } else {
      await runMainMenu();
    }
  }

  // ── Active Recall flow ─────────────────────────────────────────────────

  async function runRecallFlow() {
    setSubMode("recall");
    setRecallState({ topic: "", questions: [], currentIndex: 0, feedback: "", score: 0, isComplete: false });

    await say(getMessage('learningMode', 'recallIntro', language));

    const topic = await listen();
    if (isGoBackCommand(topic)) {
      exitRequestedRef.current = true;
      exitToModeSelection(onBackRef.current, setStatus, isRunning);
      return;
    }
    if (!topic) {
      await say(getMessage('learningMode', 'recallNotHeard', language));
      const retry = await listen();
      if (isGoBackCommand(retry)) {
        exitRequestedRef.current = true;
        exitToModeSelection(onBackRef.current, setStatus, isRunning);
        return;
      }
      if (!retry) {
        await say("Still couldn't hear you. Returning to the main menu.");
        await runMainMenu();
        return;
      }
      await runRecallForTopic(retry);
    } else {
      await runRecallForTopic(topic);
    }
  }

  async function runRecallForTopic(topic: string) {
    await say(getMessage('learningMode', 'recallGenerating', language, { topic }));

    setStatus("processing");
    const questions = await generateRecallQuestions(topic);
    setRecallState({ topic, questions, currentIndex: 0, feedback: "", score: 0, isComplete: false });

    await say(`Ready. I have ${questions.length} questions for you about ${topic}.`);
    await runRecallQuestion(topic, questions, 0, 0);
  }

  function parseOptionSelection(answer: string, options: string[]): number {
    const normalized = answer.trim().toLowerCase();
    if (!normalized) return -1;

    const normalizedTokens = normalized.replace(/[^a-z0-9 ]/g, " ").split(/\s+/).filter(Boolean);
    const joined = normalizedTokens.join(" ");
    const letterMap: Record<string, number> = {
      a: 0,
      b: 1,
      c: 2,
      d: 3,
      "option a": 0,
      "option b": 1,
      "option c": 2,
      "option d": 3,
      "choice a": 0,
      "choice b": 1,
      "choice c": 2,
      "choice d": 3,
      first: 0,
      second: 1,
      third: 2,
      fourth: 3,
      one: 0,
      two: 1,
      three: 2,
      four: 3,
    };

    const directIndex = letterMap[joined] ?? letterMap[normalizedTokens[0] ?? ""];
    if (directIndex !== undefined && options[directIndex]) return directIndex;

    const lastToken = normalizedTokens[normalizedTokens.length - 1] ?? "";
    const lastTokenIndex = letterMap[lastToken];
    if (lastTokenIndex !== undefined && options[lastTokenIndex]) return lastTokenIndex;

    const ordinalToken = normalizedTokens.find((token) => letterMap[token] !== undefined);
    if (ordinalToken && options[letterMap[ordinalToken] ?? -1]) {
      return letterMap[ordinalToken] ?? -1;
    }

    for (let index = 0; index < options.length; index++) {
      const optionText = options[index].toLowerCase().replace(/[^a-z0-9 ]/g, " ");
      if (joined === optionText || joined.includes(optionText) || optionText.includes(joined)) {
        return index;
      }
    }

    return -1;
  }

  async function runRecallQuestion(
    topic: string,
    questions: RecallQuestion[],
    index: number,
    currentScore: number
  ) {
    setRecallState((prev) => ({ ...prev, currentIndex: index, feedback: "", score: currentScore }));

    const question = questions[index];
    await say(`Question ${index + 1} of ${questions.length}: ${question.question}`);
    await say(`Option A: ${question.options[0]}. Option B: ${question.options[1]}. Option C: ${question.options[2]}. Option D: ${question.options[3]}.`);
    await say("If you want me to repeat the question, say repeat. Otherwise say the letter of your choice or the answer option.");

    let answer = await listen();
    if (isGoBackCommand(answer)) {
      exitRequestedRef.current = true;
      exitToModeSelection(onBackRef.current, setStatus, isRunning);
      return;
    }

    if (answer.includes("repeat")) {
      await say(`Question ${index + 1} of ${questions.length}: ${question.question}`);
      await say(`Option A: ${question.options[0]}. Option B: ${question.options[1]}. Option C: ${question.options[2]}. Option D: ${question.options[3]}.`);
      await say("Now say the letter of your choice, or say the answer option.");
      answer = await listen();
      if (isGoBackCommand(answer)) {
        exitRequestedRef.current = true;
        exitToModeSelection(onBackRef.current, setStatus, isRunning);
        return;
      }
    }

    let selectedIndex = parseOptionSelection(answer, question.options);
    if (selectedIndex === -1) {
      await say(getMessage('learningMode', 'recallAnswerNotUnderstood', language));
      answer = await listen();
      if (isGoBackCommand(answer)) {
        exitRequestedRef.current = true;
        exitToModeSelection(onBackRef.current, setStatus, isRunning);
        return;
      }
      if (answer.includes("repeat")) {
        await say(`Question ${index + 1} of ${questions.length}: ${question.question}`);
        await say(`Option A: ${question.options[0]}. Option B: ${question.options[1]}. Option C: ${question.options[2]}. Option D: ${question.options[3]}.`);
        await say("Now say the letter of your choice, or say the answer option.");
        answer = await listen();
        if (isGoBackCommand(answer)) {
          exitRequestedRef.current = true;
          exitToModeSelection(onBackRef.current, setStatus, isRunning);
          return;
        }
      }
      selectedIndex = parseOptionSelection(answer, question.options);
    }

    if (selectedIndex === -1) {
      await say("I still couldn't understand the choice. I'll move to the next question.");
      selectedIndex = -1;
    }

    const isCorrect = selectedIndex === question.correctIndex;
    const chosenText = selectedIndex >= 0 ? question.options[selectedIndex] : "your selection";
    const correctText = question.options[question.correctIndex];
    const feedback = isCorrect
      ? `Correct. The right answer is ${correctText}.`
      : `Not quite. The correct answer is ${correctText}.`;

    const nextScore = isCorrect ? currentScore + 1 : currentScore;
    setRecallState((prev) => ({ ...prev, feedback, score: nextScore }));
    await say(feedback);

    const nextIndex = index + 1;
    if (nextIndex < questions.length) {
      await delay(500);
      await runRecallQuestion(topic, questions, nextIndex, nextScore);
    } else {
      setRecallState((prev) => ({ ...prev, isComplete: true, score: nextScore }));
      await say(getMessage('learningMode', 'recallCompleted', language, {
        topic,
        count: String(questions.length),
        score: String(nextScore),
      }));
      const choice = await listen();
      if (isGoBackCommand(choice)) {
        exitRequestedRef.current = true;
        exitToModeSelection(onBackRef.current, setStatus, isRunning);
        return;
      }
      if (choice.includes("again") || choice.includes("redo")) {
        await runRecallForTopic(topic);
      } else if (choice.includes("new") || choice.includes("topic")) {
        await runRecallFlow();
      } else if (detectSubMode(choice) === "explanation") {
        await runExplanationFlow();
      } else if (detectSubMode(choice) === "teach") {
        await runTeachFlow();
      } else {
        await runMainMenu();
      }
    }
  }

  // ── Teach Me Back flow ─────────────────────────────────────────────────

  async function runTeachFlow() {
    setSubMode("teach");
    setTeachState({ topic: "", feedback: "" });

    await say(getMessage('learningMode', 'teachIntro', language));

    const topic = await listen();
    if (isGoBackCommand(topic)) {
      exitRequestedRef.current = true;
      exitToModeSelection(onBackRef.current, setStatus, isRunning);
      return;
    }
    if (!topic) {
      await say(getMessage('learningMode', 'teachNotHeard', language));
      const retry = await listen();
      if (isGoBackCommand(retry)) {
        exitRequestedRef.current = true;
        exitToModeSelection(onBackRef.current, setStatus, isRunning);
        return;
      }
      if (!retry) {
        await say("Still couldn't hear you. Returning to the main menu.");
        await runMainMenu();
        return;
      }
      await runTeachForTopic(retry);
    } else {
      await runTeachForTopic(topic);
    }
  }

  async function runTeachForTopic(topic: string) {
    setTeachState({ topic, feedback: "" });

    await say(getMessage('learningMode', 'teachYourTopicIs', language, { topic }));

    const studentExplanation = await listen(120000);
    if (isGoBackCommand(studentExplanation)) {
      exitRequestedRef.current = true;
      exitToModeSelection(onBackRef.current, setStatus, isRunning);
      return;
    }

    await say(getMessage('learningMode', 'teachAnalysing', language));
    setStatus("processing");

    const feedback = await evaluateTeachBack(topic, studentExplanation);
    setTeachState({ topic, feedback });

    await say(feedback);

    await say(getMessage('learningMode', 'teachFeedbackPrompt', language));

    const choice = await listen();
    if (isGoBackCommand(choice)) {
      exitRequestedRef.current = true;
      exitToModeSelection(onBackRef.current, setStatus, isRunning);
      return;
    }
    if (choice.includes("again") || choice.includes("retry")) {
      await runTeachForTopic(topic);
    } else if (choice.includes("new") || choice.includes("topic")) {
      await runTeachFlow();
    } else if (detectSubMode(choice) === "explanation") {
      await runExplanationFlow();
    } else if (detectSubMode(choice) === "recall") {
      await runRecallFlow();
    } else {
      await runMainMenu();
    }
  }

  // ── Main menu ──────────────────────────────────────────────────────────

  async function runMainMenu() {
    setSubMode("main");

    await say(getMessage('learningMode', 'mainPrompt', language));

    const choice = await listen();
    if (isGoBackCommand(choice)) {
      exitRequestedRef.current = true;
      exitToModeSelection(onBackRef.current, setStatus, isRunning);
      return;
    }

    const detected = detectSubMode(choice);
    if (detected === "explanation") {
      await runExplanationFlow();
    } else if (detected === "recall") {
      await runRecallFlow();
    } else if (detected === "teach") {
      await runTeachFlow();
    } else {
      await say(getMessage('learningMode', 'mainPrompt', language));
      await runMainMenu();
    }
  }

  // ── Entry point — called once on mount ────────────────────────────────

  const startLearningMode = useCallback(async () => {
    if (isRunning.current) return;
    isRunning.current = true;
    exitRequestedRef.current = false;
    try {
      await runMainMenu();
    } finally {
      isRunning.current = false;
      setStatus("idle");
    }
  }, []);

  async function startExplanation() {
    if (isRunning.current) return;
    isRunning.current = true;
    exitRequestedRef.current = false;
    try {
      await runExplanationFlow();
    } finally {
      isRunning.current = false;
      setStatus("idle");
    }
  }

  async function startRecall() {
    if (isRunning.current) return;
    isRunning.current = true;
    exitRequestedRef.current = false;
    try {
      await runRecallFlow();
    } finally {
      isRunning.current = false;
      setStatus("idle");
    }
  }

  async function startTeach() {
    if (isRunning.current) return;
    isRunning.current = true;
    exitRequestedRef.current = false;
    try {
      await runTeachFlow();
    } finally {
      isRunning.current = false;
      setStatus("idle");
    }
  }

  // ── Exposed API ────────────────────────────────────────────────────────

  return {
    subMode,
    status,
    explanationState,
    recallState,
    teachState,
    startLearningMode,
    startExplanation,
    startRecall,
    startTeach,
  };
}