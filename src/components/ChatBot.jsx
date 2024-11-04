import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './chatbot.css';

const port = import.meta.env.VITE_BACKEND_PORT;

const ChatBot = () => {
  const chat_url = `http://localhost:${port}/chat`;
  const shutdown_url = `http://localhost:${port}/shutdown`; // Shutdown endpoint

  const [messages, setMessages] = useState([]);
  const [question, setQuestion] = useState('');
  const [isAutoScroll, setIsAutoScroll] = useState(true); // For managing auto scroll

  const chatWindowRef = useRef(null); // To track the chat window

  const handleSend = async (e) => {
    e.preventDefault();
    if (question.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'user', text: question },
      ]);

      try {
        const response = await axios.post(chat_url, {
          message: question,
        });

        // Add bot response to the message list
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: 'Gym Buddy', text: response.data.response },
        ]);
      } catch (error) {
        console.error('Error fetching response:', error);
        return;
      }
      setQuestion('');
    }
  };

  const handleShutdown = async () => {
    try {
      const response = await axios.post(shutdown_url);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'system', text: 'Server shutting down...' },
      ]);
      console.log('Server is shutting down:', response.data.message);
    } catch (error) {
      console.error('Error shutting down the server:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'system', text: 'Failed to shut down the server.' },
      ]);
    }
  };

  const handleOnChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleClearQuestion = () => {
    setQuestion('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSend(e);
    }
  };

  // Automatically scroll to the last message unless the user has scrolled up
  useEffect(() => {
    if (isAutoScroll) {
      chatWindowRef.current?.lastElementChild?.scrollIntoView({
        behavior: 'smooth',
      });
    }
  }, [messages, isAutoScroll]);

  // Handle scroll event to detect if the user has scrolled up
  const handleScroll = () => {
    const chatWindow = chatWindowRef.current;
    if (chatWindow) {
      const isAtBottom =
        chatWindow.scrollHeight - chatWindow.scrollTop ===
        chatWindow.clientHeight;
      setIsAutoScroll(isAtBottom); // Auto-scroll only when at the bottom
    }
  };

  return (
    <div className='chat-container'>
      <div className='chat-header'>
        <img
          src='../src/assets/striveFit.webp'
          alt='Gym Buddy Logo'
          className='chat-logo'
        />
        <h2>Gym Buddy</h2>
      </div>
      <div className='chat-window' ref={chatWindowRef} onScroll={handleScroll}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message-bubble ${
              msg.sender === 'user' ? 'user-bubble' : 'bot-bubble'
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <form className='chat-input-form' onSubmit={handleSend}>
        <textarea
          required
          value={question}
          onChange={handleOnChange}
          onKeyDown={handleKeyPress}
          placeholder='Type your message...'
          className='chat-input'
        />
        <div className='chat-actions'>
          <button
            disabled={!question.trim()}
            type='submit'
            className='send-button'
          >
            Send
          </button>
          <button
            disabled={!question.trim()}
            type='button'
            onClick={handleClearQuestion}
            className='clear-button'
          >
            Clear
          </button>
        </div>
      </form>
      <div className='shutdown-actions'>
        <button onClick={handleShutdown} className='shutdown-button'>
          Exit
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
