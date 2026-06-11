import { createContext, useContext } from 'react';

export type LanguageOption = 'english' | 'telugu';

export const speechLanguage: Record<LanguageOption, string> = {
  english: 'en-US',
  telugu: 'te-IN',
};

export const LanguageContext = createContext<LanguageOption>('english');

export function useLanguage() {
  return useContext(LanguageContext);
}

const messages: Record<string, Record<string, { english: string; telugu: string }>> = {
  languageSelection: {
    title: {
      english: 'EchoEd',
      telugu: 'ఎకోఈడ్',
    },
    subtitle: {
      english: 'Welcome to EchoEd. Select your language and enter your name.',
      telugu: 'ఎకోఈడ్‌కు స్వాగతం. మీ భాషను ఎంచుకోండి.',
    },
    messageDefault: {
      english: 'Please say English or Telugu to continue.',
      telugu: 'దయచేసి కొనసాగడానికి ఆంగ్లం లేదా తెలుగు అని చెప్పండి.',
    },
    languageSelected: {
      english: 'Language selected: {lang}. Opening EchoEd.',
      telugu: 'భాష ఎంచుకోబడింది: {lang}. ఎకోఈడ్‌ను ప్రారంభిస్తున్నాం.',
    },
    selectedSpeechEnglish: {
      english: 'You selected English. Opening EchoEd.',
      telugu: 'మీరు ఆంగ్లాన్ని ఎంచుకున్నారు. ఎకోఈడ్‌ను ప్రారంభిస్తున్నాం.',
    },
    selectedSpeechTelugu: {
      english: 'You selected Telugu. Opening EchoEd.',
      telugu: 'మీరు తెలుగును ఎంచుకున్నారు. ఎకోఈడ్‌ను ప్రారంభిస్తున్నాం.',
    },
    continue: {
      english: 'Continue',
      telugu: 'కొనసాగించండి',
    },
    stopListening: {
      english: 'Stop Listening',
      telugu: 'వాయిస్ ఆపి',
    },
    english: {
      english: 'English',
      telugu: 'ఆంగ్లం',
    },
    telugu: {
      english: 'Telugu',
      telugu: 'తెలుగు',
    },
  },
  startScreen: {
    title: {
      english: 'EchoEd',
      telugu: 'ఎకోఈడ్',
    },
    subtitle: {
      english: 'Voice-First Learning Assistant',
      telugu: 'వాయిస్ ప్రథమ శిక్షణ సహాయకుడు',
    },
    startAssistant: {
      english: 'Start Assistant',
      telugu: 'అశిస్టెంట్ ప్రారంభించండి',
    },
    howToUse: {
      english: 'How to use',
      telugu: 'వాటిని ఎలా ఉపయోగించాలి',
    },
    stopVoice: {
      english: 'Stop Voice',
      telugu: 'ఆవజను ఆపండి',
    },
    welcomeSpeech: {
      english: 'Hey, this is EchoEd - your learning assistant. To get started, say Start Assistant or if you need guidance, say How to use. If you want to stop the voice, just say Stop.',
      telugu: 'హలో, ఇది ఎకోఈడ్ మీ అధ్యయన సహాయకుడు. మొదలవడానికి, అశిస్టెంట్ ప్రారంభించండి అని చెప్పండి లేదా సూచన కోసం, ఎలా ఉపయోగించాలో చెప్పండి. ఆవజను ఆపాలనిపిస్తే, ఆపు అని చెప్పండి.',
    },
    openingAssistant: {
      english: 'Opening assistant. Please wait.',
      telugu: 'అశిస్టెంట్‌ను తెరవడం. దయచేసి వేచి ఉండండి.',
    },
    openingHowToUse: {
      english: 'Opening How to Use guide. Please wait.',
      telugu: 'వాటిని ఎలా ఉపయోగించాలో గైడ్ తెరవడం. దయచేసి వేచి ఉండండి.',
    },
    status: {
      english: 'Status:',
      telugu: 'స్థితి:',
    },
    sayStop: {
      english: 'Say "Stop" to stop the voice assistant.',
      telugu: 'వాయిస్ అసిస్టెంట్‌ను ఆపడానికి "ఆపు" అని చెప్పండి.',
    },
  },
  modeSelection: {
    title: {
      english: 'Choose Mode',
      telugu: 'మోడ్ ఎంచుకోండి',
    },
    prompt: {
      english: 'Choose a mode. Say Productivity Mode, Learning Mode, Research Mode, or say Go Back to return.',
      telugu: 'మోడ్‌ను ఎంచుకోండి. ప్రోడక్టివిటీ మోడ్, లెర్నింగ్ మోడ్, రీసెర్చ్ మోడ్ అని చెప్పండి లేదా తిరిగి వెళ్ళడానికి గో బ్యాక్ అని చెప్పండి.',
    },
    productivityMode: {
      english: 'Productivity Mode',
      telugu: 'ఉత్పాదకత మోడ్',
    },
    learningMode: {
      english: 'Learning Mode',
      telugu: 'లెర్నింగ్ మోడ్',
    },
    researchMode: {
      english: 'Research Mode',
      telugu: 'రిసెర్చ్ మోడ్',
    },
    goBack: {
      english: 'Go Back',
      telugu: 'తిరిగి వెళ్ళు',
    },
    openingProductivity: {
      english: 'Opening Productivity Mode',
      telugu: 'ఉత్పాదకత మోడ్‌ను తెరవడం',
    },
    openingLearning: {
      english: 'Opening Learning Mode',
      telugu: 'లెర్నింగ్ మోడ్‌ను తెరవడం',
    },
    openingResearch: {
      english: 'Opening Research Mode',
      telugu: 'రిసెర్చ్ మోడ్‌ను తెరవడం',
    },
    goingBack: {
      english: 'Going back to the main page.',
      telugu: 'ప్రధాన పేజీకి తిరిగి వెళ్తున్నాం.',
    },
    notUnderstood: {
      english: 'I did not understand. Please try again.',
      telugu: 'నేను అర్థం చేసుకోలేకపోయాను. దయచేసి మళ్లీ ప్రయత్నించండి.',
    },
    status: {
      english: 'Status:',
      telugu: 'స్థితి:',
    },
    heard: {
      english: 'Heard:',
      telugu: 'వినిపించినది:',
    },
  },
  learningMode: {
    title: {
      english: 'Learning Mode',
      telugu: 'లెర్నింగ్ మోడ్',
    },
    explanation: {
      english: 'Explanation',
      telugu: 'వివరణ',
    },
    activeRecall: {
      english: 'Active Recall',
      telugu: 'యాక్టివ్ రీకాల్',
    },
    teachMeBack: {
      english: 'Teach Me Back',
      telugu: 'నాకు తిరిగి చెప్పండి',
    },
    sayModeOptions: {
      english: 'Say the mode you want to enter:',
      telugu: 'మీరు ఎంచుకోవదలచుకున్న మోడ్‌ను చెప్పండి:',
    },
    learnDesc: {
      english: 'Learn about any topic',
      telugu: 'ఏదైనా విషయాన్ని నేర్చుకోండి',
    },
    recallDesc: {
      english: 'Answer questions on a topic',
      telugu: 'ఒక విషయం గురించి ప్రశ్నలకు సమాధానం చెప్పండి',
    },
    teachDesc: {
      english: 'Explain a topic in your own words',
      telugu: 'మీ మాటల్లో ఒక విషయం వివరించండి',
    },
    explanationIntro: {
      english: 'Explanation Mode. Say the topic you want to learn about, or say go back to return to mode selection.',
      telugu: 'వివరణ మోడ్. మీరు నేర్చుకోవాలనుకునే విషయాన్ని చెప్పండి, లేదా మోడ్ ఎంపికకు తిరిగి వెళ్లడానికి తిరిగి చెప్పండి.',
    },
    explanationNotHeard: {
      english: 'I did not catch that. Say the topic you want to learn about.',
      telugu: 'నేను అది పట్టుకోలేకపోయాను. మీరు నేర్చుకోవాలనుకునే విషయాన్ని చెప్పండి.',
    },
    explanationStillNoHear: {
      english: 'Still could not hear you clearly. Returning to the learning menu.',
      telugu: 'ఇంకా మీ 말을 స్పష్టంగా వినలేకపోయాను. లెర్నింగ్ మెనూకు తిరిగి వెళ్తున్నాం.',
    },
    explanationGenerating: {
      english: 'Got it. Generating an explanation for {topic}. Please wait.',
      telugu: 'అర్థం అయ్యింది. {topic} కోసం ఒక వివరణను తయారు చేస్తున్నాను. దయచేసి వేచి ఉండండి.',
    },
    explanationDone: {
      english: 'That was your explanation. Say again to hear it once more, menu to go back to the learning menu, or new topic to learn something else.',
      telugu: 'అది మీ వివరణ. మళ్లీ వినడానికి తిరిగి చెప్పండి, లెర్నింగ్ మెనూకు వెళ్లడానికి మెను అని చెప్పండి, లేదా కొత్త విషయం నేర్చుకోవడానికి కొత్త విషయం అని చెప్పండి.',
    },
    recallIntro: {
      english: 'Active Recall. Say the topic you want to be quizzed on.',
      telugu: 'యాక్టివ్ రీకాల్. మీరు ఏమైపై ప్రశ్నలు వున్నాయో చెప్పండి.',
    },
    recallNotHeard: {
      english: 'I did not catch that. Say the topic you want to be quizzed on.',
      telugu: 'నేను అది పట్టుకోలేకపోయాను. మీరు ఏమైపై ప్రశ్నలు కావాలని చెప్పండి.',
    },
    recallGenerating: {
      english: 'Generating questions for {topic}. Please wait.',
      telugu: '{topic} కోసం ప్రశ్నలు సృష్టిస్తున్నాను. దయచేసి వేచి ఉండండి.',
    },
    recallAnswerPrompt: {
      english: 'Now say the letter of your choice, or say the answer option.',
      telugu: 'ఇప్పుడు మీ ఎంపిక యొక్క అక్షరం లేదా సమాధానాన్ని చెప్పండి.',
    },
    recallAnswerNotUnderstood: {
      english: 'I did not understand that answer. Please say A, B, C, or D.',
      telugu: 'ఆ సమాధానాన్ని నేను అర్థం చేసుకోలేకపోయాను. దయచేసి A, B, C, లేదా D చెప్పండి.',
    },
    recallCompleted: {
      english: 'You have completed all {count} questions on {topic}. You answered {score} out of {count} correctly. Great work! Say again to redo this quiz, new topic for a different topic, or go back to return to mode selection.',
      telugu: '{topic} పై మీరు {count} ప్రశ్నలన్నింటినీ పూర్తి చేశారు. మీరు {count} లో {score} ప్రశ్నలకు సరిగా సమాధానం ఇచ్చారు. మంచి పని! ఈ క్విజ్‌ను మళ్లీ చేయడానికి మళ్లీ, వేరే అంశానికి కొత్త విషయం లేదా మోడ్ ఎంపికకు తిరిగి వెళ్ళడానికి తిరిగి చెప్పండి.',
    },
    teachIntro: {
      english: 'Teach Me Back. What is the topic you want to teach?',
      telugu: 'నాకు తిరిగి చెప్పండి. మీరు ఏ విషయాన్ని బోధించాలనుకుంటున్నారు?',
    },
    teachNotHeard: {
      english: 'I did not catch that. Say the topic you want to teach.',
      telugu: 'నేను అది పట్టుకోలేకపోయాను. మీరు బోధించదలచుకున్న విషయాన్ని చెప్పండి.',
    },
    teachYourTopicIs: {
      english: 'Your topic is {topic}. Please summarize or explain it in your own words for up to two minutes. Speak now, and I will tell you whether your explanation is relevant to the topic.',
      telugu: 'మీ విషయం {topic}. దయచేసి దీన్ని మీ మాటల్లో రెండు నిమిషాల వరకు సంక్షిప్తంగా చెప్పండి లేదా వివరించండి. ఇప్పుడు మాట్లాడండి, నేను మీ వివరణ మీ విషయానికి సంబంధించిందా లేదో మీకు చెప్పతాను.',
    },
    teachAnalysing: {
      english: 'Analyzing your explanation. Please wait.',
      telugu: 'మీ వివరణను విశ్లేషిస్తున్నాను. దయచేసి వేచి ఉండండి.',
    },
    teachFeedbackPrompt: {
      english: 'That was your feedback. Say again to try the same topic again, new topic to choose a different one, or menu to go back.',
      telugu: 'అది మీ ఫీడ్‌బ్యాక్. అదే విషయాన్ని మళ్లీ ప్రయత్నించడానికి మళ్లీ, వేరే విషయాన్ని ఎంచుకోవడానికి కొత్త విషయం లేదా తిరిగి వెళ్లడానికి మెను చెప్పండి.',
    },
    mainPrompt: {
      english: 'Learning Mode. Which mode would you like? Say explanation to learn about a topic, recall to test yourself with questions, or teach me back to explain a topic in your own words.',
      telugu: 'లెర్నింగ్ మోడ్. మీరు ఏ మోడ్ కోరుకుంటున్నారు? విషయాన్ని నేర్చుకోవడానికి వివరణ, ప్రశ్నలతో పరీక్షించుకోవడానికి రీకాల్, లేదా మీ స్వంత మాటల్లో వివరించడానికి నాకు తిరిగి చెప్పండి అని చెప్పండి.',
    },
    optionRepeat: {
      english: 'repeat',
      telugu: 'మళ్లీ',
    },
    optionNewTopic: {
      english: 'new topic',
      telugu: 'కొత్త విషయం',
    },
    optionMenu: {
      english: 'menu',
      telugu: 'మెను',
    },
    optionGoBack: {
      english: 'go back',
      telugu: 'తిరిగి',
    },
  },
  productivityMode: {
    title: {
      english: 'Productivity Mode',
      telugu: 'ఉత్పాదకత మోడ్',
    },
    askTasks: {
      english: 'Welcome to Productivity Mode. Please tell me all your tasks for today.',
      telugu: 'ఉత్పాదకత మోడ్‌కి స్వాగతం. దయచేసి ఈరోజు మీ అన్ని పనులను చెప్పండి.',
    },
    couldNotHear: {
      english: 'I could not hear you clearly. Let us try again.',
      telugu: 'నేను మీకే సరిగ్గా వినలేకపోయాను. తిరిగి ప్రయత్నిద్దాం.',
    },
    couldNotUnderstand: {
      english: 'I could not understand your tasks. Please try again.',
      telugu: 'మీ పనులను నేను అర్థం చేసుకోలేకపోయాను. దయచేసి మళ్లీ ప్రయత్నించండి.',
    },
    askReminders: {
      english: 'Do you want to set any reminders? Say yes or no.',
      telugu: 'మీరు ఏదైనా రిమైండర్లు పెట్టాలనుకుంటున్నారా? అవును లేదా కాదు అని చెప్పండి.',
    },
    askReminderDetails: {
      english: 'Tell me your reminders. For example: remind me in thirty minutes to drink water.',
      telugu: 'మీ రిమైండర్లను చెప్పండి. ఉదాహరణకు: ముప్పై నిమిషాల్లో నీళ్లు తాగాలని నాకు గుర్తుచేయండి.',
    },
    remindersNoted: {
      english: 'Reminders noted. Let us begin your tasks.',
      telugu: 'రిమైండర్లు నమోదు చేయబడ్డాయి. మీ పనులను ప్రారంభిద్దాం.',
    },
    noReminders: {
      english: 'No reminders set. Let us begin your tasks.',
      telugu: 'ఏ రిమైండర్లు సెట్ కాలేదు. మీ పనులను ప్రారంభిద్దాం.',
    },
    reminderPrefix: {
      english: 'Reminder:',
      telugu: 'గుర్తుచేసి:',
    },
    allTasksCompleted: {
      english: '🎉 All tasks completed!',
      telugu: '🎉 అన్ని పనులు పూర్తయ్యాయి!',
    },
    performanceAnalysis: {
      english: 'Performance Analysis',
      telugu: 'పనితీరు విశ్లేషణ',
    },
    allTasks: {
      english: 'All Tasks',
      telugu: 'అన్ని పనులు',
    },
    taskOfCount: {
      english: 'Task {id} of {total}',
      telugu: '{total} లో పని {id}',
    },
    countdown: {
      english: 'Countdown',
      telugu: 'కౌంట్‌డౌన్',
    },
    stopwatch: {
      english: 'Stopwatch',
      telugu: 'స్టాప్‌వాచ్',
    },
    running: {
      english: 'Running',
      telugu: 'నడుస్తోంది',
    },
    stopped: {
      english: 'Stopped',
      telugu: 'ఆపబడింది',
    },
    done: {
      english: 'Done',
      telugu: 'పూర్తయింది',
    },
    notDone: {
      english: 'Not Done',
      telugu: 'పూర్తి కాలేదు',
    },
    statusLabel: {
      english: 'Status:',
      telugu: 'స్థితి:',
    },
    statusSpeaking: {
      english: 'Speaking...',
      telugu: 'మాట్లాడుతోంది...',
    },
    statusListening: {
      english: 'Listening...',
      telugu: 'వినుతోంది...',
    },
    taskTimeSpent: {
      english: 'Time spent:',
      telugu: 'గడవబడింది:',
    },
    remindersTitle: {
      english: 'Reminders',
      telugu: 'రిమైండర్లు',
    },
    performanceCommandSummary: {
      english: 'You have completed {completed} out of {total} tasks.',
      telugu: 'మీరు మొత్తం {total} పనుల్లో {completed} పనులను పూర్తి చేసారు.',
    },
    backToModeSelection: {
      english: 'Back to Mode Selection',
      telugu: 'మోడ్ ఎంపికకు తిరిగి',
    },
    back: {
      english: 'Back',
      telugu: 'తిరిగి',
    },
    noDuration: {
      english: 'No duration detected. A stopwatch will run.',
      telugu: 'కాలపరిమితి కనుగొనబడలేదు. ఒక స్టాప్‌వాచ్ పని చేస్తుంది.',
    },
    timerStarted: {
      english: 'Timer started. Say done when finished.',
      telugu: 'టైమర్ ప్రారంభించబడింది. పూర్తి అయితే పూర్తయిందని చెప్పండి.',
    },
    stopwatchStarted: {
      english: 'Stopwatch started. Say done when finished.',
      telugu: 'స్టాప్‌వాచ్ ప్రారంభించబడింది. పూర్తి అయితే పూర్తయిందని చెప్పండి.',
    },
    timeIsUpForTask: {
      english: 'Time is up for Task {id}. Say done if completed, or not done to mark as incomplete.',
      telugu: 'పని {id} కోసం సమయం పూర్తయ్యింది. పూర్తి అయితే పూర్తయిందని చెప్పండి, లేకపోతే పూర్తిగా లేనట్లుగా గుర్తించడానికి కాదు అని చెప్పండి.',
    },
    timeIsUp: {
      english: 'Time is up. Say done or not done.',
      telugu: 'సమయం పూర్తయ్యింది. పూర్తి లేదా పూర్తిగా కాదు అని చెప్పండి.',
    },
    taskCompleted: {
      english: 'Great job! Task {id} completed in {time}.',
      telugu: 'అద్భుతం! పని {id} {time} లో పూర్తయింది.',
    },
    taskSkipped: {
      english: 'Task {id} skipped. Time spent: {time}.',
      telugu: 'పని {id} వాయిదా వేయబడింది. గడిచింది: {time}.',
    },
    moveToTask: {
      english: 'Moving to Task {id}: {task}. {durationText} Say yes to start or no to skip.',
      telugu: 'పని {id} కు కదలడం: {task}. {durationText} ప్రారంభించడానికి అవును చెప్పండి లేదా వదిలివేయడానికి కాదు చెప్పండి.',
    },
    performanceNoData: {
      english: 'No performance data yet. Complete at least one task first.',
      telugu: 'ఇంతవరకు పనితీరు డేటా లేదు. కనీసం ఒక పని మొదట పూర్తి చేయండి.',
    },
    performanceSummary: {
      english: 'You have completed {completed} out of {total} tasks.',
      telugu: 'మీరు మొత్తం {total} పనుల్లో {completed} పనులను పూర్తి చేసారు.',
    },
    completedEverything: {
      english: 'Excellent work! You completed everything today.',
      telugu: 'అద్భుత పని! మీరు ఇక్కడే అన్ని పూర్తి చేసారు.',
    },
    goodEffort: {
      english: 'Good effort! Keep pushing tomorrow.',
      telugu: 'మంచి ప్రయత్నం! రేపటికి కూడా కొనసాగించండి.',
    },
    dontWorry: {
      english: 'Do not worry. Tomorrow is a new opportunity.',
      telugu: 'పరిష్కారంతో ఉండండి. రేపు ఒక కొత్త అవకాశం.',
    },
  },
  researchMode: {
    title: {
      english: 'Research Mode',
      telugu: 'రిసెర్చ్ మోడ్',
    },
    welcome: {
      english: 'Welcome to Research Mode. Which topic would you like to research today?',
      telugu: 'రిసెర్చ్ మోడ్‌కు స్వాగతం. మీరు ఈ రోజు ఏ విషయాన్ని పరిశోధించాలనుకుంటున్నారు?',
    },
    couldNotUnderstandTopic: {
      english: 'I could not understand your topic. Returning to mode selection.',
      telugu: 'మీ విషయం నేను అర్థం చేసుకోలేకపోయాను. మోడ్ ఎంపికకు తిరిగి వెళ్తున్నాను.',
    },
    sayTopicAgain: {
      english: 'I did not understand your topic. Please say it clearly.',
      telugu: 'మీ విషయం నేను అర్థం చేసుకోలేకపోయాను. దయచేసి స్పష్టంగా చెప్పండి.',
    },
    searchingFor: {
      english: 'Searching for recent research papers on {query}. Please wait.',
      telugu: '{query} పై తాజాగా పరిశోధనా పత్రాలను శోధిస్తున్నాం. దయచేసి వేచి ఉండండి.',
    },
    foundPapers: {
      english: 'I found {count} papers on {query}.',
      telugu: '{query} పై {count} పత్రాలు లభించాయి.',
    },
    noPapersFound: {
      english: 'I could not find any papers on {query}. Please try another topic.',
      telugu: '{query}పై నాకు పత్రాలు కనుగొనలేకపోయాను. దయచేసి మరొక విషయం ప్రయత్నించండి.',
    },
    paperSummary: {
      english: 'Paper {index}: {title}. By {authors}. Published in {year} in {journal}.',
      telugu: 'పత్రం {index}: {title}. రచయితలు {authors}. {journal}లో {year}లో ప్రచురించబడింది.',
    },
    finishedReadingHighlights: {
      english: 'I have finished reading. You have {count} highlight{plural} saved. Would you like to hear your highlights? Say yes or no.',
      telugu: 'నేను చదివి పూర్తి చేసాను. మీ వద్ద {count} హైలైట్{plural} సేవ్ చేయబడినవి ఉన్నాయి. మీరు వాటిని వినాలనుకుంటున్నారా? అవును లేదా కాదు అని చెప్పండి.',
    },
    savedHighlightsSummary: {
      english: 'You have {count} highlight{plural} saved. Here they are.',
      telugu: 'మీ వద్ద {count} హైలైట్{plural} సేవ్ చేయబడ్డాయి. ఇవి మీకు ఉన్నాయి.',
    },
    allHighlightsRead: {
      english: 'I have finished reading all your highlights.',
      telugu: 'నేను మీ అన్ని హైలైట్‌లను చదివి పూర్తి చేసాను.',
    },
    highlightEntry: {
      english: 'Highlight {number} from {section}: {text}',
      telugu: 'హైలైట్ {number} {section} నుండి: {text}',
    },
    goingBackToPapers: {
      english: 'Okay. Going back to papers.',
      telugu: 'సరే. పత్రాలకు తిరిగి వెళ్తున్నాను.',
    },
    didNotHearYesNo: {
      english: 'I did not hear a clear yes or no. Returning to papers.',
      telugu: 'నేను స్పష్టమైన అవును లేదా కాదు వినలేకపోయాను. పత్రాలకు తిరిగి వెళ్తున్నాను.',
    },
    readPaperPrompt: {
      english: 'Say read paper one or read paper two to listen to a paper.',
      telugu: 'పత్రం ఒకటి చదవండి లేదా పత్రం రెండు చదవండి అని చెప్పండి.',
    },
    selectedPaper: {
      english: 'You selected Paper {id}: {title}. By {authors}. Published in {year}.',
      telugu: 'మీరు పత్రం {id} ని ఎంచుకున్నారు: {title}. రచయితలు: {authors}. ప్రచురించబడింది {year}.',
    },
    readingInstructions: {
      english: 'I will read the abstract, introduction, and conclusion. Say highlight this line at any time to save the current sentence.',
      telugu: 'నేను సారాంశాన్ని, పరిచయాన్ని, మరియు ముగింపును చదివేను. ప్రస్తుత వాక్యాన్ని సేవ్ చేయడానికి ఎప్పుడైనా హైలైట్ చేయండి అని చెప్పండి.',
    },
    noHighlights: {
      english: 'You have no highlights saved yet. Going back to papers.',
      telugu: 'మీ వద్ద ఇప్పటికీ హైలైట్లు సేవ్ చేయబడలేదు. పత్రాలకు తిరిగి వెళుతున్నాము.',
    },
    savedToHighlights: {
      english: 'Saved to highlights.',
      telugu: 'హైలైట్స్‌కి సేవ్ చేయబడింది.',
    },
    alreadyHighlighted: {
      english: 'Already highlighted.',
      telugu: 'ఇప్పటికే హైలైట్ చేయబడింది.',
    },
    readingStopped: {
      english: 'Reading stopped.',
      telugu: 'చదవటం ఆపివేయబడింది.',
    },
    paperUnavailable: {
      english: 'Paper two is not available.',
      telugu: 'పత్రం రెండు అందుబాటులో లేదు.',
    },
    goBackToModeSelection: {
      english: 'Go back to mode selection.',
      telugu: 'మోడ్ ఎంపికకు తిరిగి వెళ్ళండి.',
    },
    pleaseSayYesNo: {
      english: 'Please say yes or no.',
      telugu: 'దయచేసి అవును లేదా కాదు చెప్పండి.',
    },
    back: {
      english: 'Back',
      telugu: 'తిరిగి',
    },
    heard: {
      english: 'Heard:',
      telugu: 'వినిపించినది:',
    },
    voiceAssistantSpeaking: {
      english: 'Voice assistant is speaking...',
      telugu: 'వాయిస్ అసిస్టెంట్ మాట్లాడుతోంది...',
    },
    speakTopicNow: {
      english: 'Speak your research topic now',
      telugu: 'ఇప్పుడు మీ పరిశోధనా విషయం చెప్పండి',
    },
    microphoneOpensAfterQuestion: {
      english: 'Microphone opens after the question',
      telugu: 'ప్రశ్న తర్వాత మైక్రోఫోన్ తెరవబడుతుంది',
    },
    secondsToSpeak: {
      english: '10 seconds to speak',
      telugu: 'మాట్లాడడానికి 10 సెకన్లు',
    },
    searchingPapers: {
      english: 'Searching for research papers...',
      telugu: 'పరిశోధనా పత్రాలను శోధిస్తున్నాం...',
    },
    statusIdle: {
      english: 'Idle',
      telugu: 'నిష్క్రియగా',
    },
    statusSearching: {
      english: 'Searching...',
      telugu: 'శోధిస్తున్నారు...',
    },
    statusWaitingForHighlight: {
      english: 'Waiting for highlight...',
      telugu: 'హైలైట్ కోసం వేచి ఉంది...',
    },
    statusReading: {
      english: 'Reading...',
      telugu: 'చదువుతున్నది...',
    },
    statusLabel: {
      english: 'Status:',
      telugu: 'స్థితి:',
    },
    topicLabel: {
      english: 'Topic:',
      telugu: 'విషయం:',
    },
    readPaperButton: {
      english: 'Read Paper {index} Aloud',
      telugu: 'పత్రం {index} ని హైబ్కంగా చదవండి',
    },
    searchNewTopic: {
      english: 'Search New Topic',
      telugu: 'కొత్త విషయం శోధించండి',
    },
    voiceCommandsHeader: {
      english: 'Voice Commands',
      telugu: 'వాయిస్ ఆదేశాలు',
    },
    commandReadPaperOne: {
      english: '🎙️ "read paper one"',
      telugu: '🎙️ "పత్రం ఒకటి చదవండి"',
    },
    commandReadPaperTwo: {
      english: '🎙️ "read paper two"',
      telugu: '🎙️ "పత్రం రెండు చదవండి"',
    },
    commandHighlights: {
      english: '⭐ "my highlights"',
      telugu: '⭐ "నా హైలైట్‌లు"',
    },
    commandSearchNewTopic: {
      english: '🔍 "search new topic"',
      telugu: '🔍 "కొత్త విషయం శోధించండి"',
    },
    commandGoBack: {
      english: '🔙 "go back to mode selection"',
      telugu: '🔙 "మోడ్ ఎంపికకు తిరిగి వెళ్ళండి"',
    },
    highlightHeading: {
      english: 'Highlight {index} — {section}',
      telugu: 'హైలైట్ {index} — {section}',
    },
    sectionAbstract: {
      english: 'Abstract',
      telugu: 'సారాంశం',
    },
    sectionIntroduction: {
      english: 'Introduction',
      telugu: 'పరిచయం',
    },
    sectionConclusion: {
      english: 'Conclusion',
      telugu: 'ముగింపు',
    },
    readingHeading: {
      english: 'Reading Paper',
      telugu: 'పత్రాన్ని చదువుతూ',
    },
    papersButton: {
      english: 'Papers',
      telugu: 'పత్రాలు',
    },
    highlightsButton: {
      english: 'Highlights',
      telugu: 'హైలైట్‌లు',
    },
    readingStatus: {
      english: 'Reading {section}... {progress}%',
      telugu: '{section} చదవుతోంది... {progress}%',
    },
    readyStatus: {
      english: 'Ready',
      telugu: 'సిధ్దం',
    },
    paperDetails: {
      english: '{authors} · {year} · {journal}',
      telugu: '{authors} · {year} · {journal}',
    },
    whileReadingSay: {
      english: 'While reading, say:',
      telugu: 'చదవడానికి మధ్యలో, ఇది చెప్పండి:',
    },
    highlightThisLine: {
      english: '⭐ "highlight this line"',
      telugu: '⭐ "ఈ లైన్‌ని హైలైట్ చేయండి"',
    },
    iLikeThisLine: {
      english: '⭐ "I like this line"',
      telugu: '⭐ "ఇది నాకు నచ్చింది"',
    },
    stopReadingCommand: {
      english: '⏹️ "stop reading"',
      telugu: '⏹️ "చదవడం ఆపు"',
    },
    goBackCommand: {
      english: '🔙 "go back"',
      telugu: '🔙 "తిరిగి"',
    },
    noHighlightsSaved: {
      english: 'No highlights saved yet.',
      telugu: 'ఇప్పుడు ఏ హైలైట్‌లు సేవ్ కాలేదు.',
    },
    howToSaveHighlights: {
      english: 'Say "highlight this line" while a paper is being read.',
      telugu: 'పత్రం చదువుతుండగా "ఈ లైన్‌ని హైలైట్ చేయండి" అని చెప్పండి.',
    },
    playHighlight: {
      english: 'Play Highlight',
      telugu: 'హైలైట్ ప్లే చేయండి',
    },
    goBackToModeSelectionButton: {
      english: 'Back to Mode Selection',
      telugu: 'మోడ్ ఎంపికకు తిరిగి',
    },
  },
  demoScreen: {
    title: {
      english: 'How to Use EchoEd',
      telugu: 'ఎకోఈడ్‌ను ఎలా ఉపయోగించాలి',
    },
    description: {
      english: 'Clear spoken and written guidance for using EchoEd, including its modes and voice features.',
      telugu: 'ఎకోఈడ్‌ను ఉపయోగించడానికి స్పష్టమైన మౌఖిక మరియు రచిత మార్గదర్శకత్వం, దాని మోడ్‌లు మరియు వాయిస్ ఫీచర్లు సహా.',
    },
    howToUseHeader: {
      english: 'How to use EchoEd',
      telugu: 'ఎకోఈడ్‌ను ఎలా ఉపయోగించాలి',
    },
    buttonStart: {
      english: 'Start Assistant',
      telugu: 'అశిస్టెంట్ ప్రారంభించండి',
    },
    back: {
      english: 'Back',
      telugu: 'తిరిగి',
    },
    stopVoice: {
      english: 'Stop Voice',
      telugu: 'ఆవజను ఆపండి',
    },
    returning: {
      english: 'Returning to the main page.',
      telugu: 'ప్రధాన పేజీకి తిరిగి వెళ్తున్నాం.',
    },
  },
};

export function getMessage(
  section: string,
  key: string,
  language: LanguageOption,
  vars?: Record<string, string>
): string {
  const sectionMap = messages[section];
  const entry = sectionMap?.[key];
  if (!entry) {
    return '';
  }
  let text = entry[language] || entry.english;
  if (vars) {
    Object.entries(vars).forEach(([name, value]) => {
      text = text.replace(new RegExp(`\{${name}\}`, 'g'), value);
    });
  }
  return text;
}

export const demoScreenSentences: Record<LanguageOption, string[]> = {
  english: [
    'Welcome to the How to Use guide for EchoEd.',
    'EchoEd is a voice-first study assistant built for study sessions and learning by speaking.',
    'Use the Start Assistant button on the main page to begin your voice-driven experience.',
    'Once the assistant is active, you can speak commands instead of tapping the screen.',
    'Learning Mode helps you understand any topic. Say a topic and EchoEd will explain it clearly, then you can ask to hear it again or choose a new topic.',
    'Research Mode helps you find recent research papers. It searches by paper title, reads the top papers, and lets you open and listen to summaries of the abstract, introduction, and conclusion.',
    'Productivity Mode helps you organize your study work. It listens for tasks, creates a task list, and can help you plan and track your progress.',
    'Every mode is fully voice navigable: speak the mode name, answer prompts, and control the flow with simple commands.',
    'You can always say stop to immediately stop the assistant from speaking.',
    'If you need help, use the How to Use page again for a clear spoken walkthrough.',
    'When you are ready, say Start Assistant to begin or say Go Back to return to the main page.',
    'Use the on-screen buttons as a backup if you prefer visual navigation.',
    'To start your learning journey, just say Start Assistant and let EchoEd guide you with your voice!',
  ],
  telugu: [
    'ఎకోఈడ్ ఉపయోగించే మార్గదర్శకానికి స్వాగతం.',
    'ఎకోఈడ్ మీకు అధ్యయన సత్రాల కోసం వాయిస్ ప్రథమ సహాయకుడిగా రూపొందించబడింది.',
    'వాయిస్ ఆధారిత అనుభవాన్ని ప్రారంభించడానికి మెయిన్ పేజీలోని స్టార్ట్ అసిస్టెంట్ బటన్ను ఉపయోగించండి.',
    'సహాయకుడు ప్రారంభమైన తర్వాత, మీరు స్క్రీన్‌ను నొక్కకుండా ఆదేశాలు చెప్పవచ్చు.',
    'లెర్నింగ్ మోడ్ మీకు ఏదైనా విషయం అర్థం చేసుకోవడంలో సహాయం చేస్తుంది. ఒక విషయం చెప్పండి, ఎకోఈడ్ దానిని స్పష్టంగా వివరించును.',
    'రిసెర్చ్ మోడ్ సరికొత్త పరిశోధనా పత్రాలను కనుగొనడంలో మీకు సహాయపడుతుంది. అది పత్ర శీర్షిక ద్వారా శోధిస్తుంది, టాప్ పత్రాలను చదివి, సారాంశాలను వినడానికి అనుమతిస్తుంది.',
    'ఉత్పాదకత మోడ్ మీ అధ్యయన పనిని సక్రమంగా రూపొందించడంలో సహాయపడుతుంది. ఇది టాస్కులను వింటుంది, టాస్క్ లิส్ట్‌ను సృష్టిస్తుంది, మరియు మీ ప్రగతిని ప్లాన్ చేయడంలో సహాయపడుతుంది.',
    'ప్రతి మోడ్ పూర్తిగా వాయిస్ ద్వారా నావిగేట్ చేయవచ్చు: మోడ్ పేరు చెప్పండి, ప్రాంప్ట్‌లకు జవాబు ఇవ్వండి, మరియు సాధారణ ఆదేశాలతో ప్రవాహాన్ని నియంత్రించండి.',
    'మీకు కావాలంటే ఎప్పుడైనా ఆపి అని చెప్పి సహాయకుని మాట్లాడటం ఆపవచ్చు.',
    'సహాయం కావాలంటే, స్పష్టమైన మౌఖికంగా గైడ్ కోసం How to Use పేజీని మళ్లీ ఉపయోగించండి.',
    'మీరు సిద్ధమైతే, ప్రారంభించడానికి స్టార్ట్ అసిస్టెంట్ అని తెలిసి చెప్పండి లేదా తిరిగి రావడానికి గో బ్యాక్ అని చెప్పండి.',
    'విజువల్ నావిగేషన్‌ను ఇష్టపడితే, ఆన్-స్క్రీన్ బటన్‌లను బ్యాకప్‌గా ఉపయోగించండి.',
    'మీ అధ్యయన యాత్రను ప్రారంభించడానికి, స్టార్ట్ అసిస్టెంట్ అని చెప్పండి మరియు ఎకోఈడ్ మీకు గైడ్ చేయనివ్వండి!',
  ],
};

export const demoScreenListItems: Record<LanguageOption, string[]> = {
  english: [
    'Press Start Assistant on the main page to begin the voice experience.',
    'Say Learning Mode to ask EchoEd to explain any topic in clear language.',
    'In Learning Mode, you can say the topic name and then say again or repeat if you want the explanation repeated.',
    'Say Research Mode to search for research papers by title and listen to paper summaries.',
    'In Research Mode, EchoEd reads paper results aloud and lets you open the best matches for more details.',
    'Say Productivity Mode to create and manage study tasks, track progress, and set reminders using voice only.',
    'Say Stop at any time to stop the voice assistant immediately.',
    'Say How to use again if you need a refresher on how the app works.',
    'Use the buttons on screen as a backup if you want both voice and touch navigation.',
  ],
  telugu: [
    'వాయిస్ అనుభవాన్ని ప్రారంభించడానికి మెయిన్ పేజీలో స్టార్ట్ అసిస్టెంట్ ని నొక్కండి.',
    'ఎలాంటి విషయాన్ని స్పష్టంగా వివరించాలని అడగడానికి లెర్నింగ్ మోడ్ చెప్పండి.',
    'లెర్నింగ్ మోడ్‌లో, మీరు విషయం పేరును చెప్పవచ్చు మరియు వివరణను మళ్లీ వినాలనుకుంటే మళ్లీ లేదా రిపీట్ అని చెప్పండి.',
    'పైపర్స్ పరిశోధన పత్రాలను శీర్షిక ద్వారా శోధించడానికి రిసెర్చ్ మోడ్ చెప్పండి మరియు సారాంశాలను వినండి.',
    'రిసెర్చ్ మోడ్‌లో, ఎకోఈడ్ పతృ ఫలితాలను మీకు చదివి, మరింత వివరాలకు ఉత్తమ మ్యాచ్‌లను తెరవడానికి అనుమతిస్తుంది.',
    'వాయిస్ మాత్రమే ఉపయోగించి అధ్యయన పనులను సృష్టించడానికి మరియు గడిచిన ప్రగతిని ట్రాక్ చేయడానికి ప్రొడక్టివిటీ మోడ్ చెప్పండి.',
    'వాయిస్ అసిస్టెంట్‌ను తక్షణమే నిలిపే కోసం ఎప్పుడైనా ఆపు అని చెప్పండి.',
    'అప్లికేషన్ ఎలా పనిచేస్తుందో మళ్లీ తెలుసుకోవాలని ఉంటే హౌ టు యూజ్ ని మళ్ళీ చెప్పండి.',
    'వాయిస్ మరియు టచ్ నావిగేషన్ రెండింటినీ మీరు కోరుకుంటే స్క్రీన్‌పై బటన్స్‌ను బ్యాకప్‌గా ఉపయోగించండి.',
  ],
};

export function getLanguageName(language: LanguageOption): string {
  return language === 'english' ? 'English' : 'తెలుగు';
}
