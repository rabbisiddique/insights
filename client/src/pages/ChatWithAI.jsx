import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const ChatWithAI = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      content:
        "Hello! I'm here to help you discuss your note. What would you like to know?",
      timestamp: new Date(),
    },
    {
      id: 2,
      type: "user",
      content: "Can you summarize this note for me?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (inputValue.trim()) {
      const newMessage = {
        id: messages.length + 1,
        type: "user",
        content: inputValue,
        timestamp: new Date(),
      };
      setMessages([...messages, newMessage]);
      setInputValue("");

      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const aiResponse = {
          id: messages.length + 2,
          type: "bot",
          content:
            "I'd be happy to help with that. Based on your note, here are the key points I can identify...",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, aiResponse]);
      }, 1500);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-200px)] flex flex-col p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <motion.button
            className="flex items-center px-3 py-2 cursor-pointer text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all duration-200"
            whileHover={{ x: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/home")}
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span className="hidden sm:inline">Back to Notes</span>
            <span className="sm:hidden">Back</span>
          </motion.button>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white flex items-center">
              <svg
                className="w-6 h-6 mr-2 text-blue-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM8 14H6V12H8V14ZM8 11H6V9H8V11ZM8 8H6V6H8V8ZM15 14H10V12H15V14ZM18 11H10V9H18V11ZM18 8H10V6H18V8Z" />
              </svg>
              Chat with AI
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
              Advanced Machine Learning Concepts
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-sm text-gray-600 dark:text-gray-300">
            Online
          </span>
        </div>
      </div>

      {/* Note Preview */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6 hover:shadow-md transition-shadow duration-200">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
          Advanced Machine Learning Concepts
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
          Exploring neural networks, transformers, and their applications in NLP
          and computer vision. Understanding the fundamentals of deep learning
          architectures.
        </p>
        <div className="flex gap-2">
          {["Machine Learning", "Neural Networks", "Deep Learning"].map(
            (tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-blue-50 dark:bg-blue-900/40 
                  text-blue-700 dark:text-blue-300 
                  text-xs rounded-full border border-blue-100 dark:border-blue-800 
                  hover:bg-blue-100 dark:hover:bg-blue-800 transition-colors duration-200"
              >
                {tag}
              </span>
            )
          )}
        </div>
      </div>

      {/* Chat Container */}
      <div className="flex-1 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                className={`flex ${
                  message.type === "user" ? "justify-end" : "justify-start"
                }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div
                  className={`flex items-start space-x-3 max-w-[75%] ${
                    message.type === "user"
                      ? "flex-row-reverse space-x-reverse"
                      : ""
                  }`}
                >
                  {/* Avatar */}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      message.type === "bot"
                        ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                    }`}
                  >
                    {message.type === "bot" ? "🤖" : "👤"}
                  </div>

                  {/* Message Bubble */}
                  <div
                    className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                      message.type === "bot"
                        ? "bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-100 dark:border-gray-700"
                        : "bg-blue-500 text-white"
                    } ${
                      message.type === "user"
                        ? "rounded-tr-md"
                        : "rounded-tl-md"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing Indicator */}
          {isTyping && (
            <motion.div
              className="flex justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <div className="flex items-start space-x-3 max-w-[75%]">
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 flex items-center justify-center">
                  🤖
                </div>
                <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-2xl rounded-tl-md border border-gray-100 dark:border-gray-700">
                  <div className="flex space-x-1">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{
                          duration: 1.2,
                          repeat: Infinity,
                          delay: i * 0.2,
                          ease: "easeInOut",
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-800/50">
          <div className="flex space-x-3">
            <input
              type="text"
              placeholder="Ask something about your note..."
              className="flex-1 px-4 py-3 bg-white dark:bg-gray-900 
                border border-gray-200 dark:border-gray-700 
                rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 
                transition-all duration-200 text-sm text-gray-800 dark:text-gray-200"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button
              onClick={handleSend}
              disabled={!inputValue.trim()}
              className={`px-6 py-3 rounded-full font-medium text-sm transition-all duration-200 flex items-center space-x-2 ${
                inputValue.trim()
                  ? "bg-blue-500 text-white hover:bg-blue-600 shadow-sm"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
              }`}
            >
              <span>Send</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatWithAI;
