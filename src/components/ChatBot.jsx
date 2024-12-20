import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './chatbot.css';

// const domain = import.meta.env.VITE_DOMAIN;

const ChatBot = () => {
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
        const response = await axios.post(
          `https://gym-buddy-backend-rxip.onrender.com/chat`,
          {
            message: question,
          }
        );

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

  useEffect(() => {
    if (isAutoScroll) {
      chatWindowRef.current?.lastElementChild?.scrollIntoView({
        behavior: 'smooth',
      });
    }
  }, [messages, isAutoScroll]);

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
        </div>
      </form>
    </div>
  );
};

export default ChatBot;
