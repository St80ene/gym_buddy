import React, { useState } from 'react';
import axios from 'axios';
import './chatbot.css';

const port = import.meta.env.VITE_BACKEND_PORT;

const ChatBot = () => {
  const chat_url = `http://localhost:${port}/chat`;

  const [messages, setMessages] = useState([]);
  const [question, setQuestion] = useState('');

  const handleSend = async (e) => {
    e.preventDefault();
    if (question.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'user', text: question },
      ]);

      console.log('chat_url', chat_url);

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

  const handleOnChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleClearQuestion = () => {
    setQuestion('');
  };

  // const handleKeyPress = (e) => {
  //   if (e.key === 'Enter' && !e.shiftKey) {
  //     handleSend(e);
  //   }
  // };

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
      <div className='chat-window'>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message-bubble ${
              msg.sender === 'user' ? 'user-bubble' : 'bot-bubble'
            }`}
          >
            <strong>{msg.sender === 'user' ? 'You' : 'Gym Buddy'}:</strong>{' '}
            {msg.text}
          </div>
        ))}
      </div>
      <form className='chat-input-form' onSubmit={handleSend}>
        <textarea
          required
          value={question}
          onChange={handleOnChange}
          // onKeyDown={handleKeyPress} // Detect Enter key
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
    </div>
  );
};

export default ChatBot;
