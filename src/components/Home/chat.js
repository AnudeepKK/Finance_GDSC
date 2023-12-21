
// src/Chatbot.js
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [showChatbox, setShowChatbox] = useState(false);
  const [userInput, setUserInput] = useState('');

  const { t } = useTranslation();


  const handleOptionClick = (option) => {
    const newMessages = [...messages, { type: 'user', content: option }];
    const botResponse = getBotResponse(option);
    setMessages([...newMessages, { type: 'bot', content: botResponse }]);
    // setShowOptions(false); // Hide options after selection
  };

  const getBotResponse = (userInput) => {
    switch (userInput.toLowerCase()) {
      case 'our services':
        return (
          <div>
            {t('op1')} <br />
            {t('op2')} <br/>
            {t('op3')} <br/>
          </div>
        );
        case 'account and security':
          return (
            <div>
              {t('q1')}<br />
              {t('a1')}<br/>
              {t('q2')}<br/>
              {t('a2')}
            </div>
          );
      case 'customer care':
        return `${t('cc')}`;
      case 'exit':
        setShowChatbox(false);
        return "Goodbye! If you have more questions, feel free to ask anytime.";
      default:
        return `You selected: ${userInput}. Here is the answer...`;
    }
  };

  const handleUserInput = () => {
    if (userInput.trim() === '') return; // Ignore empty messages

    const newMessages = [...messages, { type: 'user', content: userInput }];

    // Show greeting and options for the first input
    if (messages.length === 0) {
      const greeting = `${t('chathi')}`;
      setMessages([{ type: 'bot', content: greeting }]);
      setShowOptions(true);
    } else {
      // Handle bot responses based on user input
      const botResponse = getBotResponse(userInput);
      setMessages([...newMessages, { type: 'bot', content: botResponse }]);
    }

    setUserInput('');
  };

  const toggleChatbox = () => {
    setShowChatbox(!showChatbox);
    setShowOptions(false);
    setMessages([]); // Clear messages when hiding the chatbox
  };

  return (
    <div className="fixed bottom-4 right-4">
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded"
        onClick={toggleChatbox}
      >
        FAQ
      </button>
      {showChatbox && (
        <div className="max-w-md mx-auto p-4 bg-gray-200 rounded shadow">
          <div className="bg-white p-4 rounded shadow">
            <div>
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`${message.type === 'user' ? 'text-blue-700' : 'text-gray-700'}`}
                >
                  {message.content}
                </div>
              ))}
            </div>
            {showOptions && (
              <div className="flex space-x-4 mt-4">
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded"
                  onClick={() => handleOptionClick('Our Services')}
                >
                  Our Services
                </button>
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded"
                  onClick={() => handleOptionClick('Account and Security')}
                >
                  Account and Security
                </button>
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded"
                  onClick={() => handleOptionClick('Customer Care')}
                >
                  Customer Care
                </button>
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded"
                  onClick={() => handleOptionClick('Exit')}
                >
                  Exit
                </button>
              </div>
            )}
            {!showOptions && (
              <div className="mt-4">
                <input
                  type="text"
                  className="border rounded p-2 w-full"
                  placeholder="Type your message..."
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleUserInput();
                    }
                  }}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;

