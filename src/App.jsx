import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import ChatBot from './components/ChatBot';

function App() {
  return (
    <>
      <h1>Gym Buddy Chatbot</h1>
      <ChatBot />
    </>
  );
}

export default App;
