import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [question, setQuestion] = useState('');

  const handleSend = async (e) => {
    e.preventDefault();
    if (question.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'user', text: question },
      ]);
      try {
        const response = await axios.post('http://localhost:5000/chat', {
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
    console.log('State updating');
    setQuestion(e.target.value);
  };

  const handleClearQuestion = () => {
    setQuestion('');
    console.log('State cleared');
  };

  useEffect(() => {
    console.log({ question });
  }, [question]);

  return (
    <div>
      {messages.map((msg, index) => (
        <div
          key={index}
          style={{ textAlign: msg.sender === 'user' ? 'right' : 'left' }}
        >
          <strong>{msg.sender === 'user' ? 'You' : 'Gym Buddy'}:</strong>{' '}
          {msg.text}
        </div>
      ))}
      <form onSubmit={handleSend}>
        <textarea required value={question} onChange={handleOnChange} />
        <button disabled={!question.trim()} type='submit'>
          Send
        </button>
        <button
          disabled={!question.trim()}
          type='button'
          onClick={handleClearQuestion}
        >
          Clear
        </button>
      </form>
    </div>
  );
};

export default ChatBot;
