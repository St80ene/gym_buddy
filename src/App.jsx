import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import ChatBot from './components/ChatBot';
import FlutterWaveIntegration from './components/FlutterWaveIntegration';
import PayStackIntegration from './components/PayStackIntegration';

function App() {
  return (
    <>
      <h1>Gym Buddy Chatbot</h1>
      <ChatBot />
      {/* <PayStackIntegration /> */}
    </>
  );
}

export default App;
