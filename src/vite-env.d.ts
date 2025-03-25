/// <reference types="vite/client" />

interface Window {
  SpeechRecognition: typeof SpeechRecognition;
  webkitSpeechRecognition: typeof SpeechRecognition;
}

interface ImportMetaEnv {
  readonly VITE_GOOGLE_TRANSLATE_API_KEY: string;
}